/**
 * English Step by Step: trainer tracking
 *
 * This script lives inside your Google Sheet. It receives progress from the
 * course page and writes it into two tabs:
 *   Events   - one row every time a scholar finishes a lesson (the full history)
 *   Scholars - one row per scholar with a simple summary (easy to read)
 *
 * The trainer dashboard page reads the Events tab through doGet below.
 */

// 1. CHANGE THIS to your own secret word before you deploy.
//    You type the same word on the dashboard page to see the data.
var TRAINER_KEY = 'CHANGE-THIS-TO-YOUR-OWN-SECRET-WORD';

var EVENTS = 'Events';
var SCHOLARS = 'Scholars';
var INACTIVE_DAYS = 3;

var EVENT_HEAD = ['Event ID', 'Time (UTC)', 'Scholar ID', 'Name', 'Batch', 'Kind',
  'Lesson no', 'Lesson', 'Score %', 'Stars', 'Right', 'Asked', 'Seconds', 'Missed (JSON)'];
var SCHOLAR_HEAD = ['Scholar ID', 'Name', 'Batch', 'Joined', 'Last active',
  'Lessons done', 'Average score %', 'Minutes studied', 'Status', 'Speaking sets', 'Speaking avg %'];

/** Run this once from the editor (Run > setup) to create the tabs and give permission. */
function setup() {
  sheet_(EVENTS, EVENT_HEAD);
  sheet_(SCHOLARS, SCHOLAR_HEAD);
}

function sheet_(name, head) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(head);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, head.length).setFontWeight('bold');
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Cuts long text, removes line breaks, and stops a typed "=formula" from running in the Sheet.
function safe_(v, n) {
  var s = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').slice(0, n);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function num_(v) {
  var n = Number(v);
  return isFinite(n) ? n : 0;
}

/** The course page sends one message here each time something happens. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = JSON.parse(e.postData.contents);
    if (!p || !p.id || !p.name) return out_({ ok: false, error: 'missing name' });

    var sh = sheet_(EVENTS, EVENT_HEAD);
    var last = sh.getLastRow();

    // Skip a message we already stored (the phone may send twice after a bad signal).
    if (p.eid && last >= 2) {
      var from = Math.max(2, last - 499);
      var ids = sh.getRange(from, 1, last - from + 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) {
        if (ids[i][0] === p.eid) return out_({ ok: true, duplicate: true });
      }
    }

    var kind = p.kind === 'lesson' || p.kind === 'revise' || p.kind === 'speak' ? p.kind : 'join';
    var missed = Array.isArray(p.missed) ? p.missed.slice(0, 10).map(function (m) { return String(m).slice(0, 90); }) : [];
    sh.appendRow([
      safe_(p.eid, 40),
      safe_(p.t || new Date().toISOString(), 40),
      safe_(p.id, 120),
      safe_(p.name, 60),
      safe_(p.batch, 40),
      kind,
      num_(p.lessonNo),
      safe_(p.lesson, 80),
      num_(p.pct),
      num_(p.stars),
      num_(p.right),
      num_(p.asked),
      Math.min(3600, num_(p.secs)),
      JSON.stringify(missed)
    ]);

    updateScholar_(String(p.id).slice(0, 120));
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/** Works out one scholar's summary row from the Events tab. */
function updateScholar_(id) {
  var ev = sheet_(EVENTS, EVENT_HEAD);
  var n = ev.getLastRow();
  if (n < 2) return;
  var rows = ev.getRange(2, 1, n - 1, EVENT_HEAD.length).getValues();

  var name = '', batch = '', joined = null, lastActive = null, secs = 0;
  var lessons = {}, attempts = 0, sumPct = 0, spSets = {}, spN = 0, spSum = 0;
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    if (String(r[2]) !== id && String(r[2]) !== "'" + id) continue;
    var t = new Date(r[1]);
    if (isNaN(t)) continue;
    name = r[3]; batch = r[4];
    if (!joined || t < joined) joined = t;
    if (!lastActive || t > lastActive) lastActive = t;
    secs += num_(r[12]);
    if (r[5] === 'speak') {
      spSets[r[6] + '|' + r[7]] = true;
      spN++;
      spSum += num_(r[8]);
    }
    if (r[5] === 'lesson') {
      lessons[r[6]] = true;
      attempts++;
      sumPct += num_(r[8]);
    }
  }
  if (!joined) return;

  var done = Object.keys(lessons).length;
  var avg = attempts ? Math.round(sumPct / attempts) : 0;
  var days = (new Date() - lastActive) / 86400000;
  var status = 'On track';
  if (done === 0) status = 'Not started';
  else if (done >= 3 && avg < 60) status = 'Needs help';
  else if (days >= INACTIVE_DAYS) status = 'Inactive';

  var sc = sheet_(SCHOLARS, SCHOLAR_HEAD);
  var line = [id, safe_(String(name).replace(/^'/, ''), 60), safe_(String(batch).replace(/^'/, ''), 40),
    joined, lastActive, done, avg, Math.round(secs / 60), status,
    Object.keys(spSets).length, spN ? Math.round(spSum / spN) : 0];
  var m = sc.getLastRow();
  var at = -1;
  if (m >= 2) {
    var col = sc.getRange(2, 1, m - 1, 1).getValues();
    for (var k = 0; k < col.length; k++) {
      if (String(col[k][0]) === id) { at = k + 2; break; }
    }
  }
  if (at > 0) sc.getRange(at, 1, 1, line.length).setValues([line]);
  else sc.appendRow(line);
}

/** The trainer dashboard reads all events here. It needs your secret word. */
function doGet(e) {
  var key = e && e.parameter && e.parameter.key;
  if (key !== TRAINER_KEY) return out_({ ok: false, error: 'wrong key' });

  var sh = sheet_(EVENTS, EVENT_HEAD);
  var n = sh.getLastRow();
  var rows = n >= 2 ? sh.getRange(2, 1, n - 1, EVENT_HEAD.length).getValues() : [];
  var events = rows.map(function (r) {
    var missed = [];
    try { missed = JSON.parse(r[13] || '[]'); } catch (x) {}
    return {
      eid: r[0],
      t: r[1] instanceof Date ? r[1].toISOString() : String(r[1]),
      id: String(r[2]).replace(/^'/, ''),
      name: String(r[3]).replace(/^'/, ''),
      batch: String(r[4]).replace(/^'/, ''),
      kind: r[5],
      lessonNo: r[6],
      lesson: String(r[7]).replace(/^'/, ''),
      pct: r[8],
      stars: r[9],
      right: r[10],
      asked: r[11],
      secs: r[12],
      missed: missed
    };
  });
  return out_({ ok: true, events: events, generated: new Date().toISOString() });
}
