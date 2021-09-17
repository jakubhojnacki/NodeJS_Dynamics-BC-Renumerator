/**
 * @module "GeneralSettings" class
 * @description Class holding general settings
 * @version 0.0.1 (2021-09-01)
 */

import "../general/javaScript.js";
import BackupMode from "../engine/backupMode.js";
import EndOfLineType from "../general/endOfLineType.js";

export default class GeneralSettings {
    get renumberationCode() { return this.mRenumberationCode; }
    get backupMode() { return this.mBackupMode; }
    get endOfLineType() { return this.mEndOfLineType; }

    constructor(pRangeCode, pBackupMode, pEndOfLineType) {
        this.mRenumberationCode = String.validate(pRangeCode);
        this.mBackupMode = BackupMode.parse(pBackupMode);
        this.mEndOfLineType = EndOfLineType.parse(pEndOfLineType);
    }

    serialise() {
        let data = { 
            "renumberationCode": this.renumberationCode, 
            "backupMode": this.backupMode, 
            "endOfLineType": this.endOfLineType 
        };
        return data;
    }
    
    static deserialise(pData) {
        let object = new GeneralSettings();
        if (pData != null)
            object = new GeneralSettings(pData.renumberationCode, pData.backupMode, pData.endOfLineType);
        return object;
    }    
}