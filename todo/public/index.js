function TodoCtrl($scope, $http) {
  
  $scope.todos = [];

    $http({
        url: 'http://localhost:8001/todos',
        method : 'GET'
    })
    .then(function(res) {
        $scope.todos=res.data;
    }, function(err) {
        var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
        alert(retorno);
    });
    
  $scope.getTotalTodos = function () {
    return $scope.todos.length;
  };
  
  $scope.toogle = function (todo){
    $http({
        url: 'http://localhost:8001/todos/' + todo.id,
        method : 'PUT',
        data: todo
    })
    .then(function(res) {
        //TODO
    }, function(err) {
        var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
        alert(retorno);
    });
  }
  
  $scope.addTodo = function () {
    var todo={text:$scope.formTodoText, done:false};
    $http({
        url: 'http://localhost:8001/todos',
        method : 'POST',
        data: todo
    })
    .then(function(res) {
        $scope.todos.push(res.data);
    }, function(err) {
        var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
        alert(retorno);
    });
      
    $scope.formTodoText = '';
  };
  
    $scope.clearCompleted = function () {
        _.filter($scope.todos, function(todo){
            if (todo.done){
                $http.delete('http://localhost:8001/todos/' + todo.id)
                .then(function(res) {
                    $http({
                        url: 'http://localhost:8001/todos',
                        method : 'GET'
                    })
                    .then(function(res) {
                        $scope.todos=res.data;
                    }, function(err) {
                        var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
                        alert(retorno);
                    });
                }, function(err) {
                    var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
                    alert(retorno);
                    return;
                });
            }
        });
    };
}