const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 670, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

});

app.on('window-all-closed', () => {
  app.quit();
});
