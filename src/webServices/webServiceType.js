/**
 * @module "WebServiceType" class (static)
 * @description Enumerates web service types
 * @version 0.0.1 (2021-02-17)
 */

const Enum = __require("general/enum");
const EnumValue = __require("general/enumValue");

/*static*/ class WebServiceType {
    static get rest() { return "rest"; }
    static get soap() { return "soap"; }

    static get values() { return [
        new EnumValue(WebServiceType.rest, true),
        new EnumValue(WebServiceType.soap)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, WebServiceType.values, WebServiceType.name);
    }
}

module.exports = WebServiceType;