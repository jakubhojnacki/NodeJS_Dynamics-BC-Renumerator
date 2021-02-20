/**
 * @module Main file
 * @description File application execution starts from
 * @version 0.0.1 (2021-02-17)
 */

global.srcDirectory = `${__dirname}/src`;
module.exports = (global.include = (pPath) => { return require(global.srcDirectory + pPath); })

const Application = include("/application");

(() => {
    global.application = new Application(process.argv);
    global.application.run();
})();