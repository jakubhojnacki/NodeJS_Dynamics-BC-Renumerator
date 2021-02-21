/**
 * @module "Settings" class
 * @description Represents application settings
 * @version 0.0.1 (2021-02-17)
 */

const fs = require("fs");
__require("general/javaScript");
const WebServiceSettings = __require("settings/webServiceSettings");

class Settings {
    get webService() { return this.mWebService; }

    constructor(pWebService) {
        this.mWebService = Object.default(pWebService, new WebServiceSettings());
    }

    static read(pFilePath) {
        const rawData = fs.readFileSync(pFilePath);
        const data = JSON.parse(rawData);
        return Settings.deserialise(data);
    }

    static deserialise(pData) {
        let settings = new Settings();
        if (pData != null)
            settings.mWebService = WebServiceSettings.deserialise(pData.webService);
        return settings;
    }

    log(pIndentation) {
        const logger = global.application.logger;
        let indentation = Number.default(pIndentation);
        logger.writeText("Settings:", indentation);
        indentation += logger.tab;
        this.webService.log(indentation);
    }    
}

module.exports = Settings;