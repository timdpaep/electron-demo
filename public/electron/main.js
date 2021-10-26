/**
 * The electron startup script
 */

const { app, BrowserWindow } = require('electron')
const createWindow = require('./window');
const registerActions = require('./actions/registerActions');
const registerSerialCommands = require('./serialcommands/registerSerialCommands');
const appData = require('./appData');
const { Serial, SerialLine, SerialLineConvert } = require('./lib/serial');
const { serial } = require('./appData');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // create a new window
  appData.mainWindow = createWindow();

  // Register the actions
  registerActions();

  // create a serial command handler
  registerSerialCommands();

  // creata a serial object
  appData.serial = new Serial({
    path: '/dev/tty.usbserial-14230',
    autoOpen: true,
    baudRate: 9600,
    onDataReceived: (incoming) => {

      // convert the incoming serial data into a serial line
      const serialLine = new SerialLine({ serialLine: incoming });

      // when we receive a command, handle the action behind it
      if(serialLine.getType() === "Command") {
        appData.serialCommandHandler.handleCommand(serialLine.getSerialCommand());
      }

      // if we receive a return value, pass it towards the return value
      // of the last triggered event
      else if(serialLine.getType() === "ReturnValue") {
        if(appData.lastEvent) {
          appData.lastEvent.returnValue = serialLine.getLine();
          appData.lastEvent = null;
        }
      }

      // if we do not recognize this event,
      // just console log out the serial line
      // so we know what we are doing
      else {
        console.log(serialLine.getLine());
      }

    }
  });

  // loads the main url
  appData.mainWindow.loadURL('http://localhost:3000');
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

