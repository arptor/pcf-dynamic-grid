<script lang="ts">
    import type {
        IEntityMetadata,
        IGlobalAttribute,
        ILookupAtt,
    } from "../../definitions/attributes-metadata/metadataDefinitions";
    import type { IGenericFieldProps } from "./IGenericField";
    import { AttributeMetadataTypes, MetadataWebService } from "../../services/metadata-web-service";

    interface $$Props extends IGenericFieldProps {
        hidden?: boolean;
        defaultValue?: string;
        utils: ComponentFramework.Utility;
    }

    export let utils: ComponentFramework.Utility;
    export let meta: IGlobalAttribute;
    export let metadataService: MetadataWebService;
    export let hidden: boolean = false;
    export let defaultValue: string = "";

    let lookupDefinition = metadataService.getAttributeDefinition<ILookupAtt>(
        meta.LogicalName,
        AttributeMetadataTypes.Lookup
    );

    let selectedLookup: ComponentFramework.LookupValue | undefined;
    $: targetsDefinition = (async () =>
        Promise.all((await lookupDefinition).Targets.map((target) => new MetadataWebService(target).entityDefinition)))();

    async function lookupHandler(targets: string[]) {
        const lookupDialogOpts: any = {
            entityTypes: targets,
        };
        selectedLookup = (await utils.lookupObjects(lookupDialogOpts))[0];
    }
    function generateValue(entityList: IEntityMetadata[], entityType: string, recordId: string | undefined) {
        if (!recordId || !entityList) return undefined;
        const collectionName = entityList.find((a) => a.LogicalName === entityType)?.LogicalCollectionName;
        const cleanId = recordId.replace(/\{|\}/g, "").toLocaleLowerCase();
        return `${collectionName}%${cleanId}`;
    }
</script>

{#await lookupDefinition then lookupMetadata}
    {#await targetsDefinition then targetsMetadata}
        {#if !hidden}
            <input
                on:click|preventDefault={() => lookupHandler(lookupMetadata.Targets)}
                value={selectedLookup?.name ?? ""}
                placeholder={meta.DisplayName.UserLocalizedLabel.Label}
                readonly
                type="text"
            />
            <input
                value={generateValue(targetsMetadata, lookupMetadata.Targets[0], selectedLookup?.id)}
                name={meta.LogicalName}
                type="hidden"
            />
        {:else}
            <input
                value={generateValue(targetsMetadata, lookupMetadata.Targets[0], defaultValue)}
                name={meta.LogicalName}
                type="hidden"
            />
        {/if}
    {/await}
{/await}
