import os
from app.services.pdf_service import extract_text_smart, chunk_pages
from app.core.vector_store import get_vectorstore
from langchain.schema import Document
from app.core.database import SessionLocal
from app.models import Textbook

def index_textbook(pdf_path: str, student_id: str, subject: str, textbook_id: str):
    try:
        # 1. Extract text (with OCR fallback)
        pages = extract_text_smart(pdf_path)
        
        # 2. Chunk into 800-token pieces
        chunks = chunk_pages(pages)
        
        # 3. Convert to LangChain Documents
        docs = [Document(
            page_content=c['text'],
            metadata={
                'page': c['page'], 
                'chapter': c['chapter'],
                'subject': subject, 
                'student_id': student_id
            }
        ) for c in chunks]
        
        # 4. Upsert to Supabase pgvector
        if docs:
            vs = get_vectorstore(student_id, subject)
            # Supabase handles bulk insertion
            batch_size = 100
            for i in range(0, len(docs), batch_size):
                vs.add_documents(docs[i:i + batch_size])
            
        # 5. Update textbooks table status to 'ready'
        db = SessionLocal()
        try:
            textbook = db.query(Textbook).filter(Textbook.id == textbook_id).first()
            if textbook:
                textbook.status = 'ready'
                textbook.chunk_count = len(docs)
                db.commit()
        finally:
            db.close()

        # Clean up the temp file
        if os.path.exists(pdf_path):
            os.remove(pdf_path)

        return {'chunks_indexed': len(docs), 'status': 'success'}
        
    except Exception as e:
        # On failure, mark as failed in DB
        db = SessionLocal()
        try:
            textbook = db.query(Textbook).filter(Textbook.id == textbook_id).first()
            if textbook:
                textbook.status = 'failed'
                db.commit()
        finally:
            db.close()
            
        # Clean up the temp file
        if os.path.exists(pdf_path):
            os.remove(pdf_path)
            
        print(f"Indexing failed for {textbook_id}: {str(e)}")
        raise e
