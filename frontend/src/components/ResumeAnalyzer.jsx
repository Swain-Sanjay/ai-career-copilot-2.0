
import {
  Sparkles,
  Upload,
  FileText,
  Target,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  MessageSquareText,
} from "lucide-react";

function SkillTag({ skill, variant = "success" }) {
  const styles =
    variant === "success"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : "border-amber-400/20 bg-amber-400/10 text-amber-300";

  return (
    <span
      className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-medium ${styles}`}
    >
      {skill}
    </span>
  );
}

export default function ResumeAnalyzer({
  resume,
  handleResume,
  jobDescription,
  setJobDescription,
  notice,
  handleContinue,
  loading,
  analysis,
}) {
  const matchScore = Math.min(
    100,
    Math.max(0, Number(analysis?.match_score) || 0)
  );

  const skillCoverage = Math.min(
    100,
    Math.max(0, Number(analysis?.skill_coverage) || 0)
  );

  const matchedSkills = Array.isArray(analysis?.matched_skills)
    ? analysis.matched_skills
    : [];

  const missingSkills = Array.isArray(analysis?.missing_skills)
    ? analysis.missing_skills
    : [];

  const suggestions = Array.isArray(analysis?.suggestions)
    ? analysis.suggestions
    : [];

  const questions = Array.isArray(analysis?.interview_questions)
    ? analysis.interview_questions
    : [];

  return (
    <section className="mx-auto max-w-5xl space-y-7">
      {/* Page header */}
      <header>
        <p className="text-xs font-semibold tracking-[0.18em] text-violet-300">
          CAREER INTELLIGENCE / ANALYZER
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Resume Analyzer
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Compare your resume with a target job, discover skill gaps, and
          prepare for your next interview.
        </p>
      </header>

      {/* Upload form */}
      <section className="rounded-2xl border border-white/[0.08] bg-[#11111a] p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">
            <FileText size={20} />
          </div>

          <div>
            <h2 className="font-semibold">Analysis inputs</h2>
            <p className="mt-1 text-xs text-slate-500">
              Upload your resume and provide the target job description.
            </p>
          </div>
        </div>

        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-400/30 bg-violet-500/[0.04] p-6 text-center transition hover:border-violet-400/70 hover:bg-violet-500/[0.08]">
          <Upload size={28} className="text-violet-300" />

          <span className="mt-4 break-all text-sm font-semibold text-slate-200">
            {resume ? resume.name : "Choose your PDF resume"}
          </span>

          <span className="mt-2 text-xs text-slate-500">
            PDF only · Maximum file size 10 MB
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleResume}
            className="hidden"
          />
        </label>

        <label className="mt-6 block text-sm font-medium text-slate-200">
          Job description

          <textarea
            rows={7}
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the complete job description here..."
            className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-[#09090f] p-4 text-sm leading-6 text-slate-200 outline-none placeholder:text-slate-600 focus:border-violet-400/60"
          />
        </label>

        {notice && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-sm text-amber-300"
          >
            {notice}
          </p>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles size={17} />
          {loading ? "Analyzing resume..." : "Prepare analysis"}
        </button>
      </section>

      {/* Analysis results */}
      {analysis && (
        <section className="space-y-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-violet-300">
              YOUR REPORT
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Resume Analysis Results
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Review your results and identify areas to improve.
            </p>
          </div>

          {/* Score cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-[#11111a] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Job Match Score
                </span>
                <Target size={20} className="text-violet-300" />
              </div>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight text-violet-300">
                  {matchScore}%
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Estimated alignment between your resume and the job description.
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-500"
                  style={{ width: `${matchScore}%` }}
                />
              </div>
            </article>

            <article className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-[#11111a] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Skill Coverage
                </span>
                <CheckCircle2 size={20} className="text-cyan-300" />
              </div>

              <div className="mt-4">
                <span className="text-4xl font-bold tracking-tight text-cyan-300">
                  {skillCoverage}%
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Skill coverage as calculated by your backend.
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${skillCoverage}%` }}
                />
              </div>
            </article>
          </div>

          {/* Matched skills */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#11111a] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-400/10 p-2.5 text-emerald-300">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Matched Skills</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Skills identified as matching your target role
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {matchedSkills.length > 0 ? (
                matchedSkills.map((skill, index) => (
                  <SkillTag key={`${skill}-${index}`} skill={skill} />
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-400">
                  Matched skill names were not returned by the backend.
                  Check the API response to connect this section.
                </p>
              )}
            </div>
          </article>

          {/* Missing skills */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#11111a] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-400/10 p-2.5 text-amber-300">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Skills to Improve</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Skills required by the role that were not detected
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {missingSkills.length > 0 ? (
                missingSkills.map((skill, index) => (
                  <SkillTag
                    key={`${skill}-${index}`}
                    skill={skill}
                    variant="warning"
                  />
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-400">
                  No missing skills were reported by the backend.
                </p>
              )}
            </div>
          </article>

          {/* Improvement suggestions */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#11111a] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-400/10 p-2.5 text-violet-300">
                <Lightbulb size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Resume Improvement Suggestions</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Practical ways to strengthen your application
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-xs font-semibold text-violet-300">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-300">
                      {suggestion}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No improvement suggestions available.
                </p>
              )}
            </div>
          </article>

          {/* Interview preparation */}
          <article className="rounded-2xl border border-white/[0.08] bg-[#11111a] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-400/10 p-2.5 text-sky-300">
                <MessageSquareText size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Interview Preparation</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Questions to practice for your target role
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-400/10 text-xs font-semibold text-sky-300">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-300">
                      {question}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No interview questions available.
                </p>
              )}
            </div>
          </article>
        </section>
      )}
    </section>
  );
}
