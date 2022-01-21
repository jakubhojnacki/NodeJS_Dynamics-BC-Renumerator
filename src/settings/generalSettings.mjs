/**
 * @module "GeneralSettings" class
 * @description Class holding general settings
 */

"use strict";

import { EndOfLineType } from "fortah-file-system-library";

export class GeneralSettings {
    get renumerationCode() { return this.mRenumerationCode; }
    set renumerationCode(pValue) { this.mRenumerationCode = String.verify(pValue); }
    get endOfLineType() { return this.mEndOfLineType; }
    set endOfLineType(pValue) { this.mEndOfLineType = EndOfLineType.parse(pValue); }

    constructor(pRenumerationCode, pEndOfLineType) {
        this.renumerationCode = pRenumerationCode;
        this.endOfLineType = pEndOfLineType;
    }

    validate(pValidator) {
        pValidator.setComponent(GeneralSettings);
        pValidator.testNotEmpty("renumerationCode", this.renumerationCode);
        pValidator.restoreComponent();
    }

    toData() {
        let data = {};
        data.renumerationCode = this.renumerationCode; 
        data.endOfLineType = this.endOfLineType; 
        return data;
    }
    
    fromData(pData) {
        if (pData != null) {
            this.renumerationCode = pData.renumerationCode;
            this.endOfLineType = pData.endOfLineType;
        }
        return this;        
    }    
}