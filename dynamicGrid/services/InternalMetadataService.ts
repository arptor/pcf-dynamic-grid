import { IEntityMetadata, IAttributeMetadata } from "../definitions/attributes-metadata/IEntityMetadata";
import { AMetadataService } from "./AMetadataService";
import { IOdataTypes } from "./WebMetadataService";

type InternalMetadataServiceProps = {
    utils: ComponentFramework.Utility;
    attributeList: string[];
    entityType: string;
};
export class InternalMetadataService extends AMetadataService {
    readonly #utils;
    #entityDefinition: IEntityMetadata;
    #attNames: string[];

    /**
     *
     * @param PropertyObject - {@link InternalMetadataServiceProps} Inter
     */
    constructor({ entityType, utils, attributeList }: InternalMetadataServiceProps) {
        super(entityType);
        this.#utils = utils;
        this.#attNames = attributeList;
    }

    async loadEntityDefinition(): Promise<InternalMetadataService> {
        if (!this.#entityDefinition)
            this.#entityDefinition = (await this.#utils.getEntityMetadata(this._entityType,this.#attNames)) as IEntityMetadata;
        return Promise.resolve(this);
    }

    getAllAttributesDefinition(): IAttributeMetadata[] {
        return this.#entityDefinition.Attributes.getAll();
    }
    getAttributeDefinition<R extends IAttributeMetadata>(logicalName: string): R{
        const attributeDef = this.#entityDefinition.Attributes.getAll().find((att) => att.LogicalName === logicalName);
        if (attributeDef) return attributeDef as R;
        throw new Error('Attribute metadata not found')
    }
}
