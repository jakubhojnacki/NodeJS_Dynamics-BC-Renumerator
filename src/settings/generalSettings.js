/**
 * @module "GeneralSettings" class
 * @description Class holding general settings
 * @version 0.0.1 (2021-09-01)
 */

import "../general/javaScript.js";
import EndOfLineType from "../general/endOfLineType.js";

export default class GeneralSettings {
    get renumberationCode() { return this.mRenumberationCode; }
    get endOfLineType() { return this.mEndOfLineType; }

    constructor(pRangeCode, pEndOfLineType) {
        this.mRenumberationCode = String.validate(pRangeCode);
        this.mEndOfLineType = EndOfLineType.parse(pEndOfLineType);
    }

    serialise() {
        let data = { 
            "renumberationCode": this.renumberationCode, 
            "endOfLineType": this.endOfLineType 
        };
        return data;
    }
    
    static deserialise(pData) {
        let object = new GeneralSettings();
        if (pData != null)
            object = new GeneralSettings(pData.renumberationCode, pData.endOfLineType);
        return object;
    }    
}