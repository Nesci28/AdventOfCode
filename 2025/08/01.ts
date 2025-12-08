import { LodashUtil, MathUtil } from "@yest/utils";
import { readFile } from "fs/promises";

type Distance = { hash: string; distance: number };

type Point = {
  x: number;
  y: number;
  z: number;
  hash: string;
  distances: Distance[];
  circuit: Set<string>;
};

type Edge = {
  p1Index: number;
  p2Index: number;
  distance: number;
};

type Input = Point[];

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "sample.txt" : "input.txt"))
    .toString()
    .trim();

  const inputs = rawInput.split("\n").map((i) => {
    const [x, y, z] = i.split(",");
    const hash = `${x}-${y}-${z}`;
    const set = new Set<string>().add(hash);
    return { x: +x, y: +y, z: +z, hash, distances: [], circuit: set };
  });

  return inputs;
}

function calculateDistance(point1: Point, point2: Point): number {
  const { x: x1, y: y1, z: z1 } = point1;
  const { x: x2, y: y2, z: z2 } = point2;
  const part1 = (x2 - x1) ** 2;
  const part2 = (y2 - y1) ** 2;
  const part3 = (z2 - z1) ** 2;
  const final = Math.sqrt(part1 + part2 + part3);
  return final;
}

function buildEdges(points: Input): Edge[] {
  const edges: Edge[] = [];

  for (let i = 0; i < points.length - 1; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const distance = calculateDistance(points[i], points[j]);
      edges.push({ p1Index: i, p2Index: j, distance });
    }
  }

  edges.sort((a, b) => a.distance - b.distance);
  return edges;
}

function unionCircuits(p1: Point, p2: Point, pointByHash: Map<string, Point>) {
  if (p1.circuit === p2.circuit) {
    return;
  }

  const union = new Set<string>([...p1.circuit, ...p2.circuit]);

  // assign this exact Set object to every point in the union
  for (const hash of union) {
    const pt = pointByHash.get(hash);
    if (!pt) continue;
    pt.circuit = union;
  }
}

(async () => {
  const inputs = await parse();
  const pointByHash = new Map<string, Point>();
  for (let i = 0; i < inputs.length; i += 1) {
    const point = inputs[i];
    pointByHash.set(point.hash, point);
  }
  const edges = buildEdges(inputs);

  const repetition = 1000;
  for (let i = 0; i < repetition && i < edges.length; i += 1) {
    const edge = edges[i];
    const point1 = inputs[edge.p1Index];
    const point2 = inputs[edge.p2Index];

    unionCircuits(point1, point2, pointByHash);
  }

  const totalCircuits = new Set<string>();
  for (let i = 0; i < inputs.length; i += 1) {
    const point = inputs[i];
    const circuitHash = [...point.circuit].sort().join("|");
    totalCircuits.add(circuitHash);
  }

  const arr = [...totalCircuits]
    .map((x) => {
      return x.split("|");
    })
    .sort((a, b) => {
      return b.length - a.length;
    });
  const [circuit1, circuit2, circuit3, ...rest] = arr;
  const total = MathUtil.multiply(
    circuit1.length,
    circuit2.length,
    circuit3.length
  );

  console.log("total :>> ", total);
  process.exit(0);
})();
