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
    get name() { return "AL Renumberator"; }    
    get dynamicsManager() { return this.engine.dynamicsManager; }
    get regExpSchema() { return this.mRegExpSchema; }
    get dynamicsObject() { return this.mDynamicsObject; }
    set dynamicsObject(pValue) { this.mDynamicsObject = pValue; }

    constructor(pEngine) {
        super(pEngine);
        this.mRegExpSchema = new RegExpSchema([
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.object, 
                "Object",
                "(?<prefix>\\s*)(?<type>table|page|codeunit|report|xmlport|query|enum)\\s*(?<no>\\d+)\\s*(?<name>.+)", 
                RegExpFlag.ignoreCase,
                "${prefix}${type} ${renumberedNo} \"${name}\""
            ),
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.objectExtension,
                "Object Extension",
                "(?<prefix>\\s*)(?<type>tableextension|pageextension|enumextension)\\s*(?<no>\\d+)\\s*(?<name>.+)\\s*extends\\s*(?<extendsName>.+)",
                RegExpFlag.ignoreCase,
                "${prefix}${type} ${renumberedNo} \"${name}\" extends \"${extendsName}\""
            ),
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.tableField,
                "Table Field",
                "(?<prefix>\\s*)field\\(\\s*(?<no>\\d+);\\s*(?<name>.+);\\s*(?<dataType>.+)\\)",
                RegExpFlag.ignoreCase,
                "${prefix}field(${renumberedNo}; \"${name}\"; ${dataType})"
            ),
            new RegExpTemplate(
                DynamicsAlRegExpTemplateName.enumValue,
                "Enum Value",
                "(?<prefix>\\s*)value\\(\\s*(?<no>\\d+);\\s*(?<name>.+)\\)",
                RegExpFlag.ignoreCase,
                "${prefix}value(${renumberedNo}; \"${name}\")"
            )
        ]);
        this.mDynamicsObject = null;
    }

    async canRenumber(pFilePath) {
        return Path.extname(pFilePath).trim().toLowerCase() === ".al";
    }

    async renumber(pFilePath) {
        this.initialise(pFilePath, true);
        await this.process();
        this.finalise();
    }

    async process() {
        const endOfLine = EndOfLineType.toString(this.engine.settings.general.endOfLineType);
        const fileStream = FileSystem.createReadStream(this.filePath);
        const readLineInterface = ReadLine.createInterface({ input: fileStream, crlfDelay: Infinity });        
        for await (const line of readLineInterface) {
            const newLine = this.processLine(line);
            this.fileBuffer.write(newLine + endOfLine);
        }
        fileStream.close();
    }

    processLine(pLine) {
        let newLine = "";
        const match = this.regExpSchema.tryToMatch(pLine);
        if (match.success) {
            let object = null;
            switch (match.template.name) {
                case DynamicsAlRegExpTemplateName.object:
                case DynamicsAlRegExpTemplateName.objectExtension:
                    object = this.findRenumberedDynamicsObject(match);
                    break;
                case DynamicsAlRegExpTemplateName.tableField:
                case DynamicsAlRegExpTemplateName.enumValue:
                    object = this.findRenumberedDynamicsObjectField(match);
                    break;
            }
            if (object != null) {
                const replacements = object.merge(match.namedGroups);
                newLine = this.regExpSchema.replace(match.template.replaceWith, replacements);
            }
        }
        return newLine ? newLine : pLine;
    }

    findRenumberedDynamicsObject(pMatch) {
        const dynamicsObjectMatched = this.parseDynamicsObjectMatched(pMatch);
        this.dynamicsObject = this.engine.dynamicsObjects.get(dynamicsObjectMatched.type, dynamicsObjectMatched.no);
        if (this.dynamicsObject) {
            this.dynamicsObject.name = dynamicsObjectMatched.name;
            this.dynamicsObject.extendsName = dynamicsObjectMatched.extendsName;
        }
        return this.dynamicsObject;
    }

    parseDynamicsObjectMatched(pMatch) {
        const type = DynamicsObjectType.parse(pMatch.namedGroups.type);
        const no = Number.validateAsInteger(pMatch.namedGroups.no);
        const name = DynamicsAlRenumberator.parseName(pMatch.namedGroups.name);
        const extendsName = DynamicsAlRenumberator.parseName(pMatch.namedGroups.extendsName);
        return new DynamicsObject(type, no, name, null, null, extendsName);
    }

    findRenumberedDynamicsObjectField(pMatch) {
        let dynamicsObjectField = null;
        if (this.dynamicsObject != null) {
            const dynamicsObjectFieldMatched = this.parseDynamicsObjectFieldMatched(pMatch);
            dynamicsObjectField = this.dynamicsObject.fields.get(dynamicsObjectFieldMatched.no);
            if (dynamicsObjectField)
                dynamicsObjectField.dataType = dynamicsObjectFieldMatched.dataType;
        }
        return dynamicsObjectField;
    }

    parseDynamicsObjectFieldMatched(pMatch) {
        const no = Number.validateAsInteger(pMatch.namedGroups.no);
        const name = DynamicsAlRenumberator.parseName(pMatch.namedGroups.name);
        const dataType = pMatch.namedGroups.dataType;
        return new DynamicsObjectField(no, name, dataType);
    }

    static parseName(pName) {
        const name = String.validate(pName);
        return (name.trim().removeIfStartsWith("\"").removeIfEndsWith("\"")).trim();
    }
}
