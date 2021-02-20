/**
 * @module "ArgTemplate" class
 * @description Class defaining a template for one application argument
 * @version 0.0.1 (2021-02-17)
 */

include("/general/javaScript");

const DataType = include("/general/dataType");

class ArgTemplate {
    get tag() { return this.mTag; }
    get name() { return this.mName; }
    get description() { return this.mDescription; }
    get dataType() { return this.mDataType; }
    get mandatory() { return this.mMandatory; }

    constructor(pTag, pName, pDescription, pDataType, pMandatory) {
        this.mTag = String.default(pTag);
        this.mName = String.default(pName);
        this.mDescription = String.default(pDescription);
        this.mDataType = DataType.parse(pDataType);
        this.mMandatory = Boolean.default(pMandatory);
    }

    toString() {
        return `-${this.tag} [${this.name}] - ${this.description} (Data Type: ${this.dataType}; Mandatory: ${this.mandatory})`;
    }
}

module.exports = ArgTemplate;