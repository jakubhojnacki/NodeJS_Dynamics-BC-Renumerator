/**
 * @module "GeneralSettings" class
 * @description Class holding general settings
 * @version 0.0.1 (2021-09-01)
 */

import "../general/javaScript.js";
import BackupMode from "../engine/backupMode.js";
import EndOfLineType from "../general/endOfLineType.js";

export default class GeneralSettings {
    get rangeCode() { return this.mRangeCode; }
    get backupMode() { return this.mBackupMode; }
    get endOfLineType() { return this.mEndOfLineType; }

    constructor(pRangeCode, pBackupMode, pEndOfLineType) {
        this.mRangeCode = String.validate(pRangeCode);
        this.mBackupMode = BackupMode.parse(pBackupMode);
        this.mEndOfLineType = EndOfLineType.parse(pEndOfLineType);
    }

    serialise() {
        let data = { 
            "rangeCode": this.rangeCode, 
            "backupMode": this.backupMode, 
            "endOfLineType": this.endOfLineType 
        };
        return data;
    }
    
    static deserialise(pData) {
        let object = new GeneralSettings();
        if (pData != null)
            object = new GeneralSettings(pData.rangeCode, pData.backupMode, pData.endOfLineType);
        return object;
    }    
}