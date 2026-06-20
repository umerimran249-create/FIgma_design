"""Extract LAND_POINTS from agent transcript into lib/globe-land-points.json."""
import json
import re
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\umer.imran\.cursor\projects\d-figma\agent-transcripts"
    r"\166b00bf-64e6-491b-802e-071161d3e568"
    r"\166b00bf-64e6-491b-802e-071161d3e568.jsonl"
)
OUT = Path(__file__).resolve().parent.parent / "public" / "globe-land-points.json"


def extract_array(text: str) -> str:
    marker = "const LAND_POINTS = "
    start = text.rfind(marker)
    if start == -1:
        raise ValueError("LAND_POINTS not found")
    i = start + len(marker)
    if text[i] != "[":
        raise ValueError("Expected [ after LAND_POINTS =")
    depth = 0
    for j in range(i, len(text)):
        ch = text[j]
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return text[i : j + 1]
    raise ValueError("Unclosed LAND_POINTS array")


def main() -> None:
    html = ""
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if "const LAND_POINTS =" in line and '"role":"user"' in line:
            obj = json.loads(line)
            html = obj["message"]["content"][0]["text"]
    if not html:
        raise SystemExit("No user message with LAND_POINTS found")

    raw = extract_array(html)
    points = json.loads(raw)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(points), encoding="utf-8")
    print(f"Wrote {len(points)} points to {OUT}")


if __name__ == "__main__":
    main()
