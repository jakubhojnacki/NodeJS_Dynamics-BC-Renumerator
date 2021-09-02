/**
 * @module "RegExpSchema" class
 * @description Represents a series of regular expression templates and engine to use them
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import RegExpFlag from "./regExpFlag.js";
import RegExpMatch from "./regExpMatch.js";

export default class RegExpSchema {
    get templates() { return this.mTemplates; }

    constructor(pTemplates) {
        this.mTemplates = Array.validate(pTemplates);
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

    replace(pString, pReplacements) {
        let newString = pString;
        let regExp = new RegExp("\\${\\w+}", RegExpFlag.ignoreCase);
        let match = regExp.exec(newString);
        while(match != null) {
            const placeholder = match[0].removeIfStartsWith("${").removeIfEndsWith("}");
            const value = String.validate(pReplacements[placeholder]);
            const newStringStart = match.index > 0 ? newString.substr(0, match.index) : "";
            const newStringEnd = match.index + match[0].length < newString.length ? newString.substr(match.index + match[0].length) : "";
            newString = newStringStart + value + newStringEnd;
            match = regExp.exec(newString);
        }
        return newString;
    }
}
