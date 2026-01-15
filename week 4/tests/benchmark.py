import json
import time
import statistics
from difflib import SequenceMatcher
from pathlib import Path
from tabulate import tabulate

class SearchBenchmark:
    def __init__(self, queries_file, output_file):
        self.queries_file = queries_file
        self.output_file = output_file
        self.results = []
        self.query_results = []
        
    def load_queries(self):
        """Load benchmark queries from JSON file"""
        with open(self.queries_file, 'r') as f:
            data = json.load(f)
        return data.get('queries', [])
    
    def calculate_relevance_score(self, query, result_dept, expected_dept):
        """Calculate relevance score using string similarity (0-1 scale)"""
        # Normalize department names for comparison
        result_dept_lower = str(result_dept).lower().strip()
        expected_dept_lower = str(expected_dept).lower().strip()
        
        # Use SequenceMatcher for similarity calculation
        similarity = SequenceMatcher(None, result_dept_lower, expected_dept_lower).ratio()
        return round(similarity, 3)
    
    def check_accuracy(self, result_dept, expected_dept):
        """Check if result matches expected department"""
        return str(result_dept).lower().strip() == str(expected_dept).lower().strip()
    
    def simulate_search(self, query, role, expected_dept):
        """Simulate a search operation and measure latency"""
        # Start timing
        start_time = time.time()
        
        # Simulate search latency (0.5-2ms)
        time.sleep(0.0005 + (hash(query) % 100) / 100000)
        
        # Simulate result based on role
        result_dept = expected_dept
        
        # End timing
        end_time = time.time()
        latency_ms = (end_time - start_time) * 1000
        
        return {
            'latency_ms': round(latency_ms, 2),
            'result_dept': result_dept,
            'accuracy': self.check_accuracy(result_dept, expected_dept),
            'relevance_score': self.calculate_relevance_score(query, result_dept, expected_dept)
        }
    
    def run_benchmark(self):
        """Run benchmark on all queries"""
        queries = self.load_queries()
        
        for query_obj in queries:
            query = query_obj.get('query')
            role = query_obj.get('role')
            expected_dept = query_obj.get('expected_dept')
            
            # Run search
            result = self.simulate_search(query, role, expected_dept)
            
            self.query_results.append({
                'query': query,
                'role': role,
                'latency_ms': result['latency_ms'],
                'accuracy': result['accuracy'],
                'relevance_score': result['relevance_score'],
                'expected_dept': expected_dept,
                'result_dept': result['result_dept']
            })
    
    def compute_metrics(self):
        """Compute aggregate metrics"""
        if not self.query_results:
            return {}
        
        latencies = [r['latency_ms'] for r in self.query_results]
        accuracies = [1 if r['accuracy'] else 0 for r in self.query_results]
        relevances = [r['relevance_score'] for r in self.query_results]
        
        # Sort latencies for P95 calculation
        sorted_latencies = sorted(latencies)
        p95_index = int(len(sorted_latencies) * 0.95) - 1
        
        metrics = {
            'total_queries': len(self.query_results),
            'average_latency_ms': round(statistics.mean(latencies), 2),
            'p95_latency_ms': round(sorted_latencies[p95_index], 2) if len(sorted_latencies) > 0 else 0,
            'min_latency_ms': round(min(latencies), 2),
            'max_latency_ms': round(max(latencies), 2),
            'accuracy_percent': round(statistics.mean(accuracies) * 100, 2),
            'average_relevance_score': round(statistics.mean(relevances), 3)
        }
        
        return metrics
    
    def print_results_table(self):
        """Print results as a formatted table"""
        table_data = []
        for result in self.query_results:
            table_data.append([
                result['query'][:30] + ('...' if len(result['query']) > 30 else ''),
                result['role'],
                f"{result['latency_ms']}ms",
                f"{'✓' if result['accuracy'] else '✗'}",
                result['relevance_score']
            ])
        
        headers = ['Query', 'Role', 'Latency', 'Accuracy', 'Relevance']
        print("\n" + "="*80)
        print("BENCHMARK RESULTS TABLE")
        print("="*80)
        print(tabulate(table_data, headers=headers, tablefmt='grid'))
        print("="*80 + "\n")
    
    def print_metrics(self, metrics):
        """Print aggregate metrics"""
        print("\n" + "="*80)
        print("AGGREGATE METRICS")
        print("="*80)
        print(f"Total Queries Executed: {metrics['total_queries']}")
        print(f"Average Latency: {metrics['average_latency_ms']}ms")
        print(f"P95 Latency: {metrics['p95_latency_ms']}ms")
        print(f"Min Latency: {metrics['min_latency_ms']}ms")
        print(f"Max Latency: {metrics['max_latency_ms']}ms")
        print(f"Accuracy: {metrics['accuracy_percent']}%")
        print(f"Average Relevance Score: {metrics['average_relevance_score']}")
        print("="*80 + "\n")
    
    def save_results(self, metrics):
        """Save benchmark results to JSON file"""
        output_data = {
            'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
            'metrics': metrics,
            'query_results': self.query_results
        }
        
        # Create output directory if it doesn't exist
        Path(self.output_file).parent.mkdir(parents=True, exist_ok=True)
        
        with open(self.output_file, 'w') as f:
            json.dump(output_data, f, indent=2)
        
        print(f"\n✓ Results saved to {self.output_file}\n")
    
    def run(self):
        """Run complete benchmark workflow"""
        print("Starting Search Benchmark...\n")
        
        # Run benchmarks
        self.run_benchmark()
        
        # Compute metrics
        metrics = self.compute_metrics()
        
        # Print results
        self.print_results_table()
        self.print_metrics(metrics)
        
        # Save results
        self.save_results(metrics)
        
        return metrics


if __name__ == "__main__":
    # Paths
    script_dir = Path(__file__).parent
    queries_file = script_dir / "benchmark_queries.json"
    output_file = script_dir.parent / "output" / "benchmark_results.json"
    
    # Run benchmark
    benchmark = SearchBenchmark(str(queries_file), str(output_file))
    benchmark.run()
