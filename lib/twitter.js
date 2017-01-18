/**
 * myLupus - Erweitere Anbindung der Lupusec XT2 Alarmanlage
 *
 * Author: @devius_lupus
 * Source: https://github.com/devius-lupus/mylupus
 *
 */

var twit = require('twit');
var path = require('path');
var lupusec_xt2 = require(path.join(__dirname, '/lupusec_xt2'));

var twitter = new twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

exports.init_dm_listener = function (sockets) {
    var stream = twitter.stream('user');
    console.log('Warte auf eingehende Direktnachrichten');

    stream.on('direct_message', function (msg) {
        // vermeide eine Endlosschleife, nachdem wir eine Nachricht gesendet haben.        
        if(msg.direct_message.sender_screen_name == process.env.TWITTER_USER){
            if(msg.direct_message.sender_id != msg.direct_message.recipient_id){
                console.log('New Event:', msg.direct_message.sender_screen_name + " " + msg.direct_message.text);
                sockets.emit('twitter', { message: msg.direct_message.sender_screen_name + " " + msg.direct_message.text });
                module.exports.parse_message(msg.direct_message.sender_id, msg.direct_message.text, sockets);
            }
        }
    });
    
};

exports.parse_message = function(twitter_sender, twitter_msg, sockets) {
    
    if(twitter_msg.indexOf("disarm") > -1) {
        lupusec_xt2.getJSON(lupusec_xt2.disarm_param(), function(statusCode, result){
            module.exports.post_dm(twitter_sender, result.message, sockets);
        });
	}else if(twitter_msg.indexOf("arm") > -1){
        lupusec_xt2.getJSON(lupusec_xt2.arm_param(), function(statusCode, result){
            module.exports.post_dm(twitter_sender, result.message, sockets);
        });        
    }else if(twitter_msg.indexOf("list") > -1){
        var options = "";
        lupusec_xt2.return_relevant(options, function(result){
            module.exports.post_dm(twitter_sender, result, sockets);
        });
    }  
}

exports.post_dm = function(empfaenger, text, sockets) {
    // console.log(text.senrows[0].name); Ausgabe Sensorname
    var nachricht = new Date().toJSON() + " " + text;
    console.log(empfaenger + ": " + nachricht);
    sockets.emit('twitter', { message: "Antwort " + nachricht });
    twitter.post('direct_messages/new', { user_id: empfaenger, text: nachricht }, function(err, data, response) { });
}