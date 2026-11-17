/* Module 5: more basics
   Lessons are written with small helper functions (see content/api.js and docs/ADDING-LESSONS.md).
   Colour tags used inside text: <sb> subject, <vb> verb, <ob> object, <ad> describing word, <tm> time/key word, <hl> highlight. */
(function () {
var H = ESS.H, MOD = H.MOD, L = H.L, learn = H.learn, mcq = H.mcq, build = H.build, type = H.type,
    find = H.find, sort = H.sort, match = H.match, reveal = H.reveal;

MOD("m5","5. More basics you need","Everyday grammar that scholars use at work and in tests.",[

L("count","Countable and uncountable","some, any, much, many",[
 learn("Can you count it?",
  "<b>Countable nouns</b> can be counted: one pen, two pens. <b>Uncountable nouns</b> cannot be counted one by one: water, rice, information, advice, furniture, money, news, homework.",
  ["table",["Countable","Uncountable"],["a book, two books","water, rice"],["a chair, three chairs","furniture, money"],["an idea, many ideas","information, advice, news"]],
  ["warn","She gave me many advices.","She gave me a lot of advice.","Advice is uncountable. It has no plural and no “a”."],
  ["warn","The news are good.","The news is good.","Uncountable nouns take a singular verb."],
  ["tip","To count an uncountable noun, use a unit: <i>a piece of advice, a glass of water, a cup of tea, a bag of rice</i>."]),
 learn("many, much, a lot of, some, any",
  ["table",["Word","Use with","Example"],["many","countable, mostly in questions and negatives","How many students are there?"],["much","uncountable, mostly in questions and negatives","I don't have much time."],["a lot of","both, in positive sentences","She has a lot of friends. We have a lot of work."],["some","positive sentences and offers","I have some questions. Would you like some tea?"],["any","questions and negatives","Do you have any questions? I don't have any money."],["a few / few","countable: a few = some, few = almost none","I have a few friends."],["a little / little","uncountable: a little = some, little = almost none","I have a little time."]]),
 mcq("Which noun is uncountable?",["chair","advice","book"],1,"You cannot say “one advice, two advices”. Advice is uncountable."),
 mcq("How ___ water do you drink?",["many","much","few"],1,"Water is uncountable: much."),
 mcq("How ___ students are in your batch?",["many","much","little"],0,"Students can be counted: many."),
 mcq("I don't have ___ time.",["many","much","a few"],1,"Time is uncountable, and the sentence is negative: much."),
 mcq("The news ___ good.",["is","are"],0,"News is uncountable, so it takes “is”."),
 mcq("Do you have ___ questions?",["some","any","much"],1,"A question: any."),
 mcq("I need ___ advice.",["an","some","many"],1,"Advice is uncountable. Use some, not a / an."),
 sort("Countable or uncountable?",["Countable","Uncountable"],[["pen",0],["water",1],["information",1],["laptop",0],["furniture",1],["idea",0],["homework",1],["student",0]],"If you can say “one ___, two ___”, it is countable.")
],["<b>Countable</b>: one, two ... <b>Uncountable</b>: water, advice, information, news, furniture, homework.","<b>many</b> + countable · <b>much</b> + uncountable · <b>a lot of</b> + both.","<b>some</b> in positive sentences · <b>any</b> in questions and negatives.","<b>a few / a little</b> = some · <b>few / little</b> = almost none."]),

L("compare","Comparing things","bigger, biggest, as ... as",[
 learn("Comparative and superlative",
  "Use the <b>comparative</b> to compare two things. Use the <b>superlative</b> for the top one in a group.",
  ["table",["Adjective","Comparative (two)","Superlative (top)"],["tall (short word)","taller","the tallest"],["big (double the letter)","bigger","the biggest"],["happy (y → i)","happier","the happiest"],["beautiful (long word)","more beautiful","the most beautiful"],["good (irregular)","better","the best"],["bad (irregular)","worse","the worst"]],
  ["rules",["Short words","adjective + <b>er</b> / the + adjective + <b>est</b>"],["Long words","<b>more</b> + adjective / <b>the most</b> + adjective"]],
  "Use <b>than</b> after a comparative: <i>Ravi is taller than Kumar.</i> Use <b>the</b> before a superlative: <i>He is the tallest in the class.</i>",
  ["warn","She is more taller than me.","She is taller than me.","Never use more and -er together."]),
 learn("as ... as",
  "Use <b>as + adjective + as</b> when two things are equal: <i>Priya is as tall as Meena.</i> Use <b>not as ... as</b> when one is less: <i>This test is not as difficult as that one.</i>"),
 mcq("My bag is ___ than yours.",["heavy","heavier","heaviest"],1,"Two things, short word, y becomes i: heavier."),
 mcq("This is ___ book I have ever read.",["good","better","the best"],2,"The top of all: the best."),
 mcq("English is ___ than Maths for me.",["more easy","easier","most easy"],1,"Short word: easier."),
 mcq("She is ___ girl in the class.",["the most intelligent","more intelligent","intelligenter"],0,"Long word, top of the group: the most intelligent."),
 mcq("Choose the correct sentence.",["He is more smarter than me.","He is smarter than me.","He is smart than me."],1,"Use -er, and never more together with it."),
 type("Ravi is ___ than Kumar. (tall)","taller","Short word: tall + er."),
 type("This is the ___ day of my life. (good)","best","good → better → best."),
 build("She is as tall as her sister.","as + adjective + as."),
 sort("-er / -est or more / most?",["-er / -est","more / most"],[["fast",0],["expensive",1],["small",0],["interesting",1],["old",0],["comfortable",1]],"Short words take -er / -est. Long words take more / most.")
],["Two things: <b>-er / more ... than</b>. The top: <b>the -est / the most</b>.","Irregular: good → better → best · bad → worse → worst.","Never use <b>more</b> and <b>-er</b> together.","<b>as ... as</b> = equal."]),

L("if","If sentences","Conditionals",[
 learn("Zero and first conditional",
  "A <b>conditional</b> sentence has an <b>if</b> part (the condition) and a result part.",
  ["table",["Type","Meaning","Pattern","Example"],["Zero","always true","if + present, present","If you heat ice, it melts."],["First","real, possible future","if + present, <b>will</b> + V1","If it rains, we will stay home."]],
  ["warn","If it will rain, we will stay home.","If it rains, we will stay home.","Never use will in the if part."],
  ["tip","Put a comma when the if part comes first. No comma when it comes second: <i>We will stay home if it rains.</i>"]),
 learn("Second and third conditional",
  ["table",["Type","Meaning","Pattern","Example"],["Second","unreal or unlikely now","if + past, <b>would</b> + V1","If I had time, I would learn French."],["Third","past, cannot change","if + past perfect, would have + V3","If I had studied, I would have passed."]],
  "In the second conditional we use <b>were</b> for all subjects: <i>If I were you, I would apply.</i>",
  ["tip","Second = dream or advice. Third = regret."]),
 mcq("If you ___ hard, you will pass.",["study","will study","studied"],0,"First conditional: if + present."),
 mcq("If it ___ tomorrow, we will cancel the trip.",["will rain","rains","rained"],1,"After if, use the present simple."),
 mcq("If I ___ a bird, I would fly to you.",["am","were","will be"],1,"Second conditional: were."),
 mcq("If I had more time, I ___ learn French.",["will","would","had"],1,"Second conditional result: would + V1."),
 mcq("If she had left earlier, she ___ the train.",["would catch","would have caught","will catch"],1,"Third conditional (past regret): would have + V3."),
 mcq("If you heat water to 100°C, it ___.",["boils","will boil","boiled"],0,"A fact (zero conditional): present + present."),
 build("If it rains, we will stay home.","if + present, will + V1."),
 sort("Which conditional is it?",["First (possible)","Second (dream)","Third (regret)"],[["If I win, I will celebrate.",0],["If I were rich, I would travel.",1],["If I had known, I would have helped.",2]],"Possible future = first. Unreal now = second. Past regret = third.")
],["Zero: if + present, present (facts).","First: if + present, <b>will</b> + V1.","Second: if + past, <b>would</b> + V1 (were for all subjects).","Third: if + had + V3, would have + V3.","Never use will in the if part."]),

L("passive","Active and passive","Who does it, and who receives it",[
 learn("Active and passive",
  "In an <b>active</b> sentence, the subject does the action: <i>Ravi wrote the report.</i> In a <b>passive</b> sentence, the subject receives the action: <i>The report was written by Ravi.</i>",
  ["rules",["Passive","<sb>object</sb> + <vb>be</vb> + <ad>V3</ad> (+ by the doer)"]],
  "The <b>be</b> verb takes the tense. The main verb is always <b>V3</b>.",
  ["table",["Tense","Active","Passive"],["Present Simple","They make tea.","Tea is made."],["Past Simple","They made tea.","Tea was made."],["Present Perfect","They have made tea.","Tea has been made."],["Future","They will make tea.","Tea will be made."],["Modal","They can make tea.","Tea can be made."]],
  ["tip","Use the passive when the doer is not important or not known: <i>My phone was stolen.</i>"]),
 mcq("The report ___ by Ravi yesterday.",["wrote","was written","is written"],1,"Passive, past: was + V3."),
 mcq("English ___ all over the world.",["speaks","is spoken","spoke"],1,"Passive, present: is + V3."),
 mcq("The work ___ finished already.",["has been","was being","will be"],0,"Passive, present perfect: has been + V3. “Already” shows it is done now."),
 mcq("The work ___ tomorrow.",["will finish","will be finished","will finished"],1,"Passive, future: will be + V3."),
 type("Make it passive: “They built the bridge.” → The bridge ___ built.","was","Past passive: was + V3.","Past tense of be"),
 mcq("Which sentence is passive?",["She wrote a letter.","A letter was written.","She is writing a letter."],1,"The subject (a letter) receives the action: was written."),
 sort("Active or passive?",["Active","Passive"],[["The chef cooked dinner.",0],["Dinner was cooked by the chef.",1],["The manager signed the form.",0],["The form was signed.",1]],"Passive = be + V3.")
],["Passive: <b>be + V3</b>. The <b>be</b> verb shows the tense.","Use the passive when the doer is unknown or not important.","Active: Ravi wrote it. Passive: It was written (by Ravi)."]),

L("report","Reported speech","What someone said",[
 learn("Telling what someone said",
  "<b>Direct speech</b> gives the exact words: <i>She said, “I am tired.”</i> <b>Reported speech</b> tells the idea: <i>She said that she was tired.</i> The tense usually moves <b>one step back</b>.",
  ["table",["Direct","Reported"],["am / is / are","was / were"],["Present Simple (works)","Past Simple (worked)"],["Present Continuous (is working)","Past Continuous (was working)"],["Present Perfect (has worked)","Past Perfect (had worked)"],["Past Simple (worked)","Past Perfect (had worked)"],["will","would"],["can","could"]],
  "Pronouns and time words also change: <i>I → he / she</i> · <i>now → then</i> · <i>today → that day</i> · <i>tomorrow → the next day</i> · <i>yesterday → the day before</i> · <i>here → there</i>.",
  ["ex","He said, “I will call you tomorrow.” → He said that he <vb>would</vb> call me <tm>the next day</tm>.|will becomes would, tomorrow becomes the next day"]),
 learn("Reported questions",
  "Reported questions use <b>statement order</b>. There is no do / does / did, and no question mark.",
  ["ex","She asked, “Where do you live?” → She asked me where I <vb>lived</vb>.|no “do”","He asked, “Are you ready?” → He asked if I <vb>was</vb> ready.|yes/no question → if / whether"]),
 mcq("She said, “I am tired.” → She said that she ___ tired.",["is","was","has been"],1,"am / is becomes was."),
 mcq("He said, “I will call you.” → He said that he ___ call me.",["will","would","can"],1,"will becomes would."),
 mcq("She said, “I work in Madurai.” → She said she ___ in Madurai.",["works","worked","had work"],1,"Present Simple becomes Past Simple."),
 mcq("He asked, “Where do you live?” → He asked me where I ___.",["do live","lived","did live"],1,"No do / did in reported questions: lived."),
 mcq("He said, “I am coming tomorrow.” → He said he was coming ___.",["tomorrow","the next day","yesterday"],1,"tomorrow becomes the next day."),
 mcq("She asked, “Are you ready?” → She asked ___ I was ready.",["if","that","what"],0,"A yes/no question: if or whether."),
 match("Match the direct word with the reported word.",[["now","then"],["today","that day"],["tomorrow","the next day"],["here","there"]],"Time and place words move away from the speaker.")
],["Reported speech: the tense moves <b>one step back</b> (am → was, will → would, can → could).","Pronouns and time words change: I → he, tomorrow → the next day.","Reported questions: <b>statement order</b>, no do / did, use if / whether."]),

L("sva","Subject and verb agreement","Make them match",[
 learn("The golden rule",
  "A <b>singular</b> subject takes a <b>singular</b> verb. A <b>plural</b> subject takes a <b>plural</b> verb.",
  ["list","<b>One person or thing</b>: <i>The boy plays. The bus stops.</i>","<b>More than one</b>: <i>The boys play. The buses stop.</i>","<b>Two subjects joined by “and”</b>: <i>Ravi and Priya are here.</i> (plural)","<b>each, every, everyone, nobody, someone</b>: <i>Each student has a book. Everyone is here.</i> (singular)","<b>One of the ...</b> takes a singular verb: <i>One of my friends is a doctor.</i>","<b>The number of</b> takes a singular verb. <b>A number of</b> takes a plural verb.","Ignore extra words between subject and verb: <i>The box of apples is heavy.</i> (the box is heavy)"]),
 learn("Tricky cases",
  ["list","<b>Neither ... nor / either ... or</b>: the verb agrees with the nearer subject: <i>Neither Ravi nor his friends are here.</i>","<b>Subjects with “with” or “along with”</b>: the first subject decides: <i>The teacher, with her students, is arriving.</i>","<b>Nouns that look plural but are singular</b>: news, mathematics, physics, economics: <i>Mathematics is hard.</i>","<b>Plural-only nouns</b>: scissors, trousers, glasses: <i>My trousers are new.</i>"]),
 mcq("Each of the students ___ a book.",["have","has"],1,"Each is singular: has."),
 mcq("The box of apples ___ heavy.",["is","are"],0,"The subject is the box (one): is."),
 mcq("Ravi and Priya ___ my friends.",["is","are"],1,"Two people joined by and: are."),
 mcq("Neither the teacher nor the students ___ here.",["is","are"],1,"The verb agrees with the nearer subject: students (plural)."),
 mcq("One of my friends ___ a doctor.",["is","are"],0,"“One of” takes a singular verb: is."),
 mcq("Mathematics ___ difficult for me.",["is","are"],0,"Mathematics is singular, even though it ends in s."),
 mcq("My trousers ___ new.",["is","are"],1,"Trousers is plural."),
 mcq("Everybody ___ ready.",["is","are"],0,"Everybody is singular.")
],["Singular subject → singular verb. Plural subject → plural verb.","<b>Each, every, everyone, nobody</b> and <b>one of</b> are singular.","Ignore the words between the subject and the verb.","Neither / either: agree with the nearer subject."]),

L("tags","Question tags and short answers","isn't it? don't you?",[
 learn("Question tags",
  "A <b>question tag</b> is a short question at the end of a sentence. Use it to check something or to invite agreement.",
  ["rules",["Positive → negative tag","<i>You are ready, <b>aren't you</b>?</i>"],["Negative → positive tag","<i>You aren't ready, <b>are you</b>?</i>"]],
  ["table",["Sentence","Tag"],["She works here,","doesn't she?"],["They went home,","didn't they?"],["He can swim,","can't he?"],["You haven't finished,","have you?"],["I am right,","aren't I?"],["Let's go,","shall we?"]],
  "The tag uses the same helping verb as the sentence. If there is no helper in the Present Simple or Past Simple, use do / does / did."),
 learn("Short answers",
  "To answer yes/no questions in a natural way, repeat the helper: <i>Are you ready? Yes, I am. / No, I'm not.</i> <i>Does she like tea? Yes, she does. / No, she doesn't.</i> <i>Can he swim? Yes, he can. / No, he can't.</i>"),
 mcq("She works here, ___?",["doesn't she","isn't she","does she"],0,"A positive sentence takes a negative tag. Present Simple: doesn't she."),
 mcq("They went home, ___?",["didn't they","don't they","did they"],0,"Past Simple: didn't they."),
 mcq("You haven't finished, ___?",["haven't you","have you","did you"],1,"A negative sentence takes a positive tag: have you."),
 mcq("He can swim, ___?",["can't he","doesn't he","isn't he"],0,"Same helper as the sentence: can't he."),
 mcq("Does she like tea? Yes, she ___.",["likes","does","is"],1,"A short answer repeats the helper: does."),
 mcq("Are you a trainer? No, I ___.",["don't","am not","not"],1,"Short answer: No, I'm not."),
 type("It's a nice day, ___ it?","isn't","is + not = isn't it?")
],["Positive sentence → <b>negative tag</b>. Negative sentence → <b>positive tag</b>.","The tag uses the same helper. No helper? Use do / does / did.","Short answers repeat the helper: Yes, she does."]),

L("gerund","-ing form or to + verb?","enjoy doing, want to do",[
 learn("Which verb form comes next?",
  "When two verbs come together, the second verb is either <b>-ing</b> (gerund) or <b>to + V1</b> (infinitive). It depends on the first verb. You must learn which verbs take which.",
  ["table",["Use -ing after","Use to + V1 after"],["enjoy, finish, avoid, mind, suggest, keep, practise","want, need, hope, plan, decide, agree, promise, learn"],["<i>I enjoy reading.</i>","<i>I want to read.</i>"],["<i>She finished writing.</i>","<i>She decided to write.</i>"]],
  ["warn","I enjoy to read.","I enjoy reading.","Enjoy is followed by -ing."],
  ["warn","I want going home.","I want to go home.","Want is followed by to + V1."]),
 learn("Other uses",
  ["list","<b>After a preposition, use -ing</b>: <i>She is good at singing. Thank you for helping me.</i>","<b>Purpose</b>: <i>I went to the bank to get money.</i> (to + V1 shows the reason)","<b>After modals use V1 only</b>: <i>I can swim. She must go.</i>","<b>Both forms</b> after like, love, hate, start, begin: <i>I like to swim. I like swimming.</i>"]),
 mcq("I enjoy ___ English.",["to learn","learning","learn"],1,"Enjoy + -ing."),
 mcq("She wants ___ a doctor.",["be","being","to be"],2,"Want + to + V1."),
 mcq("He is good at ___ cricket.",["play","playing","to play"],1,"After a preposition, use -ing."),
 mcq("I went to the shop ___ some milk.",["buy","buying","to buy"],2,"A purpose: to + V1."),
 mcq("They decided ___ early.",["leaving","to leave","leave"],1,"Decide + to + V1."),
 mcq("You must ___ now.",["go","to go","going"],0,"After a modal, use V1 only."),
 mcq("Thank you for ___ me.",["help","to help","helping"],2,"After a preposition: -ing."),
 sort("-ing or to + V1?",["-ing","to + V1"],[["enjoy",0],["want",1],["finish",0],["decide",1],["avoid",0],["hope",1],["mind",0],["plan",1]],"Learn them in groups. Enjoy, finish, avoid, mind take -ing.")
],["<b>enjoy, finish, avoid, mind, suggest</b> + -ing.","<b>want, need, hope, plan, decide, promise</b> + to + V1.","After a preposition: -ing. After a modal: V1.","to + V1 shows purpose."]),

L("punct","Punctuation","Full stop, comma, apostrophe",[
 learn("Four marks you use every day",
  ["table",["Mark","Use","Example"],["Full stop .","ends a statement","She works in Madurai."],["Question mark ?","ends a question","Where do you live?"],["Comma ,","a list, or after an opening word","I bought pens, books and bags. However, he came."],["Apostrophe '","short forms and belonging","I don't know. This is Priya's bag."]]),
 learn("Apostrophe: two jobs",
  ["list","<b>Short form</b>: do not → don't · it is → it's · I am → I'm · she will → she'll","<b>Belonging</b>: Priya's bag · the teacher's desk · the students' books (many students)"],
  ["warn","The dog wagged it's tail.","The dog wagged its tail.","<b>its</b> = belongs to it. <b>it's</b> = it is."],
  ["warn","Apple's are cheap today.","Apples are cheap today.","Do not use an apostrophe for a simple plural."]),
 mcq("Which is correct?",["Its raining.","It's raining.","Its' raining."],1,"It's = it is."),
 mcq("This is ___ bag.",["Priya's","Priyas","Priyas'"],0,"Belonging: Priya's."),
 mcq("The ___ books are on the table. (many students)",["students","student's","students'"],2,"The books belong to many students: students'."),
 mcq("Choose the correct sentence.",["I bought pens books and bags.","I bought pens, books and bags.","I bought, pens books, and bags."],1,"Use commas to separate items in a list."),
 mcq("Where do you live___",[".","?","!"],1,"It is a question: ?"),
 find("Tap the word that is wrong.","The [dog's] are playing in the garden.","A simple plural does not take an apostrophe: dogs.")
],["Full stop for statements. Question mark for questions.","Comma separates items in a list.","Apostrophe: short forms (don't, it's) and belonging (Priya's).","<b>its</b> = belongs to it. <b>it's</b> = it is."]),

L("final","Final review","Mixed practice from all the basics",[
 learn("You have come a long way",
  "This last lesson mixes questions from everything you studied. If you miss one, it will come back once more. Use <b>Revise</b> on the home screen every day for ten minutes. Repetition builds memory."),
 mcq("My brother ___ in a bank.",["work","works","is work"],1,"Present Simple, he: works."),
 mcq("She ___ since morning.",["is working","has been working","worked"],1,"Since + still going: have / has been + -ing."),
 mcq("He ___ to Chennai yesterday.",["go","went","has gone"],1,"Yesterday = Past Simple: went."),
 mcq("When I arrived, they ___.",["left","had left","leave"],1,"They left first: Past Perfect."),
 mcq("You ___ see a doctor. (advice)",["must to","should","can to"],1,"Advice: should + V1."),
 mcq("I ___ here for five years.",["live","am living","have lived"],2,"For five years: Present Perfect."),
 mcq("If it rains, we ___ at home.",["stay","will stay","would stay"],1,"First conditional: will + V1."),
 mcq("Everyone ___ ready.",["is","are"],0,"Everyone is singular."),
 mcq("She is ___ girl in the class.",["tallest","the tallest","more tall"],1,"The top of the group: the tallest."),
 mcq("The email ___ yesterday.",["sent","was sent","is sent"],1,"Passive, past: was sent."),
 build("I have been learning English for two years.","have been + -ing."),
 build("Where do you live?","Wh-word + do + subject + V1."),
 type("She ___ (not / like) spicy food.","doesn't like","She + negative + V1: doesn't like."),
 type("They ___ cricket now. (play)","are playing","Now = Present Continuous: are playing."),
 match("Match the tense to its signal word.",[["Present Simple","every day"],["Present Continuous","right now"],["Present Perfect","since 2022"],["Past Simple","yesterday"]],"Signal words usually decide the tense.")
],["Find the <b>signal word</b>, then choose the tense.","Use <b>Revise</b> every day. Ten minutes a day is better than two hours once a week.","Speak your answers aloud. Say each example sentence three times."])

]);


})();
