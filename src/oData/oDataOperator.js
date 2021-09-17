/**
 * @module "ODataOperator" class
 * @description Represents ODATA operators
 * @version 0.0.1 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class ODataOperator {
    static get equals() { return "equals"; }
    static get notEquals() { return "notEquals"; }
    static get greater() { return "greater"; }
    static get greaterOrEqual() { return "greaterOrEqual"; }
    static get less() { return "less"; }
    static get lessOrEqual() { return "lessOrEqual"; }
    static get and() { return "and"; }
    static get or() { return "or"; }
    static get has() { return "has"; }
    static get in() { return "in"; }

    static get items() { return [
        new EnumItem(ODataOperator.equals, "eq"),
        new EnumItem(ODataOperator.notEquals, "ne"),
        new EnumItem(ODataOperator.greater, "gt"),
        new EnumItem(ODataOperator.greaterOrEqual, "ge"),
        new EnumItem(ODataOperator.less, "lt"),
        new EnumItem(ODataOperator.lessOrEqual, "le"),
        new EnumItem(ODataOperator.and, "and"),
        new EnumItem(ODataOperator.or, "or"),
        new EnumItem(ODataOperator.has, "has"),
        new EnumItem(ODataOperator.in, "in")
    ]; }

    static parse(pText) {
        return Enum.parse(pText, ODataOperator.items, ODataOperator.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, ODataOperator.items, ODataOperator.name);
    }
}