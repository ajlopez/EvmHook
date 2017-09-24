
var evmhook = require('..');

exports['run simple code without errors'] = function (test) {
    var vm = evmhook.vm();
    
    test.async();
    
    vm.runCode('6001', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.ok(data.runState);
        test.ok(data.runState.stack);
        test.equal(data.runState.stack.length, 1);
        test.equal(data.runState.stack[0].toString('hex'), '0000000000000000000000000000000000000000000000000000000000000001');
        test.done();
    });
}

exports['hook one step'] = function (test) {
    var vm = evmhook.vm();
    
    var counter = 0;
    vm.hook(function (evobj, cb) {
        counter++;
        cb();
    });
    
    test.async();
    
    vm.runCode('6001', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.equal(counter, 1);
        test.equal(data.runState.stack.length, 1);
        test.done();
    });
}

exports['hook one step twice'] = function (test) {
    var vm = evmhook.vm();
    
    var counter = 0;
    
    vm.hook(function (evobj, cb) {
        counter++;
        cb();
    });    
    
    vm.hook(function (evobj, cb) {
        counter++;
        cb();
    });

    test.async();
    
    vm.runCode('6001', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.equal(counter, 2);
        test.done();
    });
}

exports['hook two steps'] = function (test) {
    var vm = evmhook.vm();
    
    var counter = 0;
    
    vm.hook(function (evobj, cb) {
        counter++;
        cb();
    });
    
    test.async();
    
    vm.runCode('60016002', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.equal(counter, 2);
        test.equal(data.runState.stack.length, 2);
        test.done();
    });
}

exports['hook two steps using program counter'] = function (test) {
    var vm = evmhook.vm();
    
    var counter = 0;
    
    vm.hook({ pc: 2 }, function (evobj, cb) {
        counter++;
        cb();
    });
    
    test.async();
    
    vm.runCode('60016002', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.equal(counter, 1);
        test.equal(data.runState.stack.length, 2);
        test.done();
    });
}

exports['hook two steps using opcode'] = function (test) {
    var vm = evmhook.vm();
    
    var counter = 0;
    
    vm.hook({ opcode: 0x61 }, function (evobj, cb) {
        counter++;
        cb();
    });
    
    test.async();
    
    vm.runCode('6001610001', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.equal(counter, 1);
        test.equal(data.runState.stack.length, 2);
        test.done();
    });
}

exports['hook two steps using opcode name'] = function (test) {
    var vm = evmhook.vm();
    
    var counter = 0;
    
    vm.hook({ opcode: 'push2' }, function (evobj, cb) {
        counter++;
        cb();
    });
    
    test.async();
    
    vm.runCode('6001610001', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.equal(counter, 1);
        test.equal(data.runState.stack.length, 2);
        test.done();
    });
}
