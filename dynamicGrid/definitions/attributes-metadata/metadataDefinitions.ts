import type { IOdataTypes } from "../../services/WebMetadataService";
import { AttributeType } from "../attributeType";

export type IEntityMetadata = {
    /** The logical name for the entity. */
    LogicalName: string;
    /** The logical collection name. */
    LogicalCollectionName: string;
    /** The name of the Web API entity set for this entity. */
    EntitySetName: string;
    /** The schema name for the entity. (Capitalized) */
    SchemaName: string;
    /** The collection schema name of the entity. (Capitalized) */
    CollectionSchemaName: string;
    /** The name of the primary attribute for an entity. */
    PrimaryNameAttribute: string;
    /** The name of the attribute that is the primary id for the entity. */
    PrimaryIdAttribute: string;
    /** The label containing the description for the entity. */
    Description: ILabel;
    /** A label containing the display name for the entity. */
    DisplayName: ILabel;
    /** A label containing the plural display name for the entity. */
    DisplayCollectionName: ILabel;
};

export type IGlobalAttribute = {
    "@odata.type": IOdataTypes;
    AttributeOf: string;
    AttributeType: keyof typeof AttributeType;
    DefaultFormValue: number;
    Description: ILabel;
    DisplayName: ILabel;
    EntityLogicalName: string;
    LogicalName: string;
    MetadataId: string;
    ParentPicklistLogicalName: string;
    RequiredLevel: IRequiredLevel;
    SchemaName: string;
};

export type ILabel = {
    LocalizedLabels: ILocalizedLabel[];
    UserLocalizedLabel: ILocalizedLabel;
};
export type ILocalizedLabel = {
    HasChanged: boolean;
    IsManaged: boolean;
    Label: string;
    LanguageCode: number;
    MetadataId: string;
};
export type IRequiredLevel = {
    CanBeChanged: boolean;
    ManagedPropertyLogicalName: string;
    Value: "None" | "SystemRequired" | "ApplicationRequired" | "Recommended";
};

export interface IPickListAtt extends IGlobalAttribute {
    OptionSet: IOptionSetAtt;
}

export interface IMultipleSelect extends IGlobalAttribute {
    OptionSet: IOptionSetAtt;
}
export interface ILookupAtt extends IGlobalAttribute {
    Targets: string[];
}

type IOption = {
    Color: string;
    Description: ILabel;
    Label: ILabel;
    MetadataId: string;
    Value: number;
};
export type IOptionSetAtt = {
    MetadataId: string;
    Options: IOption[];
};

export type IBooleanMetadata = {
    TrueOption: IOption;
    FalseOption: IOption;
    Name: string;
    DisplayName: ILabel;
    Description: ILabel;
};
