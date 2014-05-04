(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app.core').controller(controllerId, ['common', 'core.datacontext', dashboard]);

    function dashboard(common, coreDatacontext) {
        var log = common.logger.info;

        var vm = this;
        vm.news = {
            title: 'Marvel Avengers',
            description: 'Marvel Avengers 2 is now in production!'
        };
        vm.avengerCount = 0;
        vm.avengers = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getAvengerCount(), getAvengersCast()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getAvengerCount() {
            return coreDatacontext.getAvengerCount().then(function (data) {
                vm.avengerCount = data;
                return vm.avengerCount;
            });
        }

        function getAvengersCast() {
            return coreDatacontext.getAvengersCast().then(function (data) {
                vm.avengers = data;
                return vm.avengers;
            });
        }
    }
})();