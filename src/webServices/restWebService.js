/**
 * @module "RestWebService" class
 * @description Provides functionality to use REST web services
 * @version 0.0.2 (2021-05-25)
 */

import https from "https";
import "../general/javaScript.js";
import ContentType from "../network/contentType.js";
import MediaType from "../network/mediaType.js";
import Method from "../network/method.js";
import StringBuilder from "../general/stringBuilder.js";
import WebService from "./webService.js";

export default class RestWebService extends WebService {
    get logger() { return global.theApplication.logger; }
	get debugMode() { return global.theApplication.debugMode; }

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
			host: this.url.host,
			path: "/" + this.url.pathString,
			headers: this.headers
		};
		if (this.debugMode)
			this.logRequest(options);
		const __this = this;
		return new Promise((lResolve, lReject) => { __this.executeHttpRequest(options, lResolve, lReject); });
	}

	executeHttpRequest(pOptions, pResolve, pReject) {
		const __this = this;
		let request = https.request(pOptions, (lResponse) => { __this.handleHttpResponse(pResolve, pReject, lResponse); });
		if ((this.body) && (this.body.length > 0))
			request.write(this.body);
		request.on('error', (lError) => { pReject(lError); });
		request.end();
	}

	handleHttpResponse(pResolve, pReject, pResponse) {
		if ((pResponse.statusCode >= 200) && (pResponse.statusCode < 300)) {
			const __this = this;
			pResponse.on('data', (lData) => { __this.response.appendToBody(lData); });
			pResponse.on('end', () => { __this.httpResponseOnEnd(pResolve, pReject, pResponse); });
		} else
			pReject(new Error(`Status: ${pResponse.statusCode}, Message: ${pResponse.statusMessage}`));
	}

	httpResponseOnEnd(pResolve, pReject, pResponse) {
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
        this.logger.writeLine("REST Web Service Request:", indentation);
		this.logger.writeLine(StringBuilder.nameValue("Method", pOptions.method), indentation + 1);
		this.logger.writeLine(StringBuilder.nameValue("Host", pOptions.host), indentation + 1);
		this.logger.writeLine(StringBuilder.nameValue("Path", pOptions.path), indentation + 1);
		if (pOptions.headers) {
			this.logger.writeLine("Headers:", indentation + 1);
			this.logger.writeObject(pOptions.headers, indentation + 2);
		}
		if (this.body) {
			this.logger.writeLine("Body:", indentation + 1);
			this.logger.writeObject(this.body, indentation + 2);
		}
	}

	logResponse(pIndentation) {
		const indentation = Number.validate(pIndentation);
        this.logger.writeLine("REST Web Service Response:", indentation);
		this.logger.writeObject(this.response, indentation + 1);
	}
}	
