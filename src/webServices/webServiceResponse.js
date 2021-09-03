/**
 * @module "WebServiceResponse" class
 * @description Allows handling HTTP(S) web service responses
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";

export default class WebServiceResponse {
    get headers() { return this.mHeaders; }
    set headers(pValue) { this.mHeaders = pValue; }
    get body() { return this.mBody; }
    set body(pValue) { this.mBody = pValue; }

    constructor(pHeaders, pBody) {
        this.mHeaders = Object.validate(pHeaders);
        this.mBody = String.validate(pBody);
    }

    appendToBody(pText) {
        this.body += pText;
    }
}
