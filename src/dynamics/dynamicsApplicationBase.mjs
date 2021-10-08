/**
 * @module "DynamicsApplicationBase" class
 * @description Abstract class - base for Dynamics application and dependency
 * @version 0.0.1 (2021-09-03)
 */

import "../general/javaScript.js";
import Guid from "../general/guid.js";
import StringBuilder from "../general/stringBuilder.js";

export default class DynamicsApplicationBase {
    get id() { return this.mId; }
    get name() { return this.mName; }
    get publisher() { return this.mPublisher; }
    get version() { return this.mVersion; }
    get renumberedId() { return this.mRenumberedId; }
    set renumberedId(pValue) { this.mRenumberedId = pValue; }

    constructor(pId, pName, pPublisher, pVersion, pRenumberedId) {
        this.mId = Guid.validate(pId);
        this.mName = String.validate(pName);
        this.mPublisher = String.validate(pPublisher);
        this.mVersion = pVersion;
        this.mRenumberedId = Guid.validate(pRenumberedId);
    }

    toStringBuilder() {
        const stringBuilder = new StringBuilder();
        stringBuilder.addNameValue("Id", this.id);
        stringBuilder.addNameValue("Name", this.name);
        stringBuilder.addNameValue("Publisher", this.publisher);
        stringBuilder.addNameValue("Version", this.version.toString());
        return stringBuilder;
    }

    validate(pClass, pValidator, pWithRenumbered) {
        const withRenumbered = Boolean.validate(pWithRenumbered);
        pValidator.testNotEmpty(pClass, "ID", this.id);
        pValidator.testNotEmpty(pClass, "Name", this.name);
        pValidator.testNotEmpty(pClass, "Publisher", this.publisher);
        pValidator.testNotEmpty(pClass, "Version", this.version);
        if (withRenumbered)
            pValidator.testNotEmpty(pClass, "Renumbered ID", this.renumberedId);
    }        

    serialise() {
        return {
            "id": this.id,
            "name": this.name,
            "publisher": this.publisher,
            "version": this.version,
            "renumberedId": this.renumberedId
        };
    }
}