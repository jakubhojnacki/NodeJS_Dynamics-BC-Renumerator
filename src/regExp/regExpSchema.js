/**
 * @module "RegExpSchema" class
 * @description Represents a series of regular expression templates and engine to use them
 * @version 0.0.1 (2021-02-22)
 */

const RegExpMatch = require("./regExpMatch");

__require("/general/javaScript");

class RegExpSchema {
    get templates() { return this.mTemplates; }

    constructor(pTemplates) {
        this.mTemplates = Array.default(pTemplates);
    }

    tryToMatch(pString) {
        let result = new RegExpMatch();
        for (const template of this.templates) {
            const regExp = new RegExp(template.pattern, template.flags);
            const match = new RegExpMatch(template, regExp.exec(pString));
            if (match.success) {
                result = match;
                break;
            }
        }
        return result;
    }

    replace(pString, pMatch, pReplacements) {
        //TODO - Not implemented
    }
}

module.exports = RegExpSchema;