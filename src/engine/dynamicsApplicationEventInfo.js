/**
 * @module "DynamicsApplicationEventInfo" class
 * @description Holds Dynamics applicationi information when event is raised
 * @version 0.0.1 (2021-09-21)
 */

import "../general/javaScript.js";

export default class DynamicsApplicationEventInfo {
    get dynamicsApplication() { return this.mDynamicsApplication; }
    get indentation() { return this.mIndentation; }

    constructor(pDynamicsApplication, pIndentation) {
        this.mDynamicsApplication = pDynamicsApplication;
        this.mIndentation = Number.validateAsInteger(pIndentation);
    }
}