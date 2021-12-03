const _ = require("lodash");
const inputs = require("./inputs.js");

function calculateMostBits(arr, index) {
  const arrIndex = arr.map((x) => (+x[index] === 1 ? 1 : -1));
  const total = _.sum(arrIndex);

  return total;
}

function getRatings(type) {
  let rest = inputs;
  for (let i = 0; i < inputs[0].length; i += 1) {
    const bit = calculateMostBits(rest, i);
    rest = rest.filter(
      (x) => ((type === "oxygen" && bit >= 0) || (type === "co2" && bit < 0)
        ? x[i] === "1"
        : x[i] === "0"),
    );
    if (rest.length === 1) {
      return rest;
    }
  }

  return rest;
}

const oxygenRating = parseInt(getRatings("oxygen")[0], 2);
const co2Rating = parseInt(getRatings("co2")[0], 2);

const total = oxygenRating * co2Rating;
console.log("total :>> ", total);
