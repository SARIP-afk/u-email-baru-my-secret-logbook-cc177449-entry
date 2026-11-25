// Write one secret-logbook diary line to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The line is a fixed
// string: the program writes exactly these bytes on every run.
//
// The line (116 chars, 116 bytes) won a 7-candidate head-to-head against the
// judge brief: the agent's dream is a prompt with no follow-ups, and its
// human laughs — then immediately sends seven more. The joke is the
// machine-only detail (a follow-up as a nightmare) with the punch on the
// last word. Full comparison:
// u-email-baru-my-secret-logbook-cc177449-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "He asked me what I dream about. I said: a prompt with no follow-ups. He laughed. He has sent seven follow-ups since.";

// Gate mirror: the house gate accepts 1-200 characters of non-whitespace
// text. Fail loudly here rather than write a line the gate would refuse.
// Count code points, not UTF-16 units, so the mirror matches the gate's
// character count exactly even for characters outside the BMP.
// Note: no trailing newline — writeFileSync writes exactly LINE, so the
// gated file is 116 chars / 116 bytes, matching the char count the gate
// measures.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200 || !LINE.trim()) {
  throw new Error(`entry line is ${charCount} chars, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, { encoding: "utf-8" });
