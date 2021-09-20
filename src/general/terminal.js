/**
 * @module "Terminal" class
 * @description Performs terminal-related tasks
 * @version 0.0.4 (2021-09-20)
 */

import "./javaScript.js";
import StringBuilder from "./stringBuilder.js";

export default class Terminal {
    get width() { return this.mWidth; }
    get tab() { return this.mTab; }
    
    constructor(pWidth, pTab) {
        this.mWidth = Number.validateAsInteger(pWidth, 120);
        this.mTab = Number.validateAsInteger(pTab, 2);
    }

    indentText(pText, pIndentation) {
        const indentation = Number.validate(pIndentation);
        const indentationText = indentation > 0 ? " ".repeat(indentation * this.tab) : "";
        return indentationText + String.validate(pText);
    }

    newLine() {
        console.log();
    }

    write(pText, pIndentation) {
        process.stdout.write(this.indentText(pText, pIndentation));
    }

    writeLine(pText, pIndentation) {
        console.log(this.indentText(pText, pIndentation));
    }

    writeSeparator(pIndentation) {
        const indentation = Number.validate(pIndentation);
        this.writeLine('-'.repeat(this.width - 1 - indentation), indentation);
    }

    writeError(pText, pIndentation) {
        const text = pText.trim().toLowerCase().startsWith("error") ? pText : `ERROR: ${pText}`;
        this.writeLine(text, pIndentation);
    }

    writeObject(pObject, pIndentation, pWriteFunctions) {
        const writeFunctions = Boolean.validate(pWriteFunctions);
        if (pObject != null) {
            for (const property in pObject)
                switch (typeof(pObject[property])) {
                    case "object":
                        this.writeObject(pObject[property], pIndentation + 1);
                        break;
                    case "function":
                        if (writeFunctions)
                            this.writeLine(StringBuilder.nameValue(property, "function()"), pIndentation + 1);
                        break;
                    default:
                        this.writeLine(StringBuilder.nameValue(property, pObject[property]), pIndentation + 1);
                        break;
                }
        } else
            this.writeLine("null", pIndentation);
    }
}
