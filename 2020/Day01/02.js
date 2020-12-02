const inputs = require("./inputs");

for (let i = 0; i < inputs.length; i++) {
  const firstEl = inputs[i];
  for (let j = i + 1; j < inputs.length; j++) {
    const secondEl = inputs[j];
    for (let x = j + 1; x < inputs.length; x++) {
      const thirdEl = inputs[x];
      if (firstEl + secondEl + thirdEl === 2020) {
        console.log(firstEl * secondEl * thirdEl);
      }
    }
  }
}
