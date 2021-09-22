/**
 * @module "XmlToolkit" class
 * @description Provides basic XML functionality
 * @version 0.0.1 (2021-09-21)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import XML2JS from "xml2js";

export default class XmlToolkit {
    static async parse(pData) {
        return new Promise((lResolve, lReject) => {
            const parser = XML2JS.Parser();
            parser.parseString(pData, (lError, lResult) => {
                if (lError)
                    lReject(lError);
                else
                    lResolve(lResult);
            });
        });
    }

    static async toString(pData) {
        const builder = new XML2JS.Builder();
        return await builder.buildObject(pData);
    }

    static async readFromFile(pFilePath) {
        const content = FileSystem.readFileSync(pFilePath);
        return XmlToolkit.parse(content);
    }

    static async writeToFile(pData, pFilePath) {
        const xml = await XmlToolkit.toString(pData);
        FileSystem.writeFileSync(pFilePath, xml);
    }
}