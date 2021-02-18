/**
 * @module "Args" class
 * @description Parses and manages application arguments
 * @version 0.0.1 (2021-02-17)
 */

include("/general/javaScript");

const Arg = include("/general/args/arg");
const DataType = include("/general/dataType");

class Args {
    get items() { return this.mItems; }

    constructor() {
        this.mItems = [];
    }

    static parse(pInputs, pTemplates) {
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
                args.add(new Arg(template.name, value));
                template = null; 
            }
        }
        return args;
    }

    add(pArg) {
        this.items.push(pArg);
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
        for (const item of this.items)
            logger.writeText(item.toString(), 2);
    }
}

module.exports = Args;