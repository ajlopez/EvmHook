
var evmhook = require('..');

exports['run simple code without errors'] = function (test) {
    var vm = evmhook.vm();
    
    test.async();
    
    vm.runCode('6001', function (err, data) {
        test.ok(!err);
        test.done();
    });
}