<script lang="ts">
    import { IGlobalAttribute } from "../definitions/attributes-metadata/metadataDefinitions";
    import { dataTypes } from "../definitions/dataTypes";
    import { MetadataService } from "../services/metadataService";
    import { formatData } from "../utils/formatPayload";
    import { BooleanRow, LookupInput, MultipleOption, OptionInput} from './input-fields';

    export let XrmApi: ComponentFramework.WebApi;
    export let Utils: ComponentFramework.Utility;
    export let columns: ComponentFramework.PropertyHelper.DataSetApi.Column[];
    export let dataset: ComponentFramework.PropertyTypes.DataSet;
    export let relatedRecord: { columnName: string; recordId: string } | undefined = undefined;

    const myMetadataService = new MetadataService(dataset.getTargetEntityType());
    const attributeListDefinition = myMetadataService.getAllAttributesDefinition();

    async function submitHandler(ev: SubmitEvent) {
        const formElement = ev.target as HTMLFormElement;
        const data = new FormData(formElement);

        let payload = (await attributeListDefinition).value
            .map((att) => ({ att, value: data.getAll(att.LogicalName) }))
            .filter(({ value }) => value.find((i) => i))
            .reduce(
                (prev, { att, value }) => ({
                    ...prev,
                    ...formatData({
                        columnName: att.LogicalName,
                        attributeDefinition: att,
                        value,
                    }),
                }),
                {}
            );
        console.log(payload);

        XrmApi.createRecord(dataset.getTargetEntityType(), payload)
            .then(a => dataset.refresh());
    }

    function findAttributeDefinition(attributeList: IGlobalAttribute[], logicalName: string): IGlobalAttribute {
        const attributeDefinition = attributeList.find((am) => am.LogicalName === logicalName);
        if (!attributeDefinition) throw new Error("Attribute not found");
        return attributeDefinition;
    }
</script>

<form name="newRecord" on:submit|preventDefault={submitHandler}>
    {#await attributeListDefinition then attributesMetadata}
        {#if relatedRecord}
            <LookupInput
                {Utils}
                metadataService={myMetadataService}
                attributeDefinition={findAttributeDefinition(attributesMetadata.value, relatedRecord.columnName)}
                hidden
                defaultValue={relatedRecord.recordId}
            />
        {/if}

        {#each columns as column}
            <div class="input-cell">
                {#if column.dataType === dataTypes.Lookup}
                    <LookupInput
                        {Utils}
                        metadataService={myMetadataService}
                        attributeDefinition={findAttributeDefinition(attributesMetadata.value, column.name)}
                    />
                {:else if column.dataType === dataTypes.MultiSelectPicklist}
                    <MultipleOption {column} metadataService={myMetadataService} />
                {:else if column.dataType === dataTypes.OptionSet}
                    <OptionInput {column} metadataService={myMetadataService} />
                {:else if column.dataType === dataTypes.Boolean}
                    <BooleanRow {column} metadataService={myMetadataService} />
                {:else}
                    <input type="text" name={column.name} id={column.name} placeholder={column.displayName} />
                {/if}
                {#if attributesMetadata.value.find((a) => a.LogicalName === column.name)?.RequiredLevel.Value === "ApplicationRequired"}
                    <span class="required">*</span>
                {/if}
            </div>
        {/each}
    {/await}
    <button type="submit">+</button>
</form>

<style lang="scss">
    button[type="submit"] {
        max-inline-size: 2rem;
        max-block-size: 2rem;
    }
    form {
        display: contents;
    }
    .input-cell {
        --_padding: 0.5rem;
        display: flex;
        gap: 0.2em;

        > :global(input) {
            padding: var(--_padding);
            width: calc(100% - (var(--_padding) * 2) - 1ch - 4px - 0.1rem);
        }
        .required {
            color: crimson;
        }
    }
</style>
