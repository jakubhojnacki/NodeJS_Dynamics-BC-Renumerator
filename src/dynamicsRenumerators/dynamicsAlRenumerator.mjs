/**
 * @module "DynamicsAlRenumerator" class
 * @description Handles Dynamics AL renumeration
 */

"use strict";

import FileSystem from "fs";
import Path from "path";
import ReadLine from "readline";
 
import { DynamicsAlRegExpTemplateName } from "../dynamicsRenumerators/dynamicsAlRegExpTemplateName.mjs";
import { DynamicsObjectEx } from "../dynamics/dynamicsObjectEx.mjs";
import { DynamicsFieldEx } from "../dynamics/dynamicsFieldEx.mjs";
import { DynamicsObjectType } from "fortah-dynamics-library";
import { EndOfLineType } from "fortah-file-system-library";
import { RegexFlag } from "fortah-regex-library";
import { RegexTemplate } from "fortah-regex-library";
import { RegexTemplates } from "fortah-regex-library";
import { Renumerator } from "../logic/renumerator.mjs";

export class DynamicsAlRenumerator extends Renumerator {
    get name() { return "AL Renumerator"; }    
    get dynamicsManager() { return this.logic.dynamicsManager; }
    get regexTemplates() { return this.mRegexTemplates; }
    set regexTemplates(pValue) { this.mRegexTemplates = pValue; }
    get dynamicsObject() { return this.mDynamicsObject; }
    set dynamicsObject(pValue) { this.mDynamicsObject = pValue; }

    constructor(pLogic) {
        super(pLogic);
        this.regexTemplates = new RegexTemplates([
            new RegexTemplate(
                DynamicsAlRegExpTemplateName.object, 
                "(?<prefix>\\s*)(?<type>table|page|codeunit|report|xmlport|query|enum)\\s*(?<no>\\d+)\\s*(?<name>.+)", 
                RegexFlag.ignoreCase,
                "${prefix}${typeText} ${renumberedNo} \"${name}\""
            ),
            new RegexTemplate(
                DynamicsAlRegExpTemplateName.objectExtension,
                "(?<prefix>\\s*)(?<type>tableextension|pageextension|enumextension)\\s*(?<no>\\d+)\\s*(?<name>.+)\\s*extends\\s*(?<extendsName>.+)",
                RegexFlag.ignoreCase,
                "${prefix}${typeText} ${renumberedNo} \"${name}\" extends \"${extendsName}\""
            ),
            new RegexTemplate(
                DynamicsAlRegExpTemplateName.tableField,
                "(?<prefix>\\s*)field\\(\\s*(?<no>\\d+);\\s*(?<name>.+);\\s*(?<dataType>.+)\\)",
                RegexFlag.ignoreCase,
                "${prefix}field(${renumberedNo}; \"${name}\"; ${dataType})"
            ),
            new RegexTemplate(
                DynamicsAlRegExpTemplateName.enumValue,
                "(?<prefix>\\s*)value\\(\\s*(?<no>\\d+);\\s*(?<name>.+)\\)",
                RegexFlag.ignoreCase,
                "${prefix}value(${renumberedNo}; \"${name}\")"
            )
        ]);
        this.dynamicsObject = null;
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
        const endOfLine = EndOfLineType.toString(this.logic.application.settings.general.endOfLineType);
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
        const match = this.regexTemplates.match(pLine);
        if (match) {
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
                newLine = this.regexTemplates.replace(match.template.replaceWith, replacements);
            }
        }
        return newLine ? newLine : pLine;
    }

    findRenumberedDynamicsObject(pMatch) {
        const dynamicsObjectMatched = this.parseDynamicsObjectMatched(pMatch);
        this.dynamicsObject = this.logic.dynamicsObjects.get(dynamicsObjectMatched.type, dynamicsObjectMatched.no);
        if (this.dynamicsObject) {
            this.dynamicsObject.name = dynamicsObjectMatched.name;
            this.dynamicsObject.extendsName = dynamicsObjectMatched.extendsName;
        }
        return this.dynamicsObject;
    }

    parseDynamicsObjectMatched(pMatch) {
        const type = DynamicsObjectType.parse(pMatch.namedGroups.type);
        const no = Number.verifyAsInteger(pMatch.namedGroups.no);
        const name = DynamicsAlRenumerator.parseName(pMatch.namedGroups.name);
        const extendsName = DynamicsAlRenumerator.parseName(pMatch.namedGroups.extendsName);
        return new DynamicsObjectEx(type, no, name, null, null, extendsName);
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
        const no = Number.verifyAsInteger(pMatch.namedGroups.no);
        const name = DynamicsAlRenumerator.parseName(pMatch.namedGroups.name);
        const dataType = pMatch.namedGroups.dataType;
        return new DynamicsFieldEx(no, name, dataType);
    }

    static parseName(pName) {
        const name = String.verify(pName);
        return (name.trim().removeIfStartsWith("\"").removeIfEndsWith("\"")).trim();
    }
}
