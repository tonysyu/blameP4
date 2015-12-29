var app = require('app');
var BrowserWindow = require('browser-window');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL('file://' + __dirname + '/src/index.html');

    mainWindow.on('closed', function() {
        // Dereference the global window object when closed.
        mainWindow = null;
    });
});
