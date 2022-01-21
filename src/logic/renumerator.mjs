/**
 * @module "Renumerator" class (abstract)
 * @description Represents a (file) renumerator
 */

"use strict";

import FileSystem from "fs";

import { TextFileBuffer } from "fortah-file-system-library";

export class Renumerator {
    get logic() { return this.mLogic; }
    set logic(pValue) { this.mLogic = pValue; }
    get filePath() { return this.mFilePath; }
    set filePath(pValue) { this.mFilePath = String.verify(pValue); }
    get fileBuffer() { return this.mFileBuffer; }
    set fileBuffer(pValue) { this.mFileBuffer = pValue; }

    constructor(pLogic) {
        this.logic = pLogic;
        this.filePath = "";
        this.fileBuffer = null;
    }

    initialise(pFilePath, pUseFileBuffer) {
        this.filePath = pFilePath;
        if (Boolean.verify(pUseFileBuffer, false))
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
