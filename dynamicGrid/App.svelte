<script lang="ts">
import type { IInputs } from "./generated/ManifestTypes";

import DataRow from "./components/DataRow.svelte";
import EditableGrid from "./components/EditableGrid.svelte";
import HeaderRow from "./components/HeaderRow.svelte";
import InputRow from "./components/InputRow.svelte";

// export let notifyChanges: () => void;
export let dataset: ComponentFramework.PropertyTypes.DataSet;
export let visible: boolean = true;
export let disabled: boolean = true;
export let xrmApi: ComponentFramework.WebApi;
export let utils: ComponentFramework.Utility;
export let parameters: Omit<IInputs, "sampleDataSet">;

$: columns = dataset.columns.filter((col) => col.name?.trim());
$: rows = Object.entries(dataset.records).map(([id, row]) => row);
$: relatedRecord =
    parameters?.relatedEntityColumn?.raw &&
    parameters?.relatedRecordId?.raw
        ? {
              columnName: parameters.relatedEntityColumn.raw,
              recordId: parameters.relatedRecordId.raw,
          }
        : undefined;

function changeFilterHandler(ev: Event) {
    const inputEl = ev.target as HTMLInputElement;
    if (inputEl.value.trim()) {
        dataset.filtering.setFilter({
            conditions: [
                {
                    attributeName: "cre9a_name",
                    conditionOperator: 6,
                    value: inputEl.value,
                },
            ],
            filterOperator: 1,
        });
    } else {
        dataset.filtering.clearFilter();
    }
    dataset.refresh();
}
</script>

{#if visible}
    <input type="text" on:change={changeFilterHandler} />
    <EditableGrid --columns={columns.length}>
        <HeaderRow {columns} />
        <DataRow {columns} {rows} />
        {#if !disabled}
            <InputRow
                {columns}
                XrmApi={xrmApi}
                Utils={utils}
                {dataset}
                {relatedRecord}
            />
        {/if}
    </EditableGrid>
{/if}
