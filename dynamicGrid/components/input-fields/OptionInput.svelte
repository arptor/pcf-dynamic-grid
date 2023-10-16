<script lang="ts">
    import type { IGenericFieldProps } from "./IGenericField";
    import { IGlobalAttribute, IPickListAtt } from "../../definitions/attributes-metadata/metadataDefinitions";
    import { MetadataWebService, AttributeMetadataTypes } from "../../services/metadata-web-service";

    interface $$Props extends IGenericFieldProps {}

    export let meta: IGlobalAttribute;
    export let metadataService: MetadataWebService;

    $: fieldName = meta.LogicalName;
    
    const optionsetMetadata = metadataService.getAttributeDefinition(fieldName, AttributeMetadataTypes.Picklist) as Promise<IPickListAtt>;
</script>

<select name={fieldName} id={`editable-${fieldName}`}>
    {#await optionsetMetadata then pickList}
        {#each pickList.OptionSet.Options as option}
            <option value={option.Value}>
                {option.Label.UserLocalizedLabel.Label}
            </option>
        {/each}
    {/await}
</select>

<style lang="scss">
    select {
        inline-size: 100%;
    }
</style>
