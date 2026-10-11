import { BriefcaseBusiness, Search } from "lucide-react";

export default function JobTracker({ search, setSearch }) {
  return (
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
  );
}
