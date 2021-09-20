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

export default class DynamicsAlRenumberator extends Renumberator {
    get code() { return "AL"; }
    get name() { return "Dynamics AL Renumberator"; }
    
    get dynamicsManager() { return this.engine.dynamicsManager; }
    get regExpSchema() { return this.mRegExpSchema; }
    get dynamicsObject() { return this.mDynamicsObject; }
    set dynamicsObject(pValue) { this.mDynamicsObject = pValue; }

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
            ),
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.enumValue,
                "Enum Value",
                "(?<prefix>\\s*)value\\(\\s*(?<no>\\d+);\\s*(?<name>.+)\\)(?<suffix>.*)",
                RegExpFlag.ignoreCase,
                "${prefix}value(${renumberedNo}; ${name})${suffix}"
            )
        ]);
        this.mDynamicsObject = null;
    }

    canRenumber(pFilePath) {
        return Path.extname(pFilePath).trim().toLowerCase() === ".al";
    }

    async renumber(pFilePath) {
        this.initialise(pFilePath);
        this.createNewFile();
        await this.renumberFile();
        this.overwriteFileWithNewFile();
    }

    initialise(pFilePath) {
        this.filePath = pFilePath;
        this.dynamicsObject = null;
    }

    async renumberFile() {
        const endOfLine = EndOfLineType.toString(this.engine.settings.general.endOfLineType);
        const fileStream = FileSystem.createReadStream(this.filePath);
        const readLineInterface = ReadLine.createInterface({ input: fileStream, crlfDelay: Infinity });        
        for await (const line of readLineInterface) {
            const newLine = this.renumberLine(line);
            this.newFile.write(newLine + endOfLine);
        }
        fileStream.close();
    }

    renumberLine(pLine) {
        let newLine = "";
        const match = this.regExpSchema.tryToMatch(pLine);
        if (match.success) {
            let object = null;
            switch (match.template.name) {
                case DynamicsAlRegExpTemplateName.object:
                case DynamicsAlRegExpTemplateName.objectExtension:
                    object = this.renumberDynamicsObject(match);
                    break;
                case DynamicsAlRegExpTemplateName.tableField:
                case DynamicsAlRegExpTemplateName.enumValue:
                    object = this.renumberDynamicsObjectField(match);
                    break;
            }
            if (object != null) {
                const replacements = object.merge(match.namedGroups);
                newLine = this.regExpSchema.replace(match.template.replaceWith, replacements);
            }
        }
        return newLine ? newLine : pLine;
    }

    renumberDynamicsObject(pMatch) {
        const parsedDynamicsObject = this.parseDynamicsObject(pMatch);
        return this.engine.dynamicsObjects.get(parsedDynamicsObject.type, parsedDynamicsObject.no);
    }

    parseDynamicsObject(pMatch) {
        const type = DynamicsObjectType.parse(pMatch.namedGroups.type);
        const no = Number.validateAsInteger(pMatch.namedGroups.no);
        const name = pMatch.namedGroups.name;
        return new DynamicsObject(type, no, name);
    }

    renumberDynamicsObjectField(pMatch) {
        let dynamicsObjectField = null;
        if (this.dynamicsObject != null) {
            const parsedDynamicsObjectField = this.parseDynamicsObjectField(pMatch);
            dynamicsObjectField = this.dynamicsObject.fields.get(parsedDynamicsObjectField.no);
        }
        return dynamicsObjectField;
    }

    parseDynamicsObjectField(pMatch) {
        const no = Number.validateAsInteger(pMatch.namedGroups.no);
        const name = pMatch.namedGroups.name;
        const dataType = pMatch.namedGroups.dataType;
        return new DynamicsObjectField(no, name, dataType);
    }
}
