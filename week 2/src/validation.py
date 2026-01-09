"""
Validation script for tagged_chunks.json

Validations:
1. Token count check: 300–512 tokens per chunk (using tiktoken)
2. Metadata check: 'department' and 'accessible_roles' present
3. Role check: 'accessible_roles' is not empty
4. Content check: content is not empty

Outputs:
- ../output/validation_results.json
- Prints summary to console

If tiktoken is not installed:
    pip install tiktoken
"""

import json
import os
import sys
from typing import List, Dict, Any

# --- Ensure tiktoken is available ---
try:
    import tiktoken
except ImportError:
    print("tiktoken not found. Install it using: pip install tiktoken")
    sys.exit(1)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_PATH = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "output", "tagged_chunks.json"))
OUTPUT_PATH = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "output", "validation_results.json"))

MIN_TOKENS = 300
MAX_TOKENS = 512


# ---------------- AUTO-CREATE SAMPLE ----------------
def auto_create_sample_input(path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)

    sample_text = (
        "This is a sample RBAC documentation chunk used for validation purposes. "
        "It describes access control policies, role permissions, and department-level "
        "security responsibilities within an enterprise system. "
    ) * 30  # ~320–350 tokens

    sample_data = [
        {
            "chunk_id": 1,
            "content": sample_text,
            "department": "IT",
            "accessible_roles": ["admin", "manager"]
        }
    ]

    with open(path, "w", encoding="utf-8") as f:
        json.dump(sample_data, f, indent=2, ensure_ascii=False)

    print(f"[INFO] Auto-created sample input at: {os.path.abspath(path)}")


# ---------------- LOAD CHUNKS ----------------
def load_chunks(path: str) -> List[Dict[str, Any]]:
    if not os.path.exists(path):
        print(f"[WARNING] Input file not found: {path}")
        print("[INFO] Creating sample tagged_chunks.json...")
        auto_create_sample_input(path)

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def get_token_count(text: str, encoder) -> int:
    if not text:
        return 0
    return len(encoder.encode(text))


# ---------------- VALIDATION ----------------
def validate_chunks(chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
    encoder = tiktoken.get_encoding("cl100k_base")

    issues = []
    passed = 0
    failed = 0

    for idx, chunk in enumerate(chunks):
        chunk_id = chunk.get("chunk_id", idx)
        chunk_issues = []

        # Content check
        content = chunk.get("content", "")
        if not isinstance(content, str) or not content.strip():
            chunk_issues.append(("empty_content", "Content is empty or missing"))

        # Token count check
        token_count = get_token_count(content, encoder)
        if token_count < MIN_TOKENS or token_count > MAX_TOKENS:
            chunk_issues.append((
                "token_count",
                f"Token count {token_count} not in range {MIN_TOKENS}-{MAX_TOKENS}"
            ))

        # Metadata checks
        if "department" not in chunk:
            chunk_issues.append(("missing_metadata", "Missing 'department'"))

        if "accessible_roles" not in chunk:
            chunk_issues.append(("missing_metadata", "Missing 'accessible_roles'"))
        else:
            roles = chunk.get("accessible_roles")
            if not isinstance(roles, list) or not roles:
                chunk_issues.append(("invalid_roles", "'accessible_roles' is empty or invalid"))

        # Aggregate
        if chunk_issues:
            failed += 1
            for issue_type, details in chunk_issues:
                issues.append({
                    "chunk_id": chunk_id,
                    "issue_type": issue_type,
                    "details": details
                })
        else:
            passed += 1

    return {
        "total_chunks": len(chunks),
        "passed": passed,
        "failed": failed,
        "issues": issues
    }


# ---------------- OUTPUT ----------------
def save_results(results: Dict[str, Any], path: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)


def print_summary(results: Dict[str, Any]) -> None:
    print("\n=== Validation Summary ===")
    print(f"Total chunks : {results['total_chunks']}")
    print(f"Passed       : {results['passed']}")
    print(f"Failed       : {results['failed']}")
    print(f"Issue count  : {len(results['issues'])}")


# ---------------- MAIN ----------------
def main():
    chunks = load_chunks(INPUT_PATH)
    results = validate_chunks(chunks)
    save_results(results, OUTPUT_PATH)
    print_summary(results)


if __name__ == "__main__":
    main()
