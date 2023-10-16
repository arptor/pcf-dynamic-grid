import { IGlobalAttribute } from "../definitions/attributes-metadata/metadataDefinitions";
import { AttributeMetadataTypes } from "../services/WebMetadataService";

export function formatData({
    columnName,
    attributeDefinition,
    value,
}: {
    columnName: string;
    attributeDefinition: IGlobalAttribute;
    value: FormDataEntryValue[];
}): { [key: string]: string | number | boolean } {
    switch (attributeDefinition["@odata.type"].slice(1)) {
        case AttributeMetadataTypes.Money:
        case AttributeMetadataTypes.Decimal:
        case AttributeMetadataTypes.Integer:
        case AttributeMetadataTypes.Double:
        case AttributeMetadataTypes.Picklist:
            return { [columnName]: +value[0] };
        case AttributeMetadataTypes.Boolean:
            return { [columnName]: !!+value[0] };
        case AttributeMetadataTypes.MultiSelect:
            return { [columnName]: value.join() };
        case AttributeMetadataTypes.Lookup: {
            const [enitySetName, id] = (value[0] as string).split("%");
            return { [`${columnName}@odata.bind`]: `/${enitySetName}(${id})` };
        }
        default:
            return { [columnName]: value[0] as string };
    }
}
