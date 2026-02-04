import json
import os
from typing import Dict, List, Any


class ConfidenceScorer:
    """
    Calculates confidence scores for retrieved chunks based on multiple factors.
    
    Factors considered:
    - Average similarity score
    - Number of sources
    - Content specificity
    - Recency (if timestamps available)
    """
    
    def __init__(self, config_path: str = None):
        """
        Initialize the ConfidenceScorer with weights and thresholds.
        
        Args:
            config_path: Path to scoring_weights.json configuration file
        """
        if config_path is None:
            # Default config path
            config_path = os.path.join(
                os.path.dirname(__file__), 
                '..', 'config', 'scoring_weights.json'
            )
        
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        
        self.similarity_weight = self.config['similarity_weight']
        self.source_count_weight = self.config['source_count_weight']
        self.recency_weight = self.config['recency_weight']
        self.specificity_weight = self.config['specificity_weight']
        self.thresholds = self.config['thresholds']
    
    def calculate_specificity(self, chunks: List[Dict[str, Any]]) -> float:
        """
        Calculate content specificity based on chunk details.
        Higher specificity = more detailed/specific content.
        
        Args:
            chunks: List of retrieved chunks
            
        Returns:
            Specificity score (0-1)
        """
        if not chunks:
            return 0.0
        
        total_specificity = 0.0
        for chunk in chunks:
            # Consider content length as indicator of specificity
            content_length = len(chunk.get('content', ''))
            # Normalize: assume good specificity starts at 100 chars, max at 1000
            specificity = min(1.0, content_length / 1000)
            
            # Check for detailed indicators (code blocks, lists, etc.)
            content = chunk.get('content', '')
            if any(indicator in content for indicator in ['```', '- ', '* ', '1. ']):
                specificity = min(1.0, specificity + 0.2)
            
            total_specificity += specificity
        
        return total_specificity / len(chunks)
    
    def calculate_confidence_score(self, chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calculate weighted confidence score based on multiple factors.
        
        Args:
            chunks: List of retrieved chunks with 'similarity_score' and 'content' keys
                   Optional keys: 'timestamp', 'source'
        
        Returns:
            Dictionary containing:
            - score: Confidence score (0-1)
            - level: Confidence level (high/medium/low)
            - factors: Breakdown of individual factors
            - warning: Warning message if below threshold (None if above)
        """
        if not chunks:
            return {
                'score': 0.0,
                'level': 'low',
                'factors': {
                    'avg_similarity': 0.0,
                    'source_count': 0,
                    'specificity': 0.0,
                    'recency': 0.0
                },
                'warning': 'No chunks provided for scoring'
            }
        
        # Calculate individual factors
        similarities = [chunk.get('similarity_score', 0) for chunk in chunks]
        avg_similarity = sum(similarities) / len(similarities) if similarities else 0.0
        
        # Normalize source count (higher count = higher confidence, but with diminishing returns)
        source_count = len(chunks)
        normalized_source_count = min(1.0, source_count / 5)  # Max confidence at 5+ sources
        
        # Calculate specificity
        specificity = self.calculate_specificity(chunks)
        
        # Calculate recency factor (if timestamps available)
        recency = self._calculate_recency(chunks)
        
        # Calculate weighted confidence score
        confidence_score = (
            self.similarity_weight * avg_similarity +
            self.source_count_weight * normalized_source_count +
            self.specificity_weight * specificity +
            self.recency_weight * recency
        )
        
        # Determine confidence level
        if confidence_score >= self.thresholds['high']:
            level = 'high'
        elif confidence_score >= self.thresholds['medium']:
            level = 'medium'
        else:
            level = 'low'
        
        # Check if below minimum threshold
        warning = None
        if confidence_score < self.thresholds['low']:
            warning = f"Low confidence score ({confidence_score:.2f}). Results may be unreliable."
        
        return {
            'score': round(confidence_score, 2),
            'level': level,
            'factors': {
                'avg_similarity': round(avg_similarity, 3),
                'source_count': source_count,
                'specificity': round(specificity, 3),
                'recency': round(recency, 3)
            },
            'warning': warning
        }
    
    def _calculate_recency(self, chunks: List[Dict[str, Any]]) -> float:
        """
        Calculate recency factor based on timestamps.
        
        Args:
            chunks: List of chunks with optional 'timestamp' field
            
        Returns:
            Recency score (0-1)
        """
        chunks_with_timestamp = [c for c in chunks if 'timestamp' in c]
        
        if not chunks_with_timestamp:
            return 0.5  # Default to neutral if no timestamps available
        
        # Simple heuristic: assume more recent is better
        # This is a placeholder implementation
        return min(1.0, len(chunks_with_timestamp) / len(chunks))
    
    def format_confidence_output(self, result: Dict[str, Any]) -> str:
        """
        Format confidence score result for display.
        
        Args:
            result: Output from calculate_confidence_score()
            
        Returns:
            Formatted string representation
        """
        icon = '✅' if result['level'] == 'high' else ('⚠️' if result['level'] == 'medium' else '❌')
        output = f"Confidence: {result['score']} ({result['level'].upper()}) {icon}"
        
        if result['warning']:
            output += f"\n⚠️ Warning: {result['warning']}"
        
        return output
    
    def score_and_print(self, chunks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calculate confidence score and print formatted result.
        
        Args:
            chunks: List of retrieved chunks
            
        Returns:
            Confidence score result dictionary
        """
        result = self.calculate_confidence_score(chunks)
        print(self.format_confidence_output(result))
        return result


# Example usage
if __name__ == "__main__":
    # Example chunks
    example_chunks = [
        {
            'content': 'This is a detailed explanation about the topic with multiple paragraphs and code examples.',
            'similarity_score': 0.92,
            'source': 'doc1.md'
        },
        {
            'content': 'Another relevant chunk with specific information and lists:\n- Point 1\n- Point 2',
            'similarity_score': 0.85,
            'source': 'doc2.md'
        },
        {
            'content': 'Related content from third source.',
            'similarity_score': 0.78,
            'source': 'doc3.md'
        }
    ]
    
    # Initialize scorer
    scorer = ConfidenceScorer()
    
    # Score the chunks
    result = scorer.score_and_print(example_chunks)
    
    # Print detailed factors
    print("\nDetailed Factors:")
    for factor, value in result['factors'].items():
        print(f"  {factor}: {value}")
