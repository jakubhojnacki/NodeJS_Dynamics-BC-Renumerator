/**
 * @module Main file
 * @description File application execution starts from
 * @version 0.0.1 (2021-02-17)
 */

global.__rootFolderPath = __dirname;
global.__srcFolderPath = `${__rootFolderPath}/src`;
module.exports = (global.__require = (lPath) => { return require(`${global.__srcFolderPath}/${lPath}`); })

const Application = __require("/application");

(() => {
    global.application = new Application(process.argv);
    global.application.run();
})();