/**
 * myLupus - Erweitere Anbindung der Lupusec XT2 Alarmanlage
 *
 * Author: @devius_lupus
 * Source: https://github.com/devius-lupus/mylupus
 *
 */
 
var config = {};

config.twitter = {};
config.lupusec = {};
config.web = {};

// Twitter App Daten - hierfür einen neuen Twitteraccount für eure Lupusec XT2 anlegen. 
// Und mit den Zugangsdaten eine neue App erstellen --> https://apps.twitter.com/app/new . 

config.twitter.consumer_key = "";
config.twitter.consumer_secret = ""
config.twitter.access_token = "";
config.twitter.access_token_secret = "";

config.twitter.user = ""; // twitter account der Nachrichten schicken darf z.B. devius_lupus
config.lupusec.user = ""; // Benutzer eurer Lupusec - bitte nicht Admin
config.lupusec.pw = ""; // entsprechendes Passwort 
config.lupusec.ip = ""; // IP eurer Lupusec im Heimnetzwerk

config.web.port = 3000;

module.exports = config;