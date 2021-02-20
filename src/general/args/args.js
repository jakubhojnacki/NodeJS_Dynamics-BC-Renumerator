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

    static parse(pInputs, pTemplates, pInvalidHandler) {
        let args = new Args();
        let tag = "";
        let template = null;
        for (let input of pInputs) {
            input = input.trim().removeIfStartsWith("\"").removeIfEndsWith("\"");
            if (input.startsWith("-")) {
                tag = input.substr(1);
                template = pTemplates.find((lTemplate) => { return lTemplate.tag === tag; });
            } else if (template != null) {
                const value = DataType.parseValue(input, template.dataType);
                this.push(new Arg(template.name, value));
                template = null; 
            }
        }
        args.validate(pInvalidHandler);
        return args;
    }

    validate(pInvalidHandler) {
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
            pInvalidHandler(this);
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