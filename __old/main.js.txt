/**
 * @module Main file
 * @description File application execution starts from
 * @version 0.0.1 (2021-02-17)
 */

const Application = require("./src/application/application");

(() => {
    global.application = new Application(process.argv);
    global.application.run();
})();