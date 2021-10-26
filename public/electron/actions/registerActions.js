/**
 * Register different action endpoints
 */

const { ipcMain } = require('electron');

module.exports = () => {
  ipcMain.on('hello', require('./hello'));
  ipcMain.on('listSerialPorts', require('./listSerialPorts'))
  ipcMain.on('setLedColor', require('./setLedColor'));
  ipcMain.on('configAddresses', require('./configAddresses'));
  ipcMain.on('getAddresses', require('./getAddresses'));
}