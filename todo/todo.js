process.env.DEBUG = "*"

var restify=require('restify');
var pg=require('pg').native;
var Sequelize=require('sequelize');

var sequelize=new Sequelize('todos', 'todos', 'todos',{
   host:'localhost',
   dialect:'postgres'});

var Todo= sequelize.define('todos', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  text: Sequelize.STRING,
  done: Sequelize.BOOLEAN
}, {
  timestamp: true,
  freezeTableName: true,
  createdAt: false,
  deletedAt: false,
  updatedAt: 'version'
});

var server = restify.createServer({
  name: 'todoAPI',
  version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/todos', function(request, response, next){
  Todo
    .create(request.params)
    .then(function(todo){response.redirect(302, 'http://localhost:8001/todos/'+todo.id, next)},
          function(err){response.send(err);});
});

server.get('/todos', function(request, response, next){
  Todo
   .findAll()
   .then(function(data){response.send(data)},
         function(err){response.send(err)});
});

server.get('/todos/:id', function(request, response, next){
  Todo
   .findById(request.params.id)
   .then(function(data){response.send(data)},
         function(err){response.send(err)});
});

server.put('/todos/:id', function(request, response, next){
  Todo
   .findById(request.params.id)
   . then(function(todo){
           todo
           .update(request.params)
           .then(function(data){response.send(todo.id);},
                 function(err){response.send(err)});
         },
         function(err){response.send(err)});
});


server.listen(8001);

console.log('Server listen on http://localhost:8001');



