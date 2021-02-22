/**
 * @module "DynamicsAlRenumberator" class
 * @description Handles Dynamics AL renumberation
 * @version 0.0.1 (2021-02-21)
 */

const fs = require("fs");
const path = require("path");
const readline = require('readline');
const DynamicsManager = require("../dynamics/dynamicsManager");
__require("general/javaScript");
const DynamicsAlRegExpTemplateName = __require("renumberation/dynamicsAlRegExpTemplateName");
const DynamicsObject = __require("dynamics/dynamicsObject");
const DynamicsObjectField = __require("dynamics/dynamicsObjectField");
const RegExpFlag = __require("regExp/regExpFlag");
const RegExpSchema = __require("regExp/regExpSchema");
const RegExpTemplate = __require("regExp/regExpTemplate");
const Renumberator = __require("renumberation/renumberator");

class DynamicsAlRenumberator extends Renumberator {
    get name() { return "Dynamics AL Renumberator"; }
    get regexSchema() { return this.mRegexSchema; }
    get dynamicsManager() { return this.mDynamicsManager; }
    set dynamicsManager(pValue) { this.mDynamicsManager = pValue; }
    get dynamicsObject() { return this.mDynamicsObject; }
    set dynamicsObject(pValue) { this.mDynamicsObject = pValue; }
    get dynamicsObjectField() { return this.mDynamicsObjectField; }
    set dynamicsObjectField(pValue) { this.mDynamicsObjectField = pValue; }
    get existingDynamicsObject() { return this.mExistingDynamicsObject; }
    set existingDynamicsObject(pValue) { this.mExistingDynamicsObject = pValue; }

    constructor() {
        super();
        this.mRegexSchema = new RegExpSchema([
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.object, 
                "Object",
                "(?<prefix>\\s*)(?<type>table|page|codeunit|report|xmlport|query|enum)\\s*(?<id>\\d+)\\s*(?<name>.+)(?<suffix>.*)", 
                RegExpFlag.ignoreCase,
                "${prefix}${type} ${renumberedId} \"${name}\"${suffix}"
            ),
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.objectExtension,
                "Object Extension",
                "(?<prefix>\\s*)(?<type>tableextension|pageextension|enumextension)\\s*(?<id>\\d+)\\s*(?<name>.+)\\s*extends(?<extends>.+)(?<suffix>.*)",
                RegExpFlag.ignoreCase,
                "${prefix}${type} ${renumberedId} \"${name}\" extends \"${extends}\"${suffix}"
            )
        ]);
        this.mDynamicsManager = null;
        this.mDynamicsObject = null;
        this.mDynamicsObjectField = null;
        this.mExistingDynamicsObject = null;
    }

    canRenumber(pFilePath) {
        return path.extname(pFilePath).trim().toLowerCase() === ".al";
    }

    async renumber(pFilePath) {
        await this.initialise(pFilePath);
        this.createNewFile();
        await this.renumberFile();
        this.overwriteFileWithNewFile();
    }

    async initialise(pFilePath) {
        this.filePath = pFilePath;
        if (this.dynamicsManager == null) {
            this.dynamicsManager = new DynamicsManager();
            await this.dynamicsManager.readObjects();
        }
        this.dynamicsObject = null;
        this.dynamicsObjectField = null;
        this.existingDynamicsObject = null;
    }

    async renumberFile() {
        const fileStream = fs.createReadStream(this.filePath);
        const readLineInterface = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
        for await (const line of readLineInterface) {
            const newLine = await this.renumberLine(line);
            this.newFile.write(newLine + "\r\n");
        }
        fileStream.close();
    }

    async renumberLine(pLine) {
        const newLine = pLine;
        const match = this.regexSchema.tryToMatch(pLine);
        if (match.success)
            if (this.hasObjectBeenMatched(match))
                newLine = await this.processDynamicsObject(match);
            else
                newLine = await this.processDynamicsObjectField(match);
        return newLine;
    }

    hasObjectBeenMatched(pMatch) {
        return ((pMatch.template.name === DynamicsAlRegExpTemplateName.object) || 
            (pMatch.template.name === DynamicsAlRegExpTemplateName.objectExtension));
    }

    async processDynamicsObject(pMatch) {
        this.parseDynamicsObject(pMatch);
        await this.renumberDynamicsObject();
        return this.createDynamicsObjectNewLine();
    }

    parseDynamicsObject(pMatch) {
        const type = DynamicsObjectType.parse(pMatch.groups.type);
        const id = Number.tryToParseInt(pMatch.groups.id);
        const name = pMatch.groups.name;
        this.dynamicsObject = new DynamicsObject(type, id, name);
    }

    async renumberDynamicsObject() {
        this.existingDynamicsObject = this.dynamicsManager.getObject(this.dynamicsObject.type, this.dynamicsObject.id);
        if (this.existingDynamicsObject != null)
            this.dynamicsObject.renumberedId = this.existingDynamicsObject.renumberedId;
        else
            this.dynamicsObject.renumberedId = await this.dynamicsManager.reserveObject(this.dynamicsObject.type);
    }

    createDynamicsObjectNewLine() {
        //TODO - Not implemented
    }

    async processDynamicsObjectField(pMatch) {
        this.parseDynamicsObjectField(pMatch);
        await this.renumberDynamicsObjectField();
        return this.createDynamicsObjectFieldNewLine();
    }

    parseDynamicsObjectField(pMatch) {
        const id = Number.tryToParseInt(pMatch.groups.id);
        const name = pMatch.groups.name;
        this.dynamicsObjectField = new DynamicsObjectField(type, id, name);
    }

    async renumberDynamicsObjectField() {
        if (this.dynamicsObject != null) {
            let existingDynamicsObjectField = null;
            if (this.existingDynamicsObject != null)
                existingDynamicsObjectField = this.existingDynamicsObject.getObject(this.dynamicsObjectField.id);
            if (existingDynamicsObjectField != null)
                this.dynamicsObjectField.renumberedId = existingDynamicsObjectField.renumberedId;
            else
                this.dynamicsObjectField.renumberedId = await this.dynamicsManager.reserveObjectField(this.dynamicsObject.type, this.dynamicsObject.id);
        }
    }

    createDynamicsObjectFieldNewLine() {
        //TODO - Not implemented
    }
}

module.exports = DynamicsAlRenumberator;