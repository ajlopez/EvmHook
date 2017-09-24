
var VM = require('ethereumjs-vm');

function VirtualMachine() {
    var vm = new VM();
    
    var coverage = [];
    var usecoverage = false;
    var coveragehook = false;
    
    this.runCode = function (code, cb) {
        var bytes = Buffer.from(code, 'hex');
        
        vm.runCode({ code: bytes, gasLimit: 30000000 }, cb);
    }
    
    this.coverage = function (flag) {
        if (flag == null)
            return coverage;

        coverage = [];
        usecoverage = flag;  

        if (usecoverage && !coveragehook)
            this.hook(function (evobj, cb) {
                if (!usecoverage)
                    return cb();
                
                var pc = evobj.pc;
                
                if (!coverage[pc])
                    coverage[pc] = { counter: 0 };
                
                coverage[pc].counter++;
                
                cb();
            });
    }
    
    this.hook = function (predicate, fn) {
        if (!fn) {
            fn = predicate;
            predicate = null;
        }
        
        if (predicate)
            vm.on('step', makeFn(predicate, fn));
        else
            vm.on('step', fn);
        
        function makeFn(predicate, fn) {
            if (predicate.opcode && typeof predicate.opcode === 'string')
                predicate.opcode = predicate.opcode.toUpperCase();
            
            return function (evobj, cb) {
                if (predicate.pc && predicate.pc != evobj.pc)
                    return cb();
                
                if (predicate.opcode && predicate.opcode != evobj.opcode.opcode && predicate.opcode != evobj.opcode.name)
                    return cb();

                fn(evobj, cb);
            }
        }
    }
}

function createVirtualMachine() {
    return new VirtualMachine();
}

module.exports = {
    vm: createVirtualMachine
}