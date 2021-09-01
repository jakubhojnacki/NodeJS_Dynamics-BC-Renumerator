/**
 * @module "Engine" class
 * @description Represents application engine
 * @version 0.0.1 (2021-08-10)
 */

import "../general/javaScript.js";
import ArgName from "../args/argName.js";
import FileMatcher from "../general/fileMatcher.js";
import FileSystem from "fs";
import FileSystemToolkit from "../general/fileSystemToolkit.js";
import ImageMagick from "./imageMagick.js";
import Path from "path";
import Sizes from "./sizes.js";
import Source from "./source.js";

export default class Engine {
    constructor() {
    }

    async run() {      
        this.initialise();
        await this.process();
        this.finalise();
    }

    initialise() {
        /*TODO - Implement*/
    }

    async process() {
        /*TODO - Implement*/
    }

    finalise() {        
        /*TODO - Implement*/
    }
}