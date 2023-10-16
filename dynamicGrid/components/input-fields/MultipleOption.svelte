<script lang="ts">
    import type { IGlobalAttribute, IMultipleSelect } from "../../definitions/attributes-metadata/metadataDefinitions";
    import type { IGenericFieldProps } from "./IGenericField";
    import { AttributeMetadataTypes, MetadataWebService } from "../../services/metadata-web-service";
    import { clickOutside } from "../../utils/clickOutside";

    interface $$Props extends IGenericFieldProps {}

    export let meta: IGlobalAttribute;
    export let metadataService: MetadataWebService;

    let showDropdown: boolean = false;
    let selection: string[] = [];

    $: fieldName = meta.LogicalName;
    $: displayName = meta.DisplayName;

    const multiSeleMetadata = metadataService.getAttributeDefinition<IMultipleSelect>(
        fieldName,
        AttributeMetadataTypes.MultiSelect
    );

    function closeOptions() {
        showDropdown = false;
    }
</script>

<div class="dropdown">
    <button type="button" on:click={() => (showDropdown = !showDropdown)}> Options </button>

    <fieldset style:--_showlist={showDropdown ? "flex" : "none"} use:clickOutside on:click_outside={closeOptions}>
        <legend>{displayName}</legend>
        {#await multiSeleMetadata then multiSelect}
            {#each multiSelect.OptionSet.Options as option, idx}
                <label>
                    <input
                        type="checkbox"
                        name={fieldName}
                        id={fieldName + idx}
                        value={option.Value}
                        bind:group={selection}
                    />
                    {option.Label.UserLocalizedLabel.Label}
                </label>
            {/each}
        {/await}
    </fieldset>
</div>

<style lang="scss">
    .dropdown {
        display: flex;
        flex-direction: column;
        inline-size: 100%;
    }
    fieldset {
        display: var(--_showlist);
        position: absolute;
        translate: 0 25%;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.1);
        filter: drop-shadow(0 0 0.75rem rgb(102, 102, 102));
        outline: 1px solid rgba(102, 102, 102, 0.3);
        padding: 1em;
        backdrop-filter: blur(2px);
    }
    label {
        white-space: nowrap;
    }
</style>
