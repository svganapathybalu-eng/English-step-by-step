/* Draws the teaching blocks inside a "learn" step: text, examples, tips, tables, rules, timelines. */
(function () {
  var ESS = window.ESS, h = ESS.h, HT = ESS.html;

  // A round "listen" button for one sentence (hidden when the phone cannot speak).
  function listenBtn(html) {
    if (!ESS.speech.canSpeak) return null;
    var b = h('button', { class: 'listen', type: 'button', 'aria-label': 'Listen to this sentence', on: { click: function () { ESS.speech.say(ESS.plain(html)); } } });
    b.innerHTML = ESS.icon('speaker');
    return b;
  }

  function block(b) {
    if (typeof b === 'string') return HT(h('p'), b);
    var k = b[0];
    if (k === 'p') return HT(h('p'), b[1]);
    if (k === 'ex') {
      var w = h('div', { class: 'ex' });
      b.slice(1).forEach(function (x) {
        var p = x.split('|'), row = h('div', { class: 'exrow' }), lb = listenBtn(p[0]);
        if (lb) row.append(lb);
        var t = h('div', { class: 'extext' });
        t.append(HT(h('div', { class: 'sent' }), p[0]));
        if (p[1]) t.append(HT(h('div', { class: 'note' }), p[1]));
        row.append(t); w.append(row);
      });
      return w;
    }
    if (k === 'tip') return HT(h('div', { class: 'tip' }), '<span class="label">Remember</span><p>' + b[1] + '</p>');
    if (k === 'warn') {
      var d = h('div', { class: 'warn' });
      d.append(HT(h('div', { class: 'wl bad' }), '<b>Wrong</b> ' + b[1]), HT(h('div', { class: 'wl good' }), '<b>Right</b> ' + b[2]));
      if (b[3]) d.append(HT(h('div', { class: 'why' }), b[3]));
      return d;
    }
    if (k === 'rules') {
      var r = h('div', { class: 'rules' });
      b.slice(1).forEach(function (x) { r.append(h('div', { class: 'rule' }, HT(h('span', { class: 'rl' }), x[0]), HT(h('div', { class: 'rf' }), x[1]))); });
      return r;
    }
    if (k === 'table') {
      var t = h('table'), hd = h('tr');
      b[1].forEach(function (c) { hd.append(HT(h('th'), c)); }); t.append(hd);
      b.slice(2).forEach(function (row) { var tr = h('tr'); row.forEach(function (c) { tr.append(HT(h('td'), c)); }); t.append(tr); });
      return h('div', { class: 'tablewrap' }, t);
    }
    if (k === 'list') { var u = h('ul'); b.slice(1).forEach(function (x) { u.append(HT(h('li'), x)); }); return u; }
    if (k === 'tl') {
      var a = b[1], z = b[2], track = h('div', { class: 'tltrack' });
      track.append(a === z ? h('i', { class: 'tldot', style: 'left:' + a + '%' }) : h('i', { class: 'tlseg', style: 'left:' + a + '%;width:' + (z - a) + '%' }), h('i', { class: 'tlnow' }));
      var tl = h('div', { class: 'tl' }, track, h('div', { class: 'tllab' }, h('span', null, 'PAST'), h('span', null, 'NOW'), h('span', null, 'FUTURE')));
      if (b[3]) tl.append(HT(h('p', { class: 'tlnote' }), b[3]));
      return tl;
    }
    if (k === 'tl2') {
      var t2 = h('div', { class: 'tltrack' });
      [[b[1], b[2]], [b[3], b[4]]].forEach(function (p, n) {
        t2.append(h('i', { class: 'tldot', style: 'left:' + p[0] + '%;' + (n ? 'opacity:.55' : '') }), h('span', { class: 'tlpin', style: 'left:' + p[0] + '%' }, p[1]));
      });
      t2.append(h('i', { class: 'tlnow' }));
      return h('div', { class: 'tl two' }, t2, h('div', { class: 'tllab' }, h('span', null, 'PAST'), h('span', null, 'NOW'), h('span', null, 'FUTURE')));
    }
    return h('p', null, '');
  }

  ESS.blocks = { block: block, listenBtn: listenBtn };
})();
