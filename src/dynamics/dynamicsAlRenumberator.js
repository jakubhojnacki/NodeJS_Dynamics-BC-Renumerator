/**
 * @module "DynamicsAlRenumberator" class
 * @description Handles Dynamics AL renumberation
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import DynamicsAlRegExpTemplateName from "./dynamicsAlRegExpTemplateName.js";
import DynamicsObject from "../dynamics/dynamicsObject.js";
import DynamicsObjectField from "../dynamics/dynamicsObjectField.js";
import DynamicsObjectType from "../dynamics/dynamicsObjectType.js";
import EndOfLineType from "../general/endOfLineType.js";
import FileSystem from "fs";
import Path from "path";
import ReadLine from "readline";
import RegExpFlag from "../regExp/regExpFlag.js";
import RegExpSchema from "../regExp/regExpSchema.js";
import RegExpTemplate from "../regExp/regExpTemplate.js";
import Renumberator from "../engine/renumberator.js";
import RegExpFlags from "../regExp/regExpFlags.js";

export default class DynamicsAlRenumberator extends Renumberator {
    get name() { return "Dynamics AL Renumberator"; }
    get dynamicsManager() { return this.engine.dynamicsManager; }
    get regExpSchema() { return this.mRegExpSchema; }
    get dynamicsObject() { return this.mDynamicsObject; }
    set dynamicsObject(pValue) { this.mDynamicsObject = pValue; }
    get dynamicsObjectField() { return this.mDynamicsObjectField; }
    set dynamicsObjectField(pValue) { this.mDynamicsObjectField = pValue; }
    get existingDynamicsObject() { return this.mExistingDynamicsObject; }
    set existingDynamicsObject(pValue) { this.mExistingDynamicsObject = pValue; }

    constructor(pRenumberation) {
        super(pRenumberation);
        this.mRegExpSchema = new RegExpSchema([
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.object, 
                "Object",
                "(?<prefix>\\s*)(?<type>table|page|codeunit|report|xmlport|query|enum)\\s*(?<no>\\d+)\\s*(?<name>.+)(?<suffix>.*)", 
                RegExpFlag.ignoreCase,
                "${prefix}${type} ${renumberedNo} \"${name}\"${suffix}"
            ),
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.objectExtension,
                "Object Extension",
                "(?<prefix>\\s*)(?<type>tableextension|pageextension|enumextension)\\s*(?<no>\\d+)\\s*(?<name>.+)\\s*extends(?<extends>.+)(?<suffix>.*)",
                RegExpFlag.ignoreCase,
                "${prefix}${type} ${renumberedNo} \"${name}\" extends \"${extends}\"${suffix}"
            ),
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.tableField,
                "Table Field",
                "(?<prefix>\\s*)field\\(\\s*(?<no>\\d+);\\s*(?<name>.+);\\s*(?<dataType>.+)\\)(?<suffix>.*)",
                RegExpFlag.ignoreCase,
                "${prefix}field(${renumberedNo}; ${name}; ${dataType})${suffix}"
            )
        ]);
        this.mDynamicsObject = null;
        this.mDynamicsObjectField = null;
        this.mExistingDynamicsObject = null;
    }

    canRenumber(pFilePath) {
        return Path.extname(pFilePath).trim().toLowerCase() === ".al";
    }

    async renumber(pFilePath) {
        this.initialise(pFilePath);
        this.createNewFile();
        await this.renumberFile();
        //TODO - Why is this commented out?
        // this.overwriteFileWithNewFile();
    }

    initialise(pFilePath) {
        this.filePath = pFilePath;
        this.dynamicsObject = null;
        this.dynamicsObjectField = null;
        this.existingDynamicsObject = null;
    }

    async renumberFile() {
        const fileStream = FileSystem.createReadStream(this.filePath);
        const readLineInterface = ReadLine.createInterface({ input: fileStream, crlfDelay: Infinity });
        for await (const line of readLineInterface) {
            const newLine = await this.renumberLine(line);
            this.newFile.write(newLine + EndOfLineType.toString(this.engine.settings.general.endOfLineType));
        }
        fileStream.close();
    }

    async renumberLine(pLine) {
        let newLine = pLine;
        const match = this.regExpSchema.tryToMatch(pLine);
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
        return this.createDynamicsObjectNewLine(pMatch);
    }

    parseDynamicsObject(pMatch) {
        const type = DynamicsObjectType.parse(pMatch.namedGroups.type);
        const no = Number.validateAsInteger(pMatch.namedGroups.no);
        const name = pMatch.namedGroups.name;
        this.dynamicsObject = new DynamicsObject(type, no, name);
    }

    async renumberDynamicsObject() {
        this.existingDynamicsObject = this.dynamicsManager.getObject(this.dynamicsObject.type, this.dynamicsObject.no);
        if (this.existingDynamicsObject != null)
            this.dynamicsObject.renumberedNo = this.existingDynamicsObject.renumberedNo;
        else
            this.dynamicsObject.renumberedNo = await this.dynamicsManager.reserveObject(this.dynamicsObject.type);
    }

    createDynamicsObjectNewLine(pMatch) {
        let replacements = this.dynamicsObject.merge(pMatch.namedGroups);
        return this.regExpSchema.replace(pMatch.template.replaceWith, replacements);
    }

    async processDynamicsObjectField(pMatch) {
        this.parseDynamicsObjectField(pMatch);
        await this.renumberDynamicsObjectField();
        return this.createDynamicsObjectFieldNewLine(pMatch);
    }

    parseDynamicsObjectField(pMatch) {
        const no = Number.validateAsInteger(pMatch.namedGroups.no);
        const name = pMatch.namedGroups.name;
        const dataType = pMatch.namedGroups.dataType;
        this.dynamicsObjectField = new DynamicsObjectField(no, name, dataType);
    }

    async renumberDynamicsObjectField() {
        if (this.dynamicsObject != null) {
            let existingDynamicsObjectField = null;
            if (this.existingDynamicsObject != null)
                existingDynamicsObjectField = this.existingDynamicsObject.getObject(this.dynamicsObjectField.no);
            if (existingDynamicsObjectField != null)
                this.dynamicsObjectField.renumberedNo = existingDynamicsObjectField.renumberedNo;
            else
                this.dynamicsObjectField.renumberedNo = await this.dynamicsManager.reserveObjectField(this.dynamicsObject.type, this.dynamicsObject.no);
        }
    }

    createDynamicsObjectFieldNewLine(pMatch) {
        let replacements = this.dynamicsObjectField.merge(pMatch.namedGroups);
        return this.regExpSchema.replace(pMatch.template.replaceWith, replacements);
    }
}
