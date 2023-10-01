import SecurityPrivilegeMetadata = ComponentFramework.PropertyHelper.SecurityPrivilegeMetadata;

// MS doc is not clear in this one, so it has some reverse engeneering
export interface IEntityMetadata {
    Attributes: MSDictionary<IAttributeMetadata>
    Privileges: SecurityPrivilegeMetadata[]
    EntitySetName: string
    HasActivities: boolean
    DisplayName: string
    DisplayCollectionName: string
    Description: string
}
export interface MSDictionary<T>{
    getAll: () => T[]
    forEach: (item: T, idx: number, currArr: T[]) => void
    get: (idx: number) => T
    getFirst: () => T
}

export interface IAttributeMetadata {
    DisplayName: string
    AttributeType: number
    AttributeTypeName: string
    EntityLogicalName: string
    LogicalName: string
    IsValidForGrid: boolean
}

interface IOptionSet {
    [key: number]: {text: string, value: number}
}
export interface IMultiOptionSet extends IAttributeMetadata{
    OptionSet: IOptionSet
    AttributeTypeName: "multiselectpicklist"
    AttributeType: 17
}
export interface IPickList extends IAttributeMetadata{
    OptionSet: IOptionSet
    AttributeTypeName: "picklist"
    AttributeType: 11
}

export interface IBoolean extends IAttributeMetadata{
    OptionSet: IOptionSet
    AttributeTypeName: "boolean"
    AttributeType: 0
}
export interface IString extends IAttributeMetadata{
    AttributeTypeName: "string"
    AttributeType: 14
}



