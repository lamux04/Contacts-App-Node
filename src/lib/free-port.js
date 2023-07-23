const net = require('node:net');

function freePort (desiredPort) {
    return new Promise((resolve, reject) => {
        // Creamos un servidor
        const server = net.createServer();

        // Lo abrimos con el puerto deseado
        server.listen(desiredPort, () => {
            // Esto se ejecuta si se consiguio abrir
            const { port } = server.address();
            server.close(() => {
                // Se cierra el servidor y se resuelve la promesa
                resolve(port);
            });
        });

        // Si no se pudo abrir el puerto
        server.on('error', e => {
            if (e.code === 'EADDRINUSE') {
                // Se vuelve a llamar de forma recursiva y se resuelve la promesa
                freePort(0).then(port => {
                    resolve(port);
                });
            } else {
                reject(e);
            }
        });
    });
}

module.exports = { freePort };
