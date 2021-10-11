/**
 * @module "DynamicsRanges" class (static)
 * @description Represents an array of Dynamics ranges (number / ID ranges)
 */

import { Validator } from "core-library";

export class DynamicsRanges extends Array {
    get terminal() { return global.theApplication.terminal; }

    constructor(pItems) {      
        super();
        if (pItems)
            if (Array.isArray(pItems)) {
                for (const item of pItems)
                    this.push(item);
            } else
                this.push(pItems);
    }

    log(pFull, pMessages, pIndentation) {
        const indentation = Number.validate(pIndentation);
        pMessages.addInformation("ID Ranges:", indentation);
        for (const dynamicsRange of this)
            pMessages.addInformation(dynamicsRange.toString(), indentation + 1);
    }

    validate(pValidator, pTestRenumbered) {
        for (const range of this)
            range.validate(pValidator, pTestRenumbered);
    }     

    toData() {
        let data = [];
        for (const dynamicsRange of this)
            data.push(dynamicsRange.toData());
        return data;
    }    
}
