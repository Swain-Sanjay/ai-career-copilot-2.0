import streamlit as st
import pandas as pd

from career_copilot.analyzer import analyze_resume
from career_copilot.pdf_utils import extract_pdf_text
from career_copilot.llm import generate_ai_feedback

st.set_page_config(page_title="AI Career Copilot 2.0", page_icon="🚀", layout="wide")

st.title("🚀 AI Career Copilot 2.0")
st.caption("Resume analysis • Job matching • Skill gaps • Interview preparation")
st.info(
    "Your resume is analyzed locally by default. The match score is an estimate of "
    "alignment with the job description, not an actual ATS score or hiring prediction."
)

with st.sidebar:
    st.header("How it works")
    st.markdown(
        "1. Upload a PDF resume.\n"
        "2. Paste the target job description.\n"
        "3. Review your match score and skill gaps.\n"
        "4. Generate feedback and interview questions."
    )
    st.divider()
    use_ai = st.checkbox("Use optional OpenAI feedback", value=False)
    st.caption("Requires OPENAI_API_KEY in your .env file. Resume text is sent to the API only if you enable this option.")

left, right = st.columns([1, 1], gap="large")
with left:
    resume_file = st.file_uploader("Upload your resume (PDF)", type=["pdf"])
with right:
    job_description = st.text_area(
        "Paste the job description",
        height=240,
        placeholder="Paste responsibilities, required skills, qualifications, and preferred experience...",
    )

analyze_clicked = st.button("Analyze my resume", type="primary", use_container_width=True)

if analyze_clicked:
    if resume_file is None:
        st.error("Please upload a PDF resume.")
        st.stop()
    if not job_description.strip():
        st.error("Please paste a job description.")
        st.stop()

    with st.spinner("Reading your resume and analyzing the job match..."):
        try:
            resume_text = extract_pdf_text(resume_file)
        except Exception as exc:
            st.error(f"Could not read the PDF: {exc}")
            st.stop()

        if len(resume_text.strip()) < 80:
            st.error(
                "Very little text was extracted. This may be a scanned/image-only PDF. "
                "Try a text-based PDF or add OCR support."
            )
            st.stop()

        results = analyze_resume(resume_text, job_description)

    st.session_state["results"] = results
    st.session_state["resume_text"] = resume_text
    st.session_state["job_description"] = job_description
    st.session_state["use_ai"] = use_ai

if "results" in st.session_state:
    results = st.session_state["results"]
    st.divider()
    st.header("Your analysis")

    m1, m2, m3 = st.columns(3)
    m1.metric("Estimated job match", f'{results["match_score"]}%')
    m2.metric("Required skills found", f'{len(results["matched_skills"])} / {len(results["job_skills"])}')
    m3.metric("Resume word count", f'{results["resume_word_count"]:,}')

    st.progress(results["match_score"] / 100)
    st.caption("Score combines skill coverage and TF-IDF text similarity. Use it as guidance, not a hiring guarantee.")

    matched_col, missing_col = st.columns(2)
    with matched_col:
        st.subheader("✅ Skills found")
        if results["matched_skills"]:
            st.write(", ".join(results["matched_skills"]))
        else:
            st.write("No skills from the current skill dictionary were detected.")
    with missing_col:
        st.subheader("🎯 Skills to strengthen")
        if results["missing_skills"]:
            st.write(", ".join(results["missing_skills"]))
        else:
            st.write("No missing skills detected from the current skill dictionary.")

    st.subheader("🧭 Resume structure checks")
    checks = results["section_checks"]
    check_df = pd.DataFrame(
        [{"Section": name, "Status": "Found" if found else "Not detected"} for name, found in checks.items()]
    )
    st.dataframe(check_df, hide_index=True, use_container_width=True)
    st.caption("Section checks use heading keywords and may miss creatively formatted resumes.")

    st.subheader("📝 Suggested improvements")
    for suggestion in results["suggestions"]:
        st.markdown(f"- {suggestion}")

    st.subheader("💬 AI feedback and interview questions")
    if st.session_state.get("use_ai", False):
        with st.spinner("Generating optional AI feedback..."):
            ai_result = generate_ai_feedback(
                st.session_state["resume_text"],
                st.session_state["job_description"],
                results,
            )
        if ai_result["ok"]:
            st.markdown(ai_result["text"])
        else:
            st.warning(ai_result["text"])
    else:
        st.markdown("**Interview questions to practice**")
        for question in results["interview_questions"]:
            st.markdown(f"- {question}")
        st.caption("Enable optional OpenAI feedback in the sidebar if you have configured an API key.")

    report = [
        "# AI Career Copilot 2.0 — Analysis Report",
        "",
        f'- Estimated job match: **{results["match_score"]}%**',
        f'- Resume word count: **{results["resume_word_count"]}**',
        f'- Matched skills: {", ".join(results["matched_skills"]) or "None detected"}',
        f'- Missing skills: {", ".join(results["missing_skills"]) or "None detected"}',
        "",
        "## Suggested improvements",
        *[f"- {item}" for item in results["suggestions"]],
        "",
        "## Interview questions",
        *[f"- {item}" for item in results["interview_questions"]],
        "",
        "> This is an advisory report, not a hiring prediction.",
    ]
    st.download_button(
        "Download analysis report",
        data="\n".join(report),
        file_name="career_copilot_report.md",
        mime="text/markdown",
        use_container_width=True,
    )

st.divider()
st.caption("AI Career Copilot 2.0 • Local-first prototype • Review all AI-generated suggestions before using them.")
