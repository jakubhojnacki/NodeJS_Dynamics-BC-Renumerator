/**
 * @module "WebService" class
 * @description Abstract class common for all web service classes
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";
import Charset from "../network/charset.js";
import ContentType from "../network/contentType.js";
import MediaType from "../network/mediaType.js";
import Method from "../network/method.js";
import Url from "../network/url.js";
import WebServiceResponse from "./webServiceResponse.js";

export default class WebService {
	get url() { return this.mUrl; }
	set url(pValue) { this.mUrl = pValue; }
	get method() { return this.mMethod; }
	set method(pValue) { this.mMethod = Method.parse(pValue); }
	get headers() { return this.mHeaders; }
	set headers(pValue) { this.mHeaders = pValue; }
	get body() { return this.mBody; }
	set body(pValue) { this.mBody = pValue; }
	get authentication() { return this.mAuthentication; }
	set authentication(pValue) { this.mAuthentication = pValue; }
	get contentType() { return this.mContentType; }
	set contentType(pValue) { this.mContentType = pValue; }
	get accept() { return this.mAccept; }
	set accept(pValue) { this.mAccept = pValue; }
    get timeout() { return this.mTimeout; }
    set timeout(pValue) { this.mTimeout = pValue; }
    get response() { return this.mResponse; }
    set response(pValue) { this.mResponse = pValue; }

	constructor(pUrl, pMethod, pHeaders, pBody, pAuthentication, pContentType, pAccept, pTimeout) {
		this.mUrl = Object.validate(pUrl, new Url());
		this.mMethod = Method.parse(pMethod);
		this.mHeaders = Object.validate(pHeaders);
		this.mBody = String.validate(pBody);
		this.mAuthentication = pAuthentication;
		this.mContentType = Object.validate(pContentType, new ContentType(MediaType.json, Charset.utf8));
		this.mAccept = Object.validate(pAccept, new ContentType(MediaType.json, Charset.utf8));
        this.mTimeout = Number.validateAsInteger(pTimeout);
        this.mResponse = new WebServiceResponse();
	}

    serialise() {
        return {
            "url": this.url ? this.url.toString(): null,
            "method": this.method,
            "headers": this.headers,
            "body": this.body,
            "authentication": this.authentication ? this.authentication.toString() : null,
            "contentType": this.contentType ? this.contentType.toString() : null,
            "accept": this.accept ? this.accept.toString() : null
        };
    }
}
