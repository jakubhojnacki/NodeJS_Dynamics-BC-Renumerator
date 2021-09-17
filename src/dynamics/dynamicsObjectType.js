/**
 * @module "DynamicsObjectType" class (static)
 * @description Enumeration of Dynamics object types
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class DynamicsObjectType {
    static get table() { return "table"; }
    static get tableExtension() { return "tableExtension"; }
    static get page() { return "page"; }
    static get pageExtension() { return "pageExtension"; }
    static get codeunit() { return "codeunit"; }
    static get report() { return "report"; }
    static get xmlPort() { return "xmlPort"; }
    static get query() { return "query"; }
    static get enum() { return "enum"; }
    static get enumExtension() { return "enumExtension"; }

    static get items() { return [
        new EnumItem(DynamicsObjectType.table),
        new EnumItem(DynamicsObjectType.tableExtension),
        new EnumItem(DynamicsObjectType.page),
        new EnumItem(DynamicsObjectType.pageExtension),
        new EnumItem(DynamicsObjectType.codeunit),
        new EnumItem(DynamicsObjectType.report),
        new EnumItem(DynamicsObjectType.xmlPort),
        new EnumItem(DynamicsObjectType.query),
        new EnumItem(DynamicsObjectType.enum),
        new EnumItem(DynamicsObjectType.enumExtension)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DynamicsObjectType.items, DynamicsObjectType.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, DynamicsObjectType.items, DynamicsObjectType.name);
    }
}
