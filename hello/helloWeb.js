var http=require('http');

http.createServer(function(request, response){
    response.end('Hello world');
}).listen(8000);

console.log('Servidor ativo em http://localhost:8000');
