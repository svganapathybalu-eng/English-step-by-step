/* The player: runs a list of steps one screen at a time (a lesson, a speaking set, or a review).
   It shows progress, the Continue / Check button, retries missed questions once, and gives XP at the end. */
(function () {
  var ESS = window.ESS, h = ESS.h, HT = ESS.html, plain = ESS.plain, $ = ESS.$;
  var P = null;

  function isSpeak(s) { return s.t === 'say' || s.t === 'talk'; }

  function start(o) {
    stop();
    P = { o: o, queue: o.steps.map(function (s) { return { s: s, retry: false }; }), i: 0, right: 0, count: 0, missed: [], sp: { n: 0, sum: 0, ok: 0 }, t0: Date.now(), key: null };
    document.body.classList.add('playing');
    renderStep();
  }
  function stop() {
    if (!P) return;
    ESS.speech.stop(); P = null; document.body.classList.remove('playing');
  }
  function exit() { ESS.go(P ? P.o.back || 'learn' : 'learn'); }

  function updateWeak(s, ok, retry) {
    var W = ESS.store.S.weak;
    if (!s.key) return;
    if (!ok && !retry) { W[s.key] = { n: ((W[s.key] && W[s.key].n) || 0) + 1, t: Date.now() }; }
    else if (ok && !retry && W[s.key]) { W[s.key].n--; if (W[s.key].n <= 0) delete W[s.key]; }
    ESS.store.save();
  }

  function renderStep() {
    var box = $('#view'); box.replaceChildren();
    var item = P.queue[P.i], s = item.s, n = P.queue.length;
    var cnt = h('span', { class: 'c' }, (P.i + 1) + ' / ' + n);
    var meter = h('div', { class: 'meter', role: 'progressbar', 'aria-label': 'Progress', 'aria-valuemin': '0', 'aria-valuemax': String(n), 'aria-valuenow': String(P.i) }, h('i', { style: 'width:' + Math.round(100 * P.i / n) + '%' }));
    var card = h('div', { class: 'p-card' + (isSpeak(s) ? ' sp' : '') }), fbBox = h('div');
    var go = h('button', { class: 'btn', type: 'button' }, 'Continue'), bar = h('div', { class: 'bar' }, go);
    var x = h('button', { class: 'xbtn', type: 'button', 'aria-label': 'Close lesson', on: { click: exit } }); x.innerHTML = ESS.icon('x');
    box.append(h('div', { class: 'p-top' }, x, h('span', { class: 't' }, P.o.title), cnt), meter, card, fbBox, bar);

    var locked = false, ctx = { key: null }; P.key = null;
    function setGo(label, en, fn) { go.textContent = label; go.disabled = !en; go.onclick = fn; }
    function lock() { if (locked) return false; locked = true; return true; }
    function after(node) {
      fbBox.append(node);
      setGo(P.i === P.queue.length - 1 ? 'Finish' : 'Continue', true, advance);
      go.focus({ preventScroll: true }); node.scrollIntoView({ block: 'nearest' });
    }
    var api = {
      next: function () { setGo(P.i === P.queue.length - 1 ? 'Finish' : 'Continue', true, advance); },
      waiting: function (label) { setGo(label, false, null); },
      checkable: function (fn) { setGo('Check', false, function () { if (!locked) fn(); }); },
      ready: function (on) { if (!locked && go.textContent === 'Check') go.disabled = !on; },
      result: function (ok, node) {
        if (!lock()) return;
        if (!item.retry) {
          P.count++;
          if (ok) P.right++; else { P.queue.push({ s: s, retry: true }); P.missed.push(plain(s.q || s.s || '').slice(0, 90)); }
        }
        updateWeak(s, ok, item.retry);
        cnt.textContent = (P.i + 1) + ' / ' + P.queue.length;
        after(node);
      },
      spResult: function (ok, score, node) {
        if (!lock()) return;
        P.sp.n++; P.sp.sum += score; if (ok) P.sp.ok++;
        after(node);
      },
      skip: function () { if (!lock()) return; advance(); }
    };
    ESS.steps[s.t](card, s, api, ctx); P.key = ctx.key;
    window.scrollTo(0, 0);
  }
  function advance() { P.i++; if (P.i >= P.queue.length) finish(); else renderStep(); }

  document.addEventListener('keydown', function (e) {
    if (!P || !P.key) return;
    var t = e.target.tagName; if (t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA') return;
    if (e.key >= '1' && e.key <= '9') P.key(Number(e.key));
  });

  function finish() {
    var o = P.o, S = ESS.store.S, box = $('#view'); box.replaceChildren();
    var pct = P.count ? Math.round(100 * P.right / P.count) : 100, stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;
    var secs = Math.min(3600, Math.round((Date.now() - P.t0) / 1000));
    var xp = 0;

    if (o.kind === 'lesson') {
      var prev = S.done[o.id];
      S.done[o.id] = { pct: Math.max(prev ? prev.pct : 0, pct), stars: Math.max(prev ? prev.stars : 0, stars) };
      S.last = o.id;
      xp = 10 + P.right * 2 + stars * 5 + P.sp.ok * 3;
    } else if (o.kind === 'set') {
      var cur = S.speak.sets[o.id] || { best: 0, tries: 0 }, avg = P.sp.n ? Math.round(100 * P.sp.sum / P.sp.n) : 0;
      S.speak.sets[o.id] = { best: Math.max(cur.best, avg), tries: cur.tries + 1 };
      xp = 8 + P.right * 2 + P.sp.ok * 4;
    } else { xp = 5 + P.right * 2; }

    if (P.sp.n) { S.speak.n += P.sp.n; S.speak.sum += P.sp.sum; }
    ESS.store.save(); ESS.store.addXP(xp);

    // tell the trainer
    if (o.kind === 'lesson') ESS.track.send('lesson', { lessonId: o.id, lessonNo: o.no, lesson: o.title, pct: pct, stars: stars, right: P.right, asked: P.count, secs: secs, missed: P.missed.slice(0, 10) });
    else if (o.kind === 'review') ESS.track.send('revise', { lessonId: 'review', lessonNo: 0, lesson: 'Mixed revision', pct: pct, stars: stars, right: P.right, asked: P.count, secs: secs, missed: P.missed.slice(0, 10) });
    if (P.sp.n) ESS.track.send('speak', { lessonId: o.id, lessonNo: 0, lesson: 'Speaking: ' + o.title, pct: Math.round(100 * P.sp.sum / P.sp.n), stars: 0, right: P.sp.ok, asked: P.sp.n, secs: o.kind === 'lesson' ? 0 : secs, missed: [] });

    var msg = pct >= 90 ? 'Excellent. You understand this well.' : pct >= 70 ? 'Good work. Read the key points below, then try again for three stars.' : 'You finished it. Do it once more. The second time is much easier.';
    box.append(h('span', { class: 'label' }, o.kind === 'review' ? 'Review finished' : o.kind === 'set' ? 'Speaking set finished' : 'Lesson finished'));
    if (P.count) box.append(h('p', { class: 'score' }, P.right + ' / ' + P.count));
    else box.append(h('p', { class: 'score' }, P.sp.n ? P.sp.ok + ' / ' + P.sp.n : 'Done'));
    if (o.kind === 'lesson') box.append(h('p', { class: 'stars', 'aria-label': stars + ' out of 3 stars' }, '★★★'.slice(0, stars) + '☆☆☆'.slice(0, 3 - stars)));
    var gain = h('div', { class: 'gain' });
    var g1 = h('span', { class: 'stat bolt' }); g1.innerHTML = ESS.icon('bolt') + '+' + xp + ' XP';
    var st = ESS.store.streak(), g2 = h('span', { class: 'stat fire' }); g2.innerHTML = ESS.icon('flame') + st + (st === 1 ? ' day' : ' days') + ' in a row';
    gain.append(g1, g2); box.append(gain);
    if (o.kind === 'lesson' || o.kind === 'review') box.append(h('p', null, msg));
    if (P.sp.n) box.append(h('p', null, 'Speaking: ' + P.sp.ok + ' of ' + P.sp.n + ' sentences were clear' + (P.sp.ok < P.sp.n ? '. Say the others once more tomorrow.' : '. Keep speaking every day.')));
    if (P.count) box.append(h('p', { class: 'note' }, 'The score counts your first try on each question. Questions you missed came back once more.'));
    if (ESS.track.on && S.who) { box.append(h('p', { class: 'note', id: 'trackmsg' })); ESS.track.note(); }
    if (o.sum && o.sum.length) { var u = h('ul'); o.sum.forEach(function (x) { u.append(HT(h('li'), x)); }); box.append(h('div', { class: 'remember' }, h('span', { class: 'label' }, 'Key points to remember'), u)); }

    var row = h('div', { class: 'btnrow' });
    if (o.next) row.append(h('button', { class: 'btn', type: 'button', on: { click: function () { ESS.go(o.next.hash); } } }, 'Next: ' + o.next.title));
    if (o.again) row.append(h('button', { class: o.next ? 'btn ghost' : 'btn', type: 'button', on: { click: function () { ESS.go(o.again, true); } } }, o.kind === 'review' ? 'Another round' : 'Do this again'));
    row.append(h('button', { class: 'btn ghost', type: 'button', on: { click: exit } }, 'Back'));
    box.append(row);
    document.body.classList.remove('playing'); P = null;
    window.scrollTo(0, 0);
    ESS.refreshChips();
  }

  ESS.player = { start: start, stop: stop };
})();
