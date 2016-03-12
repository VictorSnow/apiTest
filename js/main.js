requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    },
    shim:{
        'angular-extend':['angular'],
        'bootstrap': ['jquery'],
        "angular":{
            exports:"angular"
        }
        //'config':{
        //    exports: 'config',
        //    //deps: ['modules/account', 'modules/student']
        //}
    },
    urlArgs: 'version=abcs'
});

require(['jquery', 'angular', 'config', 'bootstrap', 'highlight', 'angular-extend'], function($, angular, config){

    angular.module('apiTest', ['httpConfig'])
        .directive('jsonwatch', function(){
            return {
                'restrict':'A',
                'link':function(scope, ele, attrs){
                    scope.$watch(attrs['result'], function(value){

                        if(typeof(value) != 'string'){
                            value = JSON.stringify(value, null, 4)
                        }

                        ele.text(value);
                        hljs.highlightBlock(ele[0]);
                    });
                }
            }
        }).controller('apiTb', function($scope){
            $scope.categories = config;

            $scope.renderForm = function(form){
                $scope.$broadcast('renderForm', {form:form});
            };

        }).controller('requestCtrl', function($scope, $http){
            $scope.hostPrefix = hostPrefix;
            $scope.$on('renderForm', function(e,data){
                $scope.form = data.form;
            });

            $scope.postCallBack = function(res){
                $scope.requestResult = res;
            };

            $scope.doSubmit = function($event){

                $scope.postData = {};
                // 传递的数据
                for(var i in $scope.form.items)
                {
                    var name = $scope.form.items[i].name;
                    var value = $scope.form.items[i].value;

                    // 可选参数
                    if($scope.form.items[i].addition && value=='')
                        continue;

                    $scope.postData[name] = value;
                }

                $scope.requestResult = '请求中';
                // 发送数据
                if($scope.form.method == 'get')
                {
                    $http({
                        'url': $scope.hostPrefix + $scope.form.action,
                        'method':"GET",
                        'params': $scope.postData
                    }).success($scope.postCallBack).error(function(res){
                        $scope.requestResult = '请求错误';
                    });

                }else{
                    $http.post($scope.form.action, $scope.postData).success($scope.postCallBack).error(function(res){
                        $scope.requestResult = '请求错误';
                    });
                }

                $event.preventDefault();
                $event.stopPropagation();
                return false;
            }
        });
        // bootstrap self
        angular.bootstrap(document, ['apiTest']);
});