const fs = require("fs");

const [player1, player2] = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((x) => +x.split(": ")[1]);

const results = {
  player1: {
    score: 0,
    position: player1,
  },
  player2: {
    score: 0,
    position: player2,
  },
  diceRolls: 0,
};

let diceValue = 0;
let currentPlaying = "player1";

while (results.player1.score < 1000 && results.player2.score < 1000) {
  results.diceRolls += 3;
  diceValue = (diceValue + 3) % 100 === 0 ? 100 : (diceValue + 3) % 100;
  const value = diceValue * 3 - 3;
  const tile = (results[currentPlaying].position + value);
  const score = tile % 10 === 0 ? 10 : tile % 10;
  results[currentPlaying].score += score;
  results[currentPlaying].position = score;
  currentPlaying = currentPlaying === "player1" ? "player2" : "player1";
}

const total = Math.min(results.player1.score, results.player2.score) * results.diceRolls;
console.log("total :>> ", total);
