/**
 * @module "DynamicsObjectType" class (static)
 * @description Enumeration of Dynamics object types
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";

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

    static get values() { return [
        DynamicsObjectType.table,
        DynamicsObjectType.tableExtension,
        DynamicsObjectType.page,
        DynamicsObjectType.pageExtension,
        DynamicsObjectType.codeunit,
        DynamicsObjectType.report,
        DynamicsObjectType.xmlPort,
        DynamicsObjectType.query,
        DynamicsObjectType.enum,
        DynamicsObjectType.enumExtension
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DynamicsObjectType.values, DynamicsObjectType.name);
    }
}
