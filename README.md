# mylupus 
ist eine erweiterte Anbindung der Lupusec XT2 Alarmanlage

Viel Spaß mit dem ersten Wurf. 

Kontakt via twitter: [@devius_lupus](http://www.twitter.com/devius_lupus

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

Im Projektpfad eine .env Datei erstellen und jeweils die <...> ersetzten mit den entsprechenden Werten. 
Man muss eine Twitter App erstellen unter https://apps.twitter.com/app/new, um die entsprechenden Zugangsdaten zu bekommen. 

``` bash
    # Konfiguration für die Zugriffe

    CONSUMER_KEY='<twitter consumer key>'
    CONSUMER_SECRET='<twitter consumer secret>'
    ACCESS_TOKEN='<twitter access token>'
    ACCESS_TOKEN_SECRET='<twitter access token secret>'

    LUPUSEC_USER='<lupusec benutzername - bitte nicht admin!>'
    LUPUSEC_PW='<kennwort>'
    LUPUSEC_IP='<ip der Alarmanlage im Netzwerk z.B. 192.168.0.34>'

    # Port für web UI:
    PORT=3000
```

## Quellen
Das Thema Lupusec ansteuern wurde bereits mehrfach im Internet diskutiert. Anbei die Quellen, die mir geholfen haben: 
- [Symcon Forum - Alarmanlage Lupusec XT2 auslesen](https://www.symcon.de/forum/threads/29684-Alarmanlage-Lupusec-XT2-Plus-auslesen)
- [Alamforum - Lupusec XT2](http://www.alarmforum.de/Forum-LUPUSEC-XT2)
- [pylupusec von Seibert Media](https://github.com/seibert-media/pylupusec)
