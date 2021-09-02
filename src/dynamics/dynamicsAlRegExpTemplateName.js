/**
 * @module "DynamicsAlRegExpTemplateName" class (static)
 * @description Enumerates regular expression template names for Dynamics AL processing
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";

export default class DynamicsAlRegExpTemplateName {
    static get object() { return "object"; }
    static get objectExtension() { return "objectExtension"; }
    static get tableField() { return "tableField"; }
    static get enumValue() { return "enumValue"; }

    static get values() { return [
        DynamicsAlRegExpTemplateName.object,
        DynamicsAlRegExpTemplateName.objectExtension,
        DynamicsAlRegExpTemplateName.tableField,
        DynamicsAlRegExpTemplateName.enumValue
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DynamicsAlRegExpTemplateName.values, DynamicsAlRegExpTemplateName.name);
    }    
}
