/**
 * @module "DynamicsObjectField" class
 * @description Represents Dynamics object field (table field or enum value)
 */

import { DynamicsObjectBase } from "../dynamics/dynamicsObjectBase.mjs";

export class DynamicsObjectField extends DynamicsObjectBase {
    get dataType() { return this.mDataType; }
    set dataType(pValue) { this.mDataType = String.validate(pValue); }

    constructor(pNo, pName, pDataType, pRenumberedNo) {
        super(pNo, pName, pRenumberedNo);
        this.dataType = pDataType;
    }

    toData() {        
        let data = super.toData();
        data.dataType = this.dataType;
        return data;
    }      

    fromData(pData) {
        super.fromData(pData);
        if (pData != null)
            this.dataType = pData.dataType;
        return this;
    }
}
