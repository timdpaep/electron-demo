/**
 * List the Serial ports
 */

const { getSerialPorts } = require('../lib/serial');

module.exports = async (e) => {
  e.returnValue = await getSerialPorts();
}