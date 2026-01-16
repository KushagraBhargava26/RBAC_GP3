import re
import json
import os
from typing import Dict, List, Set


class QueryProcessor:
    """
    Query processor for preprocessing and expanding search queries.
    Handles abbreviation expansion, synonym expansion, and keyword extraction.
    """

    def __init__(self, config_path: str = None):
        """
        Initialize QueryProcessor with synonyms configuration.
        
        Args:
            config_path: Path to synonyms.json config file
        """
        if config_path is None:
            # Default to synonyms.json in the config folder
            current_dir = os.path.dirname(os.path.abspath(__file__))
            config_path = os.path.join(current_dir, '..', 'config', 'synonyms.json')
        
        self.config = self._load_config(config_path)
        self.abbreviations = self.config.get('abbr', {})
        self.synonyms = self.config.get('synonyms', {})

    def _load_config(self, config_path: str) -> Dict:
        """Load configuration from JSON file."""
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: Config file not found at {config_path}")
            return {'abbr': {}, 'synonyms': {}}

    def preprocess(self, query: str) -> str:
        """
        Preprocess query by:
        - Converting to lowercase
        - Removing special characters except basic punctuation
        - Normalizing whitespace
        - Expanding abbreviations
        
        Args:
            query: Input query string
            
        Returns:
            Processed query string
        """
        original = query
        
        # Convert to lowercase
        query = query.lower()
        
        # Expand abbreviations before removing characters
        query = self._expand_abbreviations(query)
        
        # Remove special characters except basic punctuation (., ?, -, ')
        query = re.sub(r'[^\w\s\.\?\-\']', '', query)
        
        # Normalize whitespace
        query = re.sub(r'\s+', ' ', query).strip()
        
        # Print original and processed
        print(f"Original: {original} → Processed: {query}")
        
        return query

    def _expand_abbreviations(self, query: str) -> str:
        """
        Expand abbreviations in the query.
        
        Args:
            query: Query string
            
        Returns:
            Query with expanded abbreviations
        """
        for abbr, expansion in self.abbreviations.items():
            # Match abbreviation as whole word (case-insensitive)
            pattern = r'\b' + re.escape(abbr) + r'\b'
            query = re.sub(pattern, expansion, query, flags=re.IGNORECASE)
        
        return query

    def extract_keywords(self, query: str) -> List[str]:
        """
        Extract keywords from query using simple NLP.
        Removes common stop words and extracts meaningful terms.
        
        Args:
            query: Query string
            
        Returns:
            List of extracted keywords
        """
        # Common stop words
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
            'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
            'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
            'these', 'those', 'what', 'which', 'who', 'why', 'how'
        }
        
        # Split by whitespace and punctuation
        words = re.findall(r'\w+', query.lower())
        
        # Filter out stop words and extract keywords
        keywords = [word for word in words if word not in stop_words and len(word) > 2]
        
        return list(set(keywords))  # Remove duplicates

    def expand_synonyms(self, query: str) -> List[str]:
        """
        Expand query with synonyms for better matching.
        Returns a list of expanded query variations.
        
        Args:
            query: Query string
            
        Returns:
            List of query variations with synonyms
        """
        variations = [query]
        keywords = self.extract_keywords(query)
        
        # For each keyword, check if it has synonyms
        for keyword in keywords:
            if keyword in self.synonyms:
                # Create variations with each synonym
                for synonym in self.synonyms[keyword]:
                    variation = re.sub(r'\b' + keyword + r'\b', synonym, query, flags=re.IGNORECASE)
                    variations.append(variation)
        
        return variations

    def process(self, query: str) -> Dict[str, any]:
        """
        Complete query processing pipeline.
        
        Args:
            query: Input query string
            
        Returns:
            Dictionary with processed query and related information
        """
        processed = self.preprocess(query)
        keywords = self.extract_keywords(processed)
        expanded = self.expand_synonyms(processed)
        
        return {
            'original': query,
            'processed': processed,
            'keywords': keywords,
            'expanded_variations': expanded
        }


if __name__ == '__main__':
    # Example usage
    processor = QueryProcessor()
    
    # Test queries
    test_queries = [
        "What was the Q1 2024 profit?",
        "Show me HR policies and guidelines",
        "Find revenue and earnings reports"
    ]
    
    for test_query in test_queries:
        result = processor.process(test_query)
        print(f"Keywords: {result['keywords']}")
        print(f"Expanded variations: {result['expanded_variations']}")
        print("-" * 60)
