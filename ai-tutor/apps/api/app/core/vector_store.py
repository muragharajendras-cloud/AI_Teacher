from supabase.client import Client, create_client
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.embeddings import CacheBackedEmbeddings
from langchain_community.storage import RedisStore
import redis
from app.core.config import settings

# Initialize Supabase client
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

def get_vectorstore(student_id: str, subject: str) -> SupabaseVectorStore:
    # Use lightweight, local open-source embeddings (Sentence Transformers)
    underlying_embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    
    redis_client = redis.Redis.from_url(str(settings.REDIS_URL))
    # TTL is in seconds. 86400 = 24 hours. Cache embeddings in Redis for 24h
    store = RedisStore(client=redis_client, ttl=86400)
    
    cached_embedder = CacheBackedEmbeddings.from_bytes_store(
        underlying_embeddings, store, namespace=underlying_embeddings.model_name
    )

    # In PostgreSQL (via Supabase), the filtering by student_id and subject
    # will happen at retrieval time, but we define the VectorStore globally for the table.
    # To implement Pinecone's "namespace", we'll filter on metadata during similarity_search.
    return SupabaseVectorStore(
        client=supabase,
        embedding=cached_embedder,
        table_name="documents",
        query_name="match_documents"
    )
