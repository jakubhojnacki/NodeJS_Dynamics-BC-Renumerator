/**
 * @module "Progress" class
 * @description Used for tracing progress
 * @version 0.0.1 (2021-09-21)
 */

import "../general/javaScript.js";

export default class Progress {
    get count() { return this.mCount; }
    set count(pValue) { this.mCount = pValue; this.update(); }
    get message() { return this.mMessage; }
    set message(pValue) { this.mMessage = String.validate(pValue); }
    get value() { return this.mValue; }
    set value(pValue) { this.mValue = pValue; this.update(); }

    constructor(pCount, pMessage) {
        this.mCount = Number.validateAsInteger(pCount);
        this.mMessage = String.validate(pMessage);
        this.mValue = 0;
    }

    update() {
        if (this.value < 0)
            this.value = 0;
        if (this.value > this.count)
            this.value = this.count;
    }

    move(pDelta, pMessage) {
        this.value = this.value + pDelta;
        this.message = pMessage;
        this.update();
    }

    complete(pMessage) {
        this.value = this.count;
        this.message = pMessage;
        this.update();
    }

    toString(pPrefix, pCharacter, pSuffix, pLength) {
        const doneLength = this.count > 0 ? Math.round(this.value / this.count * pLength) : 0;
        const leftLength = pLength - doneLength;
        return `${pPrefix}${pCharacter.repeat(doneLength)}${" ".repeat(leftLength)}${pSuffix} ${this.message}`;
    }
}