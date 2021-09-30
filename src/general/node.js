/**
 * @module "Node" class
 * @description Provides some node-specific tools
 * @version 0.0.2 (2021-07-27)
 */

import "./javaScript.js";
import Path from "path";
import Url from "url";

export default class Node {
    static getRoot(pMeta, pUseParent) {
        const filePath = Url.fileURLToPath(pMeta.url);
        let directoryPath = Path.dirname(filePath);
        if (Boolean.validate(pUseParent))
            directoryPath = Path.normalize(Path.join(directoryPath, ".."));
        return directoryPath;
    }    
}