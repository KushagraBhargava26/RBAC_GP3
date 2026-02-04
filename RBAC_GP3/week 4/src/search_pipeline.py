import time
from query_processor import QueryProcessor
from rbac_filter import RBACFilter
from chunk_selector import ChunkSelector

class SearchPipeline:
    def __init__(self):
        self.query_processor = QueryProcessor()
        self.rbac_filter = RBACFilter()
        self.chunk_selector = ChunkSelector()

    def search(self, query, user_role):
        start_time = time.time()
        try:
            # Step 1: Preprocess query
            print("Step 1: Preprocessing query...")
            processed_query = self.query_processor.preprocess(query)
            print("Step 1: Preprocessing query completed")

            # Step 2: Generate query embedding
            print("Step 2: Generating query embedding...")
            query_embedding = self.query_processor.generate_embedding(processed_query)
            print("Step 2: Generating query embedding completed")

            # Step 3: Search vector database
            print("Step 3: Searching vector database...")
            search_results = self.query_processor.search_vector_database(query_embedding)
            print("Step 3: Searching vector database completed")

            # Step 4: Filter by RBAC
            print("Step 4: Filtering by RBAC...")
            filtered_results = self.rbac_filter.filter(search_results, user_role)
            print("Step 4: Filtering by RBAC completed")

            # Step 5: Select top-K chunks
            print("Step 5: Selecting top-K chunks...")
            top_k_chunks = self.chunk_selector.select_top_k(filtered_results)
            print("Step 5: Selecting top-K chunks completed")

            # Step 6: Return results with metadata
            processing_time = time.time() - start_time
            return {
                "results": top_k_chunks,
                "total_found": len(search_results),
                "filtered_count": len(filtered_results),
                "processing_time": processing_time
            }

        except Exception as e:
            print(f"Error during search pipeline execution: {e}")
            return {
                "error": str(e)
            }

if __name__ == "__main__":
    pipeline = SearchPipeline()
    query = "example query"
    user_role = "admin"
    results = pipeline.search(query, user_role)
    print(results)