# Preprocessing QA Report

## Summary statistics

- Total chunks: 1
- Passed: 0
- Failed: 1

## Issues Found

- Chunk 1 — **token_count**: Token count 961 not in range 300–512

_Note: `tagged_chunks.json` was not present; the validator auto-created a sample input to demonstrate checks._

## Recommendations

- Regenerate chunking so individual chunks fall within 300–512 tokens (adjust chunk size or overlap).
- Re-run `src/validation.py` after updating `output/tagged_chunks.json`.
- Ensure each chunk includes `department` and non-empty `accessible_roles` metadata.
- Remove or fix any empty-content chunks before tagging.

## Next steps

- Replace the auto-created `output/tagged_chunks.json` with real tagged chunks from the pipeline.
- Re-run validation and iterate until `failed` is 0.
