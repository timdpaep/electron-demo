/**
 * Configures the addresses
 */

const AppData = require('../appData');
const { SerialCommand } = require('../lib/serial');

module.exports = (e, args) => {
  // destructre the arguments
  const { addresses } = args;

  // create a new serial command
  const command = new SerialCommand({
    commandName: 'CONFIGADDRESSES'
  });

  // add parameters to our command
  addresses.forEach(address => command.addParameter(address));

  // create the command
  const strCommand = command.createCommand();

  // write the command to the serial output
  AppData.serial.write(strCommand);
}