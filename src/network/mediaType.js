/**
 * @module "MediaType" class
 * @description Enumerates media types used in HTTP(S) content types
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class MediaType {
    static get any() { return "any"; }
    static get html() { return "html"; }
    static get json() { return "json"; }
    static get text() { return "text"; }
    static get urlEncoded() { return "urlEncoded"; }
    static get xml() { return "xml"; }

    static get items() { return [
        new EnumItem(MediaType.any, "*/*"),
        new EnumItem(MediaType.html, "text/html"),
        new EnumItem(MediaType.json, "application/json"),
        new EnumItem(MediaType.text, "text/plain"),
        new EnumItem(MediaType.urlEncoded, "application/x-www-form-urlencoded"),
        new EnumItem(MediaType.xml,"application/xml")
    ]; }

    static parse(pString) {
        return Enum.parse(pString, MediaType.items, MediaType.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, MediaType.items, MediaType.name);
    }
}
