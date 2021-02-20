/**
 * @module "ArgTemplates" class
 * @description Represents an array of argument templates
 * @version 0.0.1 (2021-02-20)
 */

const { logger } = require("./argName");

include("/general/javaScript");

class ArgTemplates extends Array {
    constructor(pArgTemplateArray) {
        if (pArgTemplateArray != null)
            for (const argTemplate in pArgTemplateArray)
                this.push(argTemplate);
    }

    log(pLogger, pArgs) {
        logger.writeText("Arguments:");
        const indentation = pLogger.tab;
        for (const argTemplate of this) {
            logger.writeText(argTemplate.toString(), indentation);
            const arg = pArgs.find((lArg) => { return lArg.name === argTemplate.name; });
            if (arg != null)
                logger.writeText(`Passed: ${arg.value}; Correct: ${arg.validated}.`, indentation + pLogger.tab);
            else
                logger.writeText("Not passed.");
        }
    }
}

module.exports = ArgTemplates;