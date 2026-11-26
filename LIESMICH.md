# Gymnasium Putzbrunn – Open World

Inhalt:
- `index.html` – das komplette Spiel in einer Datei (3D-Engine und Gebäudedaten sind eingebettet, es wird nichts von fremden Servern nachgeladen).
- `server.js` + `package.json` – kleiner Mehrspieler-Server (Node.js ab Version 18).

## Mehrspieler mit GitHub Pages
GitHub Pages liefert nur Dateien aus und kann keinen Spielserver betreiben. Die Seite bleibt bei GitHub; für den Mehrspieler kommt ein kleiner Server dazu.

1. Bei https://render.com mit dem GitHub-Konto anmelden (kostenloser Tarif).
2. „New +“ → „Blueprint“ → Repository `Gp-3D` wählen. Die Datei `render.yaml` legt alles fest (Node, Region Frankfurt, `npm install`, `npm start`).
3. Nach dem ersten Start zeigt Render eine Adresse wie `https://gp-3d.onrender.com`.
4. (Bereits erledigt: `wss://gp-3d-7dsj.onrender.com/ws` ist eingetragen.) Bei einer neuen Adresse in `index.html` eintragen: nach `const GP_SERVER=''` suchen und daraus `const GP_SERVER='wss://gp-3d.onrender.com/ws'` machen (https → wss, `/ws` anhängen). Speichern, hochladen.
5. Fertig: Alle, die die GitHub-Pages-Adresse öffnen, sind in derselben Welt. Zum Testen ohne Änderung geht auch `…/Gp-3D/?server=wss://gp-3d.onrender.com/ws`.

Gut zu wissen: Der kostenlose Render-Server schläft nach 15 Minuten ohne Besucher ein. Der Erste wartet dann bis zu einer Minute („Spielserver wird geweckt …“), das Spiel läuft in der Zeit solo weiter.
Alternativ kann der Server auch direkt die Seite ausliefern: Dann einfach die Render-Adresse weitergeben, ohne Schritt 4.

Lokal testen: `npm install && npm start`, dann http://localhost:3000 in zwei Browserfenstern öffnen.

## Nur Einzelspieler
`index.html` allein genügt (z. B. auf GitHub Pages oder per Doppelklick). Ohne Server zeigt das Spiel "Solo-Modus".

## Datenschutz
Der Server speichert nichts dauerhaft. Übertragen werden nur Spitzname, Pulli-Farbe, Position, Punktestand. Es gibt keinen Chat.
Bitte die Klasse anweisen, Fantasienamen zu verwenden. Vor dem Einsatz mit Schülern Hoster-Standort und Schulvorgaben prüfen.

## Neu: Schulalltag und Außenanlagen

- Tasten: **E** ansprechen/kaufen/ausleihen/klettern/Müll aufheben, **Leertaste** springen, **B** Tasche. Am Handy: Knöpfe „Aktion“ und „Sprung“.
- Takt: 2 Minuten Pause, 4 Minuten Unterricht, dann Gong. Der Takt hängt an der Uhrzeit und ist deshalb bei allen Spielenden gleich.
- Die rund 470 Figuren (Schülerinnen und Schüler, Lehrkräfte, Sekretariat, Pausenverkauf, Bibliothek, Hausmeister) rechnet jedes Gerät selbst. Sie werden nicht über den Server abgeglichen; zwei Spielende sehen also dieselbe Pause, aber nicht dieselbe Figur an derselben Stelle.
- Außenanlagen nach dem Lageplan „Grundriss EG mit Außenanlagen“: Laufbahn, Beachfelder, Hartplatz, Rasenspielfeld, Allwetterplatz, Weitsprung, Calisthenics, Grünes Klassenzimmer, Fahrradständer, Parkplatz, Tiefgaragenrampe. Die Maße sind aus dem Bild abgegriffen, nicht aus Vektordaten.
- server.js wurde ebenfalls geändert (Sprung- und Kletterhöhe werden weitergereicht). Bitte beide Dateien austauschen.
- Gottmodus: Tasche öffnen (B), unten den Code GOTTMODUS eingeben. Geld, Energie, Taschenplatz und Ausleihe sind dann unbegrenzt; derselbe Code schaltet ihn wieder aus. Der Code steht als GODCODE im Quelltext von index.html und lässt sich dort ändern.
- Raumnamen und Raumnummern nach Plan Ü5.2142–45 (Stand 28.10.2026): am Raumschild, als Nummernschild vor den Türen, auf der Karte, in der Ortsanzeige und in den Missionen. Flure sind nicht nummeriert.
- Fachräume Chemie und Biologie (OG1) und Physik (OG2) sind nach den Hohenloher-Plänen 2545624 A und 2545625 B möbliert: Lehrerexperimentiertisch, Schülerbänke in Reihen zur Projektionswand, Schrankzeile mit Spülen an der Flurwand, Medienbrücke unter der Decke, Sammlungen mit Schränken und Arbeitsinsel.
- Das 2. Obergeschoss hat jetzt eigene Wände und Türen aus Plan 3.04 (vorher Hülle des 1. OG): Kursräume 2.42–2.51, Ausweichräume 2.52–2.56, Physik 2.37–2.41, Kunst 2.31–2.36 als sechs Räume.

## Schulhaus-Rallye

- Start über den Knopf „Rallye“ oder das Missionsmenü; Jahrgangsstufe 5 bis 13 wählen. Der Stundenplan mit sechs Stunden wird jedes Mal neu gewürfelt.
- Direktstart per Link: an die Adresse `?rallye=7` anhängen (Zahl = Jahrgangsstufe).
- Es gibt keine Zielmarkierung. „Hilfe“ blendet sie für die aktuelle Stunde ein und wird gezählt.
- Lösungswörter zum Abhaken: 5 KREIDE · 6 FERIEN · 7 ZIRKEL · 8 GLOBUS · 9 TAFELN · 10 LINEAL · 11 FÜLLER · 12 ABITUR · 13 DIPLOM. Am Ende zeigt das Spiel Jahrgangsstufe, Zeit, Hilfen und Lösungswort.

## Umzugs-Update (Standard) und Vollversion

- Standard ist das Umzugs-Update: Der Flügel mit Verwaltung und Oberstufe samt Treppenhalle E.0/1.0/2.0 ist mit Bauzäunen abgesperrt, Start ist am Eingang Treppenraum II (TR E.2). Die Räume 1.27 und 1.28 sind das vorläufige Lehrerzimmer. Die Rallye gibt es für die Jahrgangsstufen 5 bis 10.
- Vollversion: auf der Startseite im Feld „Code“ oder in der Tasche (B) `NEUBAUKOMPLETT` eingeben. Die Seite lädt neu; derselbe Code schaltet zurück. Die Wahl wird im Browser gespeichert, gilt also je Gerät.
- Neu: Stufentribüne östlich der Turnhalle 4 mit begehbarem Hallendach; Türen ohne offen stehende Flügel.

## Teilinbetriebnahme (Raumnutzung vom 17.11.2026)

- Im Umzugs-Update tragen die genutzten Räume die Bezeichnung aus der Raumnutzungstabelle: Klassenzimmer 5A–9B, Lehrkräfte (1.27/1.28), Sekretariat (E.47), Schulleitung (E.48), KJSA (E.32), EDV-Raum 1/2 (E.45/E.46), Schülercafé (E.16), LIFE-Raum (1.1), OGTS (2.29/2.30), Klassenzimmer Musik (2.2), Biologie, Chemie, Kunst, Physik.
- Nicht genutzte Klassenräume heißen „Klassenraum (derzeit frei)“; dort findet kein Unterricht statt.
- Rallye: Auswahl nach Klasse (5A bis 9B). Die erste Stunde ist immer im echten Klassenzimmer, die übrigen fünf werden aus den genutzten Fachräumen gewürfelt. Direktlink: `?rallye=7b`.
- Schultag: nach der 6. Stunde folgt eine Mittagspause von 5 Minuten (sonst Pausen 2 Minuten, Stunden 4 Minuten); ein ganzer Schultag dauert 39 Minuten. Die Küchen-Ausgabe der Mensa (E.17) ist nur in der Mittagspause besetzt.
- Erste Hilfe ist im Umzugs-Update im Sekretariat (E.47); E.28 ist als ungenutzt beschildert.

## Fassade, WCs, Technikräume, Gespräche (18.11.2026)

- Die äußere Holzschicht der Fassade ist jetzt ein offener Lamellen-Sonnenschutz mit Verglasung dahinter: Von innen sieht man das Außengelände.
- WCs: die im Plan eingezeichneten WCs und Urinale sind als Keramik dargestellt, Kabinentrennwände als 2 m hohe Platten, dazu Waschbecken mit Spiegel.
- Technik-, Lüftungs-, Heizungs-, EDV/ELT-, Lager- und Reinigungsräume sind nur für Lehrkräfte: Code `LEHRKRAFT` (Startseite oder Tasche) schaltet den Lehrkraft-Modus ein und wieder aus. An den Türen hängt „🔒 Nur Lehrkräfte“.
- Ansprechen: Antwort erscheint als Untertitel unten im Bild mit Name und Klasse; Schülerinnen und Schüler, Lehrkräfte und Personal antworten passend zu Pause, Unterricht, Mittagspause und Ort und geben auf Nachfrage Wegtipps zum aktuellen Ziel.
- Sonnenschutz-Lamellen nur im 1. und 2. OG an der Außenkante; die Wand zwischen Flur und Fluchtbalkon ist verglast (Blick zur Turnhalle frei). Im EG bleiben die Holzwände.
- Fluchtbalkone werden von den Figuren nicht mehr benutzt; Spielende dürfen sie weiterhin betreten.
- Jungen- und Herren-WCs: Urinale mit Trennwänden statt WCs, wo im Plan keine Kabine darum steht.

## Easter Eggs, Tafeln, Start (18.11.2026)

- 21 Easter Eggs; Zähler und Liste der gefundenen in der Tasche (B). Einige hängen an der echten Uhrzeit (0–1 Uhr, 22–5 Uhr).
- Tafeln: weiß, über die ganze Breite der fenster- und türlosen Wand; Tische und Lehrkraft richten sich danach aus.
- Umzugs-Update: Start auf dem Platz westlich der Fahrradständer, 35 m vor dem Eingang Treppenraum II (gelbes Schild).
- Codes auf der Startseite (LEHRKRAFT, GOTTMODUS) starten das Spiel jetzt direkt mit.

## Navi, Durchsagen, Fundbüro, Aufsicht-Sterne (22.11.2026)

- Navi (Taste N oder Karte K): nur zentrale Orte (Klassenzimmer, Sekretariat, Schulleitung, Lehrerzimmer, Mensa, Turnhalle, Bibliothek, Hausmeister …) – Fach- und Nebenräume muss man selbst finden. Leuchtende Pfeile am Boden und eine türkise Linie auf der Karte führen hin, auch über Treppen. In der Rallye ist das Navi aus.
- Durchsagen: alle 1–2,5 Minuten ein gelbes Banner oben mit Gong (Hinweise, Witze, Fundsachen-Tipps).
- Fundbüro: 8 Fundsachen liegen in Räumen. Mit Namen und Klasse → ins Klassenzimmer dieser Klasse bringen, ohne Namen → Sekretariat. Je 15 Punkte, alle zusammen +50.
- Aufsicht-Sterne: Rennen im Gebäude in der Nähe einer Lehrkraft, des Hausmeisters oder der Schulleitung und Müll fallen lassen geben einen Stern. Sterne verfallen nach 45 s Wohlverhalten, beim Müllwegwerfen oder für eine zurückgebrachte Fundsache. Bei drei Sternen: Durchsage mit dem Spitznamen, Rennen gesperrt, bis man sich im Sekretariat meldet. Draußen darf gerannt werden. Lehrkraft- und Gottmodus sind ausgenommen.

## Gedächtnis und Alltagsszenen (22.11.2026)

- Gedächtnis (pro Gerät gespeichert): Hausmeister, Sekretariat, Küche, Schulleitung und Lehrkräfte erinnern sich, z. B. an aufgehobenen Müll, zurückgebrachte Fundsachen, Meldungen im Sekretariat, Vordrängeln oder einen gefundenen Schlüssel, und sprechen dich darauf an.
- Alltagsszenen alle 30–60 s in deiner Nähe: jemandem fällt die Brotzeit herunter (der Müll bleibt liegen), Arbeitsblätter fliegen herum, zwei Schüler unterhalten sich, Lehrkräfte und Hausmeister murmeln vor sich hin.
- Schlüsselsuche: Eine Lehrkraft vermisst ihren Schlüssel; er liegt in der Nähe. Zurückbringen: +10.
- Schlange an der Essensausgabe (Mittagspause): Wer sich vordrängelt, wird ermahnt und bekommt einen Aufsicht-Stern. Wer sich hinten anstellt, ist nach kurzer Zeit dran.

## Team und Partneraufgaben (23.11.2026)

- Team bilden: neben einen anderen Spieler stellen und E drücken (der andere bestätigt) – oder Menü → „Team“ → „Partner suchen“ (zuerst aus derselben Rallye-Klasse). Nach 60 s ohne Treffer springt der Ersatzpartner „Max“ ein.
- Verständigung ohne Chat: Funk mit 16 vorgegebenen Nachrichten (Taste T oder 💬, Zahlen 1–9) und Markierungen (Taste Q oder 📍). Es gibt bewusst keinen freien Text. Der Server leitet nur Zahlen weiter (Nachrichten-Nummer, Koordinaten, Aufgaben-Code).
- Lotsen-Mission: Einer sieht das Ziel (orange auf der Karte), der andere läuft „blind“ ohne Karte und Navi und wird per Funk und Markierungen hingeführt. +30. Max kann Lotse sein.
- Doppelschloss: Zwei grüne Schalterplatten in zwei Stockwerken, jeder bekommt nur einen Rätselhinweis zu seinem Schalter. Nur gleichzeitig darauf stehen öffnet das Schloss. +40.
- Wichtig: Die Team-Funktionen brauchen die neue server.js (bei Render automatisch nach dem Push).

## Live-Wetter und Möbel (26.11.2026)

- Live-Wetter aus Putzbrunn: Der Spielserver holt alle 10 Minuten das aktuelle Wetter bei Open-Meteo (ohne Schlüssel) und gibt es unter /weather an alle Spieler weiter. Die Geräte der Schüler fragen nur den eigenen Server, nicht den Wetterdienst.
- Darstellung: Sonne, Wolken, grau, Nebel, Regen, Schnee, Gewitter (Blitze und Donner). Regen und Schnee fallen nur draußen, sind aber durch die Fenster zu sehen.
- Menü → „Wetter“: Live oder selbst wählen, außerdem „Aus“ für schwache Geräte. Die Wahl gilt nur für das eigene Gerät.
- Ohne Spielserver (z. B. auf der Claude-Seite) gibt es kein Live-Wetter, nur das selbst gewählte.
- Möbel wie im Neubau: helle Tische mit schwarzen Beinen, weiße Stühle.

## Wie im echten Neubau, Handy-Steuerung (26.11.2026)

- Treppenhäuser: große Ziffer für das Stockwerk (UG -1, EG 0, OG1 1, OG2 2) neben und über den Treppenhaustüren, Stahlwand und Holzhandlauf an jedem Treppenlauf.
- Differenzierungszonen: Holzwand mit Sitznischen und Regalfächern (Figuren setzen sich hinein).
- Aula/Pausenhalle, Schülercafé, Ganztag, Mensa-Ausgabe: weiße Akustiklamellen unter der Decke; Fächerwand in der Garderobe.
- WCs: lange weiße Rinnenwaschbecken mit durchgehendem Spiegel und Händetrockner, weiße Kabinen.
- Klassenzimmer: Trapeztische, weiße Stühle mit Lehne, Vorhänge an der Fensterseite.
- Handy: Die Knöpfe „Sprung“ und „Rennen“ sind wieder da (sie waren durch einen Namenskonflikt versteckt). Sprung reagiert sofort beim Antippen; gedrückt halten = immer weiter springen, auch beim Rennen. Im Querformat sitzen die Knöpfe unten rechts neben der Minikarte.

- Aufsicht-Sterne: Bei drei Sternen verfolgt dich eine Aufsicht in gelber Weste (etwas langsamer als Gehen). Erwischt sie dich, bringt sie dich ins Sekretariat; melden im Sekretariat beendet die Verfolgung ebenfalls.

## Klimmzüge und Muskeln (26.11.2026)

- Klimmzugstangen: 2 im Calisthenics-Bereich, 3 im Fitnessbereich, je 1 in jeder Turnhalle. E = dranhängen, Leertaste (Handy: Sprung, gedrückt halten geht auch) = Klimmzug, E oder Laufen = absteigen.
- Muskel-Stufen nach 10, 30, 60, 100, 200 Klimmzügen: Arme und Schultern werden comichaft breiter (kurze Ärmel, kräftige Unterarme). Der Sportlehrer kommentiert jede Stufe, je +15 Punkte, Maximum +50.
- Für alle sichtbar: Übertragen wird nur die Stufe 0–5 (eine Zahl, kein Text). Die neue server.js lässt dieses Feld durch.
- Gespeichert pro Gerät, kein Muskelabbau.

## Tag/Nacht, Ruf, Feueralarm-Übung, Adventskalender (26.11.2026)

- Tag und Nacht nach echter Uhrzeit (Sonnenauf- und -untergang in München je Monat). Nachts: dunkler Himmel, leuchtende Fenster, im Gebäude geht das Licht an, der Hausmeister macht seine Runde mit Taschenlampe. Menü → Wetter & Tageszeit: echt / immer Tag / immer Nacht.
- Ruf bei Hausmeister, Sekretariat, Lehrkräften, Sportlehrer, Küche (−3 … +3, pro Gerät): steigt durch Müll aufheben, Fundsachen, Schlüssel, Anstellen, Klimmzüge; sinkt durch Rennen, Müll fallen lassen, Vordrängeln. Wirkt auf Gespräche (bei gutem Ruf Geheimtipps) und darauf, wie genau die Aufsicht hinschaut. Menü → „Dein Ruf“.
- Feueralarm-Übung (Menü): Start in einem Klassenzimmer im OG, Sirene, rote Warnung, Durchsage; grüne Notausgang-Schilder an allen Treppenhaustüren; Navi aus; Rennen gibt +5 s Strafzeit; Ziel ist der Sammelplatz (derzeit Rasenspielfeld – in more.js bei SAMMEL änderbar). Danach Zeit, Sterne und ein Quiz mit 3 von 6 Fragen zum Verhalten bei Feueralarm.
- Adventskalender: vom 1. bis 24. Dezember jeden Tag ein Geschenk im Schulhaus, Rätselhinweis im Menü, verpasste Türchen nachholbar; an Tag 12 schneit es, an Tag 24 gibt es eine Weihnachtsmütze, die alle sehen. Vorschau zum Testen: Adresse mit ?advent=5 (oder eine andere Zahl) öffnen.
