import json
from pathlib import Path
from typing import List, Union, Dict, Optional, Tuple


class PromptBuilder:
    """Builds LLM prompts from templates and context chunks.

    Features:
    - Loads `templates.json` (system prompt, context template, role prompts).
    - `build_prompt(query, context_chunks, user_role, template_type, max_tokens)`
    - Formats context chunks with source citations.
    - Injects role-specific instructions.
    - Limits context to a max token estimate.
    - Includes internal templates for QA, summarization, comparison.
    """

    def __init__(self, templates_path: Optional[Union[str, Path]] = None, token_limit: int = 2048):
        if templates_path is None:
            # Default to ../config/templates.json relative to this file
            templates_path = Path(__file__).resolve().parent.parent / "config" / "templates.json"
        self.templates_path = Path(templates_path)
        self.token_limit = int(token_limit)
        self._load_templates()

        # Internal templates for common prompt types
        self.internal_templates = {
            "qa": "{system}\n\n{role}\n\nUse only the context below and cite sources for any claims.\n\n{context_section}\n\nQUESTION: {query}\n\nANSWER:",
            "summarize": "{system}\n\n{role}\n\nSummarize the following context concisely and cite sources.\n\n{context_section}\n\nSUMMARY:",
            "compare": "{system}\n\n{role}\n\nCompare the items below using the provided context and cite sources for each comparison point.\n\n{context_section}\n\nCOMPARISON:",
        }

    def _load_templates(self) -> None:
        try:
            with open(self.templates_path, "r", encoding="utf-8") as f:
                self.templates_json = json.load(f)
        except Exception:
            # Fallback minimal structure
            self.templates_json = {
                "system_prompt": "",
                "context_template": "CONTEXT:\n{context}\n\nQUESTION: {query}\n\nANSWER:",
                "role_prompts": {},
            }

    @staticmethod
    def _estimate_tokens(text: str) -> int:
        # Simple whitespace token estimation (fast, no external deps)
        return max(1, len(text.split()))

    @staticmethod
    def _normalize_chunk(chunk: Union[str, Dict, Tuple, List]) -> Tuple[str, str]:
        # Accepts: raw string, (text, source), or {'text':..., 'source':...}
        if isinstance(chunk, str):
            return chunk, "unknown"
        if isinstance(chunk, (list, tuple)) and len(chunk) >= 1:
            text = str(chunk[0])
            source = str(chunk[1]) if len(chunk) > 1 else "unknown"
            return text, source
        if isinstance(chunk, dict):
            text = str(chunk.get("text", ""))
            source = str(chunk.get("source", chunk.get("source_id", "unknown")))
            return text, source
        return str(chunk), "unknown"

    def _format_context(self, context_chunks: List[Union[str, Dict, Tuple, List]], max_context_tokens: int) -> str:
        parts: List[str] = []
        used_tokens = 0
        for i, chunk in enumerate(context_chunks, start=1):
            text, source = self._normalize_chunk(chunk)
            formatted = f"[{i}] {text}\nSOURCE: {source}\n"
            tcount = self._estimate_tokens(formatted)
            if used_tokens + tcount > max_context_tokens:
                # If nothing added yet and single chunk is too large, truncate by characters
                if used_tokens == 0:
                    # rough char-based truncate keeping word boundaries
                    words = formatted.split()
                    allowed = max(10, int(max_context_tokens * 0.75))
                    parts.append(" ".join(words[:allowed]) + "\n[TRUNCATED]\n")
                    used_tokens += allowed
                break
            parts.append(formatted)
            used_tokens += tcount
        return "\n".join(parts).strip()

    def build_prompt(
        self,
        query: str,
        context_chunks: List[Union[str, Dict, Tuple, List]],
        user_role: Optional[str] = None,
        template_type: str = "qa",
        max_tokens: Optional[int] = None,
    ) -> str:
        """Construct the prompt string for the LLM.

        - `context_chunks` should be an ordered list (most relevant first).
        - `user_role` injects role-specific instructions if present in `templates.json`.
        - `template_type` selects one of: 'qa', 'summarize', 'compare'.
        - `max_tokens` overrides the default token limit.
        """
        token_limit = int(max_tokens) if max_tokens is not None else self.token_limit

        # Reserve a token buffer for question and wrapper text (approximate)
        reserved = 200
        max_context_tokens = max(32, token_limit - reserved)

        context_section = self._format_context(context_chunks, max_context_tokens)

        system = self.templates_json.get("system_prompt", "")
        role_prompts = self.templates_json.get("role_prompts", {})
        role = role_prompts.get(user_role, "") if user_role else ""

        template = self.internal_templates.get(template_type, self.internal_templates["qa"])

        prompt = template.format(system=system, role=role, context_section=context_section, query=query)

        # If templates.json provides a context_template, use it for QA-like wrapping
        context_template = self.templates_json.get("context_template")
        if template_type == "qa" and context_template:
            # Replace the CONTEXT placeholder inside the context_template
            wrapped = context_template.format(context=context_section, query=query)
            prompt = f"{system}\n\n{role}\n\n{wrapped}"

        return prompt


if __name__ == "__main__":
    # Quick local demo
    pb = PromptBuilder()
    chunks = [
        {"text": "The Q1 financials show revenue growth of 5%.", "source": "finance/Q1_report.md"},
        ("Employee handbook section on leave", "hr/handbook.md"),
    ]
    prompt = pb.build_prompt("What changed in revenue?", chunks, user_role="finance", template_type="qa")
    print(prompt)
