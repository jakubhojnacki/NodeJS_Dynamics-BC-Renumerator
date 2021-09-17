/**
 * @module "Protocol" class
 * @description Enumerats various URL protocols
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class Protocol {
    static get http() { return "http"; }
    static get https() { return "https"; }

    static get items() { return [
        new EnumItem(Protocol.http),
        new EnumItem(Protocol.https)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, Protocol.items, Protocol.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, Protocol.items, Protocol.name);
    }
}
