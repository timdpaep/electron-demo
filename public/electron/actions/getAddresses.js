/**
 * Get the master's internal addresses
 */

const AppData = require('../appData');
const { SerialCommand } = require('../lib/serial');

module.exports = (e) => {
  // create a new serial command
  const command = new SerialCommand({
    commandName: 'GETADDRESSES'
  });

  // set the last event, because we need to return something
  AppData.lastEvent = e;

  // write the command to the serial output
  AppData.serial.write(command.createCommand());
}