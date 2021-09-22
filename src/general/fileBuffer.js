/**
 * @module "FileBuffer" class
 * @description Represents buffer of a file
 * @version 0.0.1 (2021-09-22)
 */

import "./javaScript.js";

export default class FileBuffer {
    get content() { return this.mContent; }
    set content(pValue) { this.mContent = pValue; }

    constructor() {
        this.mContent = "";
    }

    write(pChunk) {
        this.content = this.content + pChunk;
    }

    toString() {
        return this.content;
    }
}