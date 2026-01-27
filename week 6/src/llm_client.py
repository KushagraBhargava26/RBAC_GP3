import json
import os
import logging
import time
from typing import Optional, Dict, Any
from datetime import datetime
import requests
from abc import ABC, abstractmethod

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('llm_api_calls.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class LLMProviderError(Exception):
    """Base exception for LLM provider errors"""
    pass


class RateLimitError(LLMProviderError):
    """Exception raised when rate limit is exceeded"""
    pass


class TimeoutError(LLMProviderError):
    """Exception raised when request times out"""
    pass


class ProviderBase(ABC):
    """Abstract base class for LLM providers"""
    
    def __init__(self, model: str, api_key: str, timeout: int = 30):
        self.model = model
        self.api_key = api_key
        self.timeout = timeout
    
    @abstractmethod
    def generate(self, prompt: str, max_tokens: int, temperature: float) -> str:
        """Generate text from the LLM"""
        pass


class HuggingFaceProvider(ProviderBase):
    """HuggingFace API provider"""
    
    API_URL = "https://api-inference.huggingface.co/models"
    
    def generate(self, prompt: str, max_tokens: int, temperature: float) -> Dict[str, Any]:
        """
        Generate text using HuggingFace API
        
        Args:
            prompt: Input prompt
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature (0.0 to 1.0)
            
        Returns:
            Dictionary with generated text and metadata
        """
        url = f"{self.API_URL}/{self.model}"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": max_tokens,
                "temperature": temperature,
                "top_p": 0.95
            }
        }
        
        try:
            start_time = time.time()
            response = requests.post(
                url,
                headers=headers,
                json=payload,
                timeout=self.timeout
            )
            latency = time.time() - start_time
            
            if response.status_code == 429:
                raise RateLimitError("HuggingFace API rate limit exceeded")
            
            response.raise_for_status()
            result = response.json()
            
            generated_text = result[0].get('generated_text', '') if isinstance(result, list) else result.get('generated_text', '')
            
            return {
                'text': generated_text,
                'provider': 'huggingface',
                'model': self.model,
                'tokens': len(generated_text.split()),
                'latency': latency,
                'timestamp': datetime.utcnow().isoformat()
            }
        except requests.exceptions.Timeout:
            raise TimeoutError(f"HuggingFace API request timed out after {self.timeout} seconds")
        except requests.exceptions.RequestException as e:
            raise LLMProviderError(f"HuggingFace API error: {str(e)}")


class OpenAIProvider(ProviderBase):
    """OpenAI API provider"""
    
    API_URL = "https://api.openai.com/v1/chat/completions"
    
    def generate(self, prompt: str, max_tokens: int, temperature: float) -> Dict[str, Any]:
        """
        Generate text using OpenAI API
        
        Args:
            prompt: Input prompt
            max_tokens: Maximum tokens to generate
            temperature: Sampling temperature (0.0 to 1.0)
            
        Returns:
            Dictionary with generated text and metadata
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": temperature
        }
        
        try:
            start_time = time.time()
            response = requests.post(
                self.API_URL,
                headers=headers,
                json=payload,
                timeout=self.timeout
            )
            latency = time.time() - start_time
            
            if response.status_code == 429:
                raise RateLimitError("OpenAI API rate limit exceeded")
            
            response.raise_for_status()
            result = response.json()
            
            generated_text = result['choices'][0]['message']['content']
            tokens_used = result.get('usage', {}).get('total_tokens', 0)
            
            return {
                'text': generated_text,
                'provider': 'openai',
                'model': self.model,
                'tokens': tokens_used,
                'latency': latency,
                'timestamp': datetime.utcnow().isoformat()
            }
        except requests.exceptions.Timeout:
            raise TimeoutError(f"OpenAI API request timed out after {self.timeout} seconds")
        except requests.exceptions.RequestException as e:
            raise LLMProviderError(f"OpenAI API error: {str(e)}")


class LLMClient:
    """
    Main LLM client supporting multiple providers with fallback, retry, and rate limiting
    """
    
    def __init__(self, config_path: Optional[str] = None):
        """
        Initialize LLM client
        
        Args:
            config_path: Path to llm_config.json. If None, looks in config/ directory
        """
        if config_path is None:
            config_path = os.path.join(os.path.dirname(__file__), '../config/llm_config.json')
        
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        
        self.provider_name = self.config.get('provider', 'huggingface')
        self.model = self.config.get('model')
        self.max_tokens = self.config.get('max_tokens', 500)
        self.temperature = self.config.get('temperature', 0.7)
        self.api_key_env = self.config.get('api_key_env', 'HF_API_KEY')
        self.fallback_provider = self.config.get('fallback_provider', 'openai')
        self.fallback_model = self.config.get('fallback_model')
        self.retry_attempts = self.config.get('retry_attempts', 3)
        self.retry_delay = self.config.get('retry_delay_seconds', 2)
        self.timeout = self.config.get('timeout_seconds', 30)
        self.rate_limit_delay = self.config.get('rate_limit_delay', 1.0)
        
        self.last_request_time = 0
        self.providers = {}
        self._initialize_providers()
        
        logger.info(f"LLMClient initialized with provider: {self.provider_name}, model: {self.model}")
    
    def _initialize_providers(self):
        """Initialize available providers"""
        # Main provider
        api_key = os.getenv(self.api_key_env)
        if not api_key:
            logger.warning(f"API key not found for {self.api_key_env}. Provider will fail without valid key.")
        
        if self.provider_name.lower() == 'huggingface':
            self.providers['huggingface'] = HuggingFaceProvider(self.model, api_key or '', self.timeout)
        elif self.provider_name.lower() == 'openai':
            self.providers['openai'] = OpenAIProvider(self.model, api_key or '', self.timeout)
        
        # Fallback provider
        if self.fallback_provider:
            fallback_key = os.getenv(f"{self.fallback_provider.upper()}_API_KEY")
            if self.fallback_provider.lower() == 'openai':
                self.providers['openai'] = OpenAIProvider(self.fallback_model or 'gpt-3.5-turbo', fallback_key or '', self.timeout)
            elif self.fallback_provider.lower() == 'huggingface':
                self.providers['huggingface'] = HuggingFaceProvider(self.fallback_model or 'microsoft/DialoGPT-medium', fallback_key or '', self.timeout)
    
    def _apply_rate_limit(self):
        """Apply rate limiting between requests"""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.rate_limit_delay:
            sleep_time = self.rate_limit_delay - elapsed
            logger.debug(f"Rate limiting: sleeping for {sleep_time:.2f} seconds")
            time.sleep(sleep_time)
        
        self.last_request_time = time.time()
    
    def generate(
        self,
        prompt: str,
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None
    ) -> Dict[str, Any]:
        """
        Generate text from the LLM with retry and fallback logic
        
        Args:
            prompt: Input prompt
            max_tokens: Override default max tokens
            temperature: Override default temperature
            
        Returns:
            Dictionary with generated text and metadata
            
        Raises:
            LLMProviderError: If all providers fail
        """
        max_tokens = max_tokens or self.max_tokens
        temperature = temperature or self.temperature
        
        # Validate temperature
        temperature = max(0.0, min(1.0, temperature))
        
        providers_to_try = [self.provider_name]
        if self.fallback_provider and self.fallback_provider != self.provider_name:
            providers_to_try.append(self.fallback_provider)
        
        last_error = None
        
        for provider_name in providers_to_try:
            for attempt in range(self.retry_attempts):
                try:
                    self._apply_rate_limit()
                    
                    provider = self.providers.get(provider_name.lower())
                    if not provider:
                        logger.error(f"Provider {provider_name} not initialized")
                        last_error = LLMProviderError(f"Provider {provider_name} not available")
                        continue
                    
                    logger.info(f"Generating with {provider_name} (attempt {attempt + 1}/{self.retry_attempts})")
                    result = provider.generate(prompt, max_tokens, temperature)
                    
                    logger.info(
                        f"Success: {provider_name} | Tokens: {result['tokens']} | "
                        f"Latency: {result['latency']:.2f}s | Model: {result['model']}"
                    )
                    
                    return result
                
                except RateLimitError as e:
                    last_error = e
                    logger.warning(f"Rate limit hit on {provider_name}, retrying in {self.retry_delay}s...")
                    time.sleep(self.retry_delay)
                
                except TimeoutError as e:
                    last_error = e
                    logger.warning(f"Timeout on {provider_name} (attempt {attempt + 1}), retrying...")
                    time.sleep(self.retry_delay)
                
                except LLMProviderError as e:
                    last_error = e
                    logger.error(f"Provider error on {provider_name}: {str(e)}")
                    if attempt < self.retry_attempts - 1:
                        time.sleep(self.retry_delay)
        
        error_msg = f"All LLM providers exhausted. Last error: {str(last_error)}"
        logger.error(error_msg)
        raise LLMProviderError(error_msg)
    
    def get_status(self) -> Dict[str, Any]:
        """Get status of available providers"""
        return {
            'primary_provider': self.provider_name,
            'primary_model': self.model,
            'fallback_provider': self.fallback_provider,
            'fallback_model': self.fallback_model,
            'available_providers': list(self.providers.keys()),
            'config_file': os.path.join(os.path.dirname(__file__), '../config/llm_config.json')
        }
