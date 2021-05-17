//facilitate communication between phone and AI

const http = require('http');
const fs = require('fs');
const port = 1999;//port for the server

async function fourOfour(response, url) {//404 error
    response.writeHead(404);
    response.write('404 : ', url);
    console.error('not found: ', url)
}

///Create server
const server = http.createServer(function (request, response) {

    console.log('requested Url: ', request.url);

    response.setHeader('Acess-Control-Allow-Origin', '*');//allow access control from client, this will automatically handle most media files

    switch (request.url) {

        case '/': case '/index.html':

            try {
                response.writeHead(200, { 'Content-type': 'text/html' });//200 ok
                fs.readFile('index.html', function (err, databuffer) {
                    if (err) {
                        fourOfour(response, 'index');
                    } else {
                        response.write(databuffer);
                    }
                    response.end();//end response
                })
            } catch (err) {
                console.log('Catastrophy on start: ', err)
            }

            break;
/*
        case '/get/test'://A test get

            try {
                console.log('test get from server');
                response.writeHead(200, { 'Content-type': 'application/json' });
                response.end(JSON.stringify({ test: 'Server is okay' }))
            } catch (error) {
                console.log('Catastrophy on test get: ', err)
            }

            break;

        case '/post/test'://A test post

            console.log('test post to server');
            request.on('data', function (data) {
                console.log('Posted: ', JSON.parse(data))
                response.end()
            });

            break;
*/
        default:

            if (request.url.indexOf('.css') != -1) {
                response.setHeader('Content-type', 'text/css')
            } else if (request.url.indexOf('.js') != -1) {
                response.setHeader('Content-type', 'application/javascript')
            } else if (request.url.indexOf('.html') != -1) {
                response.setHeader('Content-type', 'text/html')
            }

            fs.readFile(request.url.replace('/', ''), function (err, data) {
                if (err) {
                    fourOfour(response, request.url);//show 404 page
                } else {
                    response.writeHead(200);//200 ok
                    response.write(data);//responsepond with data from file
                }
                response.end();//end responseponse
            })
    }

})

server.listen(port, function (err) {//Listen to a port with server

    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port: ', port);
    }

})
