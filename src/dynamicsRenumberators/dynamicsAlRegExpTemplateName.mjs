/**
 * @module "DynamicsAlRegExpTemplateName" class (static)
 * @description Enumerates regular expression template names for Dynamics AL processing
 */

import { Enum } from "core-library";
import { EnumItem } from "core-library";

export class DynamicsAlRegExpTemplateName {
    static get object() { return "object"; }
    static get objectExtension() { return "objectExtension"; }
    static get tableField() { return "tableField"; }
    static get enumValue() { return "enumValue"; }

    static get items() { return [
        new EnumItem(DynamicsAlRegExpTemplateName.object),
        new EnumItem(DynamicsAlRegExpTemplateName.objectExtension),
        new EnumItem(DynamicsAlRegExpTemplateName.tableField),
        new EnumItem(DynamicsAlRegExpTemplateName.enumValue)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DynamicsAlRegExpTemplateName.items, DynamicsAlRegExpTemplateName.name);
    }    

    static toString(pValue) {
        return Enum.toString(pValue, DynamicsAlRegExpTemplateName.items, DynamicsAlRegExpTemplateName.name);
    }  
}
