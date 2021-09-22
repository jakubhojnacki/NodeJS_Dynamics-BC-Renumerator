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
    get temporaryFilePath() { return this.mTemporaryFilePath; }
    set temporaryFilePath(pValue) { this.mTemporaryFilePath = pValue; }
    get temporaryFile() { return this.mTemporaryFile; }
    set temporaryFile(pValue) { this.mTemporaryFile = pValue; }

    constructor(pEngine) {
        this.mEngine = pEngine;
        this.mFilePath = "";
        this.mTemporaryFilePath = "";
        this.mTemporaryFile = null;
    }

    initialise(pFilePath, pCreateTemporaryFile) {
        this.filePath = pFilePath;
        this.temporaryFilePath = `${this.filePath}.tmp`;
        if (FileSystem.existsSync(this.temporaryFilePath))
            FileSystem.unlinkSync(this.temporaryFilePath);
        if (Boolean.validate(pCreateTemporaryFile))
            this.temporaryFile = FileSystem.createWriteStream(this.temporaryFilePath, { flags: "a" });
    }

    finalise() {
        if (this.temporaryFile)
            this.temporaryFile.close();
        FileSystem.unlinkSync(this.filePath);
        FileSystem.renameSync(this.newFilePath, this.filePath);
        this.filePath = this.newFilePath;
        this.temporaryFilePath = "";
        this.temporaryFile = null;
    }
}
