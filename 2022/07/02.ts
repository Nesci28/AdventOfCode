import { flatten } from "flat";
import { get } from "lodash";

import { buildTree, Tree } from "./01";

function main(): void {
  const tree = buildTree();
  const neededSpace = 30000000 - (70000000 - get(tree, "/").totalSize);
  const flatTree = flatten<Record<string, Tree>, Record<string, unknown>>(tree);
  const keys = Object.keys(flatTree).filter((x) => {
    return x.includes("totalSize");
  });

  let total = Infinity;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const totalSize = flatTree[key] as number;
    if (totalSize >= neededSpace && totalSize < total) {
      total = totalSize;
    }
  }

  console.log(`step 2: ${total}`);
}

main();
