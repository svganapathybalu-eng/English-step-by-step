/* Starts the app: prepares the lessons, handles the address (#learn, #lesson-ps ...) and the bottom menu. */
(function () {
  var ESS = window.ESS, $ = ESS.$, h = ESS.h;
  var TABS = ['learn', 'practice', 'speak', 'me'];

  /* ---------- prepare the lessons ---------- */
  ESS.LESSONS = []; ESS.BYID = {};
  ESS.COURSE.forEach(function (m, mi) { m.lessons.forEach(function (l) { var x = { m: m, mi: mi, l: l, n: ESS.LESSONS.length + 1 }; ESS.LESSONS.push(x); ESS.BYID[l.id] = x; }); });

  // Pick up to three clean example sentences from a lesson to speak aloud.
  function exampleSentences(lesson) {
    var out = [];
    lesson.steps.forEach(function (s) {
      if (s.t !== 'learn') return;
      s.b.forEach(function (b) {
        if (!Array.isArray(b) || b[0] !== 'ex') return;
        b.slice(1).forEach(function (x) {
          var t = ESS.plain(x.split('|')[0]).replace(/\s+/g, ' ').trim(), n = t.split(' ').length;
          if (n < 3 || n > 14 || /[→_0-9]/.test(t) || /[“”"]/.test(t) || out.indexOf(t) > -1) return;
          out.push(t);
        });
      });
    });
    if (out.length <= 3) return out;
    return [out[0], out[Math.floor(out.length / 2)], out[out.length - 1]];
  }
  ESS.LESSONS.forEach(function (x) {
    var l = x.l;
    l.steps.forEach(function (s, i) { s.key = l.id + '#' + i; });
    var ex = exampleSentences(l);
    if (ex.length >= 2) {
      l.steps.push({ t: 'learn', title: 'Now say it aloud', b: ['Speaking helps you remember. Listen first, then say each sentence. Try to sound natural, not fast.'] });
      ex.forEach(function (t) { var s = { t: 'say', s: t, h: '', key: l.id + '#say' }; l.steps.push(s); });
    }
  });

  /* ---------- router ---------- */
  function setNav(tab) { ESS.$$('.nav a').forEach(function (a) { if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); }); }

  ESS.go = function (hash, force) {
    if ('#' + hash === location.hash) { if (force) route(); } else location.hash = hash;
  };

  function startLesson(id) {
    var x = ESS.BYID[id]; if (!x) return ESS.go('learn');
    var nx = ESS.LESSONS[x.n];
    ESS.player.start({ kind: 'lesson', id: id, no: x.n, title: x.l.title, steps: x.l.steps, sum: x.l.sum, back: 'learn', again: 'lesson-' + id,
      next: nx ? { hash: 'lesson-' + nx.l.id, title: nx.l.title } : null });
  }
  function startSet(id) {
    var steps, title, sum = [], next = null;
    if (id === 'daily') { steps = ESS.buildDaily(); title = 'Today’s speaking'; }
    else {
      var i = -1; ESS.SPEAK.forEach(function (s, k) { if (s.id === id) i = k; });
      if (i < 0) return ESS.go('speak');
      steps = ESS.SPEAK[i].steps; title = ESS.SPEAK[i].title; sum = ESS.SPEAK[i].sum;
      var n = ESS.SPEAK[i + 1]; if (n) next = { hash: 'set-' + n.id, title: n.title };
    }
    ESS.player.start({ kind: 'set', id: id, title: title, steps: steps, sum: sum, back: 'speak', again: 'set-' + id, next: next });
  }
  function startReview() {
    var steps = ESS.buildReview();
    if (!steps.length) return ESS.go('practice');
    ESS.player.start({ kind: 'review', id: 'review', title: 'Review', steps: steps, sum: [], back: 'practice', again: 'review' });
  }

  function route() {
    var hash = (location.hash || '#learn').slice(1), S = ESS.store.S;
    ESS.player.stop();
    window.scrollTo(0, 0);
    if (ESS.track.on && !S.who) { setNav(''); return ESS.views.gate(); }
    if (hash.indexOf('lesson-') === 0) return startLesson(hash.slice(7));
    if (hash.indexOf('set-') === 0) return startSet(hash.slice(4));
    if (hash === 'review') return startReview();
    var tab = TABS.indexOf(hash) > -1 ? hash : 'learn';
    setNav(tab); ESS.views[tab]();
    ESS.refreshChips();
  }

  /* ---------- header chips and bottom menu ---------- */
  ESS.refreshChips = function () {
    var el = $('#chips'); if (!el) return; el.replaceChildren();
    var st = ESS.store.streak(), a = h('span', { class: 'stat fire', title: 'Days in a row' }), b = h('span', { class: 'stat bolt', title: 'XP points' });
    a.innerHTML = ESS.icon('flame') + st; b.innerHTML = ESS.icon('bolt') + ESS.store.S.xp;
    el.append(a, b);
  };
  function buildNav() {
    var nav = $('#nav'), items = [['learn', 'Learn', 'book'], ['practice', 'Practise', 'target'], ['speak', 'Speak', 'mic'], ['me', 'Me', 'user']];
    items.forEach(function (it) { var a = h('a', { href: '#' + it[0], 'data-tab': it[0] }); a.innerHTML = ESS.icon(it[2]) + '<span>' + it[1] + '</span>'; nav.append(a); });
  }

  /* ---------- go ---------- */
  ESS.applyPrefs();
  document.title = ESS.config.appName;
  $('#brand').textContent = ESS.config.appName;
  buildNav();
  window.addEventListener('hashchange', route);
  if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = function () {};
  route();
  ESS.track.flush();
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(function () {});
})();
