/**
 * @module "WebServiceSettings" class
 * @description Represents settings regarding web service
 * @version 0.0.1 (2021-02-17)
 */

const WebServiceType = include("/webServices/webServiceType");
include("/general/javaScript");

class WebServiceSettings {
    get url() { return this.mUrl; }
    get user() { return this.mUser; }
    get password() { return this.mPassword; }
    get type() { return this.mType; }

    constructor(pUrl, pUser, pPassword, pType) {
        this.mUrl = String.default(pUrl);
        this.mUser = String.default(pUser);
        this.mPassword = String.default(pPassword);
        this.mType = WebServiceType.parse(pType);
    }

    static deserialise(pData) {
        let webServiceSettings = new WebServiceSettings();
        if (pData != null) {
            webServiceSettings.mUrl = String.default(pData.url);
            webServiceSettings.mUser = String.default(pData.user);
            webServiceSettings.mPassword = String.default(pData.password);
            webServiceSettings.mType = WebServiceType.parse(pData.type);
        }
        return webServiceSettings;
    }    

    log(pIndentation) {
        const logger = global.application.logger;
        logger.writeText("WebService:", pIndentation);
        const indentation = pIndentation + 2;
        logger.writeText(`URL = ${this.url}`, indentation);
        logger.writeText(`User = ${this.user}`, indentation);
        logger.writeText(`Password = ${this.password ? "*****" : ""}`, indentation);
        logger.writeText(`Type = ${this.type}`, indentation);
    }      
}

module.exports = WebServiceSettings;