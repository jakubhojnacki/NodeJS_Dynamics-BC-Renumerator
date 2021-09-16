/**
 * @module "ODataOperator" class
 * @description Represents ODATA operators
 * @version 0.0.1 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";

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

    static get values() { return [
        ODataOperator.equals,
        ODataOperator.notEquals,
        ODataOperator.greater,
        ODataOperator.greaterOrEqual,
        ODataOperator.less,
        ODataOperator.lessOrEqual,
        ODataOperator.and,
        ODataOperator.or,
        ODataOperator.has,
        ODataOperator.in
    ]; }

    static parse(pText) {
        return Enum.parse(pText, ODataOperator.values, ODataOperator.name);
    }

    static toString(pValue) {
        let string = "";
        switch (pValue) {
            case ODataOperator.equals:
                string = "eq";
                break;
            case ODataOperator.notEquals:
                string = "ne";
                break;
            case ODataOperator.greater:
                string = "gt";
                break;
            case ODataOperator.greaterOrEqual:
                string = "ge";
                break;
            case ODataOperator.less:
                string = "lt";
                break;
            case ODataOperator.lessOrEqual:
                string = "le";
                break;
            case ODataOperator.and:
                string = "and";
                break;
            case ODataOperator.or:
                string = "or";
                break;
            case ODataOperator.has:
                string = "has";
                break;
            case ODataOperator.in:
                string = "in";
                break;
        }
        return string;
    }
}