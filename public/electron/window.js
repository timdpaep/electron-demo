/**
 * The definition of our Electron window
 */

const { BrowserWindow, globalShortcut } = require('electron')

/**
 * Some variables
 */

const browserWidth = 800;
const browserHeight = 600;

/**
 * Function that will create a new window
 */

const registerGlobalShortCuts = (window) => {
  // register shortcuts
  globalShortcut.register('Alt+Cmd+I', () => window.webContents.openDevTools());
}

const createWindow = () => {
  // Create the browser window.
  const window = new BrowserWindow({
    width: browserWidth,
    height: browserHeight,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // preload: __dirname + "/preload.js"
    }
  });

  // register the global window shortcuts
  registerGlobalShortCuts(window);

  // window.webContents.send('msg');

  return window;
}

module.exports = createWindow;