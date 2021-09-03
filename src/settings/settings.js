/**
 * @module "Settings" class
 * @description Class representing settings
 * @version 0.0.1 (2021-07-27)
 */

import "../general/javaScript.js";
import DynamicsWebServiceSettings from "./dynamicsWebServiceSettings.js";
import FileSystem from "fs";
import GeneralSettings from "./generalSettings.js";
import Path from "path";

export default class Settings {
    get general() { return this.mGeneral; }
    get dynamicsWebService() { return this.mDynamicsWebService; }

    constructor(pGeneral, pDynamicsWebService) {
        this.mGeneral = Object.validate(pGeneral, new GeneralSettings());
        this.mDynamicsWebService = Object.validate(pDynamicsWebService, new DynamicsWebServiceSettings());
    }

    serialise() {
        let data = {
            "general": this.general.serialise(),
            "dynamicsWebService": this.dynamicsWebService.serialise()
        };
        return data;
    }

    static read(pFilePath) {
        let settings = new Settings();
        const settingsFilePath = pFilePath ? pFilePath : Path.join(global.theRoot, "settings.json");        
        if (FileSystem.existsSync(settingsFilePath)) {
            const rawData = FileSystem.readFileSync(settingsFilePath);
            const data = JSON.parse(rawData);
            settings = Settings.deserialise(data);
        }
        return settings;
    }

    static deserialise(pData) {
        let object = new Settings();
        if (pData != null) {
            const general = GeneralSettings.deserialise(pData.general);
            const dynamicsWebService = DynamicsWebServiceSettings.deserialise(pData.dynamicsWebService);
            object = new Settings(general, dynamicsWebService);
        }
        return object;
    }
}