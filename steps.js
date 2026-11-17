/* One renderer per step type. Each renderer draws into the card and talks to the player through "api":
     api.next()            enable Continue                api.waiting(label)   Continue is disabled, with a label
     api.checkable(fn)     show a Check button            api.ready(bool)      enable / disable Check
     api.result(ok, node)  a scored answer                api.spResult(ok, score, node)  a speaking answer
     api.skip()            move on without scoring        ctx.key = fn(n)      number keys 1..9                     */
(function () {
  var ESS = window.ESS, h = ESS.h, HT = ESS.html, plain = ESS.plain, esc = ESS.esc, norm = ESS.norm, shuffle = ESS.shuffle;
  var R = {};

  var PRAISE = ['Correct!', 'Yes, that is right.', 'Well done.', 'Good one.'];

  function listenFull(text) {
    if (!ESS.speech.canSpeak || !text) return null;
    return h('p', null, h('button', { class: 'btn ghost sm', type: 'button', on: { click: function () { ESS.speech.say(text); } } }, 'Listen to the full sentence'));
  }
  function feedback(ok, s, info) {
    info = info || {};
    var d = h('div', { class: 'fb ' + (ok ? 'ok' : 'no'), role: 'status' });
    d.append(h('p', { class: 'fhead' }, ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : 'Not quite.'));
    if (!ok) {
      if (info.pick != null) d.append(HT(h('p'), '<b>Your answer:</b> ' + esc(info.pick)));
      if (info.why) d.append(HT(h('p'), info.why));
      if (info.right != null) d.append(HT(h('p'), '<b>Right answer:</b> ' + info.right));
      if (info.extra) d.append(HT(h('p'), info.extra));
    }
    if (s.e) d.append(HT(h('p'), s.e));
    var lf = listenFull(info.full); if (lf) d.append(lf);
    return d;
  }
  function qNode(q) {
    var p = h('p', { class: 'q' }), blank = null;
    if (q.indexOf('___') > -1) { var parts = q.split('___'); blank = h('span', { class: 'blank' }); p.append(HT(h('span'), parts[0]), blank, HT(h('span'), parts[1])); }
    else HT(p, q);
    return { node: p, blank: blank };
  }
  function fillBlank(q, answer) { return plain(q.replace('___', answer)); }
  function label(text) { return h('span', { class: 'qlabel' }, text); }
  function spLabel(text) { var l = h('div', { class: 'sp-label' }); l.innerHTML = ESS.icon('mic') + '<span>' + esc(text) + '</span>'; return l; }

  /* ---------- teaching ---------- */
  R.learn = function (box, s, api) {
    box.append(h('h2', { class: 'st' }, s.title));
    s.b.forEach(function (b) { box.append(ESS.blocks.block(b)); });
    api.next();
  };
  R.reveal = function (box, s, api) {
    box.append(h('h2', { class: 'st' }, s.title), HT(h('p'), s.intro));
    var opened = 0, total = s.i.length, cnt = h('p', { class: 'note' }, 'Opened 0 of ' + total), grid = h('div', { class: 'rgrid' });
    s.i.forEach(function (it) {
      var body = HT(h('div', { class: 'rbody', hidden: true }), it[1]), seen = false;
      var b = h('button', { type: 'button', class: 'rcard', 'aria-expanded': 'false' }, it[0]);
      b.addEventListener('click', function () {
        var show = body.hidden; body.hidden = !show; b.setAttribute('aria-expanded', String(show)); b.classList.toggle('open', show);
        if (show && !seen) { seen = true; opened++; cnt.textContent = 'Opened ' + opened + ' of ' + total; }
      });
      grid.append(h('div', null, b, body));
    });
    box.append(grid, cnt); api.next();
  };

  /* ---------- scored practice ---------- */
  R.mcq = function (box, s, api, ctx) {
    var qn = qNode(s.q); box.append(label('Choose the answer'), qn.node);
    var opts = shuffle(s.o.map(function (t, i) { return { t: t, i: i }; })), wrap = h('div', { class: 'opts', role: 'group', 'aria-label': 'Answers' }), btns = [], done = false;
    function choose(k) {
      if (done) return; done = true;
      var o = opts[k], ok = o.i === s.a;
      btns.forEach(function (b, j) {
        b.classList.add('locked'); b.setAttribute('aria-disabled', 'true');
        if (opts[j].i === s.a) { b.classList.add('correct'); b.append(h('span', { class: 'mark' }, 'Correct')); }
        else if (j === k) { b.classList.add('wrong'); b.append(h('span', { class: 'mark' }, 'Your pick')); }
        else b.classList.add('dim');
      });
      if (qn.blank) { qn.blank.textContent = plain(s.o[s.a]); qn.blank.classList.add('ok'); }
      var full = qn.blank ? fillBlank(s.q, plain(s.o[s.a])) : '';
      api.result(ok, feedback(ok, s, { pick: plain(o.t), why: s.x && s.x[o.i], right: esc(s.o[s.a]), full: full }));
    }
    opts.forEach(function (o, k) {
      var b = h('button', { type: 'button', class: 'opt', on: { click: function () { choose(k); } } }, h('span', { class: 'key' }, String(k + 1)));
      b.append(HT(h('span', { class: 'otext' }), o.t)); btns.push(b); wrap.append(b);
    });
    box.append(wrap); api.waiting('Choose an answer');
    ctx.key = function (n) { if (n >= 1 && n <= opts.length) choose(n - 1); };
  };

  R.type = function (box, s, api) {
    var qn = qNode(s.q); box.append(label('Type the answer'), qn.node);
    var inp = h('input', { type: 'text', class: 'inp', 'aria-label': 'Your answer', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
    box.append(inp);
    if (s.h) {
      var hn = HT(h('p', { class: 'note', hidden: true }), 'Hint: ' + s.h), hb = h('button', { type: 'button', class: 'btn ghost sm', on: { click: function () { hn.hidden = false; hb.hidden = true; } } }, 'Show a hint');
      box.append(hb, hn);
    }
    function check() {
      var v = norm(inp.value); if (!v) return;
      var ok = s.a.some(function (a) { return norm(a) === v; }); inp.disabled = true;
      if (qn.blank && ok) { qn.blank.textContent = inp.value.trim(); qn.blank.classList.add('ok'); }
      api.result(ok, feedback(ok, s, { pick: inp.value.trim(), right: esc(s.a[0]), full: qn.blank ? fillBlank(s.q, s.a[0]) : '' }));
    }
    api.checkable(check);
    inp.addEventListener('input', function () { api.ready(inp.value.trim().length > 0); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  };

  R.build = function (box, s, api) {
    box.append(label('Build the sentence'), HT(h('p', { class: 'q' }), s.q || 'Tap the words in the right order.'));
    var tiles = shuffle(s.s.split(' ').concat(s.extra || []).map(function (w, i) { return { w: w, id: i }; })), placed = [], locked = false;
    var slots = h('div', { class: 'slots', 'aria-label': 'Your sentence' }), bank = h('div', { class: 'bank', 'aria-label': 'Words' });
    function draw() {
      slots.replaceChildren(); bank.replaceChildren();
      placed.forEach(function (t) { slots.append(h('button', { type: 'button', class: 'tile', on: { click: function () { if (locked) return; placed = placed.filter(function (x) { return x !== t; }); draw(); } } }, t.w)); });
      tiles.forEach(function (t) {
        if (placed.indexOf(t) > -1) bank.append(h('span', { class: 'tile ghost', 'aria-hidden': 'true' }, t.w));
        else bank.append(h('button', { type: 'button', class: 'tile', on: { click: function () { if (locked) return; placed.push(t); draw(); } } }, t.w));
      });
      api.ready(placed.length >= 2);
    }
    box.append(slots, bank);
    api.checkable(function () {
      locked = true;
      var ans = placed.map(function (t) { return t.w; }).join(' '), ok = ans === s.s;
      slots.querySelectorAll('.tile').forEach(function (b) { b.disabled = true; if (ok) b.classList.add('right'); });
      api.result(ok, feedback(ok, s, { pick: ans, right: esc(s.s), full: s.s }));
    });
    draw(); api.ready(false);
  };

  R.find = function (box, s, api) {
    box.append(label('Tap the word'), HT(h('p', { class: 'q' }), s.q));
    var inb = false;
    var toks = s.s.split(' ').map(function (w) { var tg = false; if (w.indexOf('[') > -1) inb = true; if (inb) tg = true; if (w.indexOf(']') > -1) inb = false; return { t: w.replace(/[\[\]]/g, ''), tg: tg, on: false }; });
    var wrap = h('div', { class: 'toks' }), locked = false;
    toks.forEach(function (t) {
      t.el = h('button', { type: 'button', class: 'tok', 'aria-pressed': 'false', on: { click: function () {
        if (locked) return; t.on = !t.on; t.el.classList.toggle('on', t.on); t.el.setAttribute('aria-pressed', String(t.on));
        api.ready(toks.some(function (x) { return x.on; }));
      } } }, t.t);
      wrap.append(t.el);
    });
    box.append(wrap);
    api.checkable(function () {
      locked = true;
      var ok = toks.every(function (t) { return t.on === t.tg; });
      toks.forEach(function (t) { t.el.classList.remove('on'); if (t.tg) t.el.classList.add('right'); else if (t.on) t.el.classList.add('bad'); });
      var right = toks.filter(function (t) { return t.tg; }).map(function (t) { return t.t; }).join(' ');
      api.result(ok, feedback(ok, s, { right: esc(right), full: toks.map(function (t) { return t.t; }).join(' ') }));
    });
    api.ready(false);
  };

  R.sort = function (box, s, api) {
    box.append(label('Sort'), HT(h('p', { class: 'q' }), s.q));
    var rows = shuffle(s.i.map(function (it) { return { t: it[0], c: it[1], pick: -1 }; })), list = h('div', { class: 'srows' }), locked = false;
    rows.forEach(function (r) {
      var btns = h('div', { class: 'sbtns', role: 'group' }); r.bs = [];
      s.c.forEach(function (cn, ci) {
        var b = h('button', { type: 'button', class: 'sbtn', 'aria-pressed': 'false', on: { click: function () {
          if (locked) return; r.pick = ci; r.bs.forEach(function (x, k) { x.setAttribute('aria-pressed', String(k === ci)); });
          api.ready(rows.every(function (x) { return x.pick > -1; }));
        } } }, cn);
        r.bs.push(b); btns.append(b);
      });
      r.row = h('div', { class: 'srow' }, HT(h('span', { class: 'sit' }), r.t), btns); list.append(r.row);
    });
    box.append(list);
    api.checkable(function () {
      locked = true; var bad = 0;
      rows.forEach(function (r) {
        var ok = r.pick === r.c; if (!ok) bad++;
        r.row.classList.add(ok ? 'right' : 'wrong');
        if (!ok) r.row.append(HT(h('span', { class: 'fixnote' }), '<b>Right answer:</b> ' + esc(s.c[r.c])));
      });
      api.result(bad === 0, feedback(bad === 0, s, { extra: bad ? bad + ' of ' + rows.length + ' were wrong. The right answers are shown above.' : null }));
    });
    api.ready(false);
  };

  R.match = function (box, s, api) {
    box.append(label('Match'), HT(h('p', { class: 'q' }), s.q));
    var left = s.p.map(function (p, i) { return { t: p[0], i: i }; }), right = shuffle(s.p.map(function (p, i) { return { t: p[1], i: i }; }));
    var sel = null, mist = 0, done = 0, total = s.p.length, lc = h('div', { class: 'mcol' }), rc = h('div', { class: 'mcol' });
    left.forEach(function (it) {
      it.el = h('button', { type: 'button', class: 'mbtn', on: { click: function () { if (it.ok) return; if (sel) sel.el.classList.remove('sel'); sel = it; it.el.classList.add('sel'); } } }, it.t);
      lc.append(it.el);
    });
    right.forEach(function (it) {
      it.el = h('button', { type: 'button', class: 'mbtn', on: { click: function () {
        if (it.ok || !sel) return;
        if (sel.i === it.i) {
          sel.ok = it.ok = true; sel.el.classList.remove('sel'); sel.el.classList.add('matched'); it.el.classList.add('matched'); sel = null; done++;
          if (done === total) api.result(mist === 0, feedback(mist === 0, s, { extra: mist ? 'You made ' + mist + ' wrong ' + (mist === 1 ? 'try' : 'tries') + '. Try again next time.' : null }));
        } else {
          mist++; it.el.classList.add('shake'); setTimeout(function () { it.el.classList.remove('shake'); }, 500); sel.el.classList.remove('sel'); sel = null;
        }
      } } }, it.t);
      rc.append(it.el);
    });
    box.append(h('div', { class: 'mcols' }, lc, rc), h('p', { class: 'note' }, 'Tap a word on the left, then its pair on the right.'));
    api.waiting('Match all the pairs');
  };

  /* ---------- speaking ---------- */
  function wordsEl(marks, plainText) {
    var p = h('p', { class: 'say-words', id: 'say-words' });
    if (!marks) { p.textContent = plainText; return p; }
    marks.forEach(function (m, i) { p.append(h('span', { class: 'w ' + (m.ok ? 'ok' : 'no') }, m.w), i < marks.length - 1 ? ' ' : ''); });
    return p;
  }

  R.say = function (box, s, api) {
    var target = s.s, pass = ESS.config.passScore, attempts = 0, ctl = null, rec = null, done = false, errored = false;
    var mode = ESS.speech.canListen ? 'stt' : (ESS.speech.canRecord ? 'rec' : 'self');
    box.append(spLabel('Say it aloud'));
    var words = wordsEl(null, target); box.append(words);
    if (s.h) box.append(HT(h('p', { class: 'note' }), s.h));

    var tools = h('div', { class: 'say-tools' });
    if (ESS.speech.canSpeak) {
      var l1 = h('button', { type: 'button', class: 'btn ghost sm', on: { click: function () { ESS.speech.say(target); } } }); l1.innerHTML = ESS.icon('speaker') + ' Listen';
      var l2 = h('button', { type: 'button', class: 'btn ghost sm', on: { click: function () { ESS.speech.say(target, { slow: true }); } } }); l2.innerHTML = ESS.icon('speaker') + ' Slowly';
      l1.querySelector('svg').style.cssText = l2.querySelector('svg').style.cssText = 'width:16px;height:16px;vertical-align:-3px';
      tools.append(l1, l2);
    }
    box.append(tools);

    var mic = h('button', { type: 'button', class: 'mic', 'aria-label': 'Start speaking' }); mic.innerHTML = ESS.icon('mic');
    var status = h('div', { class: 'mic-status', 'aria-live': 'polite' });
    var heard = h('div', { class: 'heard', hidden: true });
    var audioHost = h('div'), selfBox = h('div', { class: 'btnrow', hidden: true });
    var skip = h('button', { type: 'button', class: 'linkbtn', on: { click: function () { if (done) return; done = true; stopAll(); api.skip(); } } }, 'Skip this sentence');
    box.append(h('div', { class: 'microw' }, mic, status), heard, audioHost, selfBox, h('div', null, skip));

    function stopAll() { if (ctl) { ctl.abort(); ctl = null; } mic.classList.remove('live'); }
    function setStatus(t) { status.textContent = t; }
    function intro() {
      if (mode === 'stt') setStatus('Tap the microphone and say the sentence.');
      else if (mode === 'rec') setStatus('Tap the microphone, say the sentence, then tap again to stop. You can then hear yourself.');
      else setStatus('Say the sentence aloud now. Then tell us how it went.');
      selfBox.hidden = mode !== 'self';
    }
    function finish(ok, score, text) {
      if (done) return; done = true; stopAll(); mic.disabled = true; skip.hidden = true;
      var fb = h('div', { class: 'fb ' + (ok ? 'ok' : 'no'), role: 'status' });
      fb.append(h('p', { class: 'fhead' }, ok ? 'Well said!' : 'Keep practising.'));
      if (text) fb.append(HT(h('p'), text));
      fb.append(HT(h('p'), 'Listen once more and copy the rhythm of the sentence.'));
      var lf = listenFull(target); if (lf) fb.append(lf);
      api.spResult(ok, score, fb);
    }
    function evaluate(alts) {
      attempts++;
      var res = ESS.speech.compare(target, alts), pct = Math.round(res.score * 100);
      words.replaceWith(words = wordsEl(res.marks)); words.id = 'say-words';
      heard.hidden = false; heard.innerHTML = '<span class="label">I heard</span>' + esc(res.heard || '(nothing)');
      if (res.score >= pass) { finish(true, res.score, '<span class="pct">' + pct + '%</span> of the words matched.'); return; }
      setStatus(pct + '% matched. Red words need practice. Listen again, then try once more.');
      if (attempts >= 3) finish(false, res.score, '<span class="pct">' + pct + '%</span> of the words matched. Red words need more practice.');
    }
    function fallback(msg) {
      mode = ESS.speech.canRecord ? 'rec' : 'self'; setStatus(msg); selfBox.hidden = mode !== 'self'; if (mode === 'self') showSelf();
    }
    function showSelf() {
      selfBox.hidden = false; selfBox.replaceChildren();
      selfBox.append(
        h('button', { type: 'button', class: 'btn sm', on: { click: function () { finish(true, 1, 'You said it clearly.'); } } }, 'I said it clearly'),
        h('button', { type: 'button', class: 'btn ghost sm', on: { click: function () { finish(false, 0.5, 'Practise it once more.'); } } }, 'I need more practice'));
    }

    mic.addEventListener('click', function () {
      if (done) return;
      ESS.speech.stop();
      if (mode === 'stt') {
        if (ctl) { ctl.stop(); return; }
        errored = false; heard.hidden = true; mic.classList.add('live'); mic.setAttribute('aria-label', 'Stop'); setStatus('Listening... say the sentence now.');
        ctl = ESS.speech.listen({
          onInterim: function (t) { setStatus('I hear: ' + t); },
          onFinal: function (alts) { evaluate(alts); },
          onError: function (code) {
            errored = true;
            if (code === 'no-speech') setStatus('I did not hear you. Move closer and try again.');
            else if (code === 'aborted') { /* stopped on purpose */ }
            else if (code === 'not-allowed' || code === 'service-not-allowed' || code === 'audio-capture' || code === 'network' || code === 'unsupported' || code === 'start-failed') {
              fallback(code === 'network' ? 'The speech check needs internet. You can still practise: say it aloud and rate yourself.' : 'The microphone is not available. You can still practise: say it aloud and rate yourself.');
              showSelf();
            } else setStatus('Something went wrong. Tap the microphone to try again.');
          },
          onEnd: function (got) { ctl = null; mic.classList.remove('live'); mic.setAttribute('aria-label', 'Start speaking'); if (!got && !errored && !done) setStatus('I did not hear you. Tap the microphone and try again.'); }
        });
        if (!ctl) { mic.classList.remove('live'); }
      } else if (mode === 'rec') {
        if (rec) {
          var cur = rec; rec = null; mic.classList.remove('live'); cur.stop(); setStatus('Listen to yourself, then rate how it went.');
          cur.blob.then(function (blob) {
            audioHost.replaceChildren(h('audio', { controls: true, src: URL.createObjectURL(blob), 'aria-label': 'Your recording' }));
            showSelf();
          });
        } else {
          ESS.speech.record().then(function (r) { rec = r; mic.classList.add('live'); setStatus('Recording... tap again to stop.'); })
            .catch(function () { mode = 'self'; setStatus('The microphone is not available. Say it aloud and rate yourself.'); showSelf(); });
        }
      }
    });
    if (mode === 'self') { mic.hidden = true; showSelf(); }
    intro(); if (mode === 'self') showSelf();
    api.waiting('Say the sentence');
  };

  R.talk = function (box, s, api) {
    var done = false, ctl = null;
    box.append(spLabel('Speak your answer'), HT(h('p', { class: 'q' }), s.q));
    if (s.tips) box.append(HT(h('p', { class: 'note' }), s.tips));
    var ta = h('textarea', { class: 'field', id: 'talk-text', 'aria-label': 'Your answer', placeholder: 'Your answer appears here. You can also type it.', spellcheck: 'false' });
    var mic = h('button', { type: 'button', class: 'mic', 'aria-label': 'Start speaking' }); mic.innerHTML = ESS.icon('mic');
    var status = h('div', { class: 'mic-status', 'aria-live': 'polite' }), msg = h('p', { class: 'note', role: 'alert' });
    if (ESS.speech.canListen) {
      status.textContent = 'Tap the microphone and speak your answer. Tap again when you finish.';
      mic.addEventListener('click', function () {
        if (done) return;
        if (ctl) { ctl.stop(); return; }
        mic.classList.add('live'); mic.setAttribute('aria-label', 'Stop'); status.textContent = 'Listening...';
        ctl = ESS.speech.listen({
          onInterim: function (t) { status.textContent = 'I hear: ' + t; },
          onFinal: function (alts) { var t = alts[0].trim(); ta.value = (ta.value ? ta.value.trim() + ' ' : '') + t.charAt(0).toUpperCase() + t.slice(1) + '.'; status.textContent = 'Got it. Tap the microphone to add more, or press Check.'; api.ready(true); },
          onError: function (c) { status.textContent = c === 'no-speech' ? 'I did not hear you. Try again.' : 'The microphone is not available. Please type your answer.'; },
          onEnd: function () { ctl = null; mic.classList.remove('live'); mic.setAttribute('aria-label', 'Start speaking'); }
        });
      });
      box.append(h('div', { class: 'microw' }, mic, status));
    } else {
      status.textContent = 'Your browser cannot listen. Say your answer aloud first, then type what you said.';
      box.append(h('p', { class: 'note' }, status.textContent));
    }
    box.append(ta, msg);

    api.checkable(function () {
      var text = ta.value.trim(), wc = text.split(/\s+/).filter(Boolean).length;
      if (wc < (s.min || 6)) { msg.textContent = 'Say a little more. Try at least ' + (s.min || 6) + ' words.'; return; }
      done = true; if (ctl) ctl.abort(); ta.disabled = true; mic.disabled = true; msg.textContent = '';
      var passed = 0, list = h('ul', { class: 'checks' });
      s.must.forEach(function (m) {
        var ok; try { ok = new RegExp(m[0], 'i').test(text); } catch (e) { ok = true; }
        if (ok) passed++;
        list.append(HT(h('li'), ok ? '<span class="y">Yes</span> <span>' + esc(m[1]) + '</span>' : '<span class="n">Try</span> <span>' + esc(m[2]) + '</span>'));
      });
      var total = s.must.length || 1, ok = passed === s.must.length, score = s.must.length ? passed / total : 1;
      var fb = h('div', { class: 'fb ' + (ok ? 'ok' : 'no'), role: 'status' });
      fb.append(h('p', { class: 'fhead' }, ok ? 'Great answer!' : 'Good try. Look at the tips.'), list);
      if (s.model && s.model.length) {
        var mod = h('div', { class: 'model' });
        mod.append(h('span', { class: 'label', style: 'margin-top:8px' }, 'A model answer'));
        s.model.forEach(function (m) {
          var row = h('div', { class: 'exrow' }), lb = ESS.blocks.listenBtn(m); if (lb) row.append(lb);
          row.append(h('div', { class: 'extext' }, h('div', { class: 'sent' }, m))); mod.append(row);
        });
        fb.append(mod);
        fb.append(h('p', { class: 'note' }, 'Listen to the model answer, then say your own answer again out loud.'));
      }
      api.spResult(ok, score, fb);
    });
    ta.addEventListener('input', function () { api.ready(ta.value.trim().length > 0); });
    api.ready(false);
  };

  ESS.steps = R;
})();
