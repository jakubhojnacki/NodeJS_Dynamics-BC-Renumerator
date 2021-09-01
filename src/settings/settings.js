/**
 * @module "Settings" class
 * @description Class representing settings
 * @version 0.0.1 (2021-07-27)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import GeneralSettings from "./generalSettings.js";
import Path from "path";
import WebServiceSettings from "./webServiceSettings.js";

export default class Settings {
    get general() { return this.mGeneral; }
    get webService() { return this.mWebService; }

    constructor(pGeneral, pWebService) {
        this.mGeneral = Object.validate(pGeneral, new GeneralSettings());
        this.mWebService = Object.validate(pWebService, new WebServiceSettings());
    }

    serialise() {
        let data = {
            "general": this.general.serialise(),
            "webService": this.webService.serialise()
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
            const webService = WebServiceSettings.deserialise(pData.webService);
            object = new Settings(general, webService);
        }
        return object;
    }
}