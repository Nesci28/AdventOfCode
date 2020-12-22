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

function recursiveCombat(player1, player2) {
  const history = new Set();
  while (player1.length > 0 && player2.length > 0) {
    const state = `${player1.join(",")}#${player2.join(",")}`;
    if (history.has(state)) {
      return {
        roundWinner: 1,
        deck: player1,
      };
    }
    history.add(state);

    const card1 = player1.shift();
    const card2 = player2.shift();

    let winner;
    if (player1.length >= card1 && player2.length >= card2) {
      const nextPlayer1 = player1.slice(0, card1);
      const nextPlayer2 = player2.slice(0, card2);
      const { roundWinner } = recursiveCombat(nextPlayer1, nextPlayer2);
      winner = roundWinner;
    } else {
      winner = card1 > card2 ? 1 : 2;
    }
    if (winner === 1) {
      player1.push(card1);
      player1.push(card2);
    } else {
      player2.push(card2);
      player2.push(card1);
    }
  }
  return {
    roundWinner: player1.length > 0 ? 1 : 2,
    deck: player1.length > 0 ? player1 : player2,
  };
}

const { deck } = recursiveCombat(player1, player2);

const counter = deck
  .reverse()
  .reduce((accu, curr, i) => (accu += curr * (i + 1)), 0);
console.log("counter :>> ", counter);
