/**
 * @module "DynamicsAlRegExpTemplateName" class (static)
 * @description Enumerates regular expression template names for Dynamics AL processing
 */

"use strict";

import { Enum } from "fortah-core-library";
import { EnumItem } from "fortah-core-library";

export class DynamicsAlRegExpTemplateName {
    static get object() { return "object"; }
    static get objectExtension() { return "objectExtension"; }
    static get tableField() { return "tableField"; }
    static get enumValue() { return "enumValue"; }

    static get items() { return [
        new EnumItem(DynamicsAlRegExpTemplateName.object, "Object"),
        new EnumItem(DynamicsAlRegExpTemplateName.objectExtension, "Object Extension"),
        new EnumItem(DynamicsAlRegExpTemplateName.tableField, "Table Field"),
        new EnumItem(DynamicsAlRegExpTemplateName.enumValue, "Enum Value")
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DynamicsAlRegExpTemplateName.items, DynamicsAlRegExpTemplateName.name);
    }    

    static toString(pValue) {
        return Enum.toString(pValue, DynamicsAlRegExpTemplateName.items, DynamicsAlRegExpTemplateName.name);
    }  
}
