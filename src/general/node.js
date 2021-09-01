/**
 * @module "Node" class
 * @description Provides some node-specific tools
 * @version 0.0.2 (2021-07-27)
 */

import Path from "path";
import Url from "url";

export default class Node {
    static getRoot(pMeta) {
        const filePath = Url.fileURLToPath(pMeta.url);
        const directoryPath = Path.dirname(filePath);
        return directoryPath;
    }    
}