/**
 * @module "Settings" class
 * @description Class representing settings
 */

import { DynamicsWebServiceSettings } from "../settings/dynamicsWebServiceSettings.mjs";
import { IgnoreSettings } from "../settings/ignoreSettings.mjs";
import { GeneralSettings } from "../settings/generalSettings.mjs";
import { SettingsBase } from "core-library";

export class Settings extends SettingsBase {
    get general() { return this.mGeneral; }
    set general(pValue) { this.mGeneral = Object.validate(pValue, new GeneralSettings()); }
    get ignore() { return this.mIgnore; }
    set ignore(pValue) { this.mIgnore = Object.validate(pValue, new IgnoreSettings()); }
    get dynamicsWebService() { return this.mDynamicsWebService; }
    set dynamicsWebService(pValue) { this.mDynamicsWebService = Object.validate(pValue, new DynamicsWebServiceSettings()); }

    constructor(pGeneral, pIgnore, pDynamicsWebService) {
        super();
        this.general = pGeneral;
        this.ignore = pIgnore;
        this.dynamicsWebService = pDynamicsWebService;
    }

    validate(pValidationMessages, pIndentation) {
        this.general.validate(pValidationMessages, pIndentation);
        this.ignore.validate(pValidationMessages, pIndentation);
        this.dynamicsWebService.validate(pValidationMessages, pIndentation);
    }

    toData() {
        let data = super.toData();
        data.general = this.general.toData();
        data.ignore = this.ignore.toData();
        dynamicsWebService = this.dynamicsWebService.toData();
        return data;
    }

    fromData(pData) {
        super.fromData(pData);
        if (pData != null) {
            this.general = ( new GeneralSettings()).fromData(pData.general);
            this.ignore = ( new IgnoreSettings()).fromData(pData.ignore);
            this.dynamicsWebService = ( new DynamicsWebServiceSettings()).fromData(pData.dynamicsWebService);
        }
    }
}