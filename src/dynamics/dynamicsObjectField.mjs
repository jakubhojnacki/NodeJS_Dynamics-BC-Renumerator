/**
 * @module "DynamicsObjectField" class
 * @description Represents Dynamics object field (table field or enum value)
 */

import { DynamicsObjectBase } from "../dynamics/dynamicsObjectBase.js";

export class DynamicsObjectField extends DynamicsObjectBase {
    get dataType() { return this.mDataType; }
    set dataType(pValue) { this.mDataType = String.validate(pValue); }

    constructor(pNo, pName, pDataType, pRenumberedNo) {
        super(pNo, pName, pRenumberedNo);
        this.dataType = pDataType;
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
