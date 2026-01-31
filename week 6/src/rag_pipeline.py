import sys
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Load env
load_dotenv()

# Paths
base_dir = os.path.dirname(os.path.abspath(__file__))
week4_src = os.path.join(base_dir, '..', '..', 'week 4', 'src')
sys.path.append(week4_src)

from search_pipeline import SearchPipeline

class RAGPipeline:
    def __init__(self):
        self.retriever = SearchPipeline()
        
        # Configure LLM Client
        # User requested support for OpenRouter or similar
        self.api_key = os.getenv("LLM_API_KEY")
        self.base_url = os.getenv("LLM_BASE_URL", "https://openrouter.ai/api/v1")
        self.model_name = os.getenv("LLM_MODEL", "mistralai/mistral-7b-instruct")
        
        if self.api_key:
            print(f"RAG Initialized with LLM: {self.model_name}")
            self.client = OpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
        else:
            print("RAG Initialized in Offline Mode (No API Key found)")
            self.client = None

    def generate_response(self, query, user_role, stream=False):
        # 1. Retrieve Context
        search_result = self.retriever.search(query, user_role)
        results = search_result['results']
        
        # 2. Build Context String
        context_text = ""
        sources = []
        for i, res in enumerate(results):
            content = res['content'].replace("\n", " ")
            dept = res['metadata'].get('department', 'Unknown')
            context_text += f"\n[Doc {i+1} - {dept}]: {content}\n"
            sources.append(res)
            
        # 3. Construct Prompt
        system_prompt = """You are a secure internal enterprise assistant.
        1. For greetings (e.g., 'Hi', 'Hello'), respond politely and concisely.
        2. For questions asking for information, use ONLY the provided context.
        3. If the answer is not in the context, say 'I cannot find this information in the documents you have access to.'
        4. Do not answer general knowledge questions outside the context.
        """
        
        user_prompt = f"""
        CONTEXT:
        {context_text}
        
        QUESTION: 
        {query}
        
        ANSWER:
        """
        
        # 4. Call LLM or Fallback
        generated_text = ""
        
        if self.client:
            try:
                completion = self.client.chat.completions.create(
                    model=self.model_name,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ]
                )
                generated_text = completion.choices[0].message.content
            except Exception as e:
                generated_text = f"Error generating response: {str(e)}"
        else:
            if not results:
                generated_text = "I couldn't find any relevant documents. (AI Generation is disabled)"
            else:
                generated_text = "Detailed AI response is disabled (No API Key). Here are the documents found:"

        return {
            "query": query,
            "response": generated_text,
            "results": sources,
            "metrics": {
                "documents_retrieved": len(sources),
                "avg_similarity": round(sum([1 - r.get('score', 0.5) for r in sources]) / max(len(sources), 1), 3),
                "llm_enabled": self.client is not None,
                "model": self.model_name if self.client else None,
                "context_tokens": len(context_text.split())
            }
        }

if __name__ == "__main__":
    rag = RAGPipeline()
    # Mock test if key exists
    if os.getenv("LLM_API_KEY"):
        print(rag.generate_response("Q4 revenue", "finance"))
