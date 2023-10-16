import { IEntityMetadata, IAttributeMetadata } from "../definitions/attributes-metadata/IEntityMetadata";
import { IOdataTypes } from "./WebMetadataService";

export abstract class AMetadataService {
    protected readonly _entityType: string;
    constructor(entityType: string) {
        this._entityType = entityType;
    }

    abstract getAllAttributesDefinition(): IAttributeMetadata[];

    abstract getAttributeDefinition<R extends IAttributeMetadata>(
        logicalName: string,
        type: IOdataTypes
    ): R;
}
