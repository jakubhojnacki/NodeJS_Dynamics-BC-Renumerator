/**
 * @module "RegExpMatch" class
 * @description Regular expression match object (regular expression result)
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";

export default class RegExpMatch {
    get template() { return this.mTemplate; }
    get success() { return this.mSuccess; }
    get input() { return this.mInput; }
    get index() { return this.mIndex; }
    get output() { return this.mOutput; }
    get groups() { return this.mGroups; }
    get namedGroups() { return this.mNamedGroups; }

    constructor(pTemplate, pMatch) {
        this.mTemplate = pTemplate;
        this.mSuccess = (pMatch != null);
        this.mInput = pMatch != null ? String.validate(pMatch.input) : "";
        this.mIndex = pMatch != null ? Number.validate(pMatch.index) : 0;
        this.mOutput = pMatch != null ? String.validate(pMatch[0]) : "";
        this.mGroups = pMatch != null ? Object.validate(pMatch.slice(1)) : [];
        this.mNamedGroups = pMatch != null ? Object.validate(pMatch.groups) : {};
    }
}
