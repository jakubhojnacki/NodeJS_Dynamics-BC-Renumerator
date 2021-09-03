/**
 * @module "DynamicsObjectBase" class (abstract)
 * @description Abstract class - base for objects and object fields
 * @version 0.0.2 (2021-09-03)
 */

import "../general/javaScript.js";

export default class DynamicsObjectBase {
    get no() { return this.mNo; }
    get name() { return this.mName; }
    get renumberedId() { return this.mRenumberedId; }
    set renumberedId(pValue) { this.mRenumberedId = pValue; }

    constructor(pNo, pName, pRenumberedId) {
        this.mNo = Number.validateAsInteger(pNo);
        this.mName = String.validate(pName).removeIfStartsWith("\"").removeIfEndsWith("\"");
        this.mRenumberedId = Number.validate(pRenumberedId);
    }
}
