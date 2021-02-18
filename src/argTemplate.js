/**
 * @module "ArgTemplate" class
 * @description Class defaining a template for one application argument
 * @version 0.0.1 (2021-02-17)
 */

const DataType = require("./dataType");

require("./javaScript");

class ArgTemplate {
    get tag() { return this.mTag; }
    get name() { return this.mName; }
    get dataType() { return this.mDataType; }

    constructor(pTag, pName, pDataType) {
        this.mTag = String.default(pTag);
        this.mName = String.default(pName);
        this.mDataType = DataType.parse(pDataType);
    }
}

module.exports = ArgTemplate;