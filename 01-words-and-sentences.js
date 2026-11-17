/* Modules 1 and 2: building blocks and sentence structure
   Lessons are written with small helper functions (see content/api.js and docs/ADDING-LESSONS.md).
   Colour tags used inside text: <sb> subject, <vb> verb, <ob> object, <ad> describing word, <tm> time/key word, <hl> highlight. */
(function () {
var H = ESS.H, MOD = H.MOD, L = H.L, learn = H.learn, mcq = H.mcq, build = H.build, type = H.type,
    find = H.find, sort = H.sort, match = H.match, reveal = H.reveal;

MOD("m1","1. Building blocks","The kinds of words, and how each one works.",[

L("parts","Words have jobs","The 8 kinds of words",[
 learn("Every word has a job",
  "Think of a sentence like a cricket team. Every player has a job. In the same way, every word in English has a job. There are <b>8 kinds of words</b>. They are called <b>parts of speech</b>.",
  ["ex","<sb>Ravi</sb> <vb>drinks</vb> <ad>hot</ad> <ob>tea</ob>.|Ravi = a name · drinks = an action · hot = describes the tea · tea = a thing"],
  "In this course, colours show the job: <sb>blue</sb> = who does it, <vb>orange</vb> = the action, <ob>green</ob> = the thing, <ad>purple</ad> = extra describing word, <tm>yellow</tm> = time or key word.",
  "Next, tap each card to meet the 8 jobs."),
 reveal("Meet the 8 jobs","Tap each card to open it.",[
  ["1. Noun","Names a person, place or thing. <i>teacher, Madurai, laptop, honesty</i>"],
  ["2. Pronoun","Takes the place of a noun, so we do not repeat it. <i>he, she, it, they, we</i>"],
  ["3. Verb","Shows an action or a state. <i>run, write, is, have</i>"],
  ["4. Adjective","Describes a noun. <i>big, red, honest</i>"],
  ["5. Adverb","Tells how, when or where something happens. <i>quickly, today, here</i>"],
  ["6. Preposition","Shows place, time or direction. <i>in, on, at, to, from</i>"],
  ["7. Conjunction","Joins words or sentences. <i>and, but, because, or</i>"],
  ["8. Interjection","A short word for a feeling. <i>Wow! Oh! Oops!</i>"]]),
 find("Tap the verb (the action word).","Priya [writes] a report every day.","“Writes” is the action, so it is the verb."),
 find("Tap the two nouns.","The [manager] sent an [email].","“Manager” is a person and “email” is a thing. Both are nouns."),
 sort("What job does each word do?",["Noun","Verb","Adjective"],[["teacher",0],["write",1],["happy",2],["laptop",0],["run",1],["small",2],["Chennai",0],["speak",1]],"Nouns name things, verbs show actions, adjectives describe."),
 mcq("In “She walks slowly.” what job does “slowly” do?",["Noun","Adverb","Adjective"],1,"“Slowly” tells <b>how</b> she walks. Words that tell how, when or where something happens are adverbs."),
 mcq("Which word is a preposition? “The keys are on the table.”",["keys","are","on","table"],2,"“On” shows where the keys are. Words like in, on, at, under are prepositions."),
 match("Match each word to its job.",[["and","Conjunction"],["Wow!","Interjection"],["they","Pronoun"],["quickly","Adverb"]],"Conjunction joins, interjection shows feeling, pronoun replaces a noun, adverb tells how.")
],["<b>Noun</b> names a person, place or thing.","<b>Pronoun</b> replaces a noun (he, she, they).","<b>Verb</b> shows an action or state.","<b>Adjective</b> describes a noun. <b>Adverb</b> tells how, when, where.","<b>Preposition</b> shows place or time. <b>Conjunction</b> joins. <b>Interjection</b> shows feeling."]),

L("nouns","Nouns and plurals","One thing or many things",[
 learn("What is a noun?",
  "A <b>noun</b> is a word for a person, a place, a thing or an idea.",
  ["table",["Type","Examples"],["Person","teacher, mother, Ravi"],["Place","office, Madurai, India"],["Thing","laptop, phone, tea"],["Idea (you cannot touch it)","happiness, honesty, time"]],
  "Names of people and places start with a <b>capital letter</b>: Ravi, Madurai, India. These are <b>proper nouns</b>. Other nouns, like teacher or city, are <b>common nouns</b>."),
 learn("One or many? Making plurals",
  "Most nouns just add <b>-s</b> for “many”. Some have special rules.",
  ["table",["Rule","One → Many"],["Most nouns: add -s","book → books · laptop → laptops"],["Ends in s, x, ch, sh: add -es","bus → buses · box → boxes · watch → watches · dish → dishes"],["Consonant + y: change y to -ies","city → cities · story → stories"],["Vowel + y: just add -s","day → days · key → keys"],["Ends in f or fe: change to -ves","leaf → leaves · knife → knives"],["Irregular: no rule, just learn","man → men · woman → women · child → children · foot → feet · person → people"]],
  ["tip","Some words never change: <i>sheep, fish</i>. And some words are never plural: <i>information, advice</i> (you will learn these later)."]),
 mcq("What is the plural of “city”?",["citys","cities","cityes"],1,"Consonant + y: change y to -ies. The letter before y is t (a consonant), so: cities."),
 mcq("What is the plural of “box”?",["boxs","boxes","boxies"],1,"Words ending in x take -es: boxes."),
 mcq("What is the plural of “day”?",["days","daies","dayes"],0,"Vowel + y: just add -s. The letter before y is a (a vowel), so: days."),
 type("Type the plural of “child”.","children","This is an irregular plural. Learn it: child → children.","It starts with “child”"),
 type("Type the plural of “watch”.","watches","Words ending in -ch take -es: watches."),
 sort("Singular (one) or plural (many)?",["Singular","Plural"],[["women",1],["bus",0],["people",1],["leaves",1],["foot",0],["boxes",1]],"“Women”, “people”, “leaves” and “boxes” mean many."),
 mcq("Which sentence is correct?",["There are three childs in the room.","There are three children in the room.","There are three childrens in the room."],1,"“Children” is already plural. Never add -s to it.")
],["Add <b>-s</b> to make most plurals.","After s, x, ch, sh add <b>-es</b>. Consonant + y becomes <b>-ies</b>.","Learn the irregular ones: man/men, woman/women, child/children, person/people.","Proper nouns (names) start with a capital letter."]),

L("pron","Pronouns","I, me, my, mine and friends",[
 learn("Pronouns save time",
  "We do not say “Priya” again and again. We say “she”. A <b>pronoun</b> takes the place of a noun.",
  ["ex","Priya is a trainer. <sb>She</sb> teaches English.|She = Priya","The batch is ready. <sb>It</sb> starts today.|It = the batch"]),
 learn("Four kinds you need",
  "The same person has different forms. The form depends on the <b>job</b> in the sentence.",
  ["table",["Subject (does it)","Object (receives it)","Before a noun","Alone"],["I","me","my","mine"],["you","you","your","yours"],["he","him","his","his"],["she","her","her","hers"],["it","it","its","—"],["we","us","our","ours"],["they","them","their","theirs"]],
  ["ex","<sb>I</sb> like <ob>her</ob>.|I = subject, her = object","This is <ad>my</ad> pen. That pen is <ad>yours</ad>.|my + noun · yours stands alone"],
  ["warn","Me and Ravi went to the office.","Ravi and I went to the office.","I am the one who did it, so I use the subject form: I."],
  ["tip","<b>Its</b> shows belonging (the dog wagged its tail). <b>It's</b> means “it is”."]),
 mcq("Ravi is my friend. ___ studies with me.",["Him","He","His"],1,"Ravi does the action, so we need the subject form: He."),
 mcq("The manager called ___ yesterday.",["I","me","my"],1,"After a verb, we use the object form: me."),
 mcq("This laptop is not mine. It is ___.",["you","your","yours"],2,"No noun follows, so we use the “alone” form: yours."),
 mcq("The dog wagged ___ tail.",["it","its","it's"],1,"“Its” shows belonging. “It's” would mean “it is”."),
 type("Priya and Ravi are teachers. ___ work in Madurai.","They","Two people, so we use: They.","Not he, not she. Think of two people."),
 find("Tap all the pronouns.","[She] told [me] that [they] will call [us].","She, me, they and us all replace nouns.")
],["Subject forms: <b>I, you, he, she, it, we, they</b>.","Object forms: <b>me, you, him, her, it, us, them</b>.","Before a noun: <b>my, your, his, her, its, our, their</b>.","Alone: <b>mine, yours, his, hers, ours, theirs</b>.","<b>its</b> = belongs to it. <b>it's</b> = it is."]),

L("verbs","Verbs and their forms","V1, V2, V3, -s and -ing",[
 learn("What is a verb?",
  "A <b>verb</b> shows an <b>action</b> (run, eat, write) or a <b>state</b> (be, have, know). Every sentence needs a verb. It is the heart of the sentence.",
  ["ex","Ravi <vb>eats</vb> lunch.|action","The sky <vb>is</vb> blue.|state (the verb be)"]),
 learn("The three forms: V1, V2, V3",
  "Every verb has three forms. These forms build all the tenses, so learn them well.",
  ["table",["V1 (base)","V2 (past)","V3 (past participle)"],["walk","walked","walked"],["play","played","played"],["go","went","gone"],["eat","ate","eaten"],["take","took","taken"],["write","wrote","written"],["see","saw","seen"]],
  "<b>Regular verbs</b> add <b>-ed</b> for V2 and V3. <b>Irregular verbs</b> change in their own way. Learn a few irregular verbs every day."),
 learn("Spelling: -s, -ing and -ed",
  "Small spelling rules, big marks.",
  ["table",["Rule","Example"],["he / she / it: add -s","work → works"],["Ends in s, sh, ch, x, o: add -es","watch → watches · go → goes · fix → fixes"],["Consonant + y: change to -ies","study → studies · try → tries"],["-ing: drop the silent e","make → making · write → writing"],["-ing: short vowel + one consonant: double it","run → running · sit → sitting · stop → stopping"],["-ed: consonant + y becomes -ied","study → studied · carry → carried"],["-ed: ends in e, add d","like → liked"]]),
 type("He ___ every night. (study) Write the correct form.","studies","Consonant + y: change y to -ies.","Change the y"),
 type("They are ___ in the park. (run)","running","Short vowel + one consonant: double the n, then add -ing.","Double the n"),
 type("Priya ___ to the office yesterday. (go) Write the past form.","went","go → went is irregular. Learn it.","It does not end in -ed"),
 match("Match V1 with V3.",[["go","gone"],["take","taken"],["write","written"],["eat","eaten"]],"These are irregular. V3 is used after have, has and had."),
 mcq("What is V3 of “see”?",["saw","seen","seed"],1,"see → saw → seen. V2 is saw. V3 is seen."),
 mcq("I have ___ that film.",["saw","seen","see"],1,"After have we use V3: seen.")
],["V1 = base verb (go). V2 = past (went). V3 = past participle (gone).","Regular verbs add <b>-ed</b>. Irregular verbs must be learned.","he / she / it takes <b>-s</b>: she works.","Double the last letter in short words: run → running.","Consonant + y becomes <b>-ies / -ied</b>."]),

L("adj","Adjectives and adverbs","Describing words",[
 learn("Adjectives describe nouns",
  "An <b>adjective</b> tells us more about a noun: what kind, how many, what colour.",
  ["ex","She is a <ad>kind</ad> trainer.|kind describes trainer","I have <ad>two</ad> <ad>black</ad> bags.|two = how many · black = colour"],
  "Adjectives <b>never change</b> for singular or plural: a big room, two big rooms (never “bigs”).",
  ["tip","Easy order for many adjectives: opinion → size → colour. A <ad>nice</ad> <ad>big</ad> <ad>red</ad> car."]),
 learn("Adverbs tell how, when, where",
  "An <b>adverb</b> usually describes a verb. Many adverbs are the adjective + <b>-ly</b>.",
  ["table",["Adjective","Adverb"],["quick","quickly"],["careful","carefully"],["slow","slowly"],["happy","happily"]],
  "Some adverbs do not end in -ly: <i>fast, hard, late, today, here, very</i>.",
  ["warn","He speaks English good.","He speaks English well.","“Good” is an adjective. “Well” is the adverb for how we do things."],
  "<b>Adverbs of frequency</b> (always, usually, often, sometimes, never) go <b>before</b> the main verb but <b>after</b> am / is / are.",
  ["ex","He <tm>usually</tm> <vb>walks</vb> to office.|before the main verb","Ravi <vb>is</vb> <tm>always</tm> on time.|after be"]),
 find("Tap the adjective.","Meena has a [beautiful] voice.","“Beautiful” describes the noun “voice”."),
 find("Tap the adverb.","The trainer speaks [clearly].","“Clearly” tells how he speaks."),
 mcq("She sings very ___.",["beautiful","beautifully","beauty"],1,"“Sings” is a verb, so we need an adverb: beautifully."),
 mcq("He is a ___ driver.",["careful","carefully","care"],0,"“Driver” is a noun, so we need an adjective: careful."),
 mcq("Which sentence is correct?",["She dances good.","She dances well.","She dances goodly."],1,"Use <b>well</b> to say how we do something."),
 build("I usually drink tea in the morning.","The adverb “usually” goes before the main verb."),
 build("She is always on time.","The adverb “always” goes after “is”.")
],["Adjectives describe nouns and never take -s.","Adverbs describe verbs. Many end in <b>-ly</b>.","<b>good</b> (adjective) · <b>well</b> (adverb).","Frequency words go before the main verb, after am / is / are."]),

L("art","a, an, the","Articles",[
 learn("Three little words",
  "<b>a / an</b> = one thing, when we do not say exactly which one. <b>the</b> = a thing we both know.",
  ["ex","I need <hl>a</hl> pen.|any pen","Please give me <hl>the</hl> pen on the table.|that special pen","She is <hl>an</hl> engineer.|one engineer, not special"]),
 learn("a or an? Listen to the sound",
  "Use <b>an</b> before a vowel <b>sound</b>. Use <b>a</b> before a consonant <b>sound</b>.",
  ["table",["Word","Use","Why"],["apple","an","starts with a vowel sound"],["book","a","consonant sound"],["hour","an","the h is silent: “our”"],["university","a","starts with “yoo”, a consonant sound"],["MBA","an","M says “em”, a vowel sound"]],
  ["tip","Listen to the first <b>sound</b>, not the first letter."]),
 learn("When to use “the”, and when to use nothing",
  ["list","Use <b>the</b> when it is clear which one: <i>Close the door.</i>","Use <b>the</b> for the second time you speak about it: <i>I saw a dog. The dog was big.</i>","Use <b>the</b> for one-of-a-kind things: <i>the sun, the moon, the Internet</i>.","Use <b>no article</b> for general ideas and plurals: <i>I like tea. Dogs are loyal.</i>","Use <b>no article</b> for languages, subjects and meals: <i>I speak English. We had lunch.</i>","Most place names have no article (India, Madurai). Use <b>the</b> for rivers and groups: <i>the Ganga, the USA</i>."]),
 mcq("She is ___ honest girl.",["a","an","the"],1,"“Honest” starts with a silent h, so it sounds like “on-est”. A vowel sound: an."),
 mcq("I have ___ umbrella.",["a","an","the"],1,"“Umbrella” starts with a vowel sound: an."),
 mcq("He studies at ___ university in Chennai.",["a","an","the"],0,"“University” starts with a “yoo” sound. That is a consonant sound: a."),
 mcq("I saw a film yesterday. ___ film was very good.",["A","An","The"],2,"We already spoke about this film, so we say: The film."),
 mcq("___ sun rises in the east.",["A","The","(no article)"],1,"There is only one sun: the sun."),
 mcq("We had ___ lunch at one o'clock.",["a","an","(no article)"],2,"Meals do not take an article: breakfast, lunch, dinner.")
],["<b>a / an</b> = any one. <b>the</b> = one we both know.","<b>an</b> before a vowel <i>sound</i>: an hour, an MBA. <b>a</b> before a consonant sound: a university.","Say <b>the</b> the second time: a dog … the dog.","No article for plurals, general ideas, languages and meals."]),

L("prep","in, on, at","Prepositions of time and place",[
 learn("Prepositions of time",
  "Think of a funnel, from small to big. <b>at</b> = exact time. <b>on</b> = days and dates. <b>in</b> = longer periods.",
  ["table",["Word","Use for","Examples"],["at","clock time, noon, night","at 9 a.m. · at noon · at night"],["on","days and dates","on Monday · on 5 May · on my birthday"],["in","months, years, seasons, parts of the day","in July · in 2026 · in summer · in the morning"]],
  ["warn","I will meet you in Monday.","I will meet you on Monday.","Days always take “on”."],
  ["tip","<b>at</b> = a point · <b>on</b> = a day · <b>in</b> = a long time."]),
 learn("Prepositions of place",
  ["table",["Word","Use for","Examples"],["in","inside something","in the room · in Madurai · in India"],["on","on a surface","on the table · on the wall · on the bus"],["at","a point or a place","at the door · at the bus stop · at work · at home"]],
  "More place words: <b>under</b> (below), <b>between</b> (two things), <b>near</b>, <b>behind</b>, <b>in front of</b>, <b>next to</b>.",
  ["ex","The cat is <hl>under</hl> the table.|below","She sits <hl>between</hl> Ravi and Kumar.|in the middle of two"]),
 learn("Moving, and fixed pairs",
  ["ex","I go <hl>to</hl> office <hl>by</hl> bus.|to = direction · by = transport","She came <hl>from</hl> Chennai.|from = the start","Walk <hl>into</hl> the room.|into = going inside"],
  "Many words always come with one preposition. Learn them as pairs:",
  ["list","good <b>at</b> · interested <b>in</b> · afraid <b>of</b> · depend <b>on</b>","listen <b>to</b> · wait <b>for</b> · look <b>at</b> · married <b>to</b> · different <b>from</b>"]),
 mcq("My class starts ___ 9 a.m.",["in","on","at"],2,"Exact clock time: at."),
 mcq("We have a test ___ Friday.",["in","on","at"],1,"A day: on."),
 mcq("Her birthday is ___ March.",["in","on","at"],0,"A month: in."),
 mcq("The keys are ___ the table.",["in","on","at"],1,"On a surface: on."),
 mcq("I am interested ___ English.",["on","at","in"],2,"Fixed pair: interested in."),
 mcq("She is good ___ maths.",["at","in","on"],0,"Fixed pair: good at."),
 type("He waited ___ the bus for twenty minutes. (one word)","for","Fixed pair: wait for.","Think: wait ___ something")
],["<b>at</b> + clock time. <b>on</b> + day or date. <b>in</b> + month, year, season.","<b>in</b> = inside · <b>on</b> = on a surface · <b>at</b> = a point.","Learn pairs: good at, interested in, afraid of, wait for, listen to."])

]);

MOD("m2","2. Sentence structure","How English sentences are built, from simple to joined.",[

L("svo","Subject, verb, object","The most important rule",[
 learn("The simplest sentence",
  "Most English sentences follow one order: <b>Subject → Verb → Object</b>. In Tamil, Hindi and Telugu the verb usually comes last. In English the verb comes <b>in the middle</b>. This is the most important rule.",
  ["rules",["Order","<sb>Subject</sb> + <vb>Verb</vb> + <ob>Object</ob>"]],
  ["ex","<sb>Priya</sb> <vb>reads</vb> <ob>books</ob>.|who + does + what","<sb>The students</sb> <vb>wrote</vb> <ob>a test</ob>.|who + does + what"],
  ["warn","Priya books reads.","Priya reads books.","The verb comes in the middle, after the subject."]),
 learn("What are they?",
  ["list","<b>Subject</b> = who or what does the action.","<b>Verb</b> = the action.","<b>Object</b> = who or what receives the action."],
  "Some verbs need no object: <i>She sleeps. The baby cried.</i>",
  "Extra information (how, where, when) goes <b>after</b> the object. A simple order is <b>how → where → when</b>.",
  ["ex","<sb>I</sb> <vb>study</vb> <ob>English</ob> <tm>every evening</tm>.|time goes at the end","<sb>We</sb> <vb>met</vb> <ob>the client</ob> <tm>at the office yesterday</tm>.|place, then time"]),
 build("The manager sent an email.","Subject, then verb, then object."),
 build("We study English every evening.","Time goes at the end."),
 build("Ravi drinks tea in the morning.","Subject, verb, object, then time."),
 find("Tap the subject.","[The new trainer] teaches grammar.","The subject is who does the action: the new trainer."),
 find("Tap the object.","Priya wrote [a long report].","The object is what was written: a long report."),
 mcq("Which order is correct?",["Reads Priya books.","Priya reads books.","Priya books reads."],1,"Subject (Priya) → verb (reads) → object (books)."),
 sort("What job does each part do?",["Subject","Verb","Object"],[["The trainer",0],["explains",1],["the lesson",2],["Meena",0],["is writing",1],["an email",2]],"Subject = who. Verb = action. Object = what.")
],["English order: <b>Subject + Verb + Object</b>.","The verb comes in the middle, not at the end.","How, where, when go after the object. Time usually goes last."]),

L("be","The verb be","am, is, are, was, were",[
 learn("am, is, are",
  "<b>Be</b> tells who someone is, what something is like, or where it is.",
  ["table",["Subject","Be","Example"],["I","am","I am a trainer."],["he / she / it","is","She is tired. It is hot."],["we / you / they","are","They are friends."]],
  "Short forms: I'm, he's, she's, it's, we're, you're, they're. In formal writing, the full forms are safer."),
 learn("was and were (past)",
  ["table",["Subject","Be (past)"],["I / he / she / it","was"],["we / you / they","were"]],
  ["ex","I <vb>was</vb> late yesterday.|past of am","They <vb>were</vb> at home.|past of are"],
  "<b>Negative:</b> add <b>not</b>: <i>She is not ready.</i> <b>Question:</b> put <b>be</b> first: <i>Is she ready? Where were they?</i>"),
 learn("The verb must match the subject",
  ["list","<b>One person or thing</b>: <i>She works. The bus stops.</i>","<b>More than one</b>: <i>They work. The buses stop.</i>","<b>Two subjects joined by and</b> are plural: <i>Ravi and Priya are here.</i>","<b>everyone, everybody, someone, nobody, each</b> are singular: <i>Everyone is ready.</i>","<b>There is / There are</b>: look at the noun after it: <i>There is a pen. There are two pens.</i>"]),
 mcq("My brother ___ a doctor.",["am","is","are"],1,"“My brother” = he, so: is."),
 mcq("The students ___ in the classroom.",["is","am","are"],2,"“The students” = they, so: are."),
 mcq("Everyone ___ ready.",["is","are","am"],0,"“Everyone” is singular: is."),
 mcq("Ravi and Priya ___ in the same batch.",["is","are","am"],1,"Two people joined by “and”: are."),
 mcq("There ___ three chairs in the room.",["is","are","am"],1,"Three chairs is plural: There are."),
 mcq("We ___ late yesterday.",["was","were","are"],1,"“We” + past = were."),
 mcq("The trainer ___ the topic every day. (explain)",["explain","explains","explaining"],1,"One person (he / she), so add -s: explains.")
],["I <b>am</b> · he / she / it <b>is</b> · we / you / they <b>are</b>.","Past: I / he / she / it <b>was</b> · we / you / they <b>were</b>.","Negative: be + not. Question: be goes first.","Everyone, everybody, nobody are singular."]),

L("kinds","Kinds of sentences","Statement, question, command, exclamation",[
 learn("Four kinds",
  "A <b>sentence</b> has a subject and a verb and gives a complete idea. It starts with a <b>capital letter</b> and ends with a full stop (.), a question mark (?) or an exclamation mark (!).",
  ["table",["Kind","Job","End","Example"],["Statement","gives information",".","She works in Madurai."],["Question","asks something","?","Do you work here?"],["Command","tells someone to do something",". or !","Open the door, please."],["Exclamation","shows strong feeling","!","What a great day!"]]),
 learn("Capital letters",
  "Use a capital letter for:",
  ["list","the first word of a sentence","the word <b>I</b>","names of people and places: <i>Ravi, Madurai, India</i>","days, months and festivals: <i>Monday, April, Pongal</i>","languages and nationalities: <i>Tamil, English, Indian</i>"]),
 mcq("What kind of sentence is “Close the window, please.”?",["Statement","Question","Command","Exclamation"],2,"It tells someone to do something: a command."),
 mcq("“What a beautiful place!” is a ...",["Statement","Question","Command","Exclamation"],3,"It shows strong feeling: an exclamation."),
 sort("Sort the sentences.",["Statement","Question","Command"],[["Is he ready?",1],["Sit down.",2],["I live in Madurai.",0],["Where do you work?",1],["Please send the file.",2],["She teaches English.",0]],"Questions ask, commands tell, statements give information."),
 mcq("Which sentence is written correctly?",["my friend lives in chennai","My friend lives in chennai.","My friend lives in Chennai."],2,"Capital letters for the first word and for Chennai, and a full stop at the end."),
 mcq("Choose the correct end mark: “Do you like tea___”",[".","?","!"],1,"It is a question, so: ?")
],["Statement (.) · Question (?) · Command (. or !) · Exclamation (!).","Start every sentence with a capital letter.","Capitals for I, names, days, months, languages."]),

L("ques","Making questions","Yes/No and wh- questions",[
 learn("Yes / No questions",
  "A question that can be answered with <b>yes</b> or <b>no</b> starts with a <b>helping verb</b>. Flip the subject and the helper.",
  ["table",["Statement","Question"],["You are ready.","<b>Are</b> you ready?"],["She works here.","<b>Does</b> she work here?"],["They went home.","<b>Did</b> they go home?"],["He can swim.","<b>Can</b> he swim?"]],
  ["warn","Does she works here?","Does she work here?","After do, does, did we use V1 (the plain verb). The -s and -ed move to the helper."]),
 learn("Wh- questions",
  "Put the wh- word first, then make a yes/no question.",
  ["table",["Word","Asks about","Example"],["What","a thing","What do you do?"],["Who","a person","Who is your trainer?"],["Where","a place","Where does she live?"],["When","a time","When did they come?"],["Why","a reason","Why are you late?"],["How","the way","How do you go to office?"],["Which","a choice","Which bus goes to Madurai?"],["Whose","belonging","Whose bag is this?"],["How many / much","number / amount","How many students are there?"]],
  ["rules",["Pattern","<tm>Wh-word</tm> + <vb>helper</vb> + <sb>subject</sb> + V1?"]],
  ["ex","<tm>Where</tm> <vb>do</vb> <sb>you</sb> live?|wh-word, helper, subject, verb"],
  ["tip","When <b>who</b> or <b>what</b> is the subject, there is no do / does / did: <i>Who teaches you?</i> (not “Who does teach you?”)."]),
 build("Where do you live?","Wh-word, helper, subject, verb."),
 build("What time does the class start?","After does, the verb stays plain: start."),
 build("Did they finish the work?","Did + subject + V1."),
 mcq("___ she like coffee?",["Do","Does","Is"],1,"“She” takes does."),
 mcq("Where ___ you go yesterday?",["do","did","were"],1,"Yesterday is past, so: did."),
 mcq("Choose the correct question.",["Where you live?","Where do you live?","Where you do live?"],1,"Wh-word + helper + subject + verb."),
 mcq("Which is correct?",["Who does teach you?","Who teaches you?","Who teach you?"],1,"“Who” is the subject, so there is no helper. Add -s for he / she."),
 match("Match the wh- word to what it asks.",[["Where","a place"],["When","a time"],["Why","a reason"],["Whose","belonging"]],"Learn these four and you can ask most questions.")
],["Yes/No: <b>helper + subject + V1?</b>","Wh-: <b>wh-word + helper + subject + V1?</b>","After do / does / did use the plain verb.","If who / what is the subject, no helper: Who teaches you?"]),

L("neg","Saying “no”","Negatives",[
 learn("Making a sentence negative",
  "Add <b>not</b> after the helping verb. In the present simple and past simple we need <b>do / does / did</b> first.",
  ["table",["Type","Positive","Negative"],["be","She is ready.","She is not ready. (isn't)"],["present simple","They work.","They do not work. (don't)"],["present simple (he/she/it)","He works.","He does not work. (doesn't)"],["past simple","We went.","We did not go. (didn't)"],["can","I can swim.","I cannot swim. (can't)"],["will","I will go.","I will not go. (won't)"],["have","I have finished.","I have not finished. (haven't)"]],
  ["warn","He doesn't likes tea.","He doesn't like tea.","The -s is already used in “does”. After doesn't use the plain verb."]),
 learn("Other negative words",
  ["list","<b>never</b> = not at any time: <i>I never eat fish.</i> (before the main verb)","<b>no</b> + noun: <i>There is no milk.</i>","<b>nobody, nothing, nowhere</b>: <i>Nobody came.</i>"],
  ["warn","I don't know nothing.","I don't know anything. (or: I know nothing.)","Use only <b>one</b> negative word in a sentence."]),
 mcq("She ___ like spicy food.",["don't","doesn't","isn't"],1,"“She” takes doesn't."),
 mcq("They ___ come to the class yesterday.",["don't","didn't","aren't"],1,"Yesterday is past, so: didn't."),
 mcq("I ___ seen that film.",["haven't","don't","not"],0,"With seen (V3) we need have / has: haven't."),
 type("Make it negative. “He plays cricket.” Type the full sentence.",["He doesn't play cricket.","He does not play cricket."],"Does not + plain verb: He doesn't play cricket.","Start with: He doesn't ..."),
 mcq("Choose the correct sentence.",["I don't have no time.","I don't have any time.","I haven't no time."],1,"Use only one negative word. Use “any” after a negative."),
 build("She did not go to office yesterday.","Did not + V1."),
 find("Tap the word that makes it negative.","He [never] eats fish.","“Never” is a negative word. It goes before the main verb.")
],["Add <b>not</b> after the helper: is not, do not, does not, did not, will not.","After doesn't / didn't use the plain verb.","Only one negative word in a sentence.","<b>never</b> goes before the main verb."]),

L("join","Joining sentences","and, but, so, because, although",[
 learn("Little words that join",
  "<b>Conjunctions</b> join words or sentences. Start with these:",
  ["table",["Word","Job","Example"],["and","adds","I like tea and coffee."],["but","shows a difference","I am tired, but I will finish."],["or","a choice","Do you want tea or coffee?"],["so","result","It rained, so we stayed home."],["because","reason","We stayed home because it rained."],["although","a surprise","Although it rained, we went out."],["when","time","Call me when you reach."],["if","condition","If you study, you will pass."]],
  ["warn","Because I was ill, so I stayed home.","Because I was ill, I stayed home. (or: I was ill, so I stayed home.)","Use <b>because</b> OR <b>so</b>. Never both in one sentence."]),
 learn("Simple, compound, complex",
  ["list","<b>Simple</b>: one idea. <i>I study.</i>","<b>Compound</b>: two ideas joined by and / but / or / so. <i>I study, and she works.</i>","<b>Complex</b>: one main idea and one that depends on it (because, although, when, if). <i>I study because I want a good job.</i>"],
  ["tip","Put a comma before <b>and, but, so</b> when you join two full sentences. If the <b>because / although / if</b> part comes first, put a comma after it."]),
 mcq("I like tea, ___ I don't like coffee.",["so","but","because"],1,"A difference: but."),
 mcq("It was cold, ___ I wore a sweater.",["so","but","although"],0,"A result: so."),
 mcq("I stayed at home ___ I was sick.",["so","because","but"],1,"A reason: because."),
 mcq("___ he studied hard, he failed the test.",["Because","Although","So"],1,"A surprise: Although."),
 mcq("Choose the correct sentence.",["Although he was tired, but he worked.","Although he was tired, he worked.","He was tired, although but he worked."],1,"Use “although” OR “but”, not both."),
 build("I was tired, so I went to bed early.","Reason first, then the result with so."),
 sort("What does each word show?",["Reason","Result","Difference"],[["because",0],["so",1],["but",2],["although",2]],"because = reason · so = result · but / although = difference.")
],["<b>and</b> adds · <b>but</b> and <b>although</b> show a difference · <b>so</b> shows a result · <b>because</b> shows a reason.","Never use because and so together.","Never use although and but together.","Comma before and / but / so between two full sentences."])

]);


})();
