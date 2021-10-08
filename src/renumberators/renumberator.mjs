/**
 * @module "Renumberator" class (abstract)
 * @description Represents a (file) renumberator
 */

import FileSystem from "fs";

import { TextFileBuffer } from "file-system-library";

export class Renumberator {
    get logic() { return this.mLogic; }
    set logic(pValue) { this.mLogic = pValue; }
    get filePath() { return this.mFilePath; }
    set filePath(pValue) { this.mFilePath = String.validate(pValue); }
    get fileBuffer() { return this.mFileBuffer; }
    set fileBuffer(pValue) { this.mFileBuffer = pValue; }

    constructor(pLogic) {
        this.logic = pLogic;
        this.filePath = "";
        this.fileBuffer = null;
    }

    initialise(pFilePath, pUseFileBuffer) {
        this.filePath = pFilePath;
        if (Boolean.validate(pUseFileBuffer, false))
            this.fileBuffer = new TextFileBuffer();
    }

    finalise() {
        if (this.fileBuffer) {
            FileSystem.writeFileSync(this.filePath, this.fileBuffer.toString());
            this.fileBuffer = null;
        }
        this.filePath = "";
    }
}
