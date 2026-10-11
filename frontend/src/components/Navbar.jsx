import {
  BriefcaseBusiness, FileSearch, LayoutDashboard, Menu, Plus, Settings, Users, X, Zap,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Resume Analyzer", icon: FileSearch, tag: "AI" },
  { label: "Job Tracker", icon: BriefcaseBusiness },
  { label: "Interview Studio", icon: Users },
];

export default function Navbar({ page, setPage, mobileMenu, setMobileMenu, setNotice, openAnalyzer }) {
  return (
        <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#09090f]/90 backdrop-blur-xl">
          <div className="mx-auto flex min-h-[76px] max-w-[1500px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
            <button
              type="button"
              onClick={() => { setPage("Overview"); setMobileMenu(false); setNotice(""); }}
              className="flex shrink-0 items-center gap-3 text-left"
              aria-label="CareerCopilot home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/40">
                <Zap size={21} className="text-white" fill="currentColor" />
              </span>
              <span>
                <span className="block text-[16px] font-bold tracking-tight">Career<span className="text-violet-400">Copilot</span></span>
                <span className="mt-0.5 block text-[9px] font-medium tracking-[0.22em] text-slate-500">WORKSPACE 2.0</span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {navigation.map(({ label, icon: Icon, tag }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => { setPage(label); setMobileMenu(false); setNotice(""); }}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-medium transition xl:px-4 xl:text-[13px] ${page === label ? "bg-violet-500/15 text-white ring-1 ring-inset ring-violet-400/20" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"}`}
                >
                  <Icon size={16} className={page === label ? "text-violet-300" : "text-slate-500"} />
                  <span>{label}</span>
                  {tag && <span className="rounded-md bg-violet-500/15 px-1.5 py-0.5 text-[9px] font-bold text-violet-300">{tag}</span>}
                </button>
              ))}
              <button
                type="button"
                onClick={() => { setPage("Settings"); setMobileMenu(false); setNotice(""); }}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-medium transition xl:px-4 xl:text-[13px] ${page === "Settings" ? "bg-violet-500/15 text-white" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"}`}
              >
                <Settings size={16} /> Settings
              </button>
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 xl:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-emerald-300">Local mode</span>
              </span>
              <button
                type="button"
                onClick={openAnalyzer}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110 sm:px-4 sm:text-sm"
              >
                <Plus size={17} /><span className="hidden sm:inline">New analysis</span><span className="sm:hidden">New</span>
              </button>
              <button
                type="button"
                aria-label={mobileMenu ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenu}
                onClick={() => setMobileMenu((open) => !open)}
                className="rounded-xl border border-white/10 p-2.5 text-slate-300 transition hover:bg-white/[0.05] lg:hidden"
              >
                {mobileMenu ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <nav className="border-t border-white/[0.07] bg-[#0d0d16] px-5 py-3 sm:px-8 lg:hidden" aria-label="Mobile navigation">
              <div className="mx-auto grid max-w-[1500px] gap-1">
                {navigation.map(({ label, icon: Icon, tag }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => { setPage(label); setMobileMenu(false); setNotice(""); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${page === label ? "bg-violet-500/15 text-white" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}
                  >
                    <Icon size={17} className={page === label ? "text-violet-300" : "text-slate-500"} />
                    <span className="flex-1">{label}</span>
                    {tag && <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-[9px] font-bold text-violet-300">{tag}</span>}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setPage("Settings"); setMobileMenu(false); setNotice(""); }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${page === "Settings" ? "bg-violet-500/15 text-white" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}
                >
                  <Settings size={17} /> Settings
                </button>
              </div>
            </nav>
          )}
        </header>
  );
}
