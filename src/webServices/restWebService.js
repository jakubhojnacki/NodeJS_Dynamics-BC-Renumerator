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
import Protocol from "../network/protocol.js";
import WebService from "./webService.js";
import WebServiceResponse from "./webServiceResponse.js";

export default class RestWebService extends WebService {
    get terminal() { return global.theApplication.terminal; }
	get debug() { return global.theApplication.debug; }

    constructor(pUrl, pMethod, pHeaders, pBody, pAuthentication, pContentType, pAccept, pTimeout) {
		super(pUrl, pMethod, pHeaders, pBody, pAuthentication, pContentType, pAccept, pTimeout)
    }

    async execute() {
		await this.updateHeaders();
		await this.executeAsync();
        this.debugResponse();
		return this.response;
	}

	async updateHeaders() {
		if (this.contentType != null)
			this.headers["content-type"] = this.contentType.toString();
		if (this.accept != null)
			this.headers["accept"] = this.accept.toString();
		if (this.authentication != null) {
			const authenticationHeaderValue = await this.authentication.toString();
			if (authenticationHeaderValue)
				this.headers["authorization"] = authenticationHeaderValue;
		}
	}
	
	async executeAsync() {
		const options = {
			method: Method.toString(this.method),
			host: encodeURI(this.url.host),
            port: this.url.port,
			path: encodeURI("/" + this.url.toPath()),
			headers: this.headers,
            timeout: this.timeout
		};
        this.debugRequest();
        this.mResponse = new WebServiceResponse();            
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
		request.on("error", (lError) => { pReject(lError); });
        request.on("timeout", () => { pReject(new Error("Web service timed out")); });
		request.end();
	}

	request_callback(pResolve, pReject, pResponse) {
		if ((pResponse.statusCode >= 200) && (pResponse.statusCode < 300)) {
			const __this = this;
			pResponse.on("data", (lData) => { __this.response_onData(lData); });
			pResponse.on("end", () => { __this.response_onEnd(pResolve, pReject, pResponse); });
		} else
			pReject(new Error(`Status: ${pResponse.statusCode}, Message: ${pResponse.statusMessage}`));
	}

    response_onData(pData) {
        this.response.appendToBody(pData);
    }

	response_onEnd(pResolve, pReject, pResponse) {
		try {
			this.response.headers = pResponse.headers;
			const contentType = ContentType.parse(this.response.headers["content-type"]);
			if (contentType.mediaType === MediaType.json)
				this.response.body = JSON.parse(this.response.body);
			pResolve();
		}
		catch (eError) {
			pReject(eError);
		}
	}

    serialise() {
        let data = super.serialise();
        return data;
    }

	debugRequest() {
		if (this.debug.enabled) {
            this.terminal.writeLine(`Calling "${this.url.toHost()}" web service..."`);
            const request = this.serialise();
            this.debug.dumpJson("Request", request);
        }
	}

	debugResponse() {
		if (this.debug.enabled) {
            this.terminal.writeLine(`Web service call completed."`);
            const response = this.response.serialise();
            this.debug.dumpJson("Request", response);
        }
	}
}	
