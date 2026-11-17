/* Everything the app remembers about the scholar. It is kept in this phone's browser (localStorage). */
(function () {
  var ESS = window.ESS, KEY = 'ess-v2';

  function fresh() {
    return {
      v: 2,
      who: null,                 // { name, batch, id } when tracking is on
      out: [],                   // progress messages waiting to be sent to the trainer
      done: {},                  // lessonId -> { pct, stars }
      xp: 0,
      days: {},                  // 'YYYY-MM-DD' -> XP earned that day
      weak: {},                  // 'lessonId#n' -> { n: times missed, t: last time }
      speak: { n: 0, sum: 0, sets: {} },   // speaking totals, and sets: setId -> { best, tries }
      last: '',
      prefs: { theme: 'system', rate: 0.9, voice: '', goal: ESS.config.dailyGoalXp, big: false }
    };
  }

  var S;
  try {
    S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || '{}'));
    S.prefs = Object.assign(fresh().prefs, S.prefs || {});
    S.speak = Object.assign(fresh().speak, S.speak || {});
    if (!Array.isArray(S.out)) S.out = [];
  } catch (e) { S = fresh(); }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  function addXP(n) {
    if (!n) return;
    S.xp += n;
    var k = ESS.dayKey();
    S.days[k] = (S.days[k] || 0) + n;
    var keys = Object.keys(S.days).sort();
    while (keys.length > 120) delete S.days[keys.shift()];
    save();
  }
  function todayXP() { return S.days[ESS.dayKey()] || 0; }

  // Days in a row with some XP. Today may still be empty without breaking the streak.
  function streak() {
    var d = new Date(), n = 0;
    if (!S.days[ESS.dayKey(d)]) d.setDate(d.getDate() - 1);
    while (S.days[ESS.dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  // A text code the scholar can copy to move progress to another phone.
  function exportCode() {
    var copy = JSON.parse(JSON.stringify(S)); copy.out = [];
    return 'ESS1:' + btoa(unescape(encodeURIComponent(JSON.stringify(copy))));
  }
  function importCode(code) {
    try {
      code = String(code).trim();
      if (code.indexOf('ESS1:') !== 0) return false;
      var data = JSON.parse(decodeURIComponent(escape(atob(code.slice(5)))));
      if (!data || data.v !== 2 || typeof data.done !== 'object') return false;
      S = Object.assign(fresh(), data); S.prefs = Object.assign(fresh().prefs, data.prefs || {});
      ESS.store.S = S; save(); return true;
    } catch (e) { return false; }
  }
  function reset() { var w = S.who, o = S.out, p = S.prefs; S = fresh(); S.who = w; S.out = o; S.prefs = p; ESS.store.S = S; save(); }

  ESS.store = { S: S, save: save, addXP: addXP, todayXP: todayXP, streak: streak, exportCode: exportCode, importCode: importCode, reset: reset };

  ESS.applyPrefs = function () {
    var p = ESS.store.S.prefs, r = document.documentElement;
    if (p.theme === 'light' || p.theme === 'dark') r.setAttribute('data-theme', p.theme); else r.removeAttribute('data-theme');
    document.body.classList.toggle('big', !!p.big);
  };
})();
