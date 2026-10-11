
import { useState } from "react";
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
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setNotice("Your resume must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setResume(file);
    setAnalysis(null);
    setNotice("");
  };

  const handleContinue = async () => {
    if (!resume) {
      setNotice("Please upload your PDF resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      setNotice("Please enter the job description.");
      return;
    }

    setLoading(true);
    setNotice("");

    try {
      const result = await analyzeResume(
        resume,
        jobDescription.trim()
      );

      setAnalysis(result);
      setNotice("");
    } catch (error) {
      setNotice(
        error.message ||
          "Analysis failed. Please check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090f] text-slate-100">
      <Navbar
        page={page}
        setPage={setPage}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        setNotice={setNotice}
        openAnalyzer={openAnalyzer}
      />

      <main className="mx-auto w-full max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10">
        {page === "Overview" && (
          <Overview
            resume={resume}
            handleResume={handleResume}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            notice={notice}
            handleContinue={handleContinue}
            openAnalyzer={openAnalyzer}
            setPage={setPage}
          />
        )}

        {page === "Resume Analyzer" && (
          <ResumeAnalyzer
            resume={resume}
            handleResume={handleResume}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            notice={notice}
            handleContinue={handleContinue}
            loading={loading}
            analysis={analysis}
          />
        )}

        {page === "Job Tracker" && <JobTracker />}

        {page === "Interview Studio" && <InterviewStudio />}

        {page === "Settings" && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;
