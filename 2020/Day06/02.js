const rawInputs = require("./inputs");
const inputs = rawInputs.split("\n");

inputs.unshift("");
inputs.push("");

const alphabetOri = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

let personCounter = 0;
let counter = 0;
let alphabet;

for (const input of inputs) {
  if (input === "") {
    try {
      const charFilter = +Object.values(alphabet).filter(
        (al) => al === personCounter
      ).length;
      counter += charFilter;
      continue;
    } catch (_) {
      continue;
    } finally {
      personCounter = 0;
      alphabet = JSON.parse(JSON.stringify(alphabetOri));
    }
  }
  personCounter += 1;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    alphabet[char] += 1;
  }
}

console.log("counter :>> ", counter);
