/**
 * @module "WebServiceSettings" class
 * @description Represents settings regarding web service
 * @version 0.0.1 (2021-02-17)
 */

require("../general/javaScript");

const StringBuilder = require("../general/stringBuilder");
const WebServiceType = require("../webServices/webServiceType");

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
        if (pData != null)
            webServiceSettings = new WebServiceSettings(pData.url, pData.user, pData.password, pData.type);
        return webServiceSettings;
    }    

    log(pIndentation) {
        const logger = global.application.logger;
        let indentation = Number.default(pIndentation);
        logger.writeText("WebService:", indentation);
        indentation += logger.tab;
        logger.writeText(StringBuilder.nameValue("URL", this.url), indentation);
        logger.writeText(StringBuilder.nameValue("User", this.user), indentation);
        logger.writeText(StringBuilder.nameValue("Password", this.password ? "*****" : ""), indentation);
        logger.writeText(StringBuilder.nameValue("Type", this.type), indentation);
    }      
}

module.exports = WebServiceSettings;