
var VM = require('ethereumjs-vm');

function VirtualMachine() {
    var vm = new VM();
}

function createVirtualMachine() {
    return new VirtualMachine();
}

module.exports = {
    vm: createVirtualMachine
}