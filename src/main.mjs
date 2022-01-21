/**
 * @module "Main"
 * @description Main entry point of the application
 */

"use strict";

import { Application } from "./application/application.mjs";
import { Node } from "fortah-core-library";

(() => {
    const rootDirectoryPath = Node.getRoot(import.meta, true);
    global.theApplication = new Application(rootDirectoryPath);
    global.theApplication.run();
})();