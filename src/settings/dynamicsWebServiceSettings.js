/**
 * @module "DynamicsWebServiceSettings" class
 * @description Represents settings regarding Dynamics web service
 * @version 0.0.1 (2021-02-17)
 */

import "../general/javaScript.js";
import Protocol from "../network/protocol.js";
import Url from "../network/url.js";

export default class DynamicsWebServiceSettings {
    get protocol() { return this.mProtocol; }
    get server() { return this.mServer; }
    get port() { return this.mPort; }
    get instance() { return this.mInstance; }
    get user() { return this.mUser; }
    get password() { return this.mPassword; }
    get apiPublisher() { return this.mApiPublisher; }
    get apiGroup() { return this.mApiGroup; }
    get apiVersion() { return this.mApiVersion; }
    get companyName() { return this.mCompanyName; }
    get companyId() { return this.mCompanyId; }

    constructor(pProtocol, pServer, pPort, pInstance, pUser, pPassword, pApiPublisher, pApiGroup, pApiVersion, pCompanyName, pCompanyId) {
        this.mProtocol = Protocol.parse(pProtocol);
        this.mServer = String.validate(pServer);
        this.mPort = Number.validateAsInteger(pPort);
        this.mInstance = String.default(pInstance);
        this.mUser = String.validate(pUser);
        this.mPassword = String.validate(pPassword);
        this.mApiPublisher = String.default(pApiPublisher);
        this.mApiGroup = String.default(pApiGroup);
        this.mApiVersion = String.default(pApiVersion);
        this.mCompanyName = String.default(pCompanyName);
        this.mCompanyId = String.default(pCompanyId);
    }

    serialise() {
        let data = { 
            "protocol": this.protocol,
            "server": this.server, 
            "port": this.port,
            "instance": this.instance,
            "user": this.user, 
            "password": this.password,
            "apiPublisher": this.apiPublisher,
            "apiGroup": this.apiGroup,
            "apiVersion": this.apiVersion,
            "companyName": this.companyName,
            "companyId": this.companyId
        };
        return data;
    }

    static deserialise(pData) {
        let webServiceSettings = new DynamicsWebServiceSettings();
        if (pData != null)
            webServiceSettings = new DynamicsWebServiceSettings(pData.protocol, pData.server, pData.port, pData.instance, pData.user, pData.password,
                pData.apiPublisher, pData.apiGroup, pdata.apiVersion, pData.companyName, pData.companyId);
        return webServiceSettings;
    }    

    createUrl() {
        const path = [ this.instance, "api", this.apiPublisher, this.apiGroup, `v${this.apiVersion}`, "companies", this.companyId ];
        return new Url(this.protocol, this.host, this.port, path);
    }
}
