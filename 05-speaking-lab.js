/* Speaking lab: pronunciation drills and real-life talk sets.
   "pron" sets train sounds.  "talk" sets train speaking in the tenses and situations scholars need at work.
   For a talk step, "must" is a list of [regex, text shown when it passes, tip shown when it fails]. */
(function () {
var H = ESS.H, SET = H.SET, learn = H.learn, mcq = H.mcq, sort = H.sort, say = H.say, talk = H.talk, match = H.match;

/* ===================== PRONUNCIATION ===================== */

SET("p-ed", "-ed endings", "Say worked, played and wanted correctly", "pron", [
 learn("-ed has three sounds",
  "We do not always say “ed”. The sound changes. This one rule fixes many pronunciation mistakes.",
  ["table", ["Sound", "After", "Examples"],
   ["<b>/t/</b>", "k, p, s, ch, sh, f sounds", "worked, stopped, watched, washed, asked"],
   ["<b>/d/</b>", "vowels and soft sounds", "played, called, cleaned, lived, opened"],
   ["<b>/id/</b>", "t or d sounds", "wanted, needed, started, decided"]],
  ["tip", "<b>worked</b> sounds like “workt”. It is one sound, not two. Only wanted and needed get an extra “id” part."]),
 sort("Which sound does the -ed make?", ["/t/", "/d/", "/id/"],
  [["worked", 0], ["played", 1], ["wanted", 2], ["watched", 0], ["called", 1], ["needed", 2], ["asked", 0], ["cleaned", 1]],
  "After t or d it is /id/. After k, p, s, ch, sh it is /t/. In the other cases it is /d/."),
 mcq("How do we say “asked”?", ["ask-id", "askt", "ask-ed (two sounds)"], 1, "“Asked” ends with a /t/ sound: askt. Only words ending in t or d take /id/."),
 say("I worked all day.", "Say workt, not work-ed."),
 say("She played cricket yesterday."),
 say("They wanted some tea.", "Wanted has an extra “id” sound."),
 say("We watched a film last night.")
], ["-ed sounds like <b>/t/</b> after k, p, s, ch, sh (worked).", "It sounds like <b>/d/</b> after most other sounds (played).", "It sounds like <b>/id/</b> only after t or d (wanted, needed)."]),

SET("p-s", "-s endings", "Say works, plays and watches correctly", "pron", [
 learn("-s and -es have three sounds",
  "The ending of he works, she plays, it watches is not the same sound each time.",
  ["table", ["Sound", "After", "Examples"],
   ["<b>/s/</b>", "k, p, t, f", "works, stops, likes, helps"],
   ["<b>/z/</b>", "vowels and soft sounds", "plays, reads, goes, lives, begins"],
   ["<b>/iz/</b>", "s, sh, ch, x, z, ge", "watches, teaches, washes, fixes, changes"]],
  ["tip", "If you can hear a whole extra “iz” syllable, the word has /iz/. Watches has two syllables: watch-iz."]),
 sort("Which sound does the ending make?", ["/s/", "/z/", "/iz/"],
  [["works", 0], ["plays", 1], ["watches", 2], ["stops", 0], ["goes", 1], ["teaches", 2], ["likes", 0], ["reads", 1]],
  "Look at the last sound before the ending. After s, sh, ch, x it is /iz/."),
 mcq("How do we say “watches”?", ["watch-iz", "watchs", "watch-s"], 0, "After a ch sound we add a whole extra syllable: watch-iz."),
 say("He works in a bank."),
 say("She teaches English every day."),
 say("My brother watches cricket on Sundays."),
 say("It goes to Chennai every morning.")
], ["/s/ after k, p, t, f: works.", "/z/ after most other sounds: plays.", "/iz/ after s, sh, ch, x: watches."]),

SET("p-th", "The th sounds", "Say think, this and three clearly", "pron", [
 learn("Two th sounds",
  "English has two th sounds. Both use the tongue between the teeth. Many learners say “t” or “d” instead.",
  ["table", ["Sound", "How", "Words"],
   ["<b>Soft th</b>", "air only, no voice", "think, thank, three, month, thing"],
   ["<b>Voiced th</b>", "tongue between teeth, voice on", "this, that, the, mother, brother, weather"]],
  ["tip", "Put the tip of your tongue lightly between your teeth. Do not say “tink” or “dis”."]),
 sort("Soft th or voiced th?", ["Soft th (think)", "Voiced th (this)"],
  [["think", 0], ["this", 1], ["three", 0], ["that", 1], ["mother", 1], ["thank", 0], ["brother", 1], ["month", 0]],
  "Words like think, three, thank, month have the soft sound. Words like this, that, mother have the voiced sound."),
 say("I think this is the third thing."),
 say("Thank you for the three books."),
 say("My mother and father are there.", "Watch the th in mother, father and there."),
 say("Both brothers like this weather.")
], ["Put your tongue between your teeth for both th sounds.", "Soft th: think, three. Voiced th: this, that, mother."]),

SET("p-vw", "v and w", "Say very well and wait for the van", "pron", [
 learn("v is not w",
  "The sounds /v/ and /w/ are different. Mixing them is very common, but it is easy to fix.",
  ["table", ["Sound", "How", "Words"],
   ["<b>/v/</b>", "top teeth touch your lower lip", "very, van, visit, voice, move, live"],
   ["<b>/w/</b>", "lips make a small circle, teeth do not touch", "well, wait, window, week, why, work"]],
  ["tip", "For /v/, you can feel the buzzing on your lip. For /w/, your lips are round, like saying “oo”."]),
 sort("Which sound does the word start with?", ["/v/", "/w/"],
  [["very", 0], ["well", 1], ["van", 0], ["wait", 1], ["visit", 0], ["window", 1], ["voice", 0], ["week", 1]],
  "v: top teeth touch the lower lip. w: round lips."),
 mcq("Which word starts with /v/?", ["west", "vest", "wet"], 1, "“Vest” starts with /v/. “West” and “wet” start with /w/."),
 say("We will wait for the very last van."),
 say("Why is the weather so warm?"),
 say("I have a very good voice.")
], ["/v/: top teeth touch the lower lip.", "/w/: round lips, teeth do not touch."]),

SET("p-stress", "Word stress", "Put the strong beat on the right part", "pron", [
 learn("Every long word has one strong part",
  "In a word with more than one syllable, one syllable is stronger: louder, longer and a little higher. If the stress is in the wrong place, people find the word hard to understand.",
  ["ex", "TEA-cher|stress on the first part", "be-GIN|stress on the second part", "en-gi-NEER|stress on the third part"],
  ["tip", "Clap the beats of the word. Then say the strong beat louder."]),
 mcq("Where is the stress in “teacher”?", ["first part", "second part"], 0, "TEA-cher. The first part is strong."),
 mcq("Where is the stress in “computer”?", ["first part", "second part", "third part"], 1, "com-PU-ter. The second part is strong."),
 mcq("Where is the stress in “important”?", ["first part", "second part", "third part"], 1, "im-POR-tant. The second part is strong."),
 mcq("Where is the stress in “engineer”?", ["first part", "second part", "third part"], 2, "en-gi-NEER. The last part is strong."),
 mcq("Where is the stress in “interview”?", ["first part", "second part", "third part"], 0, "IN-ter-view. The first part is strong."),
 say("Please begin the interview."),
 say("The manager will explain the important point.")
], ["One strong syllable in every long word.", "teacher: TEA-cher · begin: be-GIN · computer: com-PU-ter · engineer: en-gi-NEER."]),

SET("p-vowels", "Short and long vowels", "ship and sheep, live and leave", "pron", [
 learn("Short and long sounds change the word",
  "A short vowel is quick. A long vowel is longer and the lips are tighter. The two make different words.",
  ["table", ["Short", "Long"], ["ship", "sheep"], ["live", "leave"], ["bit", "beat"], ["full", "fool"], ["pull", "pool"]],
  ["tip", "For the long sound, smile a little and hold the sound for a moment."]),
 sort("Is the vowel short or long?", ["Short", "Long"],
  [["ship", 0], ["sheep", 1], ["live", 0], ["leave", 1], ["full", 0], ["fool", 1], ["bit", 0], ["beat", 1]],
  "Words with ee, ea, oo (as in pool) have long sounds. Words like ship, live, full, bit are short."),
 say("The sheep is on the ship."),
 say("Please leave the building."),
 say("I live near a big pool.")
], ["Short: ship, live, bit, full.", "Long: sheep, leave, beat, fool."]),

SET("p-natural", "Sound natural", "Contractions and weak words", "pron", [
 learn("Real English is not word by word",
  "In normal speech, small words become short and quiet, and the important words are strong. This makes your English smooth.",
  ["table", ["Full form", "Short form"], ["do not", "don't"], ["I am", "I'm"], ["they are", "they're"], ["I have", "I've"], ["can not", "can't"]],
  ["tip", "<b>can</b> is usually short and weak (“kn”): I can swim. <b>can't</b> is strong and long: I CAN'T swim. This is how people hear the difference."]),
 mcq("In “I can swim”, the word “can” is usually...", ["weak and short", "strong and long"], 0, "In a positive sentence, can is quick and quiet. The main verb (swim) is strong."),
 mcq("In “I can't swim”, the word “can't” is usually...", ["weak and short", "strong and long"], 1, "can't is strong and long, so the listener can hear the “no”."),
 say("I don't know."),
 say("She can't swim."),
 say("They're at work."),
 say("I've finished my work."),
 say("Would you like some tea?")
], ["Use short forms when you speak: don't, I'm, they're, I've.", "can is weak. can't is strong."]),

/* ===================== REAL-LIFE TALK ===================== */

SET("t-intro", "Introduce yourself", "Present Simple: facts about you", "talk", [
 learn("How to introduce yourself",
  "Use the Present Simple for facts about you. Say your name, your place and your work. Keep each sentence short.",
  ["ex", "My name is Priya.|name", "I live in Madurai.|place", "I work as a trainer.|job", "In my free time, I read books.|a habit"]),
 say("My name is Priya and I live in Madurai."),
 talk("Tell us your name, where you live and what you do.", {
  must: [["\\b(my name is|i am|i'm|this is)\\b", "You said your name.", "Start with: My name is ..."],
         ["\\b(live|stay|from)\\b", "You said where you live.", "Say where you live: I live in ..."],
         ["\\b(work|study|teach|train|student|trainer|engineer|job|studying|working)\\b", "You said what you do.", "Say what you do: I work as ... / I study ..."]],
  model: ["My name is Priya. I live in Madurai. I work as a trainer."], min: 8 }),
 talk("Tell us about your hobby or your family in two or three sentences.", {
  must: [["\\b(i|my)\\s+\\w+", "You spoke about yourself.", "Start with I ... or My ..."],
         ["\\b(like|likes|love|loves|enjoy|play|plays|watch|read|listen|have|has|live|lives|work|works)\\b", "You used a present verb.", "Use a present verb like like, play or have."]],
  model: ["I live with my parents and my brother. I like cricket and I play it on Sundays."], min: 8 })
], ["Present Simple for facts about you: I live, I work, I like.", "He / she / it takes -s: she works."]),

SET("t-routine", "Your daily routine", "Present Simple with time words", "talk", [
 learn("Talking about your routine",
  "Use the Present Simple with time words. Say the actions in order.",
  ["ex", "I wake up at six every morning.|every + time", "Then I brush my teeth and have tea.|then", "I usually reach office by nine.|usually", "I never skip breakfast.|never"]),
 say("I usually reach office by nine."),
 talk("Tell us three things you do every morning.", {
  must: [["\\b(every day|every morning|usually|always|first|then|after that|daily|after)\\b", "You used a time word.", "Add a time word like every morning, usually or then."],
         ["\\bi\\s+(wake|get|have|drink|go|leave|reach|brush|eat|take|start|read|bath|walk|cook|travel|come|catch|check|pray|do)\\b", "You used the Present Simple.", "Say: I wake up ..., I have ... (plain verb, no -ing and no -ed)."]],
  model: ["I wake up at six every morning. Then I brush my teeth and have tea. After that I leave for office."], min: 10 }),
 talk("Tell us one thing you never do or rarely do on Sundays.", {
  must: [["\\b(i|we)\\s+(never|rarely|seldom|don't|do not)\\b", "You used a negative or never.", "Say: I never ... or I don't ..."]],
  model: ["I never wake up early on Sundays. I don't go to office."], min: 6 })
], ["Present Simple + every day, usually, always, never.", "Frequency words go before the main verb: I usually walk."]),

SET("t-now", "What is happening now", "Present Continuous", "talk", [
 learn("Talking about now",
  "Use am / is / are + verb-ing for things happening at this moment.",
  ["ex", "I am sitting in my room.|me, now", "The fan is running.|a thing, now", "My friends are studying in the next room.|they, now"]),
 say("I am sitting in my room."),
 talk("Say what you are doing right now. Use I am ...", {
  must: [["\\b(i am|i'm)\\s+\\w+ing\\b", "You used I am + verb-ing.", "Say I am + verb-ing, for example: I am sitting in my room."]],
  model: ["I am sitting in my room and I am learning English."], min: 6 }),
 talk("Say what is happening around you now. Use is or are.", {
  must: [["\\b(is|are)\\s+\\w+ing\\b", "You used is / are + verb-ing.", "Use is or are + verb-ing: The fan is running. People are talking."]],
  model: ["The fan is running and my mother is cooking in the kitchen."], min: 6 })
], ["am / is / are + verb-ing = now.", "I am working. She is studying. They are playing."]),

SET("t-yesterday", "What you did yesterday", "Past Simple", "talk", [
 learn("Talking about yesterday",
  "Use the Past Simple for finished actions. Use time words like yesterday, last night, then.",
  ["ex", "Yesterday I went to office by bus.|went = go", "I had lunch with my friends.|had = have", "Then I came home and watched a film.|two actions in order"]),
 say("Yesterday I went to office by bus."),
 talk("Tell us what you did yesterday. Say three sentences.", {
  must: [["\\b(\\w+ed|went|had|ate|saw|took|came|made|got|did|was|were|met|bought|wrote|drank|slept|left|woke|spoke|gave|read)\\b", "You used past verbs.", "Use past verbs: went, had, watched, came ..."],
         ["\\b(yesterday|last night|in the morning|in the evening|then|after that|afternoon)\\b", "You used a time word.", "Add a time word like yesterday, then or after that."]],
  model: ["Yesterday I woke up at six. I went to office by bus. In the evening I watched a film."], min: 10 }),
 talk("Tell us about your last holiday or festival.", {
  must: [["\\b(\\w+ed|went|had|ate|saw|took|came|made|got|did|was|were|met|bought|wore|visited|enjoyed)\\b", "You used past verbs.", "Use past verbs: went, visited, enjoyed, ate ..."]],
  model: ["Last Pongal we visited my grandmother. We ate a lot of sweets and we enjoyed the day."], min: 10 })
], ["Past Simple = finished action. Use V2 (went, ate, watched).", "Time words: yesterday, last night, ago."]),

SET("t-done", "What have you done?", "Present Perfect", "talk", [
 learn("Talking about experience and results",
  "Use have / has + V3 for things you have done in your life or just now. Do not say when it happened.",
  ["ex", "I have already had lunch.|result now", "I have never travelled by plane.|life experience", "She has just left.|a moment ago"]),
 say("I have already finished my work."),
 talk("Tell us two things you have already done today.", {
  must: [["\\b(i have|i've|has)\\s+(\\w+ed|been|gone|done|eaten|seen|taken|had|made|finished|completed|written|read|met|spoken|called|drunk|left|come|got)\\b", "You used have + V3.", "Say I have + V3, for example: I have finished my work."],
         ["\\b(already|just|today|this morning)\\b", "You used already, just or today.", "Add already, just or today."]],
  model: ["I have already had breakfast. I have finished my homework."], min: 8 }),
 talk("Tell us one thing you have never done.", {
  must: [["\\b(i have never|i've never)\\b", "You said I have never.", "Start with: I have never ..."]],
  model: ["I have never travelled by plane."], min: 5 })
], ["have / has + V3 = connected to now. No finished time.", "ever, never, already, just, yet go with the Present Perfect."]),

SET("t-plans", "Plans and promises", "going to and will", "talk", [
 learn("Plans and promises",
  "Use <b>going to</b> for plans you already made. Use <b>will</b> for promises and quick decisions.",
  ["ex", "I am going to visit my parents this weekend.|a plan", "I will call you tonight.|a promise", "I won't be late again.|a promise"]),
 say("I am going to visit my parents this weekend."),
 talk("Say what you are going to do this weekend.", {
  must: [["\\b(going to|gonna)\\b", "You used going to.", "Say: I am going to ..."]],
  model: ["I am going to visit my parents. I am going to rest on Sunday."], min: 8 }),
 talk("Make a promise to your trainer. Use I will.", {
  must: [["\\b(i will|i'll|i won't|i will not)\\b", "You used I will.", "Say: I will ... or I won't ..."]],
  model: ["I will practise English every day. I will not miss any class."], min: 8 })
], ["going to = plan. will = promise or quick decision.", "I am going to start a course. I will help you."]),

SET("t-polite", "Polite requests", "can, could, may, would", "talk", [
 learn("Sounding polite at work",
  "Use could, may and would to ask politely. Add please and thank you.",
  ["ex", "Could I take a day off, please?|asking for permission", "May I come in?|very polite", "Would you please send me the file?|asking someone to do something", "Shall I help you with that?|offering help"]),
 say("Could I take a day off, please?"),
 talk("Ask your manager politely for one day of leave.", {
  must: [["\\b(could|would|can|may)\\s+(i|you)\\b", "You used could / may / can.", "Start with: Could I ... / May I ..."],
         ["\\b(please|sir|ma'am|madam|thank you)\\b", "You were polite.", "Add please or thank you."]],
  model: ["Good morning, sir. Could I take a day off on Friday, please? Thank you."], min: 8 }),
 talk("Offer help to a colleague. Use Shall I or Can I.", {
  must: [["\\b(shall i|can i|could i|would you like|do you want me to)\\b", "You offered help.", "Say: Shall I ...? / Can I ...?"]],
  model: ["You look busy. Shall I help you with the report?"], min: 6 })
], ["Polite: Could I ...? May I ...? Would you please ...?", "Offer: Shall I ...? Can I ...?"]),

SET("t-advice", "Giving advice", "should, shouldn't, ought to", "talk", [
 learn("Giving advice kindly",
  "Use should for advice. Use shouldn't for things not to do.",
  ["ex", "You should sleep early.|a good idea", "You shouldn't use your phone in class.|not a good idea", "You ought to practise every day.|same as should"]),
 say("You should sleep early."),
 talk("Your friend is always late to office. Give two pieces of advice.", {
  must: [["\\b(should|shouldn't|ought to|had better|you could)\\b", "You used should.", "Use should: You should leave early."],
         ["\\byou\\b", "You spoke to your friend.", "Start with You ..."]],
  model: ["You should leave home early. You shouldn't stay awake late at night."], min: 8 }),
 talk("Your friend is nervous about an interview. Give advice.", {
  must: [["\\b(should|shouldn't|ought to|had better|you could)\\b", "You used should.", "Use should: You should prepare well."]],
  model: ["You should prepare well and you should speak slowly. You shouldn't worry too much."], min: 8 })
], ["should + V1 = advice. shouldn't = not a good idea.", "No -s and no to after should."]),

SET("t-delay", "Explaining a delay", "Office talk: sorry, because, past tenses", "talk", [
 learn("Say sorry and give a reason",
  "At work, say sorry first, then give a short reason with because. Then say what you will do.",
  ["ex", "I am sorry I am late.|sorry first", "I was stuck in traffic because of the rain.|the reason", "It will not happen again.|a promise"]),
 say("I am sorry I am late. I was stuck in traffic."),
 talk("You reached office late. Say sorry and explain why.", {
  must: [["\\b(sorry|apologi[sz]e|apologies)\\b", "You said sorry.", "Start with: I am sorry ..."],
         ["\\b(because|due to|as|since|stuck|delay|traffic)\\b", "You gave a reason.", "Give a reason with because ..."]],
  model: ["I am sorry I am late. I was stuck in traffic because of the rain."], min: 10 }),
 talk("Tell your trainer you could not finish your homework. Say what you will do.", {
  must: [["\\b(could not|couldn't|did not|didn't|wasn't able|was not able)\\b", "You said what you could not do.", "Say: I could not finish ..."],
         ["\\b(will|going to|promise)\\b", "You said what you will do.", "Say what you will do: I will finish it tonight."]],
  model: ["I am sorry. I could not finish my homework. I will finish it tonight."], min: 10 })
], ["Say sorry first. Then because + reason.", "I could not ... (past) and I will ... (future)."]),

SET("t-update", "Status update", "Office talk: what is done, what is next", "talk", [
 learn("A short status update",
  "A manager wants to know two things: what you have finished, and what you will do next.",
  ["ex", "I have completed the first report.|done", "I am working on the second one now.|in progress", "I will send both reports by tomorrow.|next"]),
 say("I have completed the report and I will send it tomorrow."),
 talk("Tell your manager what you have completed today and what you will do tomorrow.", {
  must: [["\\b(i have|i've)\\s+(completed|finished|done|sent|prepared|written|updated|submitted|\\w+ed)\\b", "You said what you have done.", "Say: I have completed ..."],
         ["\\b(tomorrow|next|will|going to)\\b", "You said what is next.", "Say: Tomorrow I will ..."]],
  model: ["I have completed the first report. Tomorrow I will send it to you."], min: 10 }),
 talk("Describe a problem you faced and how you solved it. Use past tenses.", {
  must: [["\\b(was|were)\\s+\\w+ing\\b|\\b(had|faced|solved|fixed|asked|found|tried|used|checked)\\b", "You used past tenses.", "Use past verbs: I faced, I asked, I solved ..."]],
  model: ["I was facing a problem with my laptop. I asked my friend and we fixed it together."], min: 10 })
], ["Done: I have completed ... Next: I will ...", "A good update has two parts: finished and next."])

})();
