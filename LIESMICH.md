# Gymnasium Putzbrunn – Open World

Inhalt:
- `index.html` – das komplette Spiel in einer Datei (3D-Engine und Gebäudedaten sind eingebettet, es wird nichts von fremden Servern nachgeladen).
- `server.js` + `package.json` – kleiner Mehrspieler-Server (Node.js ab Version 18).

## Mehrspieler online (für Schülerinnen und Schüler ohne Claude-Konto)
Das Spiel braucht dafür einen Dienst, der Node.js ausführt und WebSockets erlaubt:
1. Diesen Ordner in ein (privates) GitHub-Repository laden.
2. Bei einem Node-Hoster (z. B. Render, Railway, Fly.io oder ein Schul-/Sachaufwandsträger-Server) einen "Web Service" aus dem Repository anlegen.
   Build-Befehl: `npm install` – Start-Befehl: `npm start`. Der Port kommt automatisch aus der Variable `PORT`.
3. Die Adresse des Dienstes an die Klasse geben. Alle, die sie öffnen, sind in derselben Welt.

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
