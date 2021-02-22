/**
 * @module "DynamicsAlRegExpTemplateName" class (static)
 * @description Enumerates regular expression template names for Dynamics AL processing
 * @version 0.0.1 (2021-02-22)
 */

__require("/general/javaScript");

/*static*/ class DynamicsAlRegExpTemplateName {
    static get object() { return "object"; }
    static get objectExtension() { return "objectExtension"; }
    static get tableField() { return "tableField"; }
    static get enumValue() { return "enumValue"; }

    static get values() { return [
        new EnumValue(DynamicsAlRegExpTemplateName.object),
        new EnumValue(DynamicsAlRegExpTemplateName.objectExtension),
        new EnumValue(DynamicsAlRegExpTemplateName.tableField),
        new EnumValue(DynamicsAlRegExpTemplateName.enumValue)
    ]; }

    static parse(pString) {
        return Enum.parse(pString, DynamicsAlRegExpTemplateName.values, DynamicsAlRegExpTemplateName.name);
    }    
}

module.exports = DynamicsAlRegExpTemplateName;