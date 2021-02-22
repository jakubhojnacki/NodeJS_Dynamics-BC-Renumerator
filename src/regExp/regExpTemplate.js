/**
 * @module "RegExpTemplate" class
 * @description Represents regular expression template
 * @version 0.0.1 (2021-02-22)
 */

__require("general/javaScript");

class RegExpTemplate {
    get name() { return this.mName; }
    get description() { return this.mDescription; }
    get pattern() { return this.mPattern; }
    get flags() { return this.mFlags; }
    get replaceWith() { return this.mReplaceWith; }

    constructor(pName, pDescription, pPattern, pFlags, pReplaceWith) {
        this.mName = String.default(pName);
        this.mDescription = String.default(pDescription);
        this.mPattern = String.default(pPattern);
        this.mFlags = String.default(pFlags);
        this.mReplaceWith = String.default(pReplaceWith);
    }
}

module.exports = RegExpTemplate;