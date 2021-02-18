/**
 * @module "Settings" class
 * @description Represents application settings
 * @version 0.0.1 (2021-02-17)
 */

const fs = require("fs");

const WebServiceSettings = require("./webServiceSettings");

require("./javaScript");

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

    log() {
        const logger = global.application.logger;
        logger.writeText("Settings:");
        this.webService.log(2);
    }    
}

module.exports = Settings;