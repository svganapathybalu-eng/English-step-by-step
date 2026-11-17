/* Run: node tools/check-content.js   Checks every lesson and speaking set for mistakes before you upload. */
var fs = require('fs'), path = require('path'), vm = require('vm');
var root = path.join(__dirname, '..');
global.window = global;
var files = ['api.js'].concat(fs.readdirSync(path.join(root, 'content')).filter(function (f) { return /^\d\d-.*\.js$/.test(f); }).sort());
files.forEach(function (f) { vm.runInThisContext(fs.readFileSync(path.join(root, 'content', f), 'utf8'), { filename: f }); });
var errs = [], ids = {}, n = 0;
function bad(where, msg) { errs.push(where + ': ' + msg); }
function checkStep(w, s) {
  if (!s || !s.t) return bad(w, 'step has no type');
  if (s.t === 'mcq') {
    if (!Array.isArray(s.o) || s.o.length < 2) bad(w, 'mcq needs options');
    else if (typeof s.a !== 'number' || s.a < 0 || s.a >= s.o.length) bad(w, 'mcq answer index is wrong');
    if (!s.e) bad(w, 'mcq has no explanation');
  } else if (s.t === 'type') {
    if (!Array.isArray(s.a) || !s.a.length || s.a.some(function (a) { return typeof a !== 'string'; })) bad(w, 'type needs a list of answers (check argument order)');
    if (typeof s.e !== 'string') bad(w, 'type explanation must be text');
  } else if (s.t === 'build') { if (!s.s || s.s.split(' ').length < 2) bad(w, 'build needs a sentence'); }
  else if (s.t === 'say') { if (!s.s) bad(w, 'say needs a sentence'); }
  else if (s.t === 'talk') { if (!s.q) bad(w, 'talk needs a prompt'); (s.must || []).forEach(function (m) { try { new RegExp(m[0], 'i'); } catch (e) { bad(w, 'bad regex ' + m[0]); } }); }
  else if (['learn', 'reveal', 'find', 'sort', 'match'].indexOf(s.t) < 0) bad(w, 'unknown step type ' + s.t);
}
ESS.COURSE.forEach(function (m) { m.lessons.forEach(function (l) {
  n++; if (ids[l.id]) bad(l.id, 'duplicate id'); ids[l.id] = 1;
  if (!l.steps.length) bad(l.id, 'no steps');
  if (!l.steps.some(function (s) { return ['mcq', 'type', 'build', 'find', 'sort', 'match'].indexOf(s.t) > -1; })) bad(l.id, 'no practice questions');
  l.steps.forEach(function (s, i) { checkStep(l.id + ' step ' + (i + 1), s); });
}); });
ESS.SPEAK.forEach(function (s) { if (ids['set:' + s.id]) bad(s.id, 'duplicate set id'); ids['set:' + s.id] = 1; s.steps.forEach(function (x, i) { checkStep(s.id + ' step ' + (i + 1), x); }); });
console.log(n + ' lessons, ' + ESS.SPEAK.length + ' speaking sets checked.');
if (errs.length) { console.log(errs.join('\n')); process.exit(1); } else console.log('All good.');
