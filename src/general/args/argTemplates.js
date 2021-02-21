/**
 * @module "ArgTemplates" class
 * @description Represents an array of argument templates
 * @version 0.0.1 (2021-02-20)
 */

__require("general/javaScript");

class ArgTemplates extends Array {
    constructor(pArgTemplateArray) {
        super();
        if (pArgTemplateArray != null)
            for (const argTemplate of pArgTemplateArray)
                this.push(argTemplate);
    }

    reportInvalid(pArgs, pIndentation) {
        const logger = global.application.logger;
        let indentation = Number.default(pIndentation);
        logger.writeText("Application args are invalid:", indentation);
        indentation += logger.tab;
        for (const argTemplate of this) {
            logger.writeText(argTemplate.toString(pArgs), indentation);
            const arg = pArgs.find((lArg) => { return lArg.name === argTemplate.name; });
            if (arg != null)
                logger.writeText(`Passed: ${arg.value}; Valid: ${arg.valid}.`, indentation + logger.tab);
            else
                logger.writeText("Not passed.", indentation + logger.tab);
        }
    }
}

module.exports = ArgTemplates;