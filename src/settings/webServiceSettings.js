/**
 * @module "WebServiceSettings" class
 * @description Represents settings regarding web service
 * @version 0.0.1 (2021-02-17)
 */

__require("general/javaScript");
const StringBuilder = __require("general/stringBuilder");
const WebServiceType = __require("webServices/webServiceType");

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
            const url = String.default(pData.url);
            const user = String.default(pData.user);
            const password = String.default(pData.password);
            const type = WebServiceType.parse(pData.type);
            webServiceSettings = new WebServiceSettings(url, user, password, type);
        }
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