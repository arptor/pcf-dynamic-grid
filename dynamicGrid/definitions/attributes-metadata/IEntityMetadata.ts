import SecurityPrivilegeMetadata = ComponentFramework.PropertyHelper.SecurityPrivilegeMetadata;

// MS doc is not clear in this one, so it has some reverse engeneering
export interface IEntityMetadata {
    Attributes: MSDictionary<IAttributeMetadata>;
    Privileges: SecurityPrivilegeMetadata[];
    ActivityTypeMask: number;
    AutoRouteToOwnerQueue: boolean;
    CanEnableSyncToExternalSearchIndex: boolean;
    CanTriggerWorkflow: boolean;
    Description: string;
    DisplayCollectionName: string;
    DisplayName: string;
    EnforceStateTransitions: boolean;
    EntityColor: string;
    EntitySetName: string;
    HasActivities: boolean;
    IsActivity: boolean;
    IsActivityParty: boolean;
    IsBusinessProcessEnabled: boolean;
    IsBPFEntity: boolean;
    IsChildEntity: boolean;
    IsConnectionsEnabled: boolean;
    IsCustomEntity: boolean;
    IsCustomizable: boolean;
    IsDocumentManagementEnabled: boolean;
    IsDocumentRecommendationsEnabled: boolean;
    IsDuplicateDetectionEnabled: boolean;
    IsEnabledForCharts: boolean;
    IsImportable: boolean;
    IsInteractionCentricEnabled: boolean;
    IsKnowledgeManagementEnabled: boolean;
    IsMailMergeEnabled: boolean;
    IsManaged: boolean;
    IsOneNoteIntegrationEnabled: boolean;
    IsOptimisticConcurrencyEnabled: boolean;
    IsQuickCreateEnabled: boolean;
    IsStateModelAware: boolean;
    IsValidForAdvancedFind: boolean;
    IsVisibleInMobileClient: boolean;
    IsEnabledInUnifiedInterface: boolean;
    LogicalCollectionName: string;
    LogicalName: string;
    ObjectTypeCode: number;
    OwnershipType: string;
    PrimaryIdAttribute: string;
    PrimaryImageAttribute: string;
    PrimaryNameAttribute: string;
}
export interface MSDictionary<T> {
    getAll: () => T[];
    forEach: (item: T, idx: number, currArr: T[]) => void;
    get: (idx: number) => T;
    getFirst: () => T;
    getByName: (name: string) => T;
    getByFilter: (callback: (i: T) => boolean) => T;
    getLength: () => number;
}

export interface IAttributeMetadata {
    AttributeType: AttributeType;
    DisplayName: string;
    EntityLogicalName: string;
    LogicalName: string;
}

export enum AttributeType {
    BigInt = 18,
    Boolean = 0,
    CalendarRules = 16,
    Customer = 1,
    DateTime = 2,
    Decimal = 3,
    Double = 4,
    EntityName = 20,
    Integer = 5,
    Lookup = 6,
    ManagedProperty = 19,
    Memo = 7,
    Money = 8,
    Owner = 9,
    PartyList = 10,
    Picklist = 11,
    State = 12,
    Status = 13,
    String = 14,
    Uniqueidentifier = 15,
    Virtual = 17,
}

interface IOptionSet {
    [key: number]: { text: string; value: number };
}
export interface IMultiOptionSet extends IAttributeMetadata {
    OptionSet: IOptionSet;
    AttributeTypeName: "multiselectpicklist";
    AttributeType: 17;
}
export interface IPickList extends IAttributeMetadata {
    OptionSet: IOptionSet;
    AttributeType: AttributeType.Picklist;
}

export interface IBoolean extends IAttributeMetadata {
    OptionSet: IOptionSet;
    AttributeType: AttributeType.Boolean;
}
export interface IString extends IAttributeMetadata {
    AttributeType: AttributeType.String;
}
