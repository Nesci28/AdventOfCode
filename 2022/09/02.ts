import { moveTail, Point } from "./01";
import { inputs } from "./inputs";

// const util = require("util");

// const logFile = createWriteStream(`${__dirname}/debug.log`, { flags: "w" });
// const logStdout = process.stdout;

// console.log = (d: string): void => {
//   logFile.write(`${util.format(d)}\n`);
//   logStdout.write(`${util.format(d)}\n`);
// };

interface Bridge {
  h: Point;
  "1": Point;
  "2": Point;
  "3": Point;
  "4": Point;
  "5": Point;
  "6": Point;
  "7": Point;
  "8": Point;
  "9": Point;
}

function main(): void {
  const bridge: Bridge[] = [
    {
      h: { x: 0, y: 0 },
      "1": { x: 0, y: 0 },
      "2": { x: 0, y: 0 },
      "3": { x: 0, y: 0 },
      "4": { x: 0, y: 0 },
      "5": { x: 0, y: 0 },
      "6": { x: 0, y: 0 },
      "7": { x: 0, y: 0 },
      "8": { x: 0, y: 0 },
      "9": { x: 0, y: 0 },
    },
  ];
  const positionVisited = new Set(["0-0"]);

  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const [direction, steps] = input.split(" ");

    for (let j = 1; j <= +steps; j += 1) {
      // Move the HEAD

      const { h: currentH } = bridge[bridge.length - 1];

      if (direction === "L") {
        currentH.x -= 1;
      }

      if (direction === "R") {
        currentH.x += 1;
      }

      if (direction === "D") {
        currentH.y -= 1;
      }

      if (direction === "U") {
        currentH.y += 1;
      }

      const res1 = { ...bridge[bridge.length - 1], h: currentH };
      bridge.push(res1);

      // Move the TAILS
      for (let k = 1; k <= 9; k += 1) {
        const keyH = k === 1 ? "h" : (k - 1).toString();
        const keyT = k.toString();

        const lastElement = bridge[bridge.length - 1];
        const currentF = lastElement[keyH as keyof Bridge];
        const currentT = lastElement[keyT as keyof Bridge];

        const newT = moveTail(currentF, currentT);
        const res = { ...lastElement, [keyT]: newT };
        bridge.push(res);

        if (k === 9) {
          positionVisited.add(`${newT.x}-${newT.y}`);
        }
      }
    }
  }

  const total = positionVisited.size;
  console.log(`step 2: ${total}`);
}

main();
