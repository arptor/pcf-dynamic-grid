<script lang="ts">
    import type { IBoolean } from "../../definitions/attributes-metadata/IEntityMetadata";

    export let meta: IBoolean;
    let checked = false;

    $: fieldName = meta.LogicalName;
</script>

<input id="{fieldName}-in" type="checkbox" bind:checked />
{#if checked}
    <label for="{fieldName}-in">
        {meta.OptionSet.Label.UserLocalizedLabel.Label}
    </label>
    <input type="hidden" name={fieldName} value={booleanMetadata.TrueOption.Value} />
{:else}
    <label for="{fieldName}-in">
        {booleanMetadata.FalseOption.Label.UserLocalizedLabel.Label}
    </label>
    <input type="hidden" name={fieldName} value={booleanMetadata.FalseOption.Value} />
{/if}
