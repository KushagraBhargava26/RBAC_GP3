"""Markdown parser for Week 2.

Recursively finds .md files under '../week 1/data', extracts metadata
and writes a JSON file to '../output/parsed_markdown.json'.

Extracted fields:
 - filename
 - filepath (absolute)
 - title (first '# ' heading)
 - headings (all '## ' headings)
 - content (full file)
 - department (Finance, HR, marketing, engineering, general)

Prints progress for each parsed file: 'Parsed: filename.md'
Uses glob for discovery and UTF-8 encoding with fallback.
"""

import json
import re
from glob import glob
from pathlib import Path
from typing import List, Dict

DEPARTMENTS = {"finance", "hr", "marketing", "engineering", "general"}


def find_markdown_files(root: Path) -> List[Path]:
    pattern = str(root / "**" / "*.md")
    return [Path(p) for p in glob(pattern, recursive=True)]


def read_file(p: Path) -> str:
    try:
        return p.read_text(encoding="utf-8")
    except Exception:
        return p.read_text(encoding="latin-1", errors="ignore")


def extract_title(text: str) -> str:
    m = re.search(r"(?m)^\s*#\s+(.*)$", text)
    if m:
        return m.group(1).strip()
    # Fallback: first non-empty line
    for line in text.splitlines():
        if line.strip():
            return line.strip()
    return ""


def extract_section_headings(text: str) -> List[str]:
    return [h.strip() for h in re.findall(r"(?m)^\s*##\s+(.*)$", text)]


def get_department(path: Path) -> str:
    for parent in path.parents:
        if parent.name.lower() in DEPARTMENTS:
            return parent.name
    return "unknown"


def parse_markdown_file(path: Path) -> Dict:
    text = read_file(path)
    return {
        "filename": path.name,
        "filepath": str(path.resolve()),
        "title": extract_title(text),
        "headings": extract_section_headings(text),
        "content": text,
        "department": get_department(path)
    }


def main():
    project_root = Path(__file__).resolve().parents[2]
    data_dir = project_root / "week 1" / "data"
    out_dir = project_root / "week 2" / "output"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "parsed_markdown.json"

    md_files = sorted(find_markdown_files(data_dir))

    parsed = []
    for p in md_files:
        parsed.append(parse_markdown_file(p))
        print(f"Parsed: {p.name}")

    with out_file.open("w", encoding="utf-8") as f:
        json.dump(parsed, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(parsed)} parsed markdown documents to {out_file}")


if __name__ == "__main__":
    main()

