/**
 * @module "DynamicsAppIdRanges" class (static)
 * @description Represents an array of ID ranges
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import DynamicsAppIdRange from "./dynamicsAppIdRange.js";

export default class DynamicsAppIdRanges extends Array {
    constructor() {      
        super()          
    }

    log(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("ID Ranges:", indentation);
        for (const dynamicsAppIdRange of this)
            pLogger.writeLine(dynamicsAppIdRange.toString(), indentation + 1);
    }
    
    static deserialise(pData) {
        let dynamicsAppIdRanges = new DynamicsAppIdRanges();
        if (pData != null)
            for (const data of pData)
                dynamicsAppIdRanges.push(DynamicsAppIdRange.deserialise(data));
        return dynamicsAppIdRanges;
    }

    inject(pData) {
        for (let data of pData) {
            const idRange = this.find((lIdRange) => { return ((lIdRange.from === data.from) && (lIdRange.to === data.to)); });
            if (idRange)
                idRange.inject(data);
        }
    } 
}
