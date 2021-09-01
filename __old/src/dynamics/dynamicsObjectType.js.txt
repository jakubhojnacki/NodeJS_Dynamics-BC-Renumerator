/**
 * @module "DynamicsObjectType" class (static)
 * @description Enumeration of Dynamics object types
 * @version 0.0.1 (2021-02-22)
 */

require("../general/javaScript");

const Enum = require("../general/enum");
const EnumValue = require("../general/enumValue");

/*static*/ class DynamicsObjectType {
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
        new EnumValue(DynamicsObjectType.table),
        new EnumValue(DynamicsObjectType.tableExtension),
        new EnumValue(DynamicsObjectType.page),
        new EnumValue(DynamicsObjectType.pageExtension),
        new EnumValue(DynamicsObjectType.codeunit),
        new EnumValue(DynamicsObjectType.report),
        new EnumValue(DynamicsObjectType.xmlPort),
        new EnumValue(DynamicsObjectType.query),
        new EnumValue(DynamicsObjectType.enum),
        new EnumValue(DynamicsObjectType.enumExtension)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DynamicsObjectType.values, DynamicsObjectType.name);
    }
}

module.exports = DynamicsObjectType;