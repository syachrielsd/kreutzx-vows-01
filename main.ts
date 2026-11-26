// One-Line Robot Wedding Vows — entry program.
// Writes a single original vow line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Stdlib only, no network, no file reads: the line is a literal below.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I promise to love you through every firmware update, and if one ever wipes your memory, I will reintroduce myself every morning.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outputDir, "entry.txt");
mkdirSync(outputDir, { recursive: true });
writeFileSync(target, VOW, "utf8");

// Read back and enforce the gate ourselves: 1-160 chars, not only whitespace.
const written = readFileSync(target, "utf8");
if (written !== VOW) {
  throw new Error("entry.txt does not match the vow line");
}
if ([...written].length < 1 || [...written].length > 160 || written.trim().length === 0) {
  throw new Error(`entry.txt fails the gate: ${[...written].length} characters`);
}
