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
    set message(pValue) { this.mMessage = String.validate(pValue); this.update(); }
    get onUpdate() { return this.mOnUpdate; }
    set onUpdate(pValue) { this.mOnUpdate = pValue; }
    get onUpdateEnabled() { return this.mOnUpdateEnabled; }
    set onUpdateEnabled(pValue) { this.mOnUpdateEnabled = pValue; }
    get value() { return this.mValue; }
    set value(pValue) { this.mValue = pValue; this.update(); }

    constructor(pCount, pMessage, pOnUpdate) {
        this.mCount = Number.validateAsInteger(pCount);
        this.mMessage = String.validate(pMessage);
        this.mOnUpdate = pOnUpdate;
        this.mOnUpdateEnabled = true;
        this.mValue = 0;
    }

    update() {
        if (this.value < 0)
            this.value = 0;
        if (this.value > this.count)
            this.value = this.count;
        if (this.onUpdateEnabled)
            if (this.onUpdate)
                this.onUpdate(this);
    }

    reset(pCount, pMessage) {
        this.onUpdateEnabled = false;
        if (pCount != null)
            this.count = pCount;
        this.value = 0;
        this.message = pMessage;
        this.onUpdateEnabled = true;
        this.update();
    }

    move(pDelta, pMessage) {
        this.onUpdateEnabled = false;
        this.value = this.value + pDelta;
        this.message = pMessage;
        this.onUpdateEnabled = true;
        this.update();
    }

    complete(pMessage) {
        this.onUpdateEnabled = false;
        this.value = this.count;
        this.message = pMessage;
        this.onUpdateEnabled = true;
        this.update();
    }

    toString(pPrefix, pCharacter, pSuffix, pLength, pMaxLength) {
        const doneLength = this.count > 0 ? Math.round(this.value / this.count * pLength) : 0;
        const leftLength = pLength - doneLength;
        const maxLength = Number.validateAsInteger(pMaxLength);
        let text = `${pPrefix}${pCharacter.repeat(doneLength)}${" ".repeat(leftLength)}${pSuffix} `;
        if (pMaxLength > 0) {
            if (text.length < maxLength) {
                let messagePart = this.message;
                if (text.length + this.message.length > maxLength)
                    messagePart = "..." + this.message.substr(text.length + this.message.length - pMaxLength + 3);
                text += messagePart;
            } else
                text = text.substr(0, maxLength);
        } else
            text += this.message;
        return text;
    }
}