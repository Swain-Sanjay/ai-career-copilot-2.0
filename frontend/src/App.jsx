
import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  FileSearch,
  FileText,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Resume Analyzer", icon: FileSearch, tag: "AI" },
  { label: "Job Tracker", icon: BriefcaseBusiness },
  { label: "Interview Studio", icon: Users },
];

const activities = [
  { initials: "PY", title: "Python Developer", detail: "Resume analysis", score: "76%", color: "violet" },
  { initials: "AI", title: "AI Engineer", detail: "Ready for analysis", score: "—", color: "cyan" },
  { initials: "FS", title: "Full Stack Developer", detail: "Ready for analysis", score: "—", color: "green" },
];

function App() {
  const [page, setPage] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const openAnalyzer = () => {
    setPage("Resume Analyzer");
    setMobileMenu(false);
    setNotice("");
  };

  const handleResume = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setNotice("Please upload a PDF resume.");
      setResume(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setNotice("Your PDF must be smaller than 10 MB.");
      setResume(null);
      return;
    }

    setResume(file);
    setNotice("");
  };

 
const handleContinue = async () => {
  if (!resume) {
    setNotice("Upload your PDF resume to continue.");
    return;
  }

  if (!jobDescription.trim()) {
    setNotice("Add a job description to continue.");
    return;
  }

  setLoading(true);
  setNotice("");
  setAnalysis(null);

  try {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);
    formData.append("include_ai_feedback", "false");

    const response = await fetch(
      "http://127.0.0.1:8000/api/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof data.detail === "string"
          ? data.detail
          : "Resume analysis failed."
      );
    }

    setAnalysis(data);
    setNotice("Resume analysis completed successfully!");
  } catch (error) {
    setNotice(
      error.message ||
        "Unable to connect to the backend. Check that FastAPI is running."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#09090f] text-slate-100">
      {mobileMenu && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.07] bg-[#0d0d16] transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-[82px] items-center gap-3 border-b border-white/[0.07] px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/50">
            <Zap size={21} className="text-white" fill="currentColor" />
          </div>
          <div>
            <p className="text-[17px] font-bold tracking-tight">
              Career<span className="text-violet-400">Copilot</span>
            </p>
            <p className="text-[10px] font-medium tracking-[0.24em] text-slate-500">
              WORKSPACE 2.0
            </p>
          </div>
          <button
            className="ml-auto text-slate-500 lg:hidden"
            onClick={() => setMobileMenu(false)}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.22em] text-slate-600">
            WORKSPACE
          </p>
          <nav className="space-y-1">
            {navigation.map(({ label, icon: Icon, tag }) => (
              <button
                key={label}
                onClick={() => {
                  setPage(label);
                  setMobileMenu(false);
                  setNotice("");
                }}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] transition ${
                  page === label
                    ? "border border-violet-400/20 bg-violet-500/[0.12] text-white"
                    : "border border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon
                  size={18}
                  className={
                    page === label
                      ? "text-violet-400"
                      : "text-slate-500 group-hover:text-slate-300"
                  }
                />
                <span className="flex-1">{label}</span>
                {tag && (
                  <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-[9px] font-bold text-violet-300">
                    {tag}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] to-indigo-500/[0.04] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <Sparkles size={18} />
            </div>
            <p className="text-sm font-semibold">Your next opportunity</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Build a stronger resume, identify skill gaps, and prepare for
              your next interview.
            </p>
            <button
              onClick={openAnalyzer}
              className="mt-4 flex items-center gap-2 text-xs font-semibold text-violet-300 hover:text-white"
            >
              Start analyzing <ArrowRight size={14} />
            </button>
          </div>

          <button
            onClick={() => setPage("Settings")}
            className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-white/[0.04] hover:text-white"
          >
            <Settings size={17} /> Settings
          </button>

          <div className="mt-3 flex items-center gap-3 border-t border-white/[0.07] pt-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold">
              S
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">My workspace</p>
              <p className="mt-1 text-[11px] text-slate-500">Career explorer</p>
            </div>
            <ChevronDown size={16} className="text-slate-500" />
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-white/[0.07] bg-[#09090f]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileMenu(true)}
              className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
            >
              <Menu size={19} />
            </button>
            <div>
              <h1 className="text-sm font-semibold">{page}</h1>
              <p className="mt-1 hidden text-xs text-slate-500 sm:block">
                Your personal career intelligence workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-medium text-emerald-300">
                Local mode
              </span>
            </div>
            <button
              onClick={openAnalyzer}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110 sm:px-4 sm:text-sm"
            >
              <Plus size={17} /> <span className="hidden sm:inline">New analysis</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {page === "Overview" && (
            <>
              <section className="relative overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-[#1b1733] via-[#11111f] to-[#101019] p-7 sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]" />
                <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-blue-500/[0.08] blur-[70px]" />

                <div className="relative max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.08] px-3 py-2 text-[11px] font-medium text-violet-200">
                    <Sparkles size={14} /> Your AI-powered career workspace
                  </div>
                  <h2 className="mt-7 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-[58px]">
                    Turn your skills into
                    <br />
                    <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                      your next opportunity.
                    </span>
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    Analyze your resume, understand job requirements, and
                    discover the skills that move your career forward.
                  </p>
                  <button
                    onClick={openAnalyzer}
                    className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-violet-100"
                  >
                    Analyze your resume <ArrowRight size={17} />
                  </button>
                </div>
              </section>

              <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: "Resumes analyzed", value: "01", note: "Existing local prototype", icon: FileText, trend: "Your workspace" },
                  { title: "Last match score", value: "76%", note: "Python Developer", icon: Target, trend: "Previous result" },
                  { title: "Skills detected", value: "01", note: "From the last test", icon: Check, trend: "Skill coverage" },
                  { title: "Career activity", value: "New", note: "Your next analysis starts here", icon: Activity, trend: "Ready when you are" },
                ].map(({ title, value, note, icon: Icon, trend }) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-5 transition hover:border-violet-400/20"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-slate-400">{title}</p>
                      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 text-violet-300">
                        <Icon size={17} />
                      </div>
                    </div>
                    <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
                    <p className="mt-2 truncate text-xs text-slate-400">{note}</p>
                    <p className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] text-slate-600">{trend}</p>
                  </article>
                ))}
              </section>

              <section className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold">Start a new analysis</h3>
                      <p className="mt-1.5 text-xs text-slate-500">
                        Upload your resume and choose a target role.
                      </p>
                    </div>
                    <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">
                      <FileText size={20} />
                    </div>
                  </div>

                  <label className="mt-6 flex min-h-[155px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-violet-400/35 bg-violet-500/[0.035] px-5 py-6 text-center transition hover:border-violet-300/70 hover:bg-violet-500/[0.07]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-violet-300">
                      <Upload size={21} />
                    </span>
                    <span className="mt-3 text-sm font-semibold">
                      {resume ? resume.name : "Upload your resume"}
                    </span>
                    <span className="mt-1.5 text-xs text-slate-500">
                      PDF format · Maximum 10 MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleResume}
                      className="hidden"
                    />
                  </label>

                  <label className="mt-6 block text-xs font-semibold text-slate-300">
                    Target job description
                    <textarea
                      value={jobDescription}
                      onChange={(event) => setJobDescription(event.target.value)}
                      placeholder="Paste the job responsibilities, required skills, and qualifications..."
                      rows={4}
                      className="mt-3 w-full resize-y rounded-xl border border-white/[0.08] bg-[#0a0a12] p-4 text-sm font-normal leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/10"
                    />
                  </label>

                  {notice && (
                    <p className="mt-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] px-3 py-2.5 text-xs leading-5 text-amber-200">
                      {notice}
                    </p>
                  )}

                  <button
                    onClick={handleContinue}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3.5 text-sm font-semibold shadow-lg shadow-violet-950/20 transition hover:brightness-110"
                  >
                    <Sparkles size={17} /> Continue to analysis
                  </button>
                  <p className="mt-3 text-center text-[11px] text-slate-600">
                    UI prototype · Python backend integration is next
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">Recent activity</h3>
                      <p className="mt-1.5 text-xs text-slate-500">Your career workspace</p>
                    </div>
                    <button
                      onClick={() => setPage("Job Tracker")}
                      className="text-xs font-medium text-violet-300 hover:text-white"
                    >
                      View all
                    </button>
                  </div>

                  <div className="mt-5">
                    {activities.map((activity) => (
                      <button
                        key={activity.title}
                        onClick={openAnalyzer}
                        className="flex w-full items-center gap-3 border-b border-white/[0.06] py-4 text-left last:border-0"
                      >
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          activity.color === "violet"
                            ? "bg-violet-500/15 text-violet-300"
                            : activity.color === "cyan"
                              ? "bg-cyan-400/10 text-cyan-300"
                              : "bg-emerald-400/10 text-emerald-300"
                        }`}>
                          {activity.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{activity.title}</p>
                          <p className="mt-1 text-[11px] text-slate-500">{activity.detail}</p>
                        </div>
                        <span className="text-sm font-semibold text-emerald-300">{activity.score}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <Search size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                    <div>
                      <p className="text-xs font-semibold">Your next step</p>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">
                        Compare your resume against a complete job description
                        to identify relevant skills and areas to strengthen.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-7 rounded-2xl border border-white/[0.07] bg-[#11111a] p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-400/10 p-3 text-indigo-300">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Your career workflow</h3>
                    <p className="mt-1 text-xs text-slate-500">A simple path from resume to interview readiness.</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[
                    { number: "01", title: "Analyze", description: "Upload your resume and compare it with a target role." },
                    { number: "02", title: "Improve", description: "Identify missing skills and strengthen resume content." },
                    { number: "03", title: "Prepare", description: "Practice relevant interview questions and track applications." },
                  ].map((step) => (
                    <div key={step.number} className="rounded-xl border border-white/[0.06] p-4">
                      <p className="text-xs font-bold text-violet-300">{step.number}</p>
                      <p className="mt-3 text-sm font-semibold">{step.title}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {page === "Resume Analyzer" && (
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
)}


          {page === "Job Tracker" && (
            <section>
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-violet-300">CAREER INTELLIGENCE / APPLICATIONS</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">Job Tracker</h2>
                  <p className="mt-2 text-sm text-slate-400">Your application workspace.</p>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filter roles..." className="rounded-xl border border-white/10 bg-[#11111a] py-3 pl-9 pr-4 text-sm outline-none focus:border-violet-400/60" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { title: "Interested", description: "Roles to explore" },
                  { title: "Applied", description: "Applications submitted" },
                  { title: "Interview", description: "Interview opportunities" },
                ].map((column) => (
                  <div key={column.title} className="min-h-56 rounded-2xl border border-white/[0.07] bg-[#11111a] p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">{column.title}</h3>
                      <span className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs text-slate-400">0</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{column.description}</p>
                    <div className="mt-5 rounded-xl border border-dashed border-white/10 px-4 py-8 text-center">
                      <BriefcaseBusiness size={22} className="mx-auto text-slate-600" />
                      <p className="mt-3 text-xs text-slate-500">No saved applications yet</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-slate-500">The tracker layout is ready. Saving jobs and changing application status will be added in a later milestone.</p>
            </section>
          )}

          {page === "Interview Studio" && (
            <section className="mx-auto max-w-4xl">
              <p className="text-xs font-medium text-violet-300">CAREER INTELLIGENCE / PRACTICE</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Interview Studio</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">Practice common questions for your next technical interview.</p>
              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  { category: "PROJECTS", question: "Walk me through a project most relevant to this role. What was your contribution?" },
                  { category: "PROBLEM SOLVING", question: "Describe a difficult technical problem you solved and how you evaluated the result." },
                  { category: "ENGINEERING", question: "How do you test, debug, and maintain code when requirements change?" },
                  { category: "PYTHON", question: "Explain Python and describe a practical example of how you have used it." },
                ].map((item, index) => (
                  <article key={item.category} className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.16em] text-violet-300">{item.category}</span>
                      <span className="text-xs text-slate-600">0{index + 1}</span>
                    </div>
                    <p className="mt-5 text-sm leading-6 text-slate-200">{item.question}</p>
                    <button onClick={() => setNotice("Think through your answer using the STAR method: Situation, Task, Action, Result.")} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-violet-300 hover:text-white">
                      <Sparkles size={14} /> Show preparation tip
                    </button>
                  </article>
                ))}
              </div>
              {notice && <p className="mt-5 rounded-xl border border-violet-400/15 bg-violet-500/[0.06] p-4 text-sm leading-6 text-violet-200">{notice}</p>}
              <p className="mt-5 text-xs text-slate-500">AI-generated questions and answer feedback will be integrated after the free API provider is selected.</p>
            </section>
          )}

          {page === "Settings" && (
            <section className="max-w-2xl">
              <p className="text-xs font-medium text-violet-300">WORKSPACE / PREFERENCES</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Settings</h2>
              <div className="mt-7 rounded-2xl border border-white/[0.07] bg-[#11111a] p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-300"><Activity size={20} /></div>
                  <div>
                    <p className="text-sm font-semibold">Local development mode</p>
                    <p className="mt-1 text-xs text-slate-500">The frontend is running on your computer.</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-white/[0.07] pt-5">
                  <p className="text-sm font-medium">AI provider</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">No paid API is required for the current UI. We'll choose a free-tier provider before enabling AI feedback.</p>
                </div>
              </div>
            </section>
          )}

          <footer className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] py-6 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>CareerCopilot 2.0 · Personal career intelligence</p>
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5"><CircleHelp size={13} /> Day 1 prototype</span>
              <span>React + Tailwind CSS 4</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;