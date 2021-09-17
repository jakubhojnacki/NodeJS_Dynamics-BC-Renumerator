/**
 * @module "RegExpFlags" class
 * @description Represents an array of regular expression flags 
 * @version 0.0.1 (2021-09-17)
 */

import "../general/javaScript.js";
import RegExpFlag from "./regExpFlag.js";

export default class RegExpFlags extends Array {
    constructor(pItems) {
        super();
        if ((pItems) && (Array.isArray(pItems)))
            for (const item of pitems)
                this.push(item);
    }

    toString() {
        let string = "";
        for (const item of this)
            string += RegExpFlag.toString(item);
    }
}