/**
 * @module Main file
 * @description File application execution starts from
 * @version 0.0.1 (2021-02-17)
 */

global.rootFolderPath = __dirname;
global.srcFolderPath = `${rootFolderPath}/src`;
module.exports = (global.include = (lPath) => { return require(`${global.srcFolderPath}/${lPath}`); })

const Application = include("/application");

(() => {
    global.application = new Application(process.argv);
    global.application.run();
})();