from career_copilot.analyzer import analyze_resume, extract_skills


def test_extract_skills_detects_common_skills():
    found = extract_skills("Built a Python project using pandas, SQL, and FastAPI.")
    assert "python" in found
    assert "pandas" in found
    assert "sql" in found
    assert "fastapi" in found


def test_analyze_resume_returns_expected_fields():
    resume = """
    Summary: Python developer. Skills: Python, SQL, pandas, FastAPI.
    Projects: Built an analytics API. Education: B.Tech.
    """
    job = "Looking for Python, SQL, machine learning, and FastAPI."
    result = analyze_resume(resume, job)
    assert 0 <= result["match_score"] <= 100
    assert "python" in result["matched_skills"]
    assert "machine learning" in result["missing_skills"]
    assert result["resume_word_count"] > 0


def test_empty_job_skills_does_not_crash():
    result = analyze_resume("Python developer with projects and education.", "Friendly and curious candidate.")
    assert 0 <= result["match_score"] <= 100
    assert result["job_skills"] == []
