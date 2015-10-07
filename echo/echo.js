var restify=require('restify');

var server = restify.createServer({
  name: 'apiFeliz',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function(request, response, next){
  response.send(request.params);
});

server.listen(8001);

console.log('Servidor %s rodando em %s', server.name, server.url);
