/**
 * myLupus - Erweitere Anbindung der Lupusec XT2 Alarmanlage
 *
 * Author: @devius_lupus
 * Source: tbd
 *
 */

/**
* Todo: 
* IP, Software Versionen: http://<ip>/action/welcomeGet
* Historie: http://<ip>/action/recordListGet (max_count:int)
*
*/

var http = require("http");
var https = require("https");
var config = require('../config');

exports.getJSON = function(options, onResult){

    var prot = options.port == 443 ? https : http;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var req = prot.request(options, function(res)
    {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        }); 

        res.on('end', function() {

            // JSON aufräumen ...
            // Im JSON sind Tabs - indikation für die Singalstärke
            var obj = JSON.parse(output.replace(/\u0009/g," "));
            onResult(res.statusCode, obj);
        });
        req.on('error', function(err) {
            console.log("Got error: " + err.message);
            res.send('error: ' + err.message);
        });
    });

    req.end();
};

exports.status_param = function() {
    var options = {
        host: config.lupusec.ip,
        port: 443,
        path: '/action/panelCondGet',
        headers: {
            'Authorization': 'Basic ' + new Buffer(config.lupusec.user + ':' + config.lupusec.pw).toString('base64'),
            'Content-Type': 'application/json'
       }         
    };
    return options;
}

exports.list_param = function() {
    var options = {
        host: config.lupusec.ip,
        port: 443,
        path: '/action/deviceListGet',
        headers: {
            'Authorization': 'Basic ' + new Buffer(config.lupusec.user + ':' + config.lupusec.pw).toString('base64'),
            'Content-Type': 'application/json'
       }         
    };
    return options;
}

exports.arm_param = function() {
    var options = {
        host: config.lupusec.ip,
        port: 443,
        path: '/action/panelCondPost?area=1&mode=1',
        headers: {
         'Authorization': 'Basic ' + new Buffer(config.lupusec.user + ':' + config.lupusec.pw).toString('base64'),
         'Content-Type': 'application/json'
       }         
    };
    return options;
}

exports.disarm_param = function() {   
    var options = {
        host: config.lupusec.ip,
        port: 443,
        path: '/action/panelCondPost?area=1&mode=0',
        headers: {
         'Authorization': 'Basic ' + new Buffer(config.lupusec.user + ':' + config.lupusec.pw).toString('base64'),
         'Content-Type': 'application/json'
       }         
    };
    return options;
}

exports.return_relevant = function(options, onResult){
    module.exports.getJSON(module.exports.list_param(), function(statusCode, result){
        
        var result_alarm = "";
        var result_open = "";
        for(var sensorrow in result.senrows) {

            if(result.senrows[sensorrow].alarm_status == "1"){
                result_alarm += result.senrows[sensorrow].name + ", ";
            }

            if(result.senrows[sensorrow].type == 4){
                if(result.senrows[sensorrow].status == "{WEB_MSG_DC_OPEN}"){
                    result_open += result.senrows[sensorrow].name +", " ;
                }
            }
        }
        
        var return_value = "";
        
        if(result_alarm !== "" ){
            return_value = "Alarm bei: " + result_alarm;
        }
        
        if(result_open !== ""){
            return_value += "Offen: " + result_open;
        }
        
        if(!return_value){
            return_value = "Keine Meldungen";
        }
        
        if(statusCode !== 200){
            return_value = "Status Code: " + statusCode + " Wert: " + JSON.stringify(result)
        }
        
        onResult(return_value);
        
    });
}

exports.get_status = function(options, onResult){
    module.exports.getJSON(module.exports.status_param(), function(statusCode, result){
        
        var return_value = "Area 1: " + result.updates.mode_a1 + 
            ", Batterie: "+result.updates.battery_ok + 
            ", Interferenz: "+ result.updates.interference_ok + 
            ", GSM Signal: " + result.updates.sig_gsm_ok + 
            ", Stromverbauch: " + result.updates.ac_activation_ok;    
        
        if(!return_value){
            return_value = "Keine Meldungen";
        }
        
        if(statusCode !== 200){
            return_value = "Status Code: " + statusCode + " Wert: " + JSON.stringify(result)
        }
        
        onResult(return_value);
        
    });
}