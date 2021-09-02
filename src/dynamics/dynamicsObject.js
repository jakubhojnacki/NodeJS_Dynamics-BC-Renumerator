/**
 * @module "DynamicsObject" class
 * @description Represents Dynamics object with renumberation details
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import DynamicsEntity from "./dynamicsEntity.js";
import DynamicsObjectType from "./dynamicsObjectType.js";
import DynamicsObjectFields from "./dynamicsObjectFields.js";

export default class DynamicsObject extends DynamicsEntity {
    get type() { return this.mType; }
    get fields() { return this.mFields; }

    constructor(pType, pId, pName, pRenumberedId, pFields) {
        super(pId, pName, pRenumberedId);
        this.mType = DynamicsObjectType.parse(pType);
        this.mFields = DynamicsObjectFields.validate(pFields);
    }

    static deserialise(pData) {
        let dynamicsObject = null;
        if (pData != null) {
            const fields = DynamicsObjectFields.deserialise(pData.fields);
            dynamicsObject = new DynamicsObject(pData.type, pData.id, pData.name, pData.renumberedId, fields);
        }
        return dynamicsObject;
    }

    getField(pId) {
        return this.fields != null ? this.fields.get(pId) : null;
    }
}
