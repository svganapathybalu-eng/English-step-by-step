# Adding or editing lessons

All content lives in `content/`. Open any file there and copy a lesson as a pattern.

## A lesson

```js
L('id-no-spaces', 'Title', 'One line about the lesson', [
  learn('Step title', 'Paragraph with <sb>subject</sb> <vb>verb</vb> <ob>object</ob>.',
    ['ex', 'She <vb>works</vb> in Madurai.|Meaning or note'],
    ['tip', 'A short memory trick.']),
  mcq('She ___ tea every day.', ['drink', 'drinks'], 1, 'With she, add s.', 'Why the other one is wrong.'),
  type('Write the past of go.', ['went'], 'Go becomes went.', 'Starts with w'),
  build('I work in Madurai', 'Subject, verb, place.'),
], ['Key point 1', 'Key point 2'])
```

Step helpers: `learn reveal mcq build type find sort match say talk` (see `content/api.js` for the argument order).
Colour tags in text: `<sb>` subject, `<vb>` verb, `<ob>` object, `<ad>` adjective, `<tm>` time word, `<hl>` highlight.
Speaking sentences are added to every lesson automatically from its `ex` examples.

## A new module

Make `content/06-name.js`, copy the wrapper from `04-more-basics.js`, call `MOD('m6', 'Title', 'blurb', [ ...lessons ])`, then add one line to `index.html` **and** `dashboard/index.html`:
`<script src="content/06-name.js"></script>` (use `../content/...` in the dashboard). Add the file to the list in `sw.js` only if you want it cached early (optional).

## A speaking set

In `content/05-speaking-lab.js`: `SET('id', 'Title', 'blurb', 'pron' or 'talk', [ say(...), say(...) ], ['key point'])`.
Talking task: `talk('Tell me about your day.', { must: [['\\bevery\\b', 'Say how often.']], model: ['I wake up at six every day.'], tips: 'Use present simple.', min: 6 })`.
`must` is a list of `[regex, praise, tip]`.

## Before uploading

Run `node tools/check-content.js`. It finds wrong answer numbers, empty steps and duplicate ids.
Keep lesson ids the same once scholars have started, or their ticks will reset.
