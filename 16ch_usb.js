const SerialPort = require('serialport');
// List available SerialPorts if you aren't sure where your relay board is connected
// SerialPort.list((err, result) => {
//     if (err) console.log(err);
//     console.log(result);
// });
var port = new SerialPort('/dev/ttyUSB0');

const start = '0x3A,0x46,0x45,0x30,0x35,0x30,0x30,0x30,';
const commands = [
    {on: '0x30,0x46,0x46,0x30,0x30,0x46,0x45', off: '0x30,0x30,0x30,0x30,0x30,0x46,0x44'},
    {on: '0x31,0x46,0x46,0x30,0x30,0x46,0x44', off: '0x31,0x30,0x30,0x30,0x30,0x46,0x43'},
    {on: '0x32,0x46,0x46,0x30,0x30,0x46,0x43', off: '0x32,0x30,0x30,0x30,0x30,0x46,0x42'},
    {on: '0x33,0x46,0x46,0x30,0x30,0x46,0x42', off: '0x33,0x30,0x30,0x30,0x30,0x46,0x41'},
    {on: '0x34,0x46,0x46,0x30,0x30,0x46,0x41', off: '0x34,0x30,0x30,0x30,0x30,0x46,0x39'},
    {on: '0x35,0x46,0x46,0x30,0x30,0x46,0x39', off: '0x35,0x30,0x30,0x30,0x30,0x46,0x38'},
    {on: '0x36,0x46,0x46,0x30,0x30,0x46,0x38', off: '0x36,0x30,0x30,0x30,0x30,0x46,0x37'},
    {on: '0x37,0x46,0x46,0x30,0x30,0x46,0x37', off: '0x37,0x30,0x30,0x30,0x30,0x46,0x36'},
    {on: '0x38,0x46,0x46,0x30,0x30,0x46,0x36', off: '0x38,0x30,0x30,0x30,0x30,0x46,0x35'},
    {on: '0x39,0x46,0x46,0x30,0x30,0x46,0x35', off: '0x39,0x30,0x30,0x30,0x30,0x46,0x34'},
    {on: '0x41,0x46,0x46,0x30,0x30,0x46,0x34', off: '0x41,0x30,0x30,0x30,0x30,0x46,0x33'},
    {on: '0x42,0x46,0x46,0x30,0x30,0x46,0x33', off: '0x42,0x30,0x30,0x30,0x30,0x46,0x32'},
    {on: '0x43,0x46,0x46,0x30,0x30,0x46,0x32', off: '0x43,0x30,0x30,0x30,0x30,0x46,0x31'},
    {on: '0x44,0x46,0x46,0x30,0x30,0x46,0x31', off: '0x44,0x30,0x30,0x30,0x30,0x46,0x30'},
    {on: '0x45,0x46,0x46,0x30,0x30,0x46,0x30', off: '0x45,0x30,0x30,0x30,0x30,0x46,0x46'},
    {on: '0x46,0x46,0x46,0x30,0x30,0x46,0x46', off: '0x46,0x30,0x30,0x30,0x30,0x46,0x45'}
];
const end = ',0x0D,0x0A';
const reset = '0x3A,0x46,0x45,0x30,0x46,0x30,0x30,0x30,0x30,0x30,0x30,0x31,0x30,0x30,0x32,0x30,0x30,0x30,0x30,0x45,0x31' + end;

function flipRelay(relay, cmd) {
    if (relay > 16 || relay < 1) return console.log("Invalid relay: " + relay);
    if (cmd !== "on" && cmd !== "off") return console.log("Invalid command: " + cmd);
    
    var arr = (start + commands[relay - 1][cmd] + end).split(',');
    var buffer = Buffer.from(arr);
    //console.log(buffer);
    port.write(buffer, (err, result) => {
        if (err) console.log(err);
        else console.log("Relay " + relay + " turned " + cmd);
    });
}

function resetRelay() {
    var arr = reset.split(',');
    var buffer = Buffer.from(arr);
    //console.log(buffer);
    port.write(buffer, (err, result) => {
        if (err) console.log(err);
        else console.log("Relays reset");
    });
}

var cmds = process.argv;

if (!cmds[2]) console.log("No arguments given! Aborting...");

else if (cmds[2] == "reset") resetRelay();
else flipRelay(cmds[2], cmds[3]);
