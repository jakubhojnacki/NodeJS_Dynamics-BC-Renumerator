/**
 * @module "UrlToolkit" class
 * @description Various URL tools
 * @version 0.0.1 (2021-09-30)
 */

import "../general/javaScript.js";
import Protocol from "./protocol.js";

export default class UrlToolkit {
    static get protocolSeparator() { return ":"; }
    static get credentialsSeparator() { return "@"; }
    static get passwordSeparator() { return ":"; }
    static get portSeparator() { return ":"; }
    static get pathSeparator() { return "/"; }
    static get parametersSeparator() { return "?"; }
    static get parameterSeparator() { return "&"; }

    static toHost(pProtocol, pUser, pPassword, pHost, pPort) {
        let protocol = String.validate(pProtocol);
        if (!protocol)
            protocol = Protocol.http;
        protocol = `${protocol}${UrlToolkit.protocolSeparator}${UrlToolkit.pathSeparator}${UrlToolkit.pathSeparator}`;
        
        let credentials = "";
        const user = String.validate(pUser);
        const password = String.validate(pPassword);
        if ((user) && (password))
            credentials = `${user}${UrlToolkit.passwordSeparator}${password}`;
        else if (user)
            credentials = user;
        if (credentials)
            credentials = `${credentials}${UrlToolkit.credentialsSeparator}`;

        let hostPort = "";
        const host = String.validate(pHost);
        const port = Number.validateAsInteger(pPort);
        if ((host) && (port > 0))
            hostPort = `${host}${UrlToolkit.portSeparator}${port}`
        else if (host)
            hostPort = host;
        else
            throw new Error("Host cannot be empty to create URL");

        return `${protocol}${credentials}${hostPort}`;
    }

    static toPath(pPath, pParameters) {
        const path = UrlToolkit.toPathString(pPath);
        const parameters = UrlToolkit.toParametersString(pParameters);
        return `${path}${parameters}`;
    }

    static toPathString(pPath) {
        let string = "";
        if (pPath != null)
            if (Array.isArray(pPath)) {
                let first = true;
                for (let pathPart of pPath) {
                    if (pathPart) {
                        pathPart = pathPart.removeIfStartsWith(UrlToolkit.pathSeparator);
                        pathPart = pathPart.removeIfEndsWith(UrlToolkit.pathSeparator);
                        if (pathPart.length > 0) {
                            string += first ? "" : UrlToolkit.pathSeparator;
                            string += pathPart;
                            first = false;
                        }
                    }
                }
            } else {
                let path = String.validate(pPath).trim();
                path = path.removeIfStartsWith(UrlToolkit.pathSeparator);
                path = path.removeIfEndsWith(UrlToolkit.pathSeparator);
                string = path;
            }
        return string;
    }

    static toParametersString(pParameters) {
        let string = "";
        if (pParameters != null) 
            if (Array.isArray(pParameters)) {
                let first = true;
                for (const parameter of pParameters) {
                    string += first ? UrlToolkit.parametersSeparator : UrlToolkit.parameterSeparator;
                    string += `${parameter.name}=${parameter.value}`;
                    first = false;
                }
            } else {
                let parameters = String.validate(pParameters);
                if (!parameters.startsWith(UrlToolkit.parametersSeparator))
                    parameters = `${UrlToolkit.parametersSeparator}${parameters}`;
                string = parameters;
            }
        return string;
    }

    static join(pUrl1, pUrl2) {
        pUrl1 = String.validate(pUrl1).trim().removeIfEndsWith(UrlToolkit.pathSeparator);
        pUrl2 = String.validate(pUrl2).trim().removeIfStartsWith(UrlToolkit.pathSeparator);
        let url = pUrl1;
        if ((url) && (pUrl2))
            url += UrlToolkit.pathSeparator;
        url += pUrl2;
        return url;
    }
}