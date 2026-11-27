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

// Live-Wetter für Putzbrunn (Open-Meteo, ohne Schlüssel). Alle 10 Minuten neu, für alle Spieler gemeinsam –
// die Geräte der Schüler fragen nur diesen Server, nicht den Wetterdienst.
const https = require('https');
let wxCache = null, wxTime = 0, wxErr = '';
function getJSON(url, cb) {   // IPv4 erzwingen (Render: ausgehendes IPv6 oft nicht verfügbar)
  const req = https.get(url, { family: 4, headers: { 'User-Agent': 'gp-3d-schulspiel', 'Accept': 'application/json' } }, r => {
    let b = ''; r.on('data', d => b += d);
    r.on('end', () => { if (r.statusCode !== 200) return cb(new Error('HTTP ' + r.statusCode)); try { cb(null, JSON.parse(b)); } catch (e) { cb(e); } });
  });
  req.on('error', e => cb(e)); req.setTimeout(8000, () => req.destroy(new Error('Timeout')));
}
// Bright Sky (Daten des Deutschen Wetterdienstes): Symbol -> WMO-ähnlicher Code
const BSKY = { 'clear-day': 0, 'clear-night': 0, 'partly-cloudy-day': 2, 'partly-cloudy-night': 2, cloudy: 3, fog: 45, wind: 3, rain: 61, sleet: 66, snow: 71, hail: 96, thunderstorm: 95 };
function getWeather(cb) {
  if (process.env.WX_MOCK) return cb(JSON.parse(process.env.WX_MOCK));
  if (wxCache && Date.now() - wxTime < 600000) return cb(wxCache);
  getJSON('https://api.open-meteo.com/v1/forecast?latitude=48.0753&longitude=11.7181&current=temperature_2m,weather_code,cloud_cover,wind_speed_10m,is_day&timezone=Europe%2FBerlin', (e, d) => {
    if (!e && d && d.current) { const c = d.current; wxCache = { temp: c.temperature_2m, code: c.weather_code, cloud: c.cloud_cover, wind: c.wind_speed_10m, day: c.is_day, time: c.time, src: 'open-meteo' }; wxTime = Date.now(); wxErr = ''; return cb(wxCache); }
    const e1 = e ? e.message : 'keine Daten';
    getJSON('https://api.brightsky.dev/current_weather?lat=48.0753&lon=11.7181', (e2, d2) => {
      if (!e2 && d2 && d2.weather) { const w = d2.weather; wxCache = { temp: w.temperature, code: BSKY[w.icon] !== undefined ? BSKY[w.icon] : 3, cloud: w.cloud_cover, wind: w.wind_speed_10, time: w.timestamp, src: 'brightsky' }; wxTime = Date.now(); wxErr = ''; return cb(wxCache); }
      wxErr = 'open-meteo: ' + e1 + ' | brightsky: ' + (e2 ? e2.message : 'keine Daten'); cb(wxCache);
    });
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/' || url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(html);
  } else if (url === '/favicon.ico') {
    res.writeHead(204); res.end();
  } else if (url === '/weather') {
    getWeather(w => { res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'max-age=300' }); res.end(JSON.stringify(w || { error: wxErr || 'noch keine Daten' })); });
  } else if (url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('ok');
  } else { res.writeHead(404); res.end('Not found'); }
});

const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 1024 });
const players = new Map();   // id -> {ws, state, n, t}
let nextId = 1;
const TEAMF = { k:[0,999999], lf:[0,1], lc:[0,99], tq:[0,999999], tp:[0,999999], md:[0,1], qm:[0,40], qs:[0,255], px:[-500,500], pz:[-500,500], pf:[0,9], ps:[0,255], tk:[0,9999], tr:[0,2], ts:[0,255], td:[0,255], sw:[0,2], mu:[0,5], xm:[0,1], sc:[0,1], js:[0,1] };
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
    // Team-Felder: ausschließlich Zahlen (kein freier Text, kein Chat)
    for (const k in TEAMF) { const v = num(d[k], TEAMF[k][0], TEAMF[k][1]); p.state[k] = v === null ? 0 : (k === 'px' || k === 'pz' ? Math.round(v * 10) / 10 : Math.round(v)); }
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
