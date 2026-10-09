import pdfplumber


def extract_pdf_text(uploaded_file) -> str:
    """Extract selectable text from an uploaded PDF-like file object."""
    pages = []
    with pdfplumber.open(uploaded_file) as pdf:
        for page in pdf.pages:
            pages.append(page.extract_text() or "")
    return "\n".join(pages).strip()
