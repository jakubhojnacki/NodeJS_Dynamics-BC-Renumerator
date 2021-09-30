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
        this.mWidth = Number.validateAsInteger(pWidth, 79);
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
        this.writeLine("-".repeat(this.width - 1 - indentation), indentation);
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

    moveUp(pSteps) {
        const steps = Number.validateAsInteger(pSteps, 1);
        this.write(this.escape(`${steps}A`));
    }

    moveDown(pSteps) {
        const steps = Number.validateAsInteger(pSteps, 1);
        this.write(this.escape(`${steps}B`));
    }

    moveRight(pSteps) {
        const steps = Number.validateAsInteger(pSteps, 1);
        this.write(this.escape(`${steps}C`));
    }

    moveLeft(pSteps) {
        const steps = Number.validateAsInteger(pSteps, 1);
        this.write(this.escape(`${steps}D`));
    }

    moveUpLines(pSteps) {
        const steps = Number.validateAsInteger(pSteps, 1);
        this.write(this.escape(`${steps}F`));
    }

    moveDownLines(pSteps) {
        const steps = Number.validateAsInteger(pSteps, 1);
        this.write(this.escape(`${steps}E`));
    }

    moveTo(pRow, pColumn) {
        const row = Number.validateAsInteger(pRow);
        const column = Number.validateAsInteger(pColumn);
        if ((row > 0) && (column > 0))
            this.write(this.escape(`${row};${column}H`));
    }

    clearScreen() {
        this.write(this.escape("2J"));
    }

    clearLine() {
        this.write(this.escape("2K"));
    }

    savePosition() {
        this.write(this.escape("s"))
    }

    restorePosition() {
        this.write(this.escape("u"));
    }
        
    escape(pCommand) {
        return "\u001b[" + pCommand;
    }   
}
