/**
 * @module "GeneralSettings" class
 * @description Class holding general settings
 */

import { EndOfLineType } from "file-system-library";
import { Validator } from "core-library";

export class GeneralSettings {
    get renumberationCode() { return this.mRenumberationCode; }
    set renumberationCode(pValue) { this.mRenumberationCode = String.validate(pValue); }
    get endOfLineType() { return this.mEndOfLineType; }
    set endOfLineType(pValue) { this.mEndOfLineType = EndOfLineType.parse(pValue); }

    constructor(pRenumberationCode, pEndOfLineType) {
        this.renumberationCode = pRenumberationCode;
        this.endOfLineType = pEndOfLineType;
    }

    validate(pValidator) {
        pValidator.setComponent(GeneralSettings);
        pValidator.testNotEmpty("renumberationCode", this.renumberationCode);
        pValidator.restoreComponent();
    }

    toData() {
        let data = {};
        data.renumberationCode = this.renumberationCode; 
        data.endOfLineType = this.endOfLineType; 
        return data;
    }
    
    fromData(pData) {
        if (pData != null) {
            this.renumberationCode = pData.renumberationCode;
            this.endOfLineType = pData.endOfLineType;
        }
        return this;        
    }    
}