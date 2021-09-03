/**
 * @module "MediaType" class
 * @description Enumerates media types used in HTTP(S) content types
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";

export default class MediaType {
    static get any() { return "any"; }
    static get html() { return "html"; }
    static get json() { return "json"; }
    static get text() { return "text"; }
    static get urlEncoded() { return "urlEncoded"; }
    static get xml() { return "xml"; }

    static get items() { return [
        MediaType.any,
        MediaType.html,
        MediaType.json,
        MediaType.text,
        MediaType.urlEncoded,
        MediaType.xml
    ]; }

    static parse(pString) {
        return Enum.parse(pString, MediaType.items, MediaType.name);
    }

    static toString(pValue) {
        let string = "";
        switch (pValue) {
            case MediaType.any:
                string = "*/*";
                break;
            case MediaType.html:
                string = "text/html";
                break;
            case MediaType.json:
                string = "application/json";
                break;
            case MediaType.text:
                string = "text/plain";
                break;
            case MediaType.urlEncoded:
                string = "application/x-www-form-urlencoded";
                break;
            case MediaType.xml:
                string = "application/xml";
                break;
        }
        return string;
    }
}
