/**
 * @module "DynamicsFieldEx" class
 * @description Represents Dynamics field extended for renumberator
 */

import { DynamicsField } from "dynamics-library";

export class DynamicsFieldEx extends DynamicsField {
    get renumberedNo() { return this.mRenumberedNo; }
    set renumberedNo(pValue) { this.mRenumberedNo = Number.validateAsInteger(pValue); }

    constructor(pNo, pName, pDataType, pRenumberedNo) {
        super(pNo, pName, pDataType);
        this.renumberedNo = pRenumberedNo;
    }

    toData() {
        let data = super.toData();
        data.renumberedNo = this.renumberedNo;
        return data;
    }    
}
