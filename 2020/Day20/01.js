const rawInputs = require("./inputs");

const inputs = rawInputs.split("\n\n").map((tile) => {
  const lines = tile.split("\n");
  const id = +lines[0].split(" ")[1].replace(":", "");
  lines.shift();
  return {
    id,
    tile: lines,
    sides: extractEdges(lines),
    matches: [],
  };
});

function extractEdges(tile) {
  const result = [
    tile[0],
    tile[tile.length - 1],
    tile.map((x) => x[0]).join(""),
    tile.map((x) => x[x.length - 1]).join(""),
  ];

  return result.concat(result.map((edge) => [...edge].reverse().join("")));
}

function matchingTiles(tile1, tile2) {
  for (let i = 0; i < tile1.sides.length; i++) {
    const edge1 = tile1.sides[i];
    for (let j = 0; j < tile2.sides.length; j++) {
      const edge2 = tile2.sides[j];
      if (edge1 === edge2) {
        return edge1;
      }
    }
  }

  return false;
}

for (let i = 0; i < inputs.length - 1; i++) {
  const tile1 = inputs[i];
  for (let j = i + 1; j < inputs.length; j++) {
    const tile2 = inputs[j];
    const match = matchingTiles(tile1, tile2);
    if (match) {
      tile1.matches.push({ id: tile2.id, edge: match });
      tile2.matches.push({ id: tile1.id, edge: match });
    }
  }
}

const counter = inputs.reduce(
  (accu, curr) => (curr.matches.length === 2 ? accu * curr.id : accu),
  1
);

console.log("counter :>> ", counter);
