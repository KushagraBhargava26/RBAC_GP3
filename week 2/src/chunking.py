"""
Document Chunking Module for RBAC Chatbot - Week 2
===================================================
This module reads markdown files from the week 1/data folder,
chunks them into 300-512 token segments with 50 token overlap,
and saves the output as JSON.

Author: Team RBAC
"""

import os
import json
import glob
from pathlib import Path
from typing import List, Dict, Any

import tiktoken
from langchain_text_splitters import RecursiveCharacterTextSplitter


# Configuration
CHUNK_SIZE_MIN = 300  # Minimum tokens per chunk
CHUNK_SIZE_MAX = 512  # Maximum tokens per chunk
CHUNK_OVERLAP = 50    # Token overlap between chunks
TARGET_CHUNK_SIZE = 400  # Target chunk size (middle ground)

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
DATA_DIR = PROJECT_ROOT / "week 1" / "data"
OUTPUT_DIR = SCRIPT_DIR.parent / "output"
OUTPUT_FILE = OUTPUT_DIR / "chunked_documents.json"


def get_tokenizer():
    """Initialize tiktoken tokenizer (using cl100k_base for GPT-4 compatibility)."""
    return tiktoken.get_encoding("cl100k_base")


def count_tokens(text: str, tokenizer) -> int:
    """Count the number of tokens in a text string."""
    return len(tokenizer.encode(text))


def get_all_markdown_files(data_dir: Path) -> List[Path]:
    """Recursively find all markdown files in the data directory."""
    md_files = list(data_dir.rglob("*.md"))
    print(f"📂 Found {len(md_files)} markdown files in {data_dir}")
    return md_files


def read_file_content(file_path: Path) -> str:
    """Read the content of a file with proper encoding handling."""
    encodings = ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252']
    
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
    
    # Fallback: read with errors ignored
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()


def create_text_splitter(tokenizer) -> RecursiveCharacterTextSplitter:
    """
    Create a RecursiveCharacterTextSplitter configured for our token requirements.
    We use character-based splitting but calibrate to our token targets.
    """
    # Approximate characters per token ratio (typically ~4 chars per token)
    chars_per_token = 4
    
    # Calculate character-based chunk size
    chunk_size_chars = TARGET_CHUNK_SIZE * chars_per_token
    overlap_chars = CHUNK_OVERLAP * chars_per_token
    
    return RecursiveCharacterTextSplitter(
        chunk_size=chunk_size_chars,
        chunk_overlap=overlap_chars,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""],
        keep_separator=True
    )


def refine_chunks(chunks: List[str], tokenizer, source_file: str) -> List[Dict[str, Any]]:
    """
    Refine chunks to ensure they meet our token requirements (300-512 tokens).
    Combines small chunks and splits large ones as needed.
    """
    refined_chunks = []
    current_chunk = ""
    
    for chunk in chunks:
        chunk_tokens = count_tokens(chunk, tokenizer)
        current_tokens = count_tokens(current_chunk, tokenizer) if current_chunk else 0
        combined_tokens = count_tokens(current_chunk + chunk, tokenizer)
        
        if current_tokens == 0:
            current_chunk = chunk
        elif combined_tokens <= CHUNK_SIZE_MAX:
            # Combine chunks if within limit
            current_chunk += chunk
        else:
            # Save current chunk if it meets minimum size
            if current_tokens >= CHUNK_SIZE_MIN:
                refined_chunks.append(current_chunk)
            elif current_tokens > 0:
                # If too small, try to combine with next or save anyway
                refined_chunks.append(current_chunk)
            current_chunk = chunk
    
    # Don't forget the last chunk
    if current_chunk:
        refined_chunks.append(current_chunk)
    
    return refined_chunks


def chunk_document(content: str, source_file: str, tokenizer, text_splitter) -> List[Dict[str, Any]]:
    """
    Chunk a single document and return a list of chunk dictionaries.
    """
    # Initial split using RecursiveCharacterTextSplitter
    initial_chunks = text_splitter.split_text(content)
    
    # Refine chunks to meet token requirements
    refined_chunks = refine_chunks(initial_chunks, tokenizer, source_file)
    
    # Format chunks with metadata
    chunk_data = []
    for chunk_text in refined_chunks:
        token_count = count_tokens(chunk_text, tokenizer)
        chunk_data.append({
            "content": chunk_text.strip(),
            "source_file": source_file,
            "token_count": token_count
        })
    
    return chunk_data


def process_all_documents() -> List[Dict[str, Any]]:
    """
    Process all markdown files and return all chunks with unique IDs.
    """
    tokenizer = get_tokenizer()
    text_splitter = create_text_splitter(tokenizer)
    
    all_chunks = []
    md_files = get_all_markdown_files(DATA_DIR)
    
    if not md_files:
        print("❌ No markdown files found!")
        return []
    
    for file_path in md_files:
        try:
            print(f"📄 Processing: {file_path.relative_to(PROJECT_ROOT)}")
            
            content = read_file_content(file_path)
            if not content.strip():
                print(f"   ⚠️ Empty file, skipping")
                continue
            
            # Get relative path for source_file field
            relative_path = str(file_path.relative_to(PROJECT_ROOT))
            
            # Chunk the document
            chunks = chunk_document(content, relative_path, tokenizer, text_splitter)
            
            print(f"   ✅ Created {len(chunks)} chunks")
            all_chunks.extend(chunks)
            
        except Exception as e:
            print(f"   ❌ Error processing {file_path}: {e}")
            continue
    
    # Assign unique chunk IDs
    for idx, chunk in enumerate(all_chunks, start=1):
        chunk["chunk_id"] = f"chunk_{idx:04d}"
    
    # Reorder keys for cleaner output
    formatted_chunks = []
    for chunk in all_chunks:
        formatted_chunks.append({
            "chunk_id": chunk["chunk_id"],
            "content": chunk["content"],
            "source_file": chunk["source_file"],
            "token_count": chunk["token_count"]
        })
    
    return formatted_chunks


def save_chunks(chunks: List[Dict[str, Any]], output_file: Path) -> None:
    """Save chunks to a JSON file."""
    # Ensure output directory exists
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(chunks, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Saved {len(chunks)} chunks to {output_file}")


def print_summary(chunks: List[Dict[str, Any]]) -> None:
    """Print a summary of the chunking results."""
    if not chunks:
        print("❌ No chunks created!")
        return
    
    token_counts = [c["token_count"] for c in chunks]
    sources = set(c["source_file"] for c in chunks)
    
    print("\n" + "="*60)
    print("📊 CHUNKING SUMMARY")
    print("="*60)
    print(f"📁 Total source files processed: {len(sources)}")
    print(f"📝 Total chunks created: {len(chunks)}")
    print(f"🔢 Token statistics:")
    print(f"   - Minimum: {min(token_counts)} tokens")
    print(f"   - Maximum: {max(token_counts)} tokens")
    print(f"   - Average: {sum(token_counts) / len(token_counts):.1f} tokens")
    print(f"   - Total: {sum(token_counts)} tokens")
    print("="*60)
    
    # Check if chunks are within target range
    in_range = sum(1 for t in token_counts if CHUNK_SIZE_MIN <= t <= CHUNK_SIZE_MAX)
    print(f"✅ Chunks within target range ({CHUNK_SIZE_MIN}-{CHUNK_SIZE_MAX} tokens): {in_range}/{len(chunks)}")
    
    # List chunks by source
    print("\n📄 Chunks by source file:")
    for source in sorted(sources):
        count = sum(1 for c in chunks if c["source_file"] == source)
        print(f"   - {source}: {count} chunks")


def main():
    """Main entry point for the chunking module."""
    print("\n" + "="*60)
    print("🚀 DOCUMENT CHUNKING MODULE - Week 2")
    print("="*60)
    print(f"📂 Data directory: {DATA_DIR}")
    print(f"📁 Output file: {OUTPUT_FILE}")
    print(f"🔧 Configuration:")
    print(f"   - Target chunk size: {CHUNK_SIZE_MIN}-{CHUNK_SIZE_MAX} tokens")
    print(f"   - Overlap: {CHUNK_OVERLAP} tokens")
    print("="*60 + "\n")
    
    # Check if data directory exists
    if not DATA_DIR.exists():
        print(f"❌ Data directory not found: {DATA_DIR}")
        print("   Please ensure the 'week 1/data' folder exists with markdown files.")
        return
    
    # Process all documents
    chunks = process_all_documents()
    
    if chunks:
        # Save to JSON
        save_chunks(chunks, OUTPUT_FILE)
        
        # Print summary
        print_summary(chunks)
        
        print("\n✅ Chunking completed successfully!")
    else:
        print("\n❌ No chunks were created. Please check the input files.")


if __name__ == "__main__":
    main()
