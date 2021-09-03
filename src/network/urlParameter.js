/**
 * @module "UrlParameter" class
 * @description Represents one URL parameter
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";

export default class UrlParameter {
    get name() { return this.mName; }
    get value() { return this.mValue; }

    constructor(pName, pValue) {
        this.mName = String.validate(pName);
        this.mValue = String.validate(pValue);
    }
}
