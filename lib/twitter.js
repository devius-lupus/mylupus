/**
 * myLupus - Erweitere Anbindung der Lupusec XT2 Alarmanlage
 *
 * Author: @devius_lupus
 * Source: tbd
 *
 */

var twit = require('twit');
var path = require('path');
var lupusec_xt2 = require(path.join(__dirname, '/lupusec_xt2'));
var config = require(path.join(__dirname, '../config'));

var twitter = new twit({
    consumer_key:         config.twitter.consumer_key,
    consumer_secret:      config.twitter.consumer_secret,
    access_token:         config.twitter.access_token,
    access_token_secret:  config.twitter.access_token_secret
});

exports.init_dm_listener = function (sockets) {
    var stream = twitter.stream('user');
    

    twitter.get('users/lookup', { screen_name: config.twitter.user }, function (err, data, response) {
        module.exports.post_dm(data[0].id, "Hallo, ich bin online.", sockets);
    })
    console.log('Warte auf eingehende Direktnachrichten. Info an @' + config.twitter.user);

    stream.on('direct_message', function (msg) {
        // vermeide eine Endlosschleife, nachdem wir eine Nachricht gesendet haben.        
        if(msg.direct_message.sender_screen_name == config.twitter.user){
            if(msg.direct_message.sender_id != msg.direct_message.recipient_id){
                console.log('New Event:', msg.direct_message.sender_screen_name + " " + msg.direct_message.text);
                sockets.emit('twitter', { message: msg.direct_message.sender_screen_name + " " + msg.direct_message.text });
                module.exports.parse_message(msg.direct_message.sender_id, msg.direct_message.text, sockets);
            }
        }
    });
    
};

exports.parse_message = function(twitter_sender, twitter_msg, sockets) {
    
    if(twitter_msg.toLowerCase().indexOf("disarm") > -1) {
        lupusec_xt2.getJSON(lupusec_xt2.disarm_param(), function(statusCode, result){
            module.exports.post_dm(twitter_sender, result.message, sockets);
        });
	}else if(twitter_msg.toLowerCase().indexOf("arm") > -1){
        lupusec_xt2.getJSON(lupusec_xt2.arm_param(), function(statusCode, result){
            module.exports.post_dm(twitter_sender, result.message, sockets);
        });        
    }else if(twitter_msg.toLowerCase().indexOf("status") > -1){
        var options = "";
        lupusec_xt2.get_status(options, function(result){
            module.exports.post_dm(twitter_sender, result, sockets);
        });       
    }else if(twitter_msg.toLowerCase().indexOf("list") > -1){
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