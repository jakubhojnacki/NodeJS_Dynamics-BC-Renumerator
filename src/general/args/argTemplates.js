/**
 * @module "ArgTemplates" class
 * @description Represents an array of argument templates
 * @version 0.0.1 (2021-02-20)
 */

const { logger } = require("./argName");

include("/general/javaScript");

class ArgTemplates extends Array {
    constructor(pArgTemplateArray) {
        super();
        if (pArgTemplateArray != null)
            for (const argTemplate of pArgTemplateArray)
                this.push(argTemplate);
    }

    log(pLogger, pArgs) {
        pLogger.writeText("Arguments:");
        const indentation = pLogger.tab;
        for (const argTemplate of this) {
            pLogger.writeText(argTemplate.toString(pArgs), indentation);
            const arg = pArgs.find((lArg) => { return lArg.name === argTemplate.name; });
            if (arg != null)
                pLogger.writeText(`Passed: ${arg.value}; Correct: ${arg.valid}.`, indentation + pLogger.tab);
            else
                pLogger.writeText("Not passed.", indentation + pLogger.tab);
        }
    }
}

module.exports = ArgTemplates;