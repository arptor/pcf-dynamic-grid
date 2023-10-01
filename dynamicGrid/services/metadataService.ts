import type {
    IBooleanMetadata,
    IEntityMetadata,
    IGlobalAttribute,
    ILookupAtt,
    IMultipleSelect,
    IPickListAtt,
} from "../definitions/attributes-metadata/metadataDefinitions";

const API_PATH = "/api/data/v9.2";
/** https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/metadataentitytypes?view=dataverse-latest */
export const AttributeMetadataTypes = {
    Boolean: "Microsoft.Dynamics.CRM.BooleanAttributeMetadata",
    Picklist: "Microsoft.Dynamics.CRM.PicklistAttributeMetadata",
    MultiSelect: "Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata",
    Lookup: "Microsoft.Dynamics.CRM.LookupAttributeMetadata",
    Integer: "Microsoft.Dynamics.CRM.IntegerAttributeMetadata",
    Decimal: "Microsoft.Dynamics.CRM.DecimalAttributeMetadata",
    Money: "Microsoft.Dynamics.CRM.MoneyAttributeMetadata",
    Double: "Microsoft.Dynamics.CRM.DoubleAttributeMetadata",
    
} as const;

export class MetadataService {
    readonly #entityType: string;

    public constructor(entityType: string) {
        this.#entityType = entityType;
    }

    //TODO Preload fn

    get entityDefinition() {
        let query = API_PATH + this.#entityDefinitionFN();
        query +=
            "?$select=" +
            "LogicalName,LogicalCollectionName,EntitySetName,SchemaName,CollectionSchemaName," +
            "PrimaryNameAttribute,PrimaryIdAttribute,DisplayName,DisplayCollectionName";
        return this.#requestDefinition<IEntityMetadata>(query);
    }

    #entityDefinitionFN() {
        return `/EntityDefinitions(LogicalName='${this.#entityType}')`;
    }

    #attributesFN(logicalName: string | undefined) {
        if (logicalName) return `/Attributes(LogicalName='${logicalName}')`;
        else return `/Attributes`;
    }

    getAllAttributesDefinition() {
        const query = API_PATH + this.#entityDefinitionFN() + this.#attributesFN(undefined);
        return this.#requestDefinition<{ value: IGlobalAttribute[] }>(query);
    }
    getAttributeDefinition<T extends (typeof AttributeMetadataTypes)[keyof typeof AttributeMetadataTypes]>(
        logicalName: string,
        type: T
    ) {
        let query = API_PATH + this.#entityDefinitionFN() + this.#attributesFN(logicalName);
        query += "/" + type;
        switch (type) {
            case AttributeMetadataTypes.Lookup:
                query += "?$select=Targets";
                return this.#requestDefinition<ILookupAtt>(query);
            case AttributeMetadataTypes.Picklist:
                query += "?$expand=OptionSet($select=Options)";
                return this.#requestDefinition<IPickListAtt>(query);
            case AttributeMetadataTypes.MultiSelect:
                query += "?$expand=OptionSet($select=Options)";
                return this.#requestDefinition<IMultipleSelect>(query);
            case AttributeMetadataTypes.Boolean:
                query += "/OptionSet?$select=TrueOption,FalseOption,Name,DisplayName,Description";
                return this.#requestDefinition<IBooleanMetadata>(query);
        }
    }

    #requestDefinition<T>(query: string) {
        return fetch(query).then((response) => response.json() as Promise<T>);
    }
}
