/**
 * @module "DynamicsIdRanges" class (static)
 * @description Represents an array of ID ranges
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";

export default class DynamicsIdRanges extends Array {
    get logger() { return global.theApplication.logger; }

    constructor() {      
        super()          
    }

    log(pIndentation) {
        const indentation = Number.validate(pIndentation);
        this.logger.writeLine("ID Ranges:", indentation);
        for (const dynamicsIdRange of this)
            this.logger.writeLine(dynamicsIdRange.toString(), indentation + 1);
    }

    inject(pData) {
        for (let data of pData) {
            const idRange = this.find((lIdRange) => { return ((lIdRange.from === data.from) && (lIdRange.to === data.to)); });
            if (idRange)
                idRange.inject(data);
        }
    } 
}
