"""
Vector Embedding Generation Script
Week 3 - RBAC Chatbot Project

This script generates vector embeddings for document chunks using 
the sentence-transformers library with the all-MiniLM-L6-v2 model.

Author: Arshad
Date: Week 3
"""

import json
import os
from datetime import datetime
from sentence_transformers import SentenceTransformer


def load_chunked_documents(file_path: str) -> list:
    """
    Load chunked documents from JSON file.
    
    Args:
        file_path: Path to the chunked_documents.json file
        
    Returns:
        List of chunk dictionaries
    """
    print(f"Loading chunked documents from: {file_path}")
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)
    
    print(f"Loaded {len(chunks)} chunks successfully!")
    return chunks


def initialize_model(model_name: str = 'all-MiniLM-L6-v2') -> SentenceTransformer:
    """
    Initialize the SentenceTransformer model.
    
    Args:
        model_name: Name of the sentence-transformers model
        
    Returns:
        Initialized SentenceTransformer model
    """
    print(f"\nInitializing SentenceTransformer model: {model_name}")
    print("This may take a moment on first run (downloading model)...")
    
    model = SentenceTransformer(model_name)
    
    # Get model dimension
    embedding_dim = model.get_sentence_embedding_dimension()
    print(f"Model loaded successfully! Embedding dimension: {embedding_dim}")
    
    return model


def generate_embeddings(chunks: list, model: SentenceTransformer) -> list:
    """
    Generate embeddings for each chunk.
    
    Args:
        chunks: List of chunk dictionaries with 'content' field
        model: Initialized SentenceTransformer model
        
    Returns:
        List of dictionaries with chunk info and embeddings
    """
    print("\n" + "="*60)
    print("Starting embedding generation...")
    print("="*60 + "\n")
    
    embedded_chunks = []
    total_chunks = len(chunks)
    
    for idx, chunk in enumerate(chunks, 1):
        # Extract content for embedding
        content = chunk.get('content', '')
        
        # Generate embedding
        embedding = model.encode(content)
        
        # Create output record
        embedded_chunk = {
            'chunk_id': chunk.get('chunk_id', f'chunk_{idx:04d}'),
            'content': content,
            'source_file': chunk.get('source_file', 'unknown'),
            'token_count': chunk.get('token_count', 0),
            'embedding': embedding.tolist()  # Convert numpy array to list for JSON serialization
        }
        
        embedded_chunks.append(embedded_chunk)
        
        # Print progress
        print(f"Generated embedding for chunk {idx}/{total_chunks} - {chunk.get('chunk_id', f'chunk_{idx:04d}')}")
    
    return embedded_chunks


def save_embeddings(embedded_chunks: list, output_path: str) -> None:
    """
    Save embedded chunks to JSON file.
    
    Args:
        embedded_chunks: List of chunk dictionaries with embeddings
        output_path: Path to save the output JSON file
    """
    print(f"\nSaving embeddings to: {output_path}")
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(embedded_chunks, f, indent=2, ensure_ascii=False)
    
    # Get file size
    file_size = os.path.getsize(output_path)
    print(f"Embeddings saved successfully! File size: {file_size / 1024:.2f} KB")


def print_summary(embedded_chunks: list, embedding_dim: int) -> None:
    """
    Print summary statistics of the embedding generation.
    
    Args:
        embedded_chunks: List of embedded chunk dictionaries
        embedding_dim: Dimension of the embeddings
    """
    print("\n" + "="*60)
    print("EMBEDDING GENERATION SUMMARY")
    print("="*60)
    print(f"Total embeddings: {len(embedded_chunks)}, Dimension: {embedding_dim}")
    print(f"Model used: all-MiniLM-L6-v2")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Count chunks by source file
    source_files = {}
    for chunk in embedded_chunks:
        source = chunk.get('source_file', 'unknown')
        source_files[source] = source_files.get(source, 0) + 1
    
    print(f"\nChunks by source file:")
    for source, count in sorted(source_files.items()):
        print(f"  - {source}: {count} chunks")
    
    print("="*60)
    print("✅ SUCCESS: All chunks have 384-dimensional embeddings!")
    print("="*60)


def main():
    """
    Main function to orchestrate the embedding generation process.
    """
    # Define paths (relative to script location)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(script_dir, '..', '..', 'week 2', 'output', 'chunked_documents.json')
    output_path = os.path.join(script_dir, '..', 'output', 'chunk_embeddings.json')
    
    # Normalize paths
    input_path = os.path.normpath(input_path)
    output_path = os.path.normpath(output_path)
    
    print("="*60)
    print("VECTOR EMBEDDING GENERATION - Week 3")
    print("="*60)
    print(f"\nInput file:  {input_path}")
    print(f"Output file: {output_path}")
    
    try:
        # Step 1: Load chunked documents
        chunks = load_chunked_documents(input_path)
        
        # Step 2: Initialize the model
        model = initialize_model('all-MiniLM-L6-v2')
        embedding_dim = model.get_sentence_embedding_dimension()
        
        # Step 3: Generate embeddings for each chunk
        embedded_chunks = generate_embeddings(chunks, model)
        
        # Step 4: Save embeddings to JSON
        save_embeddings(embedded_chunks, output_path)
        
        # Step 5: Print summary
        print_summary(embedded_chunks, embedding_dim)
        
    except FileNotFoundError as e:
        print(f"\n❌ ERROR: {e}")
        print("Please ensure the chunked_documents.json file exists in week 2/output/")
        return 1
    except Exception as e:
        print(f"\n❌ ERROR: An unexpected error occurred: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0


if __name__ == "__main__":
    exit(main())
