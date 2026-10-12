
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Target,
  BriefcaseBusiness,
} from "lucide-react";

const stats = [
  {
    title: "Resumes Analyzed",
    value: "01",
    note: "Your workspace activity",
    icon: FileText,
    color: "text-violet-300",
    bg: "bg-violet-500/10",
  },
  {
    title: "Last Match Score",
    value: "76%",
    note: "Python Developer",
    icon: Target,
    color: "text-cyan-300",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Career Activities",
    value: "03",
    note: "Explore your next opportunity",
    icon: Activity,
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
  },
];

const activities = [
  {
    initials: "PY",
    title: "Python Developer",
    detail: "Previous resume analysis",
    score: "76%",
    color: "bg-violet-500/15 text-violet-300",
  },
  {
    initials: "AI",
    title: "AI Engineer",
    detail: "Ready for analysis",
    score: "Start",
    color: "bg-cyan-500/10 text-cyan-300",
  },
  {
    initials: "FS",
    title: "Full Stack Developer",
    detail: "Ready for analysis",
    score: "Start",
    color: "bg-emerald-500/10 text-emerald-300",
  },
];

export default function Overview({ openAnalyzer, setPage }) {
  return (
    <div className="space-y-7">
      {/* Welcome header */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-[#21183d] via-[#141322] to-[#101019] p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />

        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-2 text-xs text-violet-200">
            <Sparkles size={14} />
            Your AI-powered career workspace
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">
            Welcome to your
            <span className="block bg-gradient-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent">
              career dashboard.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Track your progress, analyze your resume against job descriptions,
            and discover opportunities to grow your career.
          </p>

          <button
            onClick={openAnalyzer}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-100"
          >
            <Sparkles size={16} />
            Start New Analysis
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-5 transition hover:border-violet-400/25"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.title}</p>
                <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-5 text-3xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-xs text-slate-500">{stat.note}</p>
            </article>
          );
        })}
      </section>

      {/* Recent activity */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Recent Activity</h2>
              <p className="mt-1 text-xs text-slate-500">
                Explore your target career roles
              </p>
            </div>

            <button
              onClick={() => setPage("Job Tracker")}
              className="text-xs font-medium text-violet-300 transition hover:text-white"
            >
              Job Tracker
            </button>
          </div>

          <div className="mt-4">
            {activities.map((activity) => (
              <button
                key={activity.title}
                onClick={openAnalyzer}
                className="flex w-full items-center gap-3 border-b border-white/[0.06] py-4 text-left last:border-0"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${activity.color}`}
                >
                  {activity.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {activity.detail}
                  </p>
                </div>

                <span className="text-xs font-semibold text-slate-300">
                  {activity.score}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
              <BriefcaseBusiness size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold">Your Next Steps</h2>
              <p className="mt-1 text-xs text-slate-500">
                Build your career one step at a time
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {[
              "Compare your resume with a target job",
              "Identify missing skills and improvement areas",
              "Prepare for interviews with relevant questions",
            ].map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-300"
                />
                <div>
                  <p className="text-sm text-slate-200">{step}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Step {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={openAnalyzer}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20"
          >
            Go to Resume Analyzer
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <p className="pb-2 text-center text-xs text-slate-600">
        AI Career Copilot 2.0 · Your career journey starts here
      </p>
    </div>
  );
}
