import { Activity } from "lucide-react";

export default function SettingsPage() {
  return (
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
  );
}
