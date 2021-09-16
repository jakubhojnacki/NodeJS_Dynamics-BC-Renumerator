/**
 * @module "ConentType" class
 * @description Represents content type used in HTTP(S) communication
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";
import Charset from "./charset.js";
import MediaType from "./mediaType.js";

export default class ContentType {
    get mediaType() { return this.mMediaType; }
    set mediaType(pValue) { this.mMediaType = MediaType.parse(pValue); }
    get charset() { return this.mCharset; }
    set charset(pValue) { this.mCharset = Charset.parse(pValue); }

    constructor(pMediaType, pCharset) {
        this.mMediaType = MediaType.parse(pMediaType);
        this.mCharset = Charset.parse(pCharset);
    }

    static string(pMediaType, pCharset) {
        const contentType = new ContentType(pMediaType, pCharset);
        return contentType.toString();
    }

    toString() {
        let string = MediaType.toString(this.mediaType);
        if (this.charset)
            string = `${string}; charset=${Charset.toString(this.charset)}`;
        return string;
    }

    static parse(pString) {
        let contentType = new ContentType();
        if (pString) {
            const stringParts = pString.split(";");
            let stringPartIndex = 0;
            for (let stringPart of stringParts) {
                stringPart = stringPart.trim();
                if (stringPartIndex === 0)
                    contentType.mediaType = stringPart;
                else {
                    const parameterParts = stringPart.split("=");
                    if (parameterParts.length > 1) {
                        const parameterName = parameterParts[0].trim().toLowerCase();
                        const parameterValue = parameterParts[1].trim();
                        switch (parameterName) {
                            case "charset":
                                contentType.charset = parameterValue;
                                break;
                        }
                    }
                }
                stringPartIndex++;
            }
        }
        return contentType;
    }
}
