/**
 * @module Main file
 * @description File application execution starts from
 * @version 0.0.1 (2021-02-17)
 */

global.__rootDir = __dirname;
global.__srcDir = `${__rootDir}/src`;
module.exports = (global.include = (lPath) => { return require(`${global.__srcDir}/${lPath}`); })

const Application = include("/application");

(() => {
    global.application = new Application(process.argv);
    global.application.run();
})();