/**
 * @module "DynamicsObject" class
 * @description Represents Dynamics object with renumberation details
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import DynamicsObjectBase from "./dynamicsObjectBase.js";
import DynamicsObjectType from "./dynamicsObjectType.js";
import DynamicsObjectFields from "./dynamicsObjectFields.js";

export default class DynamicsObject extends DynamicsObjectBase {
    get type() { return this.mType; }
    get fields() { return this.mFields; }
    set fields(pValue) { this.mFields = pValue; }

    constructor(pType, pNo, pName, pRenumberedId, pFields) {
        super(pNo, pName, pRenumberedId);
        this.mType = DynamicsObjectType.parse(pType);
        this.mFields = DynamicsObjectFields.validate(pFields);
    }

    static deserialise(pData) {
        let dynamicsObject = null;
        if (pData != null) {
            const fields = DynamicsObjectFields.deserialise(pData.fields);
            dynamicsObject = new DynamicsObject(pData.type, pData.no, pData.name, pData.renumberedNo, fields);
        }
        return dynamicsObject;
    }

    getField(pNo) {
        return this.fields != null ? this.fields.get(pNo) : null;
    }
}
