/**
 * @module "Renumberator" class (abstract)
 * @description Represents a (file) renumberator
 * @version 0.0.1 (2021-02-21)
 */

 import "../general/javaScript.js";
 import FileSystem from "fs";

export default class Renumberator {
    get renumberation() { return this.mRenumberation; }
    get filePath() { return this.mFilePath; }
    set filePath(pValue) { this.mFilePath = pValue; }
    get newFilePath() { return this.mNewFilePath; }
    set newFilePath(pValue) { this.mNewFilePath = pValue; }
    get newFile() { return this.mNewFile; }
    set newFile(pValue) { this.mNewFile = pValue; }

    constructor(pRenumberation) {
        this.mRenumberation = pRenumberation;
        this.mFilePath = "";
        this.mNewFilePath = "";
        this.mNewFile = null;
    }

    createNewFile() {
        this.newFilePath = this.filePath + this.renumberation.tempExtension;
        if (FileSystem.existsSync(this.newFilePath))
            FileSystem.unlinkSync(this.newFilePath);
        this.newFile = FileSystem.createWriteStream(this.newFilePath, { flags: "a" });
    }

    overwriteFileWithNewFile() {
        this.newFile.close();
        FileSystem.unlinkSync(this.filePath);
        FileSystem.renameSync(this.newFilePath, this.filePath);
        this.filePath = this.newFilePath;
        this.newFilePath = "";
        this.newFile = null;
    }
}
