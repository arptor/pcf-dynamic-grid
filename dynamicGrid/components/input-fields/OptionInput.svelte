<script lang="ts">
    import { IPickListAtt } from "../../definitions/attributes-metadata/metadataDefinitions";
    import { MetadataService, AttributeMetadataTypes } from "../../services/metadataService";

    export let column: ComponentFramework.PropertyHelper.DataSetApi.Column;
    export let metadataService: MetadataService;

    const optionsetMetadata = metadataService.getAttributeDefinition(column.name, AttributeMetadataTypes.Picklist) as Promise<IPickListAtt>;
</script>

<select name={column.name} id={`editable-${column.name}`}>
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
