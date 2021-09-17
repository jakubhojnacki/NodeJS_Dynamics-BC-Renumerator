/**
 * @module "Method" class
 * @description Represents a method used in HTTP(S) communication
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";
import EnumItem from "../general/enumItem.js";

export default class Method {
    static get connect() { return "Connect"; }
    static get delete() { return "Delete"; }
    static get get() { return "Get"; }
    static get head() { return "Head"; }
    static get options() { return "Options"; }
    static get patch() { return "Patch"; }
    static get post() { return "Post"; }
    static get put() { return "Put"; }
    static get trace() { return "Trace"; }

    static get items() { return [
        new EnumItem(Method.get, "GET"),
        new EnumItem(Method.post, "POST"),
        new EnumItem(Method.put, "PUT"),
        new EnumItem(Method.patch, "PATCH"),
        new EnumItem(Method.delete, "DELETE"),
        new EnumItem(Method.connect, "CONNECT"),
        new EnumItem(Method.head, "HEAD"),
        new EnumItem(Method.options, "OPTIONS"),
        new EnumItem(Method.trace, "TRACE")
    ]; }

    static parse(pString) {
        return Enum.parse(pString, Method.items, Method.name);
    }

    static toString(pValue) {
        return Enum.toString(pValue, Method.items, Method.name);
    }
}
