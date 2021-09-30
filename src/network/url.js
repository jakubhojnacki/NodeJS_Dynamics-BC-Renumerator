/**
 * @module "Url" class
 * @description Allows manipulating URLs
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Protocol from "./protocol.js";
import UrlToolkit from "./urlToolkit.js";

export default class Url {
    get protocol() { return this.mProtocol; }
    set protocol(pValue) { this.mProtocol = Protocol.parse(pValue); }
    get host() { return this.mHost; }
    set host(pValue) { this.mHost = pValue; }
    get port() { return this.mPort; }
    set port(pValue) { this.mPort = pValue; }
    get path() { return this.mPath; }
    set path(pValue) { this.mPath = pValue; }
    get parameters() { return this.mParameters; }
    set parameters(pValue) { this.mParameters = pValue; }
	get user() { return this.mUser; }
	set user(pValue) { this.mUser = pValue; }
	get password() { return this.mPassword; }
	set password(pValue) { this.mPassword = pValue; }

    constructor(pProtocol, pHost, pPort, pPath, pParameters, pUser, pPassword) {
        this.mProtocol = Protocol.parse(pProtocol);
        this.mHost = String.validate(pHost);
        this.mPort = Number.validate(pPort);
        this.mPath = Array.isArray(pPath) ? pPath : [ String.validate(pPath) ];
        this.mParameters = Array.validate(pParameters);
		this.mUser = String.validate(pUser);
		this.mPassword = String.validate(pPassword);
    }

    toString() {
        const hostPart = this.toHost();
        const pathPart = this.toPath();
        const url = UrlToolkit.join(hostPart, pathPart);
        return url;
    }

    toHost() {
        return UrlToolkit.toHost(this.protocol, this.user, this.password, this.host, this.port);
    }

    toPath() {
        return UrlToolkit.toPath(this.path, this.parameters);
    }

	static parse(pString) {
        let url = new Url();
		if (pString) {
            pString = this.extractProtocol(pString, url);
            pString = this.extractCredentials(pString, url);
            pString = this.extractHostPort(pString, url);
            pString = this.extractPath(pString, url);
            pString = this.extractParameters(pString, url);
		}
		return url;
	}    

    extractProtocol(pString, pUrl) {
        pUrl.protocol = "";
        const index = pString.indexOf(Url.protocolSeparator);
        if (index > 0) {
            pUrl.protocol = pString.substr(0, index);
            pString = pString.substr(index + Url.protocolSeparator.length);
        }
        return pString;
    }

    extractCredentials(pString, pUrl) {
        pUrl.user = "";
        pUrl.password = "";
        let index = pString.indexOf(Url.credentialsSeparator);
        if (index > 0) {
            const credentialsString = pString.substr(0, index);
            pString = pString.substr(index + Url.credentialsSeparator.length);
            index = credentialsString.indexOf(Url.passwordSeparator);
            if (index > 0) {
                pUrl.user = credentialsString.substr(0, index);
                pUrl.password = credentialsString.substr(index + Url.passwordSeparator.length);
            } else
                pUrl.user = credentialsString;
        }
        return pString;
    }

    extractHostPort(pString, pUrl) {
        pUrl.host = "";
        pUrl.port = 0;
        let hostPortString = "";
        let index = pString.indexOf(Url.pathSeparator);
        if (index > 0) {
            hostPortString = pString.substr(0, index);
            pString = pString.substr(index + Url.pathSeparator);
        } else {
            hostPortString = pString;
            pString = "";
        }
        if (hostPortString) {
            index = hostPortString.indexOf(Url.passwordSeparator);
            if (index > 0) {
                pUrl.host = hostPortString.substr(0, index);
                pUrl.port = Number.parseInt(hostPortString.substr(index + Url.passwordSeparator.length));
            } else
                pUrl.host = hostPortString;
        }
        return pString;
    }

    extractPath(pString, pUrl) {
        pUrl.path = [];
        let pathString = "";
        const index = pString.indexOf(Url.parametersSeparator);
        if (index > 0) {
            pathString = pString.substr(0, index);
            pString = pString.substr(index + Url.protocolSeparator.length);
        } else {
            pathString = pString;
            pString = "";
        }
        if (pathString)
            pUrl.path = pathString.split(Url.pathSeparator);
        return pString;
    }

    extractParameters(pString, pUrl) {
        pUrl.parameters = [];
        if (pString) {
            const parameterTexts = pString.split(Url.parameterSeparator);
            for (const parameterText of parameterTexts)
                pUrl.parameters.push(UrlParameter.parse(parameterText));
            pString = "";
        }
        return pString;
    }
}
