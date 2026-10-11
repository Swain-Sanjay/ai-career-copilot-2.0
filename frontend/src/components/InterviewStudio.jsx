import { Sparkles } from "lucide-react";

export default function InterviewStudio({ notice, setNotice }) {
  return (
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
  );
}
