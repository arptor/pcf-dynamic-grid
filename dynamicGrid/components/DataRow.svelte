<script lang="ts">
    export let columns: ComponentFramework.PropertyHelper.DataSetApi.Column[];
    export let rows: ComponentFramework.PropertyHelper.DataSetApi.EntityRecord[];
</script>

{#each rows as row}
    {#each columns as column}
        <div class="data-cell">
            {row.getFormattedValue(column.name)}
        </div>
    {/each}
    <div class="blank" />
{/each}

<style lang="scss">
    .data-cell {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
