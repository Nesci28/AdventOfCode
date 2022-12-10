import { chunk } from "lodash";

import { cmdMap } from "./01";
import { inputs } from "./inputs";

function main(): void {
  let sprite = 1;
  let cycle = 0;
  const crt: string[] = [];

  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const [cmd, nbr] = input.split(" ");

    for (let j = 1; j <= cmdMap[cmd]; j += 1) {
      cycle = cycle === 40 ? 1 : cycle + 1;

      cycle >= sprite && cycle <= sprite + 2 ? crt.push("#") : crt.push(".");
      if (j === cmdMap[cmd] && nbr) {
        sprite += +nbr;
      }
    }
  }

  const chunks = chunk(crt, 40);
  chunks.forEach((x) => {
    console.log(x.join(""));
  });
}

main();
