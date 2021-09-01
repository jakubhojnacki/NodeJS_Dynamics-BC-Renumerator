/**
 * @module "GeneralSettings" class
 * @description Class holding general settings
 * @version 0.0.1 (2021-09-01)
 */

import "../general/javaScript";
import EndOfLineType from "../general/endOfLineType";

export default class GeneralSettings {
    get range() { return this.mRange; }
    get backupMode() { return this.mBackupMode; }
    get endOfLineType() { return this.mEndOfLineType; }

    constructor(pRange, pBackupMode, pEndOfLineType) {
        this.mRange = String.default(pRange);
        this.mBackupMode = Boolean.default(pBackupMode);
        this.mEndOfLineType = EndOfLineType.parse(pEndOfLineType);
    }

    serialise() {
        let data = { 
            "range": this.range, 
            "backupMode": this.backupMode, 
            "endOfLineType": this.endOfLineType 
        };
        return data;
    }
    
    static deserialise(pData) {
        let object = new GeneralSettings();
        if (pData != null)
            object = new GeneralSettings(pData.range, pData.backupMode, pData.endOfLineType);
        return object;
    }    
}