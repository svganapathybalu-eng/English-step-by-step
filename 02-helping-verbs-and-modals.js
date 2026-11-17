/* Module 3: helping verbs and modal verbs
   Lessons are written with small helper functions (see content/api.js and docs/ADDING-LESSONS.md).
   Colour tags used inside text: <sb> subject, <vb> verb, <ob> object, <ad> describing word, <tm> time/key word, <hl> highlight. */
(function () {
var H = ESS.H, MOD = H.MOD, L = H.L, learn = H.learn, mcq = H.mcq, build = H.build, type = H.type,
    find = H.find, sort = H.sort, match = H.match, reveal = H.reveal;

MOD("m3","3. Helping verbs and modals","Small verbs that make questions, negatives, tenses and polite English.",[

L("help","Helping verbs","be, do, have",[
 learn("Helping verbs help the main verb",
  "A <b>helping verb</b> (also called an auxiliary verb) stands in front of the <b>main verb</b>. It does not carry the main meaning. It helps to make tenses, questions and negatives.",
  ["ex","She <vb>is</vb> <ad>working</ad>.|is = helper · working = main verb","<vb>Do</vb> you <ad>like</ad> tea?|do = helper · like = main verb","They <vb>have</vb> <ad>finished</ad>.|have = helper · finished = main verb"],
  "<vb>Orange</vb> = helping verb. <ad>Purple</ad> = main verb."),
 learn("The three big helpers",
  ["table",["Helper","Forms","It helps to make"],["be","am, is, are, was, were","continuous tenses (is working) and passive"],["do","do, does, did","questions and negatives (Do you know? I don't know.)"],["have","have, has, had","perfect tenses (has finished)"]],
  "These three can also be <b>main verbs</b>: <i>She has a car. I do my homework. He is a teacher.</i> If there is no other verb, it is the main verb."),
 reveal("What each helper does","Tap to see an example.",[
  ["be + V-ing","An action in progress: <i>I am reading.</i>"],
  ["be + V3","The passive: <i>The mail was sent.</i>"],
  ["do / does / did","Questions and negatives: <i>Does she know? She did not know.</i>"],
  ["have / has / had + V3","Perfect tenses: <i>I have finished.</i>"],
  ["will, can, should ...","Modal verbs. You will learn them in the next lessons."]]),
 find("Tap the helping verb.","She [is] cooking dinner.","“Is” helps the main verb “cooking”."),
 find("Tap the helping verb.","They [have] already left.","“Have” helps the main verb “left”."),
 find("Tap the helping verb.","[Did] you call him?","“Did” helps the main verb “call”."),
 mcq("In “He has a car.” the word “has” is ...",["a helping verb","the main verb"],1,"There is no other verb. “Has” means “owns”, so it is the main verb."),
 mcq("In “He has finished.” the word “has” is ...",["a helping verb","the main verb"],0,"The main verb is “finished”. “Has” helps it."),
 mcq("She ___ working now.",["do","is","has"],1,"Working = V-ing, so we need be: is."),
 mcq("___ you know the answer?",["Do","Are","Have"],0,"Present simple question: Do you know ...?")
],["Helping verbs: <b>be, do, have</b> and the modals.","<b>be</b> + V-ing = continuous · <b>have</b> + V3 = perfect · <b>do / does / did</b> = questions and negatives.","If there is no other verb, be / do / have is the main verb."]),

L("modal1","Modal verbs: can and could","Ability, permission, requests",[
 learn("What are modal verbs?",
  "<b>Modal verbs</b> are special helping verbs. They add a feeling to the sentence: ability, permission, advice, possibility or duty.",
  ["list","The modals: <b>can, could, may, might, will, would, shall, should, must</b>."],
  "Three golden rules. They are always the same:",
  ["rules",["Rule 1","he / she / it takes <b>no -s</b>: <i>She can swim.</i>"],["Rule 2","Use the <b>plain verb</b> (V1) after a modal: <i>She can swim.</i>"],["Rule 3","Question: modal first. Negative: add not. <i>Can she swim? She cannot swim.</i>"]],
  ["warn","She can swims.","She can swim.","After a modal, the verb stays plain. No -s, no -ed, no to."],
  ["warn","He can to drive.","He can drive.","Do not put “to” after can."]),
 learn("can: ability, permission, request",
  ["table",["Use","Example"],["ability","I can type fast."],["permission (friendly)","Can I open the window?"],["request","Can you help me?"],["possibility","It can get very hot in May."]],
  "<b>can't / cannot</b> = not able, or not allowed. <b>could</b> = past ability (<i>I could swim when I was six</i>) and a more polite request (<i>Could you help me, please?</i>)."),
 mcq("She ___ speak three languages.",["can","cans","can to"],0,"Modal + plain verb. No -s, no to."),
 mcq("When I was a child, I ___ climb trees.",["can","could","will"],1,"Past ability: could."),
 mcq("Which request is more polite?",["Can you open the door?","Could you open the door, please?"],1,"“Could” is more polite than “can”."),
 mcq("He ___ drive a car. He is only ten.",["can","can't","could"],1,"He is ten, so he is not able: can't."),
 mcq("Choose the correct sentence.",["Can she sings?","Can she sing?","Can she to sing?"],1,"Can + subject + plain verb."),
 type("Make a question: “You can help me.” → ___ you help me?","Can","The modal goes first: Can you help me?"),
 build("Could you send me the file?","Modal first, then the subject, then the plain verb.")
],["Modals: no -s, then <b>plain verb</b>, no to.","<b>can</b> = ability, permission. <b>could</b> = past ability, polite request.","Question: modal first. Negative: modal + not."]),

L("modal2","will, would and shall","Future, polite offers and requests",[
 learn("will",
  "<b>will</b> is used for the future: decisions made now, promises, offers and predictions. (You will learn it again in the tenses.)",
  ["ex","I <vb>will</vb> call you tomorrow.|promise","It <vb>will</vb> rain today.|prediction","<vb>Will</vb> you help me?|request"],
  "Short form: I'll, she'll. Negative: <b>won't</b> (= will not)."),
 learn("would: polite and imagined",
  ["list","Polite offer: <i>Would you like some tea?</i>","Polite request: <i>Would you please close the door?</i>","Imagined situation: <i>If I had time, I would learn French.</i>","Past habit: <i>When I was a child, we would play outside every evening.</i>"],
  ["tip","<b>Would you like ...?</b> is more polite than <b>Do you want ...?</b>"]),
 learn("shall",
  "<b>shall</b> is used with <b>I</b> and <b>we</b> to make an offer or a suggestion: <i>Shall I open the window? Shall we start?</i>",
  "In daily English, many people use <i>Let's</i> or <i>Should we</i> instead. You mainly need shall in these two question forms."),
 mcq("The phone is ringing. I ___ answer it.",["will","would","shall"],0,"A quick decision made now: will."),
 mcq("___ you like some tea? (polite offer)",["Do","Would","Will"],1,"“Would you like” is the polite way to offer."),
 mcq("It's hot here. ___ I open the window? (offer)",["Shall","Would","Must"],0,"“Shall I ...?” offers to do something."),
 mcq("I promise I ___ be late again.",["won't","wouldn't","shan't"],0,"A promise about the future: won't."),
 mcq("Which is the most polite?",["Give me water.","Will you give me water?","Would you please give me some water?"],2,"“Would you please ...” is the most polite."),
 mcq("Which one is correct?",["She wills come tomorrow.","She will come tomorrow.","She will comes tomorrow."],1,"will + plain verb. Never add -s to will.")
],["<b>will</b> = decision now, promise, prediction. Negative: <b>won't</b>.","<b>Would you like ...?</b> = polite offer. <b>Would you please ...?</b> = polite request.","<b>Shall I / Shall we ...?</b> = offer or suggestion."]),

L("modal3","may and might","Possibility and polite permission",[
 learn("may and might: maybe",
  "<b>may</b> and <b>might</b> talk about <b>possibility</b>. It is possible, but we are not sure.",
  ["ex","It <vb>may</vb> rain this evening.|maybe it will","He <vb>might</vb> be late.|maybe, we are less sure"],
  "Both mean “maybe”. <b>might</b> is a little less sure than <b>may</b>. In daily English they are used almost the same.",
  ["warn","He may be comes.","He may come.","Modal + plain verb. Never -s or -ed."]),
 learn("may: polite permission",
  "<b>May I ...?</b> is a polite way to ask for permission: <i>May I come in? May I use your pen?</i> Answers: <i>Yes, you may. / I'm sorry, you may not.</i>",
  ["table",["Ask like this","How polite?"],["Can I use your pen?","friendly"],["Could I use your pen?","polite"],["May I use your pen?","very polite, formal"]],
  ["tip","<i>He may come</i> = maybe he will come. <i>He can come</i> = he is able or allowed to come."]),
 mcq("Take an umbrella. It ___ rain later.",["may","can","must"],0,"Possible, not sure: may."),
 mcq("___ I come in, sir? (very polite)",["May","Will","Do"],0,"“May I ...?” is the polite way to ask permission."),
 mcq("Meena is not in class. She ___ be sick. (maybe)",["might","shall","would"],0,"Maybe: might."),
 mcq("Which sentence means “maybe”?",["He may come.","He must come.","He shall come."],0,"May = maybe."),
 mcq("Choose the correct sentence.",["She might to go.","She might goes.","She might go."],2,"Modal + plain verb."),
 build("May I use your phone?","Modal first for a question.")
],["<b>may / might</b> = maybe. Modal + plain verb.","<b>May I ...?</b> = very polite permission.","Politeness: can (friendly) → could (polite) → may (formal)."]),

L("modal4","should, must, have to","Advice and duty",[
 learn("should: advice",
  "Use <b>should</b> to give advice, or to say what is a good idea.",
  ["ex","You <vb>should</vb> drink more water.|advice","You <vb>shouldn't</vb> skip breakfast.|negative advice","<vb>Should</vb> I take this job?|asking for advice"],
  "<b>ought to</b> means the same: <i>You ought to see a doctor.</i> <b>had better</b> is strong advice with a warning: <i>You had better hurry, or you will miss the train.</i>"),
 learn("must and have to: duty",
  "<b>must</b> = a strong duty that the speaker feels. <b>have to</b> = a duty from outside, like a rule or a schedule.",
  ["ex","I <vb>must</vb> finish this today.|I feel it is very important","You <vb>must</vb> wear an ID card.|a rule at the office","She <vb>has to</vb> wake up at 5 a.m.|her schedule makes her"],
  "<b>have to</b> changes with the subject: I have to, she has to, they had to (past). <b>must</b> has no past form. Use <b>had to</b>: <i>Yesterday I had to work late.</i>"),
 learn("Careful: mustn't or don't have to?",
  ["table",["Phrase","Meaning","Example"],["mustn't","it is forbidden: do NOT","You mustn't use your phone in the exam."],["don't have to","it is not necessary (you may, if you like)","You don't have to come on Sunday."]],
  ["tip","<b>mustn't</b> = don't do it! <b>don't have to</b> = there is no need."]),
 mcq("I have a headache. I think I ___ rest.",["should","mustn't","can"],0,"Giving advice: should."),
 mcq("You ___ smoke here. It is forbidden.",["mustn't","don't have to","shouldn't to"],0,"Forbidden: mustn't."),
 mcq("It is a holiday tomorrow. We ___ come to office.",["mustn't","don't have to","must"],1,"No need to come: don't have to."),
 mcq("Yesterday I ___ stay late to finish the report.",["must","had to","should"],1,"Past duty: had to. Must has no past."),
 mcq("She ___ get up early. Her class starts at 7.",["has to","have to","must to"],0,"She + schedule: has to."),
 mcq("Choose the correct sentence.",["He should goes now.","He should go now.","He should to go now."],1,"Modal + plain verb."),
 match("Match the word to its meaning.",[["should","a good idea"],["must","strong duty"],["mustn't","forbidden"],["don't have to","not necessary"]],"These four are the most confused pairs. Learn them well.")
],["<b>should / ought to</b> = advice.","<b>must</b> = strong duty. <b>have to</b> = rule or schedule. Past of both: <b>had to</b>.","<b>mustn't</b> = forbidden. <b>don't have to</b> = not necessary."]),

L("modal5","Modals in questions and the past","should have, could have, must have",[
 learn("Questions and negatives with modals",
  "<b>Modals never need do / does / did.</b> For a question, put the modal first. For a negative, add <b>not</b>.",
  ["table",["Statement","Question","Negative"],["She can swim.","Can she swim?","She can't swim."],["They should go.","Should they go?","They shouldn't go."],["You will come.","Will you come?","You won't come."],["He must leave.","Must he leave?","He mustn't leave."]],
  "Short answers: <i>Can she swim? Yes, she can. / No, she can't.</i>"),
 learn("Modals for the past",
  "To talk about the past, use <b>modal + have + V3</b>.",
  ["table",["Pattern","Meaning","Example"],["should have + V3","a good idea, but it did not happen","You should have called me."],["could have + V3","it was possible, but it did not happen","I could have gone, but I was busy."],["might have + V3","maybe it happened","She might have missed the bus."],["must have + V3","I am sure it happened","He must have forgotten."]],
  ["tip","<b>should have</b> = regret or blame. <b>must have</b> = a clever guess that you are almost sure about."]),
 mcq("Make a question: She can drive.",["Does she can drive?","Can she drive?","Can she drives?"],1,"Modal first. No does."),
 mcq("I'm sorry I was late. I ___ left earlier.",["should have","should","must"],0,"A past regret: should have + V3."),
 mcq("The lights are off. They ___ gone home.",["must have","must","should"],0,"A guess about the past: must have + V3."),
 mcq("He failed the test. He ___ studied more.",["should have","must","will"],0,"A past regret: should have + V3."),
 mcq("Choose the correct sentence.",["She should have came.","She should have come.","She should has come."],1,"Modal + have + V3. The V3 of come is come."),
 mcq("I'm not sure, but she ___ be in the library. (maybe)",["might","should have","has to"],0,"Maybe (now): might + plain verb.")
],["Modal question: <b>modal + subject + V1?</b> No do / does.","Past modals: <b>should / could / might / must + have + V3</b>.","<b>should have</b> = regret. <b>must have</b> = sure guess."])

]);


})();
