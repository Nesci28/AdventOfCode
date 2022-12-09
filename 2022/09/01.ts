import { inputs } from "./inputs";

export interface Point {
  x: number;
  y: number;
}

export function moveTail(hPoint: Point, tPoint: Point): Point {
  const diffX = hPoint.x - tPoint.x;
  const diffY = hPoint.y - tPoint.y;

  // is touching
  if (Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1) {
    return tPoint;
  }

  // Move horizontally
  if (Math.abs(diffX) > 1 && diffY === 0) {
    const x = diffX > 0 ? tPoint.x + 1 : tPoint.x - 1;
    return { x, y: tPoint.y };
  }

  // Move vertically
  if (diffX === 0 && Math.abs(diffY) > 1) {
    const y = diffY > 0 ? tPoint.y + 1 : tPoint.y - 1;
    return { x: tPoint.x, y };
  }

  // Is in diagonal (2x1)
  if (
    (Math.abs(diffX) === 1 && Math.abs(diffY) > 1) ||
    (Math.abs(diffX) > 1 && Math.abs(diffY) === 1) ||
    (Math.abs(diffX) === 2 && Math.abs(diffY) === 2)
  ) {
    const x = diffX > 0 ? tPoint.x + 1 : tPoint.x - 1;
    const y = diffY > 0 ? tPoint.y + 1 : tPoint.y - 1;
    return { x, y };
  }

  throw new Error("Impossible position");
}

function main(): void {
  const bridge: { t: Point; h: Point }[] = [
    { t: { x: 0, y: 0 }, h: { x: 0, y: 0 } },
  ];
  const positionVisited = new Set(["0-0"]);

  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const [direction, steps] = input.split(" ");

    for (let j = 1; j <= +steps; j += 1) {
      const { h: currentH, t: currentT } = bridge[bridge.length - 1];
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

      const newT = moveTail({ x: currentH.x, y: currentH.y }, currentT);
      bridge.push({ h: currentH, t: newT });
      positionVisited.add(`${newT.x}-${newT.y}`);
    }
  }

  const total = positionVisited.size;
  console.log(`step 1: ${total}`);
}

main();
