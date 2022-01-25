//Creamos el servidor
var http = require('http');
var url = require('url');
var fs = require('fs');
var server = http.createServer();
var moduloCalculadora = require('./modules/calculadora.js');
server.on('request', function(peticion, respuesta) {
    //Obtenemos la URL y la descomponemos
    var url_peticion = url.parse(peticion.url, true);
    //Guardamos el pathname
    var nombreFichero = "./todasLasTablas.html";
    if (url_peticion.pathname == "/tablas") {
        fs.readFile(nombreFichero, function(err, dato) {
            if (err) {
                respuesta.writeHead(404, { 'Content-Type': 'text/html' });
                return respuesta.end("404 Not Found");
            }
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write(dato);
            return respuesta.end();
        });
    } else if (url_peticion.pathname == "/creartabla") {
        if (!fs.existsSync('./tablas')) {
            // Crear el directorio
            fs.mkdir('./tablas/', function(err) {
                if (err) {
                    throw err;
                }
                console.log('Carpeta creada');
            });
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write('Carpeta Creada');
            return respuesta.end();
        } else {
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write('Ya existe la carpeta');
            return respuesta.end();
        }

    } else if (url_peticion.pathname == "/creartablaM") {
        if (!fs.existsSync('./tablas')) {
            // Crear el directorio
            fs.mkdir('./tablas/', function(err) {
                if (err) {
                    throw err;
                }
                console.log('Carpeta creada');
            });
            // Crear el fichero y añadir contenido

            for (i = 1; i <= 10; i++) {
                tabla = '';
                for (z = 1; z <= 10; z++) {
                    tabla += '' + i + ' x ' + z + '=' + i * z + '\n';
                }
                fs.appendFile('./tablas/tabla' + i + '.txt', tabla, function(err) {
                    if (err) {
                        throw err;
                    }
                });

            }
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write('Carpeta y archivos creados');
            return respuesta.end();

        } else {
            //Borramos los archivos
            for (i = 1; i <= 10; i++) {
                fs.unlink('./tablas/tabla' + i + '.txt', function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('Borrado archivo tabla' + i + '.txt');
                });
            }
            // Crear el fichero y añadir contenido
            for (i = 1; i <= 10; i++) {
                tabla = '';
                for (z = 1; z <= 10; z++) {

                    tabla += '' + i + ' x ' + z + '=' + i * z + '\n';
                }
                fs.appendFile('./tablas/tabla' + i + '.txt', tabla, function(err) {
                    if (err) {
                        throw err;
                    }
                    console.log('Creado archivo tabla' + i + '.txt');
                });
            }
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write('Archivos creados');
            return respuesta.end();
        }

    } else if (url_peticion.pathname == "/") {
        respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
        respuesta.write('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Inicio</title><link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css"><body><h1>Inicio</h1></body></html>');
        return respuesta.end();
    } else if (url_peticion.pathname == '/calculadora') {
        var parametro = url_peticion.query;
        var salida = '';
        salida += moduloCalculadora.calculadora(parametro.num1, parametro.num2, parametro.op);
        fs.writeFile('./solucion.txt', salida, function(err) {
            if (err) {
                throw err;
            }
            console.log('Creado archivo solucion.txt');
        });
        respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
        respuesta.write('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Calculadora</title><link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css"><body><h1>Calculadora</h1></body></html>');
        return respuesta.end();
    } else {
        respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
        respuesta.write('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>404 Page Not Found</title><link href="http://fonts.googleapis.com/css?family=Amarante" rel="stylesheet" type="text/css"><body><h1>404 Page Not Found</h1></body></html>');
        return respuesta.end();
    }

}).listen(8080);
console.log('Servidor ejecutándose en http://127.0.0.1:8080/');