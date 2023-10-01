<script lang="ts">
    import type {
        IEntityMetadata,
        IGlobalAttribute,
        ILookupAtt,
    } from "../../definitions/attributes-metadata/metadataDefinitions";
    import { AttributeMetadataTypes, MetadataService } from "../../services/metadataService";

    export let Utils: ComponentFramework.Utility;
    export let attributeDefinition: IGlobalAttribute;
    export let metadataService: MetadataService;
    export let hidden: boolean = false;
    export let defaultValue: string = "";

    let lookupDefinition = metadataService.getAttributeDefinition(
        attributeDefinition.LogicalName,
        AttributeMetadataTypes.Lookup
    ) as Promise<ILookupAtt>;

    let selectedLookup: ComponentFramework.LookupValue | undefined;
    $: targetsDefinition = (async () =>
        Promise.all(
            (await lookupDefinition).Targets.map(async (target) => await new MetadataService(target).entityDefinition)
        ))();

    async function lookupHandler(targets: string[]) {
        const lookupDialogOpts: any = {
            entityTypes: targets,
        };
        selectedLookup = (await Utils.lookupObjects(lookupDialogOpts))[0];
    }
    function generateValue(entityList: IEntityMetadata[], entityType: string, recordId: string | undefined) {
        if (!recordId) return undefined;
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
                placeholder={attributeDefinition.DisplayName.UserLocalizedLabel.Label}
                readonly
                type="text"
            />
            <input
                value={generateValue(targetsMetadata, lookupMetadata.Targets[0], selectedLookup?.id)}
                name={attributeDefinition.LogicalName}
                type="hidden"
            />
        {:else}
            <input
                value={generateValue(targetsMetadata, lookupMetadata.Targets[0], defaultValue)}
                name={attributeDefinition.LogicalName}
                type="hidden"
            />
        {/if}
    {/await}
{/await}
