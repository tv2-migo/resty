const Hapi = require('hapi');
const Joi = require('joi')


const server = new Hapi.Server();
server.connection({port: 4004});

server.register(require('inert'), (err) => {

    if (err) throw err;

    const echoHandler = function (request, reply){
        let result = request.method
        console.log(request.payload)
        if(request.payload){
            result += "\n" + request.payload
        }
        reply(result).header('Content-Type', 'text/plain');

    };

    server.route({
        method: ['GET'],
        path: '/echo',
        handler: echoHandler
    });
    server.route({
        method: [ 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS', 'TRACE'],
        path: '/echo',
        handler: echoHandler,
        config: {
          payload: { output: 'data', parse: false}
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {directory: {path: 'data'}}
    });



    server.start((err) => {
        if (err) throw err;

        console.log('Server running ', server.info.uri);
    })
})