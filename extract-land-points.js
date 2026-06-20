const fs = require('fs');
const path = require('path');

const file = 'C:\\Users\\umer.imran\\.cursor\\projects\\d-figma\\agent-transcripts\\166b00bf-64e6-491b-802e-071161d3e568\\166b00bf-64e6-491b-802e-071161d3e568.jsonl';
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
const line = lines[358];
if (!line) {
  console.error('Line 359 not found');
  process.exit(1);
}
const obj = JSON.parse(line);
const text = obj.message.content[0].text;
const marker = 'const LAND_POINTS = ';
const idx = text.indexOf(marker);
if (idx === -1) {
  console.error('LAND_POINTS not found');
  process.exit(1);
}
let start = idx + marker.length;
while (text[start] !== '[') start++;
let depth = 0;
let end = start;
for (let i = start; i < text.length; i++) {
  const c = text[i];
  if (c === '[') depth++;
  else if (c === ']') {
    depth--;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}
const arrStr = text.slice(start, end);
const arr = JSON.parse(arrStr);
const outPath = 'd:\\figma\\public\\globe-land-points.json';
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(arr));
console.log('POINT_COUNT=' + arr.length);
console.log('FILE_CREATED=yes');
