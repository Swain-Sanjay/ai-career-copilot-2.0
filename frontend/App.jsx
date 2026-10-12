import { useState } from "react";
import { CircleHelp } from "lucide-react";
import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import JobTracker from "./components/JobTracker";
import InterviewStudio from "./components/InterviewStudio";
import SettingsPage from "./components/SettingsPage";
import { analyzeResume } from "./services/api";

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
    if (!resume) { setNotice("Upload your PDF resume to continue."); return; }
    if (!jobDescription.trim()) { setNotice("Add a job description to continue."); return; }
    setLoading(true);
    setNotice("");
    setAnalysis(null);
    try {
      const data = await analyzeResume(resume, jobDescription);
      setAnalysis(data);
      setNotice("Resume analysis completed successfully!");
    } catch (error) {
      setNotice(error.message || "Unable to connect to the backend. Check that FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090f] text-slate-100">
      <main className="min-h-screen">
        <Navbar page={page} setPage={setPage} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} setNotice={setNotice} openAnalyzer={openAnalyzer} />
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          {page === "Overview" && <Overview resume={resume} handleResume={handleResume} jobDescription={jobDescription} setJobDescription={setJobDescription} notice={notice} handleContinue={handleContinue} openAnalyzer={openAnalyzer} setPage={setPage} />}
          {page === "Resume Analyzer" && <ResumeAnalyzer resume={resume} handleResume={handleResume} jobDescription={jobDescription} setJobDescription={setJobDescription} notice={notice} handleContinue={handleContinue} loading={loading} analysis={analysis} />}
          {page === "Job Tracker" && <JobTracker search={search} setSearch={setSearch} />}
          {page === "Interview Studio" && <InterviewStudio notice={notice} setNotice={setNotice} />}
          {page === "Settings" && <SettingsPage />}
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
