# AI Career Copilot 2.0

A local-first resume analysis application that compares a PDF resume with a job description, estimates alignment, identifies skill gaps, checks common resume sections, and generates interview practice questions.

## Features

- Extract text from selectable-text PDF resumes with `pdfplumber`.
- Detect skills using an editable alias dictionary.
- Estimate job alignment using skill coverage plus TF-IDF cosine similarity.
- Highlight matched and potentially missing skills.
- Check for common resume sections.
- Produce actionable suggestions and interview practice questions.
- Optional OpenAI-powered feedback, disabled by default.
- Download a Markdown report.
- Automated tests for core analysis logic.

> The match score is a transparent heuristic, not a real ATS score, hiring prediction, or guarantee. Skill detection can miss synonyms and context. Verify every recommendation and never add skills or achievements you do not have.

## Architecture

```text
Browser
  |
  v
Streamlit UI (app.py)
  |-- PDF extraction (career_copilot/pdf_utils.py)
  |-- Skill + text analysis (career_copilot/analyzer.py)
  |-- Optional LLM feedback (career_copilot/llm.py)
  |
  v
Results dashboard + downloadable Markdown report
```

## Requirements

- Python 3.10 or newer
- Internet connection for installing dependencies
- Optional OpenAI API key for LLM feedback

## Run locally

### 1. Create and enter a project folder

```bash
cd ai-career-copilot-2.0
```

### 2. Create a virtual environment

Windows PowerShell:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Windows Command Prompt:

```bat
py -m venv .venv
.venv\Scripts\activate.bat
```

macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install packages

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Start the app

```bash
streamlit run app.py
```

Streamlit prints a local URL, typically `http://localhost:8501`.

### 5. Use the app

1. Upload a text-based PDF resume.
2. Paste the full target job description.
3. Select **Analyze my resume**.
4. Review the score, skills, section checks, and recommendations.
5. Download the Markdown report.

Scanned PDFs may need OCR; this starter version does not include OCR.

## Optional OpenAI feedback

1. Copy `.env.example` to `.env`.
2. Add your API key and model name to `.env`.
3. Restart the app with `streamlit run app.py`. The app loads `.env` automatically.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
notepad .env
streamlit run app.py
```

macOS/Linux:

```bash
cp .env.example .env
nano .env
streamlit run app.py
```

Keep `.env` private and never commit API keys. When the optional feature is enabled, resume text and the job description are sent to the configured OpenAI API. Do not enable it for sensitive documents unless you are comfortable with that data handling.

## Run tests

```bash
pytest -q
```

## Customize the skill dictionary

Edit `SKILL_ALIASES` in `career_copilot/analyzer.py`. Add canonical names and aliases relevant to your target role. Keep aliases specific enough to reduce false matches.

## Known limitations

- Only selectable text is extracted from PDFs; scanned-image PDFs need OCR.
- Skill matching is dictionary-based and may miss synonyms or misunderstand context.
- TF-IDF similarity measures text overlap, not true semantic understanding.
- Resume section checks are heuristic.
- The app currently stores results in Streamlit session state; it does not save resumes to a database.
- The optional LLM output can be incorrect. Review suggestions before using them.

## Suggested next upgrades

1. Add OCR for scanned resumes.
2. Add sentence-transformer embeddings for semantic similarity.
3. Add a FastAPI service and React frontend.
4. Add a database for user accounts and saved analyses, with authentication and deletion controls.
5. Add evaluation data and compare score behavior across diverse resume formats.
6. Add DOCX support and downloadable PDF reports.

## GitHub

```bash
git init
git add .
git commit -m "Build AI Career Copilot 2.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-career-copilot-2.0.git
git push -u origin main
```

## Resume bullet points

Use these only after you have run, tested, and understood the project:

- Built a Streamlit-based resume analysis application that extracts PDF text, detects job-relevant skills, and generates targeted skill-gap recommendations.
- Implemented a transparent job-alignment heuristic combining skill coverage and TF-IDF cosine similarity, with automated tests for the analysis engine.
- Added optional LLM-powered resume feedback and interview-question generation, plus downloadable Markdown reports.

Do not claim usage metrics, accuracy, production readiness, or model performance unless you have measured them.
