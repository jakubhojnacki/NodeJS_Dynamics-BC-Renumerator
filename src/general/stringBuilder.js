/**
 * @module "StringBuilder" class
 * @description Class used to build various strings
 * @version 0.0.1 (2021-02-20)
 */

include("/general/javaScript");

class StringBuilder {
    get content() { return this.mContent; }
    set content(pValue) { this.mContent = pValue; }

    constructor(pContent) {
        this.mContent = String.default(pContent);
    }

    addText(pText) {
        if (content)
            content += "\r\n";
        content += pText;
    }

    addNameValue(pName, pValue) {
        this.addText(`${pName}: ${pValue ? pValue: "null"}`);
    }

    toString() {
        return this.content;
    }
}

module.exports = StringBuilder;