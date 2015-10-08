var restify=require('restify');
var pg=require('pg').native;
var Sequelize=require('sequelize');

/**
  ORM
*/
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

/**
  API Server
*/

var server = restify.createServer({
  name: 'todoAPI',
  version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

//server.all('/todos', function(req, res, next){
//    
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization,Origin");
//    res.header("Origin", origin);
//
//    next();
//});

//server.options('/todos', function(request, response, next){
//    response.header("Access-Control-Allow-Origin", "*");
//    response.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization,Origin");
//    response.header("Origin", origin);
//});

server.post('/todos', function(request, response, next){
  Todo
    .create(request.params)
    .then(function(todo){response.redirect(302, '/todos/'+todo.id, next)},
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
           .then(function(data){response.send(204);},
                 function(err){response.send(err)});
         },
         function(err){response.send(err)});
});

server.del('/todos/:id', function(request, response, next){
  Todo
   .findById(request.params.id)
   . then(function(todo){
           todo
           .destroy()
           .then(function(data){response.send(204);},
                 function(err){response.send(err)});
         },
         function(err){response.send(err)});
});


server.get(/\/?.*/, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.listen(8001);


console.log('API Server listen on http://localhost:8001');
