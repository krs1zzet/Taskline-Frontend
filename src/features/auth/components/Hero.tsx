import { Link } from "react-router-dom";
import img from "../assets/ganttimg.png";

export default function Hero() {
  return (
    <section className="bg-white min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-36 px-6">
      <div className="flex">
        <ul className="flex flex-col gap-6 max-w-md text-start font-custom-inter">
          <li className="font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Your Jira Gantt Helper
          </li>
          <li className="text-heroTextLight text-base sm:text-lg md:text-xl">
            Stop wasting time on jira UI.
          </li>
          <li>
            <Link
              to="/register"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-auto flex justify-center">
        <img
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl"
          src={img}
          alt="hero"
        />
      </div>
    </section>
  );
}
