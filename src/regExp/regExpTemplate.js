/**
 * @module "RegExpTemplate" class
 * @description Represents regular expression template
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import RegExpFlags from "./regExpFlags.js";

export default class RegExpTemplate {
    get name() { return this.mName; }
    get description() { return this.mDescription; }
    get pattern() { return this.mPattern; }
    get flags() { return this.mFlags; }
    get replaceWith() { return this.mReplaceWith; }

    constructor(pName, pDescription, pPattern, pFlags, pReplaceWith) {
        this.mName = String.validate(pName);
        this.mDescription = String.validate(pDescription);
        this.mPattern = String.validate(pPattern);
        this.mFlags = new RegExpFlags(pFlags);
        this.mReplaceWith = String.validate(pReplaceWith);
    }
}
