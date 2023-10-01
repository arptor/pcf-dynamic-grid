<script lang="ts">
    export let columns: ComponentFramework.PropertyHelper.DataSetApi.Column[];
</script>

{#each columns as column}
    <div class="header-cell">{column.displayName}</div>
{/each}
<div class="blank" />

<style lang="scss">
    .header-cell {
        font-size: large;
        font-weight: bold;
        text-transform: capitalize;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
