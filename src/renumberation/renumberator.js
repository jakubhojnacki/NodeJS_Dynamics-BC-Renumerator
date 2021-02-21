/**
 * @module "Renumberator" class (abstract)
 * @description Represents a (file) renumberator
 * @version 0.0.1 (2021-02-21)
 */

 const fs = require("fs");
__require("general/javaScript");

/*abstract*/ class Renumberator {
    get newFilePath() { return this.mNewFilePath; }
    set newFilePath(pValue) { this.mNewFilePath = pValue; }
    get newFile() { return this.mNewFile; }
    set newFile(pValue) { this.mNewFile = pValue; }

    constructor() {
        this.mNewFilePath = "";
        this.mNewFile = null;
    }

    createNewFile(pFilePath) {
        this.newFilePath = pFilePath + '.tmp';
        if (fs.existsSync(newFilePath))
            fs.unlinkSync(newFilePath);
        this.newFile = fs.createWriteStream(this.newFilePath, { flags: "a" });
    }

    overwriteFileWithNewFile(pFilePath) {
        this.newFile.close();
        fs.unlinkSync(pFilePath);
        fs.renameSync(this.newFilePath, pFilePath);
        this.newFilePath = "";
        this.newFile = null;
    }
}

module.exports = Renumberator;