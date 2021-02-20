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
    get dataType() { return this.mDataType; }
    get mandatory() { return this.mMandatory; }

    constructor(pTag, pName, pDataType, pMandatory) {
        this.mTag = String.default(pTag);
        this.mName = String.default(pName);
        this.mDataType = DataType.parse(pDataType);
        this.mMandatory = Boolean.default(pMandatory);
    }
}

module.exports = ArgTemplate;