import { Sparkles, Upload } from "lucide-react";

export default function ResumeAnalyzer({ resume, handleResume, jobDescription, setJobDescription, notice, handleContinue, loading, analysis }) {
  return (
            <section className="mx-auto max-w-3xl">

              <div className="mb-7">

                <p className="text-xs font-medium text-violet-300">CAREER INTELLIGENCE / ANALYZER</p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Resume Analyzer</h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">Prepare your resume and target role for a structured analysis.</p>

              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#11111a] p-5 sm:p-8">

                <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-violet-400/40 bg-violet-500/[0.04] p-6 text-center">

                  <Upload size={28} className="text-violet-300" />

                  <span className="mt-4 text-sm font-semibold">{resume ? resume.name : "Choose your PDF resume"}</span>

                  <span className="mt-2 text-xs text-slate-500">PDF only, up to 10 MB</span>

                  <input type="file" accept=".pdf,application/pdf" onChange={handleResume} className="hidden" />

                </label>

                <label className="mt-6 block text-sm font-medium">

                  Job description

                  <textarea

                    rows={7}

                    value={jobDescription}

                    onChange={(event) => setJobDescription(event.target.value)}

                    placeholder="Paste the complete job description here..."

                    className="mt-3 w-full rounded-xl border border-white/10 bg-[#09090f] p-4 text-sm leading-6 outline-none placeholder:text-slate-600 focus:border-violet-400/60"

                  />

                </label>

                {notice && <p className="mt-3 text-xs leading-5 text-amber-300">{notice}</p>}



               <button

               onClick={handleContinue}

               disabled={loading}

               className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"

              >

               <Sparkles size={17} />

              {loading ? "Analyzing resume..." : "Prepare analysis"}

              </button>



                {analysis && (

  <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">

    <h3 className="mb-4 text-lg font-semibold text-white">

      Resume Analysis Results

    </h3>



    <p className="text-sm text-slate-400">Job Match Score</p>

    <p className="mb-5 text-3xl font-bold text-violet-300">

      {analysis.match_score}%

    </p>



    <h4 className="mb-2 font-semibold text-emerald-300">

      Matched Skills

    </h4>



{/* Skill Coverage */}

<div className="mt-5">

  <div className="mb-2 flex justify-between text-sm">

    <span className="text-slate-300">Skill Coverage</span>

    <span className="font-semibold text-violet-300">

      {analysis.skill_coverage}%

    </span>

  </div>

  <div className="h-2 overflow-hidden rounded-full bg-slate-700">

    <div

      className="h-full rounded-full bg-violet-500 transition-all"

      style={{

        width: `${Math.min(100, Math.max(0, Number(analysis.skill_coverage) || 0))}%`,

      }}

    />

  </div>

</div>



{/* Resume Improvement Suggestions */}

<div className="mt-6">

  <h4 className="mb-3 font-semibold text-white">

    Resume Improvement Suggestions

  </h4>

  {analysis.suggestions?.length ? (

    <ul className="space-y-2">

      {analysis.suggestions.map((suggestion, index) => (

        <li

          key={index}

          className="rounded-lg bg-white/5 p-3 text-sm text-slate-300"

        >

          {suggestion}

        </li>

      ))}

    </ul>

  ) : (

    <p className="text-sm text-slate-400">

      No suggestions available.

    </p>

  )}

</div>



{/* Interview Questions */}

<div className="mt-6">

  <h4 className="mb-3 font-semibold text-white">

    Interview Preparation

  </h4>

  {analysis.interview_questions?.length ? (

    <ol className="list-inside list-decimal space-y-2 text-sm text-slate-300">

      {analysis.interview_questions.map((question, index) => (

        <li key={index}>{question}</li>

      ))}

    </ol>

  ) : (

    <p className="text-sm text-slate-400">

      No interview questions available.

    </p>

  )}

</div>





    <h4 className="mb-2 font-semibold text-amber-300">

      Missing Skills

    </h4>

    <p className="text-sm text-slate-200">

      {analysis.missing_skills?.join(", ") || "No missing skills found."}

    </p>



 </div>

    )}

    </div>

  </section>
  );
}
