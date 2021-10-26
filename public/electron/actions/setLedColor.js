/**
 * Sets the Led Color via our Arduino
 */

const AppData = require('../appData');
const { SerialCommand } = require('../lib/serial');

module.exports = (e, args) => {
  // destructre the arguments
  const { color, address } = args;

  // create a new serial command
  const command = new SerialCommand({
    commandName: 'SETLEDCOLOR'
  });

  // add parameters to our command
  command.addParameter(color);

  // write the command to the serial output
  AppData.serial.write(command.createSendCommand(address));
}