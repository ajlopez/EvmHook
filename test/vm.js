
var evmhook = require('..');

exports['create vm as object'] = function (test) {
    var vm = evmhook.vm();
    
    test.ok(vm);
    test.equal(typeof vm, 'object');
};