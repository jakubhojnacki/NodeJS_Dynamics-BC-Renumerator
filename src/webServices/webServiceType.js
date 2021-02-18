/**
 * @module "WebServiceType" class (static)
 * @description Enumerates web service types
 * @version 0.0.1 (2021-02-17)
 */

/*static*/ class WebServiceType {
    static get soap() { return "soap"; }
    static get rest() { return "rest"; }

    static parse(pString) {
        const string = pString ? pString.trim().toLowerCase() : "";
        let value = "";
        if (string)
            switch (string) {
                case "soap":
                    value = WebServiceType.soap;
                    break;
                case "rest":
                    value = WebServiceType.rest;
                    break;
                default:
                    throw new Error(`Unknown web service type: ${pString}.`);
                    break;
            }
        return value;
    }
}

module.exports = WebServiceType;