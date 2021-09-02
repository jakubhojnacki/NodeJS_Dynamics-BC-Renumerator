/**
 * @module "Args" class
 * @description Parses and manages application arguments
 * @version 0.0.2 (2021-05-25)
 */

import "../general/javaScript.js";
import Arg from "./arg.js";

export default class Args extends Array {
    get argTemplates() { return this.mArgTemplates; }

    constructor(pArgTemplates) {
        super();
        this.mArgTemplates = pArgTemplates;
    }

    static parse(pArgValues, pArgTemplates) {
        let args = new Args(pArgTemplates);
        let index = -1;
        let tag = "";
        let argTemplate = null;
        pArgValues.shift();
        pArgValues.shift();
        for (let argValue of pArgValues) {
            argValue = argValue.trim().removeIfStartsWith("\"").removeIfEndsWith("\"");
            if (argValue.startsWith("-")) {
                if (argTemplate != null)
                    args.add(argTemplate, true);
                tag = argValue.substr(1);
                argTemplate = args.argTemplates.get(tag);
            } else if (argTemplate != null) {
                args.add(argTemplate, argValue);
                argTemplate = null;
            } else {
                index++;
                argTemplate = args.argTemplates.get(index);
                if (argTemplate != null) {
                    args.add(argTemplate, argValue);
                    argTemplate = null;
                }
            }
        }
        if (argTemplate != null)
            args.add(argTemplate, true);
        return args;
    }

    add(pArgTemplate, pArgValue) {
        const argValue = pArgTemplate.parse(pArgValue);
        this.push(new Arg(pArgTemplate, argValue));
    }

    validate(pIndentation) {
        let result = true;
        for (const argTemplate of this.argTemplates)
            if (argTemplate.isMandatory(this)) {
                const arg = this.find((lArg) => { return lArg.name === argTemplate.name; });
                if (arg) {
                    if (!arg.value)
                        result = false;
                } else
                    result = false;
            }
        if (!result)
            this.reportInvalid(pIndentation);
        return result;
    }

    reportInvalid(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("Application args:", indentation);
        indentation += 1;
        for (const argTemplate of this.argTemplates) {
            pLogger.writeLine(argTemplate.toString(this), indentation);
            const arg = this.find((lArg) => { return lArg.name === argTemplate.name; });
            if (arg != null)
                pLogger.writeLine(`Passed: ${arg.value}; Valid: ${arg.valid}.`, indentation + 1);
            else
                pLogger.writeLine("Not passed.", indentation + 1);
        }
    }

    get(pName, pDefaultValue) {
        const item = this.find((lArg) => { return lArg.name === pName; });
        let value = null;
        if (item != null)
            value = item.value;
        else
            if (pDefaultValue != null)
                value = pDefaultValue;
            else
                throw new Error(`Unknown arg: ${pName}.`);
        return value;
    }

    log(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("Args:", indentation);
        for (const arg of this)
            pLogger.writeLine(arg.toString(), indentation + 1);
    }
}
