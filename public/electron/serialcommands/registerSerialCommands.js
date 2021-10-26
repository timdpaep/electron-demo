/**
 * Register different action endpoints
 */

const { SerialCommandHandler } = require('../lib/serial');
const appData = require('../appData');

module.exports = () => {
  // init a new command handler
  const serialCommandHandler = new SerialCommandHandler();

  // define the commands
  serialCommandHandler.addCommand("HELLO", require('./hello'));

  // add to our app data
  appData.serialCommandHandler = serialCommandHandler;
}