class CitationSystem:
    def __init__(self):
        self.citation_map = {}
        self.sources = []

    def generate_citations(self, retrieved_chunks):
        """
        Takes retrieved chunks and generates:
        - text with inline citations
        - formatted sources list
        """

        response_text = ""
        citation_number = 1

        for chunk in retrieved_chunks:
            chunk_id = chunk["chunk_id"]
            text = chunk["text"]
            meta = chunk["metadata"]

            # Assign citation number if not already assigned
            if chunk_id not in self.citation_map:
                self.citation_map[chunk_id] = citation_number

                source_entry = (
                    f"[{citation_number}] "
                    f"{meta['department']}/"
                    f"{meta['source_file']} - "
                    f"{meta['section']} "
                    f"(chunk_id: {chunk_id})"
                )

                self.sources.append(source_entry)
                citation_number += 1

            citation_id = self.citation_map[chunk_id]

            # Append text with citation
            response_text += f"{text} [{citation_id}] "

        return {
            "text_with_citations": response_text.strip(),
            "sources_list": "Sources:\n" + "\n".join(self.sources)
        }


# ------------------ SAMPLE RUN ------------------
if __name__ == "__main__":
    retrieved_chunks = [
        {
            "chunk_id": "c1",
            "text": "According to the Q4 report, revenue increased by 15%.",
            "metadata": {
                "source_file": "quarterly_report.md",
                "department": "Finance",
                "section": "Section 3"
            }
        },
        {
            "chunk_id": "c2",
            "text": "Customer satisfaction improved significantly.",
            "metadata": {
                "source_file": "customer_report.md",
                "department": "Marketing",
                "section": "Section 2"
            }
        }
    ]

    cs = CitationSystem()
    output = cs.generate_citations(retrieved_chunks)

    print(output["text_with_citations"])
    print()
    print(output["sources_list"])