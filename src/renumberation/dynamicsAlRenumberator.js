/**
 * @module "DynamicsAlRenumberator" class
 * @description Handles Dynamics AL renumberation
 * @version 0.0.1 (2021-02-21)
 */

const fs = require("fs");
const path = require("path");
const readline = require('readline');
__require("general/javaScript");
const Renumberator = __require("renumberation/renumberator");

class DynamicsAlRenumberator extends Renumberator {
    get name() { return "Dynamics AL Renumberator"; }

    constructor() {
        super();
    }

    canRenumber(pFilePath) {
        return path.extname(pFilePath).trim().toLowerCase() === ".al";
    }

    renumber(pFilePath) {
        this.createNewFile(pFilePath);
        this.renumberFile(pFilePath);
        this.overwriteFileWithNewFile(pFilePath);
    }

    async renumberFile(pFilePath) {
        const fileStream = fs.createReadStream(pFilePath);
        const readLineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
        for await (const line of readLineInterface) {
            const newLine = this.renumberLine(line);
            this.newFile.write(newLine + "\r\n");
        }
        fileStream.close();
    }

    renumberLine(pLine) {
        const newLine = pLine;
        /* 
        private const string ObjectExtensionPattern = "(?<Prefix>\\s*)(?<Type>tableextension|pageextension)\\s*(?<Id>\\d+)\\s*(?<Name>.+)\\s*extends(?<Extends>.+)(?<Suffix>.*)";
        private const string ObjectPattern = "(?<Prefix>\\s*)(?<Type>table|page|codeunit|report|xmlport|query|enum)\\s*(?<Id>\\d+)\\s*(?<Name>.+)(?<Suffix>.*)";
        private const string ObjectExtensionReplacement = "${Prefix}${Type} ${Id} \"${Name}\" extends \"${Extends}\"${Suffix}";
        private const string ObjectReplacement = "${Prefix}${Type} ${Id} \"${Name}\"${Suffix}";        
        */
       return newLine;
    }
}

module.exports = DynamicsAlRenumberator;