function TodoCtrl($scope, $http) {

  $scope.todos = [];

  //var BASE_HREF = 'http://localhost:8001/todo'; //acessando a api Node
  var BASE_HREF = 'http://lpmpa-des16.procempa.com.br:8080/todo/rest/todo'; //acessando a api Java

  function leTodos() {
    $http({
        url: BASE_HREF,
        method : 'GET'
    })
    .then(function(res) {
      $scope.todos = res.data;
    }, function(err) {
        var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
        alert(retorno);
    });
  }
  leTodos();

  $scope.getTotalTodos = function () {
    return $scope.todos ? $scope.todos.length : 0;
  };

  $scope.toogle = function (todo){
    $http({
        url: BASE_HREF + '/' + todo.id,
        method : 'PUT',
        data: todo
    })
    .then(function(res) {
        //TODO
    }, function(err) {
        var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
        alert(retorno);
        leTodos();
    });
  }

  $scope.addTodo = function () {
    var todo={text:$scope.formTodoText, done:false};
    $http({
        url: BASE_HREF,
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
                $http.delete(BASE_HREF + '/' + todo.id)
                .then(function(res) {
                  leTodos();
                }, function(err) {
                    var retorno = err.data.message || err.statusText || "sem comunicação com o serviço";
                    alert(retorno);
                    return;
                });
            }
        });
    };
}
