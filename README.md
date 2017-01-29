![Lupus_logo](public/img/lupus_logo.png "mylupus Logo")

# mylupus
ist eine erweiterte Anbindung der Lupusec XT2 Alarmanlage in Node.JS für den Raspberry Pi

Kontakt via twitter: [@devius_lupus](http://www.twitter.com/devius_lupus)

## Warum mylupus
Die XT2 von [Lupusec](http://www.lupus-electronics.de/) ist eine klasse Alarmanlage - sie unterstützt nur leider kein IPV6. Zudem würde ich niemals meine Alarmanlage im Internet freigeben. Via SMS bekomme ich die Alarmanlage nicht aus- oder eingeschaltet. Die Bestätigungsmails sind zwar nett, aber für mich nicht übersichtlich genug.

##Features
- Steuerung der XT2 via Twitter Direktnachrichten (Arm, Disarm, List)
- experimentelle CID implementierung (aktuelle nur Ausgabe)
- Node JS Implementierung, läuft also perfekt auf einem Raspberry Pi

## Installation & Setup

``` bash
  $ [sudo] npm install
```
info: Installationsanleitung für node.js unter raspbian findet ihr [hier](https://www.einplatinencomputer.com/raspberry-pi-node-js-installieren/)

Im Projektpfad muss die config.js Datei mit den entsprechenden Variabeln befüllt werden. Siehe Kommentare in der Datei.
Man muss eine Twitter App erstellen unter https://apps.twitter.com/app/new, um die entsprechenden Zugangsdaten zu bekommen. 

Starten via 
``` bash
  $  npm start
```

Im produktivbetrieb lasse ich mylupus via [foreverjs](https://github.com/foreverjs/forever) laufen. 

``` bash
  $  forever start server.js
```

## Kommandos
Kommandos werden via Direktnachricht bei Twitter gesendet: 

  * list - zeigt alle offenen Kontakte bzw. die Kontakte an, die einen Alarm ausgelöst haben. 
  * status - zeigt eine Übersicht Area & Scharfschaltung, Batterie, Sendeleistung, GSM Signal, Stromverbrauch
  * arm - scharf schalten
  * disarm - unschaft schalten

unter http://ip_vom_raspberry:3000/ werden alle Befehle als Log ausgegeben, die der Raspberry Pi umgesetzt hat. Vergangene Kommandos werden nicht angezeigt.

## Quellen
Das Thema Lupusec ansteuern wurde bereits mehrfach im Internet diskutiert. Anbei die Quellen, die mir geholfen haben: 
- [Symcon Forum - Alarmanlage Lupusec XT2 auslesen](https://www.symcon.de/forum/threads/29684-Alarmanlage-Lupusec-XT2-Plus-auslesen)
- [Alamforum - Lupusec XT2](http://www.alarmforum.de/Forum-LUPUSEC-XT2)
- [pylupusec von Seibert Media](https://github.com/seibert-media/pylupusec)
