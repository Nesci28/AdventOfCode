import { inputs } from "./inputs";

interface Point {
  A: number;
  B: number;
  C: number;
  X: number;
  Y: number;
  Z: number;
}

interface Mapping {
  X: MappingInner;
  Y: MappingInner;
  Z: MappingInner;
}

interface MappingInner {
  A: string;
  B: string;
  C: string;
}

function createMapping(): { mappings: Mapping; points: Point } {
  const points = {
    A: 1,
    B: 2,
    C: 3,
    X: 0,
    Y: 3,
    Z: 6,
  };

  const mappings = {
    X: {
      A: "C",
      B: "A",
      C: "B",
    },
    Y: {
      A: "A",
      B: "B",
      C: "C",
    },
    Z: {
      A: "B",
      B: "C",
      C: "A",
    },
  };
  return { mappings, points };
}

export function step2(): number {
  const { mappings, points } = createMapping();

  let total = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const [opponent, status] = input;

    const gamePoint = points[status as keyof typeof mappings];
    total += gamePoint;

    const conversion =
      mappings[status as keyof Mapping][opponent as keyof MappingInner];
    const point = points[conversion as keyof Point];
    total += point;
  }

  console.log(`step 2: ${total}`);
  return total;
}

step2();
