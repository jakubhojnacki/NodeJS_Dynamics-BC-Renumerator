/**
 * @module "Renumberator" class (abstract)
 * @description Represents a (file) renumberator
 * @version 0.0.1 (2021-02-21)
 */

 const fs = require("fs");
__require("general/javaScript");

/*abstract*/ class Renumberator {
    get filePath() { return this.mFilePath; }
    set filePath(pValue) { this.mFilePath = pValue; }
    get newFilePath() { return this.mNewFilePath; }
    set newFilePath(pValue) { this.mNewFilePath = pValue; }
    get newFile() { return this.mNewFile; }
    set newFile(pValue) { this.mNewFile = pValue; }

    constructor() {
        this.mFilePath = "";
        this.mNewFilePath = "";
        this.mNewFile = null;
    }

    createNewFile() {
        this.newFilePath = this.filePath + '.tmp';
        if (fs.existsSync(newFilePath))
            fs.unlinkSync(newFilePath);
        this.newFile = fs.createWriteStream(this.newFilePath, { flags: "a" });
    }

    overwriteFileWithNewFile() {
        this.newFile.close();
        fs.unlinkSync(this.filePath);
        fs.renameSync(this.newFilePath, this.filePath);
        this.filePath = this.newFilePath;
        this.newFilePath = "";
        this.newFile = null;
    }
}

module.exports = Renumberator;