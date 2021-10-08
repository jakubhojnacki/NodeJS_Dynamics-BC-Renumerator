/**
 * @module "DynamicsObject" class
 * @description Represents Dynamics object with renumberation details
 */

import { DynamicsObjectBase } from "../dynamics/dynamicsObjectBase.js";
import { DynamicsObjectType } from "../dynamics/dynamicsObjectType.js";
import { DynamicsObjectFields } from "../dynamics/dynamicsObjectFields.js";

export class DynamicsObject extends DynamicsObjectBase {
    get type() { return this.mType; }
    get fields() { return this.mFields; }
    set fields(pValue) { this.mFields = pValue; }
    get extendsName() { return this.mExtendsName; }
    set extendsName(pValue) { this.mExtendsName = pValue; }

    constructor(pType, pNo, pName, pRenumberedId, pFields, pExtendsName) {
        super(pNo, pName, pRenumberedId, pExtendsName);
        this.mType = DynamicsObjectType.parse(pType);
        this.mFields = pFields ? pFields : new DynamicsObjectFields();
        this.mExtendsName = String.validate(pExtendsName);
    }
    
    getField(pNo) {
        return this.fields != null ? this.fields.get(pNo) : null;
    }

    serialise() {
        let data = super.serialise();
        data.type = this.type;
        data.fields = this.fields.serialise();
        return data;
    }            
}
