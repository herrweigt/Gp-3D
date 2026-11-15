// Mehrspieler-Server für "Gymnasium Putzbrunn – Open World"
// Start:  npm install  &&  npm start      (Port über Umgebungsvariable PORT, Standard 3000)
// Liefert index.html aus und verteilt die Positionen aller Spieler über WebSocket (/ws).
// Es wird nichts gespeichert: kein Log, keine Datenbank, nur Spitzname/Farbe/Position im Arbeitsspeicher.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;
const MAX_PLAYERS = 60;
const html = fs.readFileSync(path.join(__dirname, 'index.html'));

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(html);
  } else if (url === '/favicon.ico') {
    res.writeHead(204); res.end();
  } else if (url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('ok');
  } else { res.writeHead(404); res.end('Not found'); }
});

const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 1024 });
const players = new Map();   // id -> {ws, state, n, t}
let nextId = 1;
const num = (v, lo, hi) => (typeof v === 'number' && isFinite(v) ? Math.max(lo, Math.min(hi, v)) : null);

wss.on('connection', ws => {
  if (players.size >= MAX_PLAYERS) { ws.close(1013, 'voll'); return; }
  const id = String(nextId++);
  const p = { ws, state: null, n: 0, t: Date.now() };
  players.set(id, p);
  ws.on('message', data => {
    const now = Date.now();
    if (now - p.t > 1000) { p.t = now; p.n = 0; }
    if (++p.n > 30) return;                       // Rate-Limit: 30 Nachrichten/Sekunde
    let m; try { m = JSON.parse(data.toString()); } catch (e) { return; }
    if (!m || m.t !== 'p' || !m.d || typeof m.d !== 'object') return;
    const d = m.d, x = num(d.x, -500, 500), z = num(d.z, -500, 500), f = num(d.f, 0, 9), r = num(d.r, -10, 10);
    if (x === null || z === null || f === null || r === null) return;
    p.state = { n: String(d.n || 'Gast').slice(0, 14), c: num(d.c, 0, 31) || 0, x, z, y: num(d.y, -5, 60) || 0, f: Math.round(f), r,
                s: num(d.s, 0, 99999) || 0, m: d.m === 2 ? 2 : d.m ? 1 : 0, w: d.w ? 1 : 0, j: num(d.j, 0, 12) || 0 };
  });
  const bye = () => players.delete(id);
  ws.on('close', bye); ws.on('error', bye);
});

setInterval(() => {
  const snap = {};
  for (const [id, p] of players) if (p.state) snap[id] = p.state;
  for (const [id, p] of players) {
    if (p.ws.readyState === 1) p.ws.send(JSON.stringify({ t: 's', id, p: snap }));
  }
}, 100);

server.listen(PORT, () => console.log('Spiel läuft auf Port ' + PORT));
