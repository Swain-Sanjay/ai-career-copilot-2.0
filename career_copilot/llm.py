import os
from dotenv import load_dotenv

load_dotenv()


def generate_ai_feedback(resume_text: str, job_description: str, analysis: dict) -> dict:
    """
    Optional OpenAI integration. The core app works without an API key.
    The user must explicitly enable this feature before resume text is sent to the API.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return {
            "ok": False,
            "text": "OPENAI_API_KEY is not configured. Add it to your .env file, restart Streamlit, and try again."
        }

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key)
        prompt = f"""
You are a practical career coach. Analyze the resume against the job description.
Give concise, honest feedback. Do not invent achievements or encourage the candidate
to claim skills they do not have. Include:
1. Three prioritized resume improvements.
2. Two example bullet rewrites using only evidence present in the resume.
3. Five tailored interview questions.

Resume text:
{resume_text[:12000]}

Job description:
{job_description[:8000]}

Deterministic analysis:
Matched skills: {analysis["matched_skills"]}
Potential skill gaps: {analysis["missing_skills"]}
Estimated match score: {analysis["match_score"]}%
"""
        response = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[
                {"role": "system", "content": "You provide careful, evidence-based career feedback."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
        )
        return {"ok": True, "text": response.choices[0].message.content or "No feedback was returned."}
    except Exception as exc:
        return {
            "ok": False,
            "text": f"AI feedback could not be generated ({type(exc).__name__}). Check your API key, model access, and network connection."
        }
