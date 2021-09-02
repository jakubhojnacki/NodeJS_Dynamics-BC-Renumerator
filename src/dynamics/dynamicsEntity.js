/**
 * @module "DynamicsEntity" class (abstract)
 * @description Dynamics entity - abstract for objects, object extensions, table fields and enum values
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";

export default class DynamicsEntity {
    get id() { return this.mId; }
    get name() { return this.mName; }
    get renumberedId() { return this.mRenumberedId; }
    set renumberedId(pValue) { this.mRenumberedId = pValue; }

    constructor(pId, pName, pRenumberedId) {
        this.mId = Number.validate(pId);
        this.mName = String.validate(pName).removeIfStartsWith("\"").removeIfEndsWith("\"");
        this.mRenumberedId = Number.validate(pRenumberedId);
    }
}
