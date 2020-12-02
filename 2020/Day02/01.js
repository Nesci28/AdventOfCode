const inputs = require("./inputs.js");

let valid = 0;
for (const input of inputs) {
  const limits = input[0].split("-");
  const [limitLower, limitHigher] = limits;

  const letter = Object.keys(input[1])[0];
  const password = Object.values(input[1])[0];

  const reg = new RegExp(letter, "gi");
  let repeated;
  try {
    repeated = password.match(reg, "").length;
  } catch (_) {
    continue;
  }

  if (repeated >= limitLower && repeated <= limitHigher) {
    valid = valid + 1;
  }
}
console.log("valid :>> ", valid);
