/**
 * @module "Method" class
 * @description Represents a method used in HTTP(S) communication
 * @version 0.0.3 (2021-09-03)
 */

import "../general/javaScript.js";
import Enum from "../general/enum.js";

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
        Method.get,
        Method.post,
        Method.put,
        Method.patch,
        Method.delete,
        Method.connect,
        Method.head,
        Method.options,
        Method.trace
    ]; }

    static parse(pString) {
        return Enum.parse(pString, Method.items, Method.name);
    }

    static toString(pValue) {
        let string = "";
        switch (pValue) {
            case Method.get:
                string = "GET";
                break;
            case Method.post:
                string = "POST";
                break;
            case Method.put:
                string = "PUT";
                break;
            case Method.patch:
                string = "PATCH";
                break;
            case Method.delete:
                string = "DELETE";
                break;
            case Method.connect:
                string = "CONNECT";
                break;
            case Method.head:
                string = "HEAD";
                break;
            case Method.options:
                string = "OPTIONS";
                break;
            case Method.trace:
                string = "TRACE";
                break;
        }
        return string;
    }
}
