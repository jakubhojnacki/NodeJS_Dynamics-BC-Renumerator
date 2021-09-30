/**
 * @module "DynamicsObjectBase" class (abstract)
 * @description Abstract class - base for objects and object fields
 * @version 0.0.2 (2021-09-03)
 */

import "../general/javaScript.js";

export default class DynamicsObjectBase {
    get no() { return this.mNo; }
    get name() { return this.mName; }
    set name(pValue) { this.mName = pValue; }
    get renumberedNo() { return this.mRenumberedNo; }
    set renumberedNo(pValue) { this.mRenumberedNo = pValue; }

    constructor(pNo, pName, pRenumberedNo) {
        this.mNo = Number.validateAsInteger(pNo);
        this.mName = String.validate(pName).removeIfStartsWith("\"").removeIfEndsWith("\"");
        this.mRenumberedNo = Number.validate(pRenumberedNo);
    }

    serialise() {
        return {
            "no": this.no,
            "name": this.name,
            "renumberedNo": this.renumberedNo
        };
    }
}
