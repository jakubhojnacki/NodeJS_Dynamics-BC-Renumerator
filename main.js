(() => {
    global.application = new Application(process.argv);
    global.application.run();
});