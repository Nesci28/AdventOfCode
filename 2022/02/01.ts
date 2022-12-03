import { inputs } from "./inputs";

interface Mapping {
  X: MappingInner;
  Y: MappingInner;
  Z: MappingInner;
}

interface MappingInner {
  name: string;
  points: number;
  win: string;
  draw: string;
}

function createMapping(): Mapping {
  const mapping = {
    X: {
      name: "rock",
      points: 1,
      win: "C",
      draw: "A",
      lose: "B",
    },
    Y: {
      name: "paper",
      points: 2,
      win: "A",
      draw: "B",
      lose: "C",
    },
    Z: {
      name: "scissors",
      points: 3,
      win: "B",
      draw: "C",
      lose: "A",
    },
  };
  return mapping;
}

export function step1(): number {
  const mappings = createMapping();

  let total = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const [opponent, myself] = input;
    const mapping = mappings[myself as keyof Mapping];
    const { points, win, draw } = mapping;
    total += points;
    if (win === opponent) {
      total += 6;
    }
    if (draw === opponent) {
      total += 3;
    }
  }

  console.log(`step 1: ${total}`);
  return total;
}

step1();
