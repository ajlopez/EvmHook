
var evmhook = require('..');

exports['run two instructions using coverage'] = function (test) {
    var vm = evmhook.vm();
    
    test.async();
    
    vm.coverage(true);
    
    vm.runCode('60016002', function (err, data) {
        test.ok(!err);
        test.ok(data);
        test.ok(data.runState);
        test.ok(data.runState.stack);
        test.equal(data.runState.stack.length, 2);
        test.equal(data.runState.stack[0].toString('hex'), '0000000000000000000000000000000000000000000000000000000000000001');
        test.equal(data.runState.stack[1].toString('hex'), '0000000000000000000000000000000000000000000000000000000000000002');
        
        var result = vm.coverage();
        
        test.ok(result);
        
        test.ok(result[0]);
        test.equal(result[0].counter, 1);
        test.ok(!result[1]);
        test.ok(result[2]);
        test.equal(result[2].counter, 1);
        test.ok(!result[3]);
        
        test.done();
    });
}

