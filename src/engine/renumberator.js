/**
 * @module "Renumberator" class (abstract)
 * @description Represents a (file) renumberator
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import FileBuffer from "../general/FileBuffer.js";
import FileSystem from "fs";

export default class Renumberator {
    get engine() { return this.mEngine; }
    get filePath() { return this.mFilePath; }
    set filePath(pValue) { this.mFilePath = pValue; }
    get fileBuffer() { return this.mFileBuffer; }
    set fileBuffer(pValue) { this.mFileBuffer = pValue; }

    constructor(pEngine) {
        this.mEngine = pEngine;
        this.mFilePath = "";
        this.mFileBuffer = null;
    }

    initialise(pFilePath, pUseFileBuffer) {
        this.filePath = pFilePath;
        if (Boolean.validate(pUseFileBuffer, false))
            this.fileBuffer = new FileBuffer();
    }

    finalise() {
        if (this.fileBuffer) {
            FileSystem.writeFileSync(this.filePath, this.fileBuffer.toString());
            this.fileBuffer = null;
        }
        this.filePath = "";
    }
}
