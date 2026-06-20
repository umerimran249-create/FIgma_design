import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const transcriptDir = path.join(
  process.env.USERPROFILE || process.env.HOME || "",
  ".cursor/projects/d-figma/agent-transcripts"
);

function extractArray(text) {
  const marker = "const LAND_POINTS = ";
  const start = text.lastIndexOf(marker);
  if (start === -1) throw new Error("LAND_POINTS not found");
  let i = start + marker.length;
  if (text[i] !== "[") throw new Error("Expected [ after LAND_POINTS =");
  let depth = 0;
  for (let j = i; j < text.length; j++) {
    const ch = text[j];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return text.slice(i, j + 1);
    }
  }
  throw new Error("Unclosed LAND_POINTS array");
}

function findHtmlInTranscripts() {
  if (!fs.existsSync(transcriptDir)) return "";
  const files = fs.readdirSync(transcriptDir, { recursive: true });
  for (const rel of files) {
    if (typeof rel !== "string" || !rel.endsWith(".jsonl")) continue;
    const file = path.join(transcriptDir, rel);
    const stat = fs.statSync(file);
    if (!stat.isFile() || stat.size < 100_000) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      if (line.includes("const LAND_POINTS =")) return line;
    }
  }
  return "";
}

const line = findHtmlInTranscripts();
if (!line) {
  console.error("No transcript line containing LAND_POINTS found.");
  process.exit(1);
}

const obj = JSON.parse(line);
const html = obj.message?.content?.[0]?.text ?? "";
const raw = extractArray(html);
const points = JSON.parse(raw);

const outDir = path.join(root, "public");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "globe-land-points.json");
fs.writeFileSync(outFile, JSON.stringify(points));
console.log(`Wrote ${points.length} points to ${outFile}`);
