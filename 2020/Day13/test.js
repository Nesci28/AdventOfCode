const inputs = require("./inputs_sample");

inputs;

function parseBuses(line) {
  return line
    .split(",")
    .map((b, bi) => [+b, bi])
    .filter(([b]) => !isNaN(b));
}

function winGoldCoin(buses) {
  let time = buses[0][0];
  let step = buses[0][0];
  for (let i = 1; i < buses.length; i++) {
    const [busId, index] = buses[i];
    while ((time + index) % busId !== 0) {
      time += step;
    }
    step = step * busId;
  }
  return time;
}

console.log("parseBuses(inputs[1]) :>> ", winGoldCoin(parseBuses(inputs[1])));
