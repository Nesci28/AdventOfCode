const inputs = require("./inputs");

const timestamp = +inputs[0];

const busIds = inputs[1].split(",").filter((e) => e !== "x");
const departures = {};

for (const busId of busIds) {
  let departure = +busId;
  while (departure <= timestamp) {
    departure += +busId;
  }
  departures[busId] = departure;
}

let smallestDiff = Infinity;
let busId;

Object.entries(departures).forEach((entry) => {
  const diff = entry[1] - timestamp;
  if (diff < smallestDiff) {
    smallestDiff = diff;
    busId = entry[0];
  }
});

console.log("counter :>> ", +busId * smallestDiff);
