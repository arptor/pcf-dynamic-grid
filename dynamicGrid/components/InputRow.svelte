<script lang="ts">
    import { ComponentType } from "svelte";
    import { IGlobalAttribute } from "../definitions/attributes-metadata/metadataDefinitions";
    import { dataTypes } from "../definitions/dataTypes";
    import { MetadataWebService } from "../services/metadata-web-service";
    import { formatData } from "../utils/formatPayload";
    import { BooleanRow, LookupInput, MultipleOption, OptionInput } from "./input-fields";
    import { InternalMetadataService } from "../services/InternalMetadataService";
    import { AMetadataService } from "../services/AMetadataService";

    export let XrmApi: ComponentFramework.WebApi;
    export let utils: ComponentFramework.Utility;
    export let columns: ComponentFramework.PropertyHelper.DataSetApi.Column[];
    export let dataset: ComponentFramework.PropertyTypes.DataSet;
    export let relatedRecord: { columnName: string; recordId: string } | undefined = undefined;

    const fieldTypes = [
        { type: dataTypes.Lookup, component: LookupInput },
        { type: dataTypes.Boolean, component: BooleanRow },
        { type: dataTypes.MultiSelectPicklist, component: MultipleOption },
        { type: dataTypes.OptionSet, component: OptionInput },
    ];

    let columnNames = columns.map((col) => col.name);
    if (relatedRecord?.columnName) columnNames.push(relatedRecord.columnName);

    const metadataService = new InternalMetadataService({
        attributeList: columnNames,
        entityType: dataset.getTargetEntityType(),
        utils,
    }).loadEntityDefinition();

    utils.getEntityMetadata("miEntidad")

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

        XrmApi.createRecord(dataset.getTargetEntityType(), payload).then((a) => dataset.refresh());
    }


</script>

<form name="newRecord" on:submit|preventDefault={submitHandler}>
    {#await metadataService then metadata}
        {#if relatedRecord}
            <LookupInput
                {utils}
                {metadataService}
                meta={findAttributeDefinition(attributesMetadata.value, relatedRecord.columnName)}
                hidden
                defaultValue={relatedRecord.recordId}
            />
        {/if}

        {#each columns as column}
            <div class="input-cell">
                {#if fieldTypes.find((a) => a.type === column.dataType)}
                    <svelte:component
                        this={fieldTypes.find((a) => a.type === column.dataType)?.component}
                        meta={metadata.getAttributeDefinition(column.name)}
                    />
                {:else}
                    <input type="text" name={column.name} id={column.name} placeholder={column.displayName} />
                {/if}
                <!-- {#if attributesMetadata.value.find((a) => a.LogicalName === column.name)?.RequiredLevel.Value === "ApplicationRequired"}
                    <span class="required">*</span>
                {/if} -->
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

        :global(input) {
            border: transparent solid 1px;
            &:hover {
                border-color: rgb(102, 102, 102);
            }
        }
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
