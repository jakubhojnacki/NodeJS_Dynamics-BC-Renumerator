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
        this.mFields = pFields ? pFields : new DynamicsObjectFields();
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
