<script lang="ts">
    import { IBooleanMetadata } from "../../definitions/attributes-metadata/metadataDefinitions";
    import { MetadataService, AttributeMetadataTypes } from "../../services/metadataService";

    export let column: ComponentFramework.PropertyHelper.DataSetApi.Column;
    export let metadataService: MetadataService;
    let checked = false;

    const booleanDefinition = metadataService.getAttributeDefinition(
        column.name,
        AttributeMetadataTypes.Boolean
    ) as Promise<IBooleanMetadata>;
</script>

{#await booleanDefinition then booleanMetadata}
    <input id="{column.name}-in" type="checkbox" bind:checked />
    {#if checked}
        <label for="{column.name}-in">
            {booleanMetadata.TrueOption.Label.UserLocalizedLabel.Label}
        </label>
        <input type="hidden" name={column.name} value={booleanMetadata.TrueOption.Value} />
    {:else}
        <label for="{column.name}-in">
            {booleanMetadata.FalseOption.Label.UserLocalizedLabel.Label}
        </label>
        <input type="hidden" name={column.name} value={booleanMetadata.FalseOption.Value} />
    {/if}
{/await}
