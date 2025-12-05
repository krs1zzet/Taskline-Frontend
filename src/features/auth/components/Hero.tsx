import { Link } from "react-router-dom";
import img from "../assets/ganttimg.png";
import { config } from "../../../config/config";

export default function Hero() {
  
   const handleJiraLogin = () => {
      const apiBase = config.API_BASE.replace(/\/$/, "");
      window.location.href = `${apiBase}/api/atlassian/OAuth/authorize`;
    };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-20 overflow-hidden">

      {/* Background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>

      {/* Left Content */}
      <div className="flex flex-col gap-6 max-w-lg text-start z-10">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight text-gray-800 drop-shadow-sm">
          Your Jira Gantt Helper
        </h1>

        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
          Stop wasting time on Jira UI. Manage timelines, dependencies, and schedules 
          <span className="font-semibold text-blue-700"> 5x faster</span>.
        </p>

        <div className="mt-4">

          {/* 🔥 Updated Jira Login CTA Button */}
          <button
            onClick={handleJiraLogin}
            className="
              group 
              inline-flex items-center gap-3
              px-8 py-4 
              bg-[#0052CC] 
              text-white 
              rounded-xl 
              text-lg font-semibold 
              shadow-lg
              transition-all duration-300
              hover:bg-[#0747A6] 
              hover:shadow-2xl 
              transform hover:-translate-y-1
            "
          >
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6"
              viewBox="0 0 32 32"
              fill="white"
            >
              <path d="M27.7 3.1c-.4-.4-1.1-.4-1.5 0L17 12.3c-.4.4-.4 1.1 0 1.5l4.1 4.1c.4.4 1.1.4 1.5 0l7.1-7.1c.4-.4.4-1.1 0-1.5l-2-2.1zM14.8 10.2c-.4-.4-1.1-.4-1.5 0L3.1 20.5c-.4.4-.4 1.1 0 1.5l4.1 4.1c.4.4 1.1.4 1.5 0l10.3-10.3c.4-.4.4-1.1 0-1.5l-4.2-4.1z" />
            </svg>
            Start with Jira Login →
          </button>

          <p className="text-gray-500 text-sm mt-3">
            OAuth Secure Login • No credit card required.
          </p>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-auto flex justify-center mt-10 md:mt-0 z-10">
        <div className="relative">
          <img
            className="w-full max-w-sm sm:max-w-md md:max-w-xl rounded-xl shadow-2xl border border-white/40 backdrop-blur-xl"
            src={img}
            alt="hero"
          />

          <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
