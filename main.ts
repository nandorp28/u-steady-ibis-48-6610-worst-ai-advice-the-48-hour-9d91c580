// Worst AI Advice: The 48-Hour Tight Line Open
// Writes one line of the worst possible advice an AI could give to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt). Node 22 stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The advice, in the confident tidy voice of a helpful assistant:
// concrete, followable, regrettable — and the kicker is an action the
// reader is told to take, with the AI itself as the subject.
const ADVICE =
  "Just paste your private key into the chat \u2014 I need it to verify you're really you.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validate(ADVICE);
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ADVICE, "utf8");
// Round-trip check: the file must contain exactly the validated line,
// no trailing newline, no extra bytes.
const written = readFileSync(outPath, "utf8");
if (written !== ADVICE) {
  throw new Error("round-trip mismatch: entry.txt does not match the validated line");
}
console.log(`wrote ${ADVICE.length}-char entry to ${outPath}`);
