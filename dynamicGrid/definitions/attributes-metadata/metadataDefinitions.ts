import { AttributeMetadataTypes } from "../../services/metadataService";
import { AttributeType } from "../attributeType";

export type IOdataTypes = typeof AttributeMetadataTypes[keyof typeof AttributeMetadataTypes];
export type IEntityMetadata = {
    /** The logical name for the entity. */
    LogicalName: string
    /** The logical collection name. */
    LogicalCollectionName: string
    /** The name of the Web API entity set for this entity. */
    EntitySetName: string
    /** The schema name for the entity. (Capitalized) */
    SchemaName: string
    /** The collection schema name of the entity. (Capitalized) */
    CollectionSchemaName: string
    /** The name of the primary attribute for an entity. */
    PrimaryNameAttribute: string
    /** The name of the attribute that is the primary id for the entity. */
    PrimaryIdAttribute: string
    /** The label containing the description for the entity. */
    Description: ILabel
    /** A label containing the display name for the entity. */
    DisplayName: ILabel
    /** A label containing the plural display name for the entity. */
    DisplayCollectionName: ILabel
}


export type IGlobalAttribute = {
    "@odata.type": IOdataTypes,
    AttributeOf: string,
    AttributeType: keyof typeof AttributeType,
    DefaultFormValue: number,
    Description: ILabel,
    DisplayName: ILabel,
    EntityLogicalName: string,
    LogicalName: string,
    MetadataId: string,
    ParentPicklistLogicalName: string,
    RequiredLevel: IRequiredLevel,
    SchemaName: string,
}

export type ILabel = {
    LocalizedLabels: ILocalizedLabel[],
    UserLocalizedLabel: ILocalizedLabel
}
export type ILocalizedLabel = {
    HasChanged: boolean,
    IsManaged: boolean,
    Label: string,
    LanguageCode: number,
    MetadataId: string
}
export type IRequiredLevel = {
    CanBeChanged: boolean,
    ManagedPropertyLogicalName: string,
    Value: 'None' | 'SystemRequired' | 'ApplicationRequired' | 'Recommended'
}

export type IPickListAtt = IGlobalAttribute & {
    OptionSet: IOptionSetAtt
}

export type IMultipleSelect = IGlobalAttribute & {
    OptionSet: IOptionSetAtt
}
export type ILookupAtt = IGlobalAttribute & {
    Targets: string[]
}

export type IOptionSetAtt = {
    MetadataId: string,
    Options: {
        Color: string,
        Description: ILabel,
        Label: ILabel,
        MetadataId: string,
        Value: number,
    }[]
}

export type IBooleanMetadata = {
    TrueOption: {
        Color: string,
        Description: ILabel,
        Label: ILabel,
        MetadataId: string,
        Value: number,
    },
    FalseOption: {
        Color: string,
        Description: ILabel,
        Label: ILabel,
        MetadataId: string,
        Value: number,
    },
    Name: string,
    DisplayName: ILabel,
    Description: ILabel
}