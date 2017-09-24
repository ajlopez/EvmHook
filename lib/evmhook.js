
var VM = require('ethereumjs-vm');

function VirtualMachine() {
    var vm = new VM();
    
    this.runCode = function (code, cb) {
        var bytes = Buffer.from(code, 'hex');
        
        vm.runCode({ code: bytes, gasLimit: 30000000 }, cb);
    }
}

function createVirtualMachine() {
    return new VirtualMachine();
}

module.exports = {
    vm: createVirtualMachine
}