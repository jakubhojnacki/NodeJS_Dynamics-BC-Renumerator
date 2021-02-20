/**
 * @module "Logger" class (abstract)
 * @description Logs application messages as text
 * @version 0.0.1 (2021-02-17)
 */

include("/general/javaScript");

/*abstract*/ class Logger {
    get width() { return this.mWidth; }
    get tab() { return this.mTab; }
    
    constructor(pWidth, pTab) {
        this.mWidth = Number.default(pWidth, 80);
        this.mTab = Number.default(pTab, 2);
    }

    newLine() {
        this.writeText();
    }

    writeText(pText, pIndentation) {
        const indentation = Number.default(pIndentation);
        const indentationText = indentation > 0 ? " ".repeat(indentation) : "";
        this.log(indentationText + (pText ? pText : ""));
    }

    writeSeparator(pIndentation) {
        const indentation = Number.default(pIndentation);
        this.writeText('-'.repeat(this.width - 1 - indentation), indentation);
    }

    writeError(pText, pIndentation) {
        this.writeText(`[ERROR] ${pText}`, pIndentation);
    }
}

module.exports = Logger;