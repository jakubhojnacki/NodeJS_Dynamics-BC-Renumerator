/**
 * @module "DynamicsObjectBase" class (abstract)
 * @description Abstract class - base for objects and object fields
 */

export class DynamicsObjectBase {
    get no() { return this.mNo; }
    set no(pValue) { this.mNo = Number.validateAsInteger(pValue); }
    get name() { return this.mName; }
    set name(pValue) { this.mName = String.validate(pValue).removeIfStartsWith("\"").removeIfEndsWith("\""); }
    get renumberedNo() { return this.mRenumberedNo; }
    set renumberedNo(pValue) { this.mRenumberedNo = Number.validateAsInteger(pValue); }

    constructor(pNo, pName, pRenumberedNo) {
        this.no = pNo;
        this.name = pName;
        this.renumberedNo = pRenumberedNo;
    }

    //TODO - Review
    serialise() {
        return {
            "no": this.no,
            "name": this.name,
            "renumberedNo": this.renumberedNo
        };
    }
}
