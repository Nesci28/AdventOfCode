const rawInputs = require("./inputs");

let [player1, player2] = rawInputs.split("\n\n");
player1 = player1
  .split("\n")
  .map((l, i) => (i !== 0 ? +l : undefined))
  .filter(Boolean);
player2 = player2
  .split("\n")
  .map((l, i) => (i !== 0 ? +l : undefined))
  .filter(Boolean);

while (player1.length > 0 && player2.length > 0) {
  if (player1[0] > player2[0]) {
    player1.push(player1[0]);
    player1.push(player2[0]);
  } else if (player2[0] > player1[0]) {
    player2.push(player2[0]);
    player2.push(player1[0]);
  }
  player1.shift();
  player2.shift();
}

const res = player1.length > 0 ? player1 : player2;
const counter = res
  .reverse()
  .reduce((accu, curr, i) => (accu += curr * (i + 1)), 0);
console.log("counter :>> ", counter);
