import { readFile } from "fs/promises";
import { cloneDeep, isEqual, pull } from "lodash";

type Direction = "^" | "v" | ">" | "<";
type Value = "." | "#" | "^" | "v" | ">" | "<";
type Position = { x: number; y: number; value: Value; isVisited: boolean };

async function parse(): Promise<Position[]> {
  const rawInput = (await readFile("./input.txt")).toString();
  const input = rawInput.split("\n").map((x) => {
    return x.split("");
  });

  const inputs: Position[] = [];
  for (let y = 0; y < input.length; y += 1) {
    const line = input[y];
    for (let x = 0; x < line.length; x += 1) {
      const cell = line[x] as Value;
      const i: Position = {
        x,
        y,
        value: cell,
        isVisited: false,
      };
      inputs.push(i);
    }
  }

  return inputs;
}

const coords = {
  "^": {
    move: [0, -1],
    turns: [
      { move: [1, 0], direction: ">" },
      { move: [0, 1], direction: "v" },
      { move: [-1, 0], direction: "<" },
    ],
  },
  v: {
    move: [0, 1],
    turns: [
      { move: [-1, 0], direction: "<" },
      { move: [0, -1], direction: "^" },
      { move: [1, 0], direction: ">" },
    ],
  },
  ">": {
    move: [1, 0],
    turns: [
      { move: [0, 1], direction: "v" },
      { move: [-1, 0], direction: "<" },
      { move: [0, -1], direction: "^" },
    ],
  },
  "<": {
    move: [-1, 0],
    turns: [
      { move: [0, -1], direction: "^" },
      { move: [1, 0], direction: ">" },
      { move: [0, 1], direction: "v" },
    ],
  },
};

function findInitialPosition(inputs: Position[]): Position {
  const initialPosition = inputs.find((x) => {
    return x.value === "^";
  });
  if (!initialPosition) {
    throw new Error("Missing initialPosition");
  }
  initialPosition.isVisited = true;

  return initialPosition;
}

function move(position: Position, input: Position[]): Position | undefined {
  try {
    const { move, turns } = coords[position.value as Direction];

    const newMoveX = position.x + move[0];
    const newMoveY = position.y + move[1];
    const newMovePosition = input.find((x) => {
      return x.x === newMoveX && x.y === newMoveY;
    });
    if (!newMovePosition) {
      return;
    }

    if (newMovePosition.value === ".") {
      newMovePosition.value = position.value;
      newMovePosition.isVisited = true;
      position.value = ".";
      return newMovePosition;
    }

    for (let i = 0; i < turns.length; i += 1) {
      const turn = turns[i];
      const newTurnX = position.x + turn.move[0];
      const newTurnY = position.y + turn.move[1];
      const newTurnPosition = input.find((x) => {
        return x.x === newTurnX && x.y === newTurnY;
      });
      if (!newTurnPosition) {
        return;
      }

      if (newTurnPosition.value === ".") {
        position.value = ".";
        newTurnPosition.isVisited = true;
        newTurnPosition.value = turn.direction as Direction;
        return newTurnPosition;
      }
    }
  } catch {
    throw new Error("wtf");
  }
}

(async () => {
  const input = await parse();
  const clonedInput = cloneDeep(input);

  const initialPosition = findInitialPosition(input);
  let movedPos = move(initialPosition, input);
  while (movedPos) {
    movedPos = move(movedPos, input);
  }

  let total = 0;
  const visits = input.filter((x) => {
    return x.isVisited && !isEqual(x, initialPosition);
  });

  for (let i = 0; i < visits.length; i += 1) {
    console.log(`current index: ${i} / ${visits.length}`);
    const clonedDeepInput = cloneDeep(clonedInput);
    const initPosition = findInitialPosition(clonedDeepInput);
    const visit = visits[i];
    const foundIndex = clonedDeepInput.findIndex((x) => {
      return x.x === visit.x && x.y === visit.y;
    });
    if (foundIndex === -1) {
      throw new Error("Wtf");
    }

    clonedDeepInput[foundIndex].value = "#";

    const sets = new Set();
    let movedPos = move(initPosition, clonedDeepInput);
    while (movedPos) {
      const bSize = sets.size;
      sets.add(`${movedPos.x}${movedPos.y}${movedPos.value}`);
      const aSize = sets.size;
      if (bSize === aSize) {
        total += 1;
        break;
      }
      movedPos = move(movedPos, clonedDeepInput);
    }
  }

  console.log("total :>> ", total);
})();
