/**
 * @module "DynamicsIdRanges" class (static)
 * @description Represents an array of ID ranges
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import DynamicsIdRange from "./dynamicsIdRange.js";

export default class DynamicsIdRanges extends Array {
    constructor() {      
        super()          
    }

    log(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("ID Ranges:", indentation);
        for (const dynamicsIdRange of this)
            pLogger.writeLine(dynamicsIdRange.toString(), indentation + 1);
    }

    inject(pData) {
        for (let data of pData) {
            const idRange = this.find((lIdRange) => { return ((lIdRange.from === data.from) && (lIdRange.to === data.to)); });
            if (idRange)
                idRange.inject(data);
        }
    } 
}
