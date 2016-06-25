/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', MasterCtrl);

MasterCtrl.$inject = ['$scope', '$cookieStore', 'Clientes', 'Cidades', 'Fretes'];

function MasterCtrl($scope, $cookieStore, Clientes, Cidades, Fretes) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    loadData();   

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    function loadData(){
         Clientes.query(function(data){
           $scope.qtdClientes = data.length;
        });

        Cidades.query(function(data){
           $scope.qtdCidades = data.length;
        });

        Fretes.query(function(data){
           $scope.qtdFretes = data.length;
        });
    }
}