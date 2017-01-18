/**
 * myLupus - Erweitere Anbindung der Lupusec XT2 Alarmanlage
 *
 * Author: @devius_lupus
 * Source: https://github.com/devius-lupus/mylupus
 *
 */

// Alternativ das ganze als Bash script:
// while true ; do nc -l 4711 < ack.txt >> contact_id.log ; done

// Quick & Dirty Implementierung eines CID servers
net = require('net');

// Starte TCP Server für CID
var cid_server = net.createServer(function (socket) {

  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Todo Sende ACK Bestätigung
  socket.write("Welcome " + socket.name + "\n");
  
  var output = '';
  // Wenn, CID aufgerufen wird
  socket.on('data', function (chunk) {
    output += chunk;
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    console.log(output);
  });
  
}).listen(4711);

console.log("CID Server läuft auf Port 4711\n");

module.exports = cid_server;