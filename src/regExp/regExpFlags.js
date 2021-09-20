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
        if (pItems) {
            if (Array.isArray(pItems)) {
                for (const item of pItems)
                    this.push(RegExpFlag.parse(item));
            } else if (typeof(pItems) === "string") {
                const flags = RegExpFlags.parse(pItems);
                for (const flag of flags)
                    this.push(flag);
            }
        }
    }

    static parse(pString) {
        const flags = new RegExpFlags();
        for (let index = 0; index < pString.length; index++) {
            const flag = RegExpFlag.parse(pString.substr(index, 1));
            flags.push(flag);
        }
        return flags;
    }

    toString() {
        let string = "";
        for (const item of this)
            string += RegExpFlag.toString(item);
    }
}