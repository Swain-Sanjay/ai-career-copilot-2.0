export async function analyzeResume(resume, jobDescription) {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("job_description", jobDescription);
  formData.append("include_ai_feedback", "false");

  const response = await fetch("http://127.0.0.1:8000/api/analyze", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(typeof data.detail === "string" ? data.detail : "Resume analysis failed.");
  }
  return data;
}
