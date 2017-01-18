/**
 * myLupus - Erweitere Anbindung der Lupusec XT2 Alarmanlage
 *
 * Author: @devius_lupus
 * Source: https://github.com/devius-lupus/mylupus
 *
 */

 var socket = io();

socket.on('welcome', function(data) {
    addMessage(data.message);

    // Client am Server anmelden.
    socket.emit('i am client', {data: 'foo!', id: data.id});
});
socket.on('twitter', function(data) {
    addMessage(data.message);
});
socket.on('time', function(data) {
    console.log("called" + data.time);
    updateTime(data.time);
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

function addMessage(message) {
    var text = document.createTextNode(message),
        el = document.createElement('li'),
        messages = document.getElementById('messages');

    el.appendChild(text);
    messages.appendChild(el);
}

function updateTime(time) {
    var text = document.createTextNode(time),
        time_div = document.getElementById('time');
    console.log(time_div.innerHTML);
    time_div.innerHTML = "letzter Sync: " + time;
}   