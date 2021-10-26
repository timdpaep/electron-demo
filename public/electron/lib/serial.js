/**
 * A Library To interact with a serialport (Arduino)
 */

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const getSerialPorts = async () => (await SerialPort.list()).map((port) => port.path);

class SerialLine {
  constructor({ serialLine }) {
    this.serialLine = serialLine;
  }

  /**
   * Gets the type of the incoming serial line
   * @returns string
   */
  getType() {
    if(this.serialLine.startsWith('C_')) {
      return "Command"; // returns command
    } else if(this.serialLine.startsWith('R_')) {
      return "ReturnValue";
    } else {
      return "Unknown"; // returns unknown
    }
  }

  /**
   * This will get the plain serial line without the
   * type mark (C_, ...)
   * @returns
   */
  getLine() {
    const type = this.getType();
    if(type === "Command" || type === "ReturnValue") {
      return this.serialLine.substring(2, this.serialLine.length);
    } else {
      return this.serialLine;
    }
  }

  /**
   * This wil get the serial command out of the serial line
   */
  getSerialCommand() {
    const type = this.getType();
    if(type === "Command") {
      return this.convertCommandStringToSerialCommand(this.serialLine);
    } else {
      throw new Error("No valid serial command.");
    }
  }

  /**
   * This will convert a string that has been typed as Command
   * to a SerialCommand
   * @param {string} serialLine
   * @returns
   */
  convertCommandStringToSerialCommand(serialLine) {
    let plainCommand = serialLine.trim().substring(2, serialLine.length);
    plainCommand = plainCommand.trim().substring(0, plainCommand.length - 1);
    const splitted = plainCommand.split(',');
    const commandName = splitted.shift();
    const fromTo = splitted.shift();
    const params = splitted;
    return new SerialCommand({ commandName, fromTo, params });
  }
}

class SerialCommand {
  constructor({ commandName, fromTo="", params = [] }) {
    this.commandName = commandName;
    this.params = params;
    this.fromTo = fromTo;
  }

  addParameter(value) {
    this.params.push(value);
  }

  createCommand() {
    let out = "";
    if(this.fromTo) {
      out += "SENDCOMMAND";
      out += `,${this.fromTo}`;
    }
    out += this.commandName;
    out += `,${this.params.join(',')}`;
    out += ";";
    return out;
  }
}

class Serial {
  constructor({ path, autoOpen = true, baudRate = 9600, onDataReceived = null }) {
    this.path = path;
    this.port = new SerialPort(path, {
      baudRate,
      autoOpen
    });
    this.parser = this.port.pipe(new Readline({ delimiter: '\n' }));
    if(onDataReceived) this.parser.on('data', onDataReceived);
  }

  close() {
    return new Promise((resolve, reject) => {
      this.port.on("close", (err) => {
        if(err) reject(err);
        resolve();
      });
      this.port.close();
    });
  }

  delay(ms) {
    return new Promise(res => {
      setTimeout(res, ms);
    });
  }

  open() {
    return new Promise((resolve, reject) => {
      this.port.on("open", (err) => {
        if(err) reject(err);
        this.delay(2000).then(() => resolve()); // // a safe delay, after opening so everything is steady
      });
      this.port.open();
    });
  };

  write(data) {
    return new Promise((resolve, reject) => {
      this.port.write(data, (err) => {
        if(err) reject();
        resolve();
      });
    })
  }

  writeAndRead(data) {
    return new Promise((resolve, reject) => {
      this.port.write(data, (err) => {
        if(err) reject();
        resolve();
      });
    });
  }
}

class SerialCommandHandler {
  constructor() {
    this.commands = new Map();
  }

  addCommand(commandName, callback) {
    this.commands.set(commandName, callback);
  }

  handleCommand(command) {
    // check if we have this command
    if(this.commands.has(command.commandName)) {
      this.commands.get(command.commandName)(command);
    }
  }
}

module.exports = {
  Serial,
  SerialLine,
  SerialCommand,
  SerialCommandHandler,
  getSerialPorts,
}