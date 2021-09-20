/**
 * @module "RestWebService" class
 * @description Provides functionality to use REST web services
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";
import ContentType from "../network/contentType.js";
import HTTP from "http"
import HTTPS from "https";
import MediaType from "../network/mediaType.js";
import Method from "../network/method.js";
import StringBuilder from "../general/stringBuilder.js";
import WebService from "./webService.js";
import Protocol from "../network/protocol.js";

export default class RestWebService extends WebService {
    get terminal() { return global.theApplication.terminal; }
	get debug() { return global.theApplication.debug; }

    constructor(pUrl, pMethod, pHeaders, pBody, pAuthentication, pContentType, pAccept) {
		super(pUrl, pMethod, pHeaders, pBody, pAuthentication, pContentType, pAccept)
    }

    async execute() {
		await this.updateHeaders();
		await this.executeAsync();
		return this.response;
	}

	async updateHeaders() {
		if (this.contentType != null)
			this.headers["content-type"] = this.contentType.toString();
		if (this.accept != null)
			this.headers["accept"] = this.accept.toString();
		if (this.authentication != null) {
			const authenticationHeaderValue = await this.authentication.getHeaderValue();
			if (authenticationHeaderValue)
				this.headers["authorization"] = authenticationHeaderValue;
		}
	}
	
	async executeAsync() {
		const options = {
			method: Method.toString(this.method),
			host: encodeURI(this.url.host),
            port: this.url.port,
			path: encodeURI("/" + this.url.toPathParametersString()),
			headers: this.headers
		};
		if (this.debug.enabled)
			this.logRequest(options);
		const __this = this;
		return new Promise((lResolve, lReject) => { __this.executeRequest(options, lResolve, lReject); });
	}

	executeRequest(pOptions, pResolve, pReject) {
		const __this = this;
        let request = null;
        if (this.url.protocol == Protocol.https)
            request = HTTPS.request(pOptions, (lResponse) => { __this.request_callback(pResolve, pReject, lResponse); });
        else
            request = HTTP.request(pOptions, (lResponse) => { __this.request_callback(pResolve, pReject, lResponse); });        
		if ((this.body) && (this.body.length > 0))
			request.write(this.body);
		request.on('error', (lError) => { pReject(lError); });
		request.end();
	}

	request_callback(pResolve, pReject, pResponse) {
		if ((pResponse.statusCode >= 200) && (pResponse.statusCode < 300)) {
			const __this = this;
			pResponse.on('data', (lData) => { __this.response_onData(lData); });
			pResponse.on('end', () => { __this.response_onEnd(pResolve, pReject, pResponse); });
		} else
			pReject(new Error(`Status: ${pResponse.statusCode}, Message: ${pResponse.statusMessage}`));
	}

    response_onData(pData) {
        this.response.appendToBody(pData);
    }

	response_onEnd(pResolve, pReject, pResponse) {
		try {
			this.response.headers = pResponse.headers;
			const contentType = ContentType.parse(this.response.headers['content-type']);
			if (contentType.mediaType === MediaType.json)
				this.response.body = JSON.parse(this.response.body);
			pResolve();
		}
		catch (eError) {
			pReject(eError);
		}
	}

	logRequest(pOptions, pIndentation) {
		const indentation = Number.validate(pIndentation);
        this.terminal.writeLine("REST Web Service Request:", indentation);
		this.terminal.writeLine(StringBuilder.nameValue("Method", pOptions.method), indentation + 1);
		this.terminal.writeLine(StringBuilder.nameValue("Host", pOptions.host), indentation + 1);
		this.terminal.writeLine(StringBuilder.nameValue("Port", pOptions.port), indentation + 1);
		this.terminal.writeLine(StringBuilder.nameValue("Path", pOptions.path), indentation + 1);
		if (pOptions.headers) {
			this.terminal.writeLine("Headers:", indentation + 1);
			this.terminal.writeObject(pOptions.headers, indentation + 2);
		}
		if (this.body) {
			this.terminal.writeLine("Body:", indentation + 1);
			this.terminal.writeObject(this.body, indentation + 2);
		}
	}

	logResponse(pIndentation) {
		const indentation = Number.validate(pIndentation);
        this.terminal.writeLine("REST Web Service Response:", indentation);
		this.terminal.writeObject(this.response, indentation + 1);
	}
}	
