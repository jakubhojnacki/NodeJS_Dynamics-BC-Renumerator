/**
 * @module "Args" class
 * @description Parses and manages application arguments
 * @version 0.0.1 (2021-02-17)
 */

include("/general/javaScript");

const Arg = include("/general/args/arg");
const DataType = include("/general/dataType");

class Args extends Array {
    constructor() {
    }

    static parse(pArgV, pArgTemplates, pOnError) {
        let args = new Args();
        let tag = "";
        let argTemplate = null;
        for (let argV of pArgV) {
            argV = argV.trim().removeIfStartsWith("\"").removeIfEndsWith("\"");
            if (argV.startsWith("-")) {
                tag = argV.substr(1);
                argTemplate = pArgTemplates.find((lArgTemplate) => { return lArgTemplate.tag === tag; });
            } else if (argTemplate != null) {
                const value = DataType.parseValue(argV, argTemplate.dataType);
                this.push(new Arg(argTemplate.name, value));
                argTemplate = null; 
            }
        }
        args.validate(pArgTemplates, pOnError);
        return args;
    }

    validate(pArgTemplates, pOnError) {
        let result = true;
        for (const arg of this) {
            let mandatory = false;
            switch (typeof(arg.mandatory))
            {
                case "boolean":
                    mandatory = arg.mandatory;
                    break;
                case "function":
                    mandatory = arg.mandatory(this);
                    break;
            }
            if ((mandatory) && (!arg.value)) {
                arg.valid = false;
                result = false;
            }
        }
        if (!result)
            pOnError(pArgTemplates, this);
    }

    get(pName, pDefaultValue) {
        const item = this.items.find((lItem) => { return lItem.name === pName; });
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

    log() {
        const logger = global.application.logger;
        logger.writeText("Args:");
        for (const arg of this)
            logger.writeText(arg.toString(), 2);
    }
}

module.exports = Args;