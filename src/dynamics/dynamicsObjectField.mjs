/**
 * @module "DynamicsObjectField" class
 * @description Represents Dynamics object field (table field or enum value)
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import DynamicsObjectBase from "./dynamicsObjectBase.js";

export default class DynamicsObjectField extends DynamicsObjectBase {
    get dataType() { return this.mDataType; }
    set dataType(pValue) { this.mDataType = pValue; }

    constructor(pNo, pName, pDataType, pRenumberedNo) {
        super(pNo, pName, pRenumberedNo);
        this.mDataType = String.validate(pDataType);
    }

    static deserialise(pData) {
        let dynamicsObjectField = null;
        if (pData != null)
            dynamicsObjectField = new DynamicsObjectField(pData.extensionId, pData.name, pData.renumberedNo);
        return dynamicsObjectField;
    }

    serialise() {
        let data = super.serialise();
        data.dataType = this.dataType;
        return data;
    }      
}
