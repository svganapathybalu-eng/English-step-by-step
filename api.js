/* Content helpers. Every lesson file uses these small functions.
   Nothing here touches the page, so the dashboard and the check script can load it too. */
(function () {
  var ESS = (window.ESS = window.ESS || {});
  ESS.COURSE = [];   // the 5 course modules (filled by content/01..04)
  ESS.SPEAK = [];    // the speaking lab sets (filled by content/05)

  ESS.H = {
    // A module: a group of lessons.  MOD(id, title, blurb, [lessons])
    MOD: function (id, title, blurb, lessons) { ESS.COURSE.push({ id: id, title: title, blurb: blurb, lessons: lessons }); },
    // A lesson.  L(id, title, subtitle, [steps], [key points])
    L: function (id, title, sub, steps, sum) { return { id: id, title: title, sub: sub, steps: steps, sum: sum || [] }; },

    // ----- teaching step -----
    learn: function (title) { return { t: 'learn', title: title, b: [].slice.call(arguments, 1) }; },
    reveal: function (title, intro, items) { return { t: 'reveal', title: title, intro: intro, i: items }; },

    // ----- practice steps (these count towards the score) -----
    mcq: function (q, options, answerIndex, explain, whyWrong) { return { t: 'mcq', q: q, o: options, a: answerIndex, e: explain, x: whyWrong }; },
    build: function (sentence, explain, extraWords, q) { return { t: 'build', s: sentence, e: explain, extra: extraWords || [], q: q }; },
    type: function (q, answers, explain, hint) { return { t: 'type', q: q, a: [].concat(answers), e: explain, h: hint }; },
    find: function (q, sentence, explain) { return { t: 'find', q: q, s: sentence, e: explain }; },
    sort: function (q, categories, items, explain) { return { t: 'sort', q: q, c: categories, i: items, e: explain }; },
    match: function (q, pairs, explain) { return { t: 'match', q: q, p: pairs, e: explain }; },

    // ----- speaking steps (scored separately, never lower the lesson score) -----
    // say("I work in Madurai.", "optional hint")
    say: function (text, hint) { return { t: 'say', s: text, h: hint || '' }; },
    // talk("Tell me about your day.", { must: [["\\bevery\\b", "Use every day."]], model: ["..."], tips: "...", min: 6 })
    talk: function (prompt, opts) { return Object.assign({ t: 'talk', q: prompt, must: [], model: [], min: 6 }, opts || {}); },

    // A speaking lab set.  SET(id, title, blurb, "pron" | "talk", [steps], [key points])
    SET: function (id, title, blurb, kind, steps, sum) { ESS.SPEAK.push({ id: id, title: title, blurb: blurb, kind: kind, steps: steps, sum: sum || [] }); }
  };
})();
