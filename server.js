/**
 * myLupus - Erweitere Anbindung der Lupusec XT2 Alarmanlage
 *
 * Author: @devius_lupus
 * Source: https://github.com/devius-lupus/mylupus
 *
 */
  

var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');

// Lade globale Variablen aus der .env Datei
dotenv.load();

var intro = "******************************************************\n\r*  myLupus v0.0.2 - Chirp Release                    *\n\r*  Kontakt via twitter\x1b[36m @devius_lupus \x1b[0m                *\n\r******************************************************\n\r"

console.log(intro);

if (!process.env.CONSUMER_KEY){
    console.log(" IP der Alarmanlage nicht gesetzt\n\r")
    console.log(" .env Datei nicht korrekt konfiguriert\n\r")
    process.exit(0);
}else if(!process.env.LUPUSEC_IP){
    console.log(" Twitter Anmeldedaten sind nicht\n\r")
    console.log(" .env Datei nicht korrekt konfiguriert\n\r")
    process.exit(0);
}

// Controllers
// var twitterController = require('./controllers/twitter');

var app = express();
var admin_app = express();
var twitter = require('./lib/twitter');
var cid_handler = require('./lib/cid_handler');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

// app.post('/contact', contactController.contactPost);

// Route zur Homepage
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

// Sende aktuelle Uhrzeit als "healtcheck" an das Frontend
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Sende aktuelle Uhrzeit alle 10 Sekunden
setInterval(sendTime, 10000);

io.on('connection', function (socket) {
    socket.emit('welcome', { message: 'System ist verbunden', id: socket.id });
    socket.on('i am client', console.log);
});

server.listen(app.get('port'), function(){
  console.log('myLupus Web läuft auf Port ' + app.get('port'));
});

twitter.init_dm_listener(io.sockets);

module.exports = app;
