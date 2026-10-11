import { Activity, ArrowRight, Check, FileText, Search, Sparkles, Target, Upload } from "lucide-react";

const activities = [
  { initials: "PY", title: "Python Developer", detail: "Resume analysis", score: "76%", color: "violet" },
  { initials: "AI", title: "AI Engineer", detail: "Ready for analysis", score: "—", color: "cyan" },
  { initials: "FS", title: "Full Stack Developer", detail: "Ready for analysis", score: "—", color: "green" },
];

export default function Overview({ resume, handleResume, jobDescription, setJobDescription, notice, handleContinue, openAnalyzer, setPage }) {
  return (
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

                    UI prototype · Resume analysis powered by your Python backend
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
  );
}
