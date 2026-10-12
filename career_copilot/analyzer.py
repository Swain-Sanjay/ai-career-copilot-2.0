import re
from collections import OrderedDict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Extend this dictionary as your target roles and job descriptions evolve.
SKILL_ALIASES = OrderedDict({
    "python": ["python"],
    "java": ["java"],
    "sql": ["sql", "structured query language"],
    "machine learning": ["machine learning", "scikit-learn", "sklearn"],
    "deep learning": ["deep learning"],
    "generative ai": ["generative ai", "genai", "generative artificial intelligence"],
    "large language models": ["large language model", "large language models", "llm", "llms"],
    "rag": ["rag", "retrieval augmented generation", "retrieval-augmented generation"],
    "langchain": ["langchain"],
    "hugging face": ["hugging face", "huggingface"],
    "pytorch": ["pytorch", "torch"],
    "tensorflow": ["tensorflow"],
    "pandas": ["pandas"],
    "numpy": ["numpy"],
    "data analysis": ["data analysis", "data analytics"],
    "nlp": ["natural language processing", "nlp"],
    "computer vision": ["computer vision"],
    "fastapi": ["fastapi"],
    "flask": ["flask"],
    "streamlit": ["streamlit"],
    "react": ["react", "react.js", "reactjs"],
    "javascript": ["javascript"],
    "typescript": ["typescript"],
    "html": ["html"],
    "css": ["css"],
    "git": ["git", "github"],
    "docker": ["docker"],
    "kubernetes": ["kubernetes", "k8s"],
    "aws": ["aws", "amazon web services"],
    "azure": ["azure", "microsoft azure"],
    "gcp": ["gcp", "google cloud platform", "google cloud"],
    "rest api": ["rest api", "restful api", "rest apis"],
    "linux": ["linux"],
    "statistics": ["statistics", "statistical analysis"],
    "communication": ["communication", "communication skills"],
    "problem solving": ["problem solving", "problem-solving"],
    "excel": ["excel", "microsoft excel"],
    "power bi": ["power bi"],
    "tableau": ["tableau"],
})

SECTION_KEYWORDS = {
    "Contact information": ["email", "phone", "linkedin", "github"],
    "Summary or objective": ["summary", "objective", "profile"],
    "Education": ["education", "academic background", "qualification"],
    "Experience or internships": ["experience", "internship", "employment"],
    "Projects": ["projects", "project experience"],
    "Skills": ["skills", "technical skills", "core competencies"],
    "Certifications": ["certifications", "certificates", "licenses"],
}


def _contains_term(text: str, term: str) -> bool:
    """Match whole terms where possible, avoiding e.g. 'java' inside 'javascript'."""
    pattern = r"(?<![a-z0-9+#.])" + re.escape(term.lower()) + r"(?![a-z0-9+#.])"
    return re.search(pattern, text.lower()) is not None


def extract_skills(text: str) -> list[str]:
    text = text.lower()
    found = []
    for canonical, aliases in SKILL_ALIASES.items():
        if any(_contains_term(text, alias) for alias in aliases):
            found.append(canonical)
    return found


def _similarity(resume_text: str, job_description: str) -> float:
    try:
        vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
        matrix = vectorizer.fit_transform([resume_text, job_description])
        return float(cosine_similarity(matrix[0:1], matrix[1:2])[0][0])
    except ValueError:
        return 0.0


def analyze_resume(resume_text: str, job_description: str) -> dict:
    resume_text = resume_text.strip()
    job_description = job_description.strip()
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)
    matched = [skill for skill in job_skills if skill in resume_skills]
    missing = [skill for skill in job_skills if skill not in resume_skills]

    skill_coverage = len(matched) / len(job_skills) if job_skills else 0.0
    text_similarity = _similarity(resume_text, job_description)
    # Transparent heuristic: skill coverage matters more than broad text overlap.
    score = round(100 * (0.75 * skill_coverage + 0.25 * text_similarity))
    sections = {
        section: any(_contains_term(resume_text, keyword) for keyword in keywords)
        for section, keywords in SECTION_KEYWORDS.items()
    }

    suggestions = []
    if missing:
        suggestions.append(
            "If you genuinely have experience with these job requirements, add specific evidence for: "
            + ", ".join(missing[:8]) + ". Do not claim skills you do not have."
        )
    if not sections["Projects"]:
        suggestions.append("Add a Projects section with 2–3 relevant projects, your contribution, and measurable results.")
    if not sections["Experience or internships"]:
        suggestions.append("Add internship, work, volunteering, or relevant practical experience where applicable.")
    if not sections["Summary or objective"]:
        suggestions.append("Consider a 2–3 line professional summary tailored to the target role.")
    if not sections["Certifications"]:
        suggestions.append("Add relevant certifications only if you have earned them; otherwise omit this section.")
    if len(resume_text.split()) < 180:
        suggestions.append("Your resume text is quite short; check whether important project, experience, or education details are missing.")
    if not suggestions:
        suggestions.append("Tailor your strongest project bullets to the job requirements and quantify results where you can verify them.")

    interview_questions = _build_questions(job_skills, missing)

    return {
        "match_score": max(0, min(100, score)),
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched,
        "missing_skills": missing,
        "text_similarity": round(text_similarity, 3),
       "skill_coverage": round(skill_coverage * 100, 1),
        "resume_word_count": len(resume_text.split()),
        "section_checks": sections,
        "suggestions": suggestions,
        "interview_questions": interview_questions,
    }


def _build_questions(job_skills: list[str], missing_skills: list[str]) -> list[str]:
    focus = (missing_skills + job_skills)[:4]
    questions = [
        "Walk me through a project that is most relevant to this role. What was your contribution?",
        "Describe a difficult technical problem you solved and how you evaluated the result.",
        "How do you test, debug, and maintain code when requirements change?",
    ]
    for skill in focus:
        questions.append(f"Explain {skill} and describe a practical example of how you have used it.")
    return questions[:7]
