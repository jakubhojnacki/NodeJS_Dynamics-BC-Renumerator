/**
 * @module "Renumberator" class (abstract)
 * @description Represents a (file) renumberator
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import FileSystem from "fs";

export default class Renumberator {
    get engine() { return this.mEngine; }
    get filePath() { return this.mFilePath; }
    set filePath(pValue) { this.mFilePath = pValue; }
    get newFilePath() { return this.mNewFilePath; }
    set newFilePath(pValue) { this.mNewFilePath = pValue; }
    get newFile() { return this.mNewFile; }
    set newFile(pValue) { this.mNewFile = pValue; }

    constructor(pEngine) {
        this.mEngine = pEngine;
        this.mFilePath = "";
        this.mNewFilePath = "";
        this.mNewFile = null;
    }

    createNewFile() {
        this.newFilePath = `${this.filePath}.tmp`;
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
