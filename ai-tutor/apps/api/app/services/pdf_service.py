import fitz  # PyMuPDF
import pytesseract
import re
import io
from PIL import Image

def extract_text_smart(pdf_path: str) -> list[dict]:
    """Extracts text from a PDF, falling back to OCR if the page seems to be a scanned image."""
    doc = fitz.open(pdf_path)
    pages = []
    for i, page in enumerate(doc):
        text = page.get_text('text').strip()
        
        # If very little text is found, assume it might be a scanned image
        if len(text) < 50:  
            pix = page.get_pixmap(dpi=300)
            img = Image.open(io.BytesIO(pix.tobytes('png')))
            # Tesseract OCR for English and Hindi
            text = pytesseract.image_to_string(img, lang='eng+hin').strip()
            
        pages.append({'text': text, 'page': i+1})
    return pages

def detect_chapter(text: str) -> str | None:
    """Attempts to detect a chapter heading from the text."""
    # Matches a line that is ALL CAPS and between 4 and 50 characters long
    match = re.search(r'^([A-Z][A-Z\s]{4,50})$', text, re.MULTILINE)
    return match.group(1).strip() if match else None

def chunk_pages(pages: list[dict], chunk_size=800, overlap=100) -> list[dict]:
    """Chunks text into smaller pieces for vector embeddings, respecting overlaps and chapter boundaries."""
    chunks = []
    
    # 1. Group text by chapter to prevent boundary crossing
    chapters_content = []
    current_chapter = "Unknown"
    current_text = []
    current_start_page = 1
    
    for page in pages:
        detected_chapter = detect_chapter(page['text'])
        
        if detected_chapter and detected_chapter != current_chapter:
            if current_text:
                chapters_content.append({
                    'chapter': current_chapter,
                    'text': ' '.join(current_text),
                    'start_page': current_start_page
                })
            current_chapter = detected_chapter
            current_text = [page['text']]
            current_start_page = page['page']
        else:
            current_text.append(page['text'])
            
    if current_text:
        chapters_content.append({
            'chapter': current_chapter,
            'text': ' '.join(current_text),
            'start_page': current_start_page
        })

    # 2. Chunk each chapter's text independently
    for chap in chapters_content:
        words = chap['text'].split()
        for i in range(0, max(1, len(words)), max(1, chunk_size - overlap)):
            chunk_words = words[i:i+chunk_size]
            if not chunk_words:
                continue
                
            chunks.append({
                'text': ' '.join(chunk_words),
                'page': chap['start_page'], # Approximate page for this chunk
                'chapter': chap['chapter']
            })
            
    return chunks
