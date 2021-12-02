const inputs = require("./inputs");

const obj = {
  depth: 0,
  horizontal: 0,
}

for (const input of inputs) {
  const [direction, steps] = input.split(" ");
  if (direction === "forward") {
    obj.horizontal += +steps;
  }
  if (direction === "up") {
    obj.depth -= +steps;
  }
  if (direction === "down") {
    obj.depth += +steps;
  }
}

const res = obj.horizontal * obj.depth;
console.log('res :>> ', res);