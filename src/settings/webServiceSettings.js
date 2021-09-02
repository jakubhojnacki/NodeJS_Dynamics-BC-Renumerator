/**
 * @module "WebServiceSettings" class
 * @description Represents settings regarding web service
 * @version 0.0.1 (2021-02-17)
 */

import "../general/javaScript.js";
import WebServiceType from "../webServices/webServiceType.js";

export default class WebServiceSettings {
    get url() { return this.mUrl; }
    get user() { return this.mUser; }
    get password() { return this.mPassword; }
    get type() { return this.mType; }

    constructor(pUrl, pUser, pPassword, pType) {
        this.mUrl = String.validate(pUrl);
        this.mUser = String.validate(pUser);
        this.mPassword = String.validate(pPassword);
        this.mType = WebServiceType.parse(pType);
    }

    serialise() {
        let data = { 
            "url": this.url, 
            "user": this.user, 
            "password": this.password,
            "type": this.type
        };
        return data;
    }

    static deserialise(pData) {
        let webServiceSettings = new WebServiceSettings();
        if (pData != null)
            webServiceSettings = new WebServiceSettings(pData.url, pData.user, pData.password, pData.type);
        return webServiceSettings;
    }    
}
