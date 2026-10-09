
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from career_copilot.analyzer import analyze_resume
from career_copilot.llm import generate_ai_feedback
from career_copilot.pdf_utils import extract_pdf_text

app = FastAPI(
    title="CareerCopilot API",
    description="Resume analysis and career feedback API",
    version="1.0.0",
)

# Allow the local React development server to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

MAX_PDF_BYTES = 10 * 1024 * 1024


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "CareerCopilot API"}


@app.post("/api/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    include_ai_feedback: bool = Form(False),
):
    if not resume.filename or not resume.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume.",
        )

    if not job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Please provide a job description.",
        )

    # Read at most 10 MB plus one byte to enforce the limit.
    pdf_bytes = await resume.read(MAX_PDF_BYTES + 1)

    if len(pdf_bytes) > MAX_PDF_BYTES:
        raise HTTPException(
            status_code=413,
            detail="The PDF must be 10 MB or smaller.",
        )

    if not pdf_bytes:
        raise HTTPException(status_code=400, detail="The uploaded PDF is empty.")

    try:
        import io

        resume_text = extract_pdf_text(io.BytesIO(pdf_bytes))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read this PDF. Please try another PDF file.",
        )

    if not resume_text.strip():
        raise HTTPException(
            status_code=422,
            detail="No selectable text was found. Scanned PDFs are not supported yet.",
        )

    try:
        analysis = analyze_resume(resume_text, job_description)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Resume analysis failed. Please try again.",
        )

    result = {
        "filename": resume.filename,
        "match_score": analysis["match_score"],
        "resume_skills": analysis["resume_skills"],
        "job_skills": analysis["job_skills"],
        "matched_skills": analysis["matched_skills"],
        "missing_skills": analysis["missing_skills"],
        "text_similarity": analysis["text_similarity"],
        "skill_coverage": analysis["skill_coverage"],
        "resume_word_count": analysis["resume_word_count"],
        "section_checks": analysis["section_checks"],
        "suggestions": analysis["suggestions"],
        "interview_questions": analysis["interview_questions"],
    }

    if include_ai_feedback:
        # Resume text is sent to the configured AI provider only when
        # the caller explicitly opts in.
        result["ai_feedback"] = generate_ai_feedback(
            resume_text,
            job_description,
            analysis,
        )

    return result
