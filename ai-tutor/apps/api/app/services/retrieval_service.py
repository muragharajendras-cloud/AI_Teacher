from app.core.vector_store import get_vectorstore

def retrieve_context(question: str, student_id: str, subject: str, k: int = 5) -> str:
    """
    Retrieves the most relevant chunks from the student's textbook vector store
    for a given question, using Maximal Marginal Relevance (MMR) to reduce duplicates.
    """
    vs = get_vectorstore(student_id, subject)
    
    # MMR (Maximal Marginal Relevance) helps fetch relevant but diverse chunks
    # We fetch 20 candidates and return the top `k` most diverse ones.
    docs = vs.max_marginal_relevance_search(question, k=k, fetch_k=20)
    
    # Join the retrieved chunks together with a visual separator
    return '\n\n---\n\n'.join(d.page_content for d in docs)
