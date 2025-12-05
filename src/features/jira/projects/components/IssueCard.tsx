import { useNavigate } from "react-router";
import type { JiraRelatedIssueDTO } from "../types/relatedIssues";

export default function IssueCard({ issue }: { issue?: JiraRelatedIssueDTO }) {
  const navigate = useNavigate();
  if (!issue) return null;

  const projectKey = issue.key?.split("-")?.[0] ?? "—";
  const reporter = issue.fields?.reporter;

  return (
    <button
      type="button"
      onClick={() => navigate(`/issues/${issue.key}`)}
      className="
        group w-full shrink-0 rounded-2xl border border-gray-200 
        bg-white p-5 text-left shadow-sm
        hover:shadow-xl hover:border-blue-300
        transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-blue-300
        relative overflow-hidden
      "
    >
      {/* Decorative gradient top border */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60" />

      {/* CARD CONTENT */}
      <div className="flex items-start gap-4">
        
        {/* Left bubble */}
        <div
          className="
            flex h-10 w-10 items-center justify-center 
            rounded-xl bg-blue-50 text-blue-600 font-bold text-sm 
            border border-blue-100 shadow-sm
          "
        >
          {projectKey}
        </div>

        <div className="min-w-0 flex-1">

          {/* Header info */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {/* Issue Key Badge */}
            <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs text-slate-700 font-medium">
              {issue.key}
            </span>

            {/* Reporter Badge */}
            <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-xs text-blue-700 font-medium">
              {reporter?.displayName ?? "Unknown Reporter"}
            </span>

            {/* Status (placeholder until real Jira status provided) */}
            <span
              className="
                rounded-lg bg-green-100 px-2 py-0.5 
                text-xs text-green-700 font-medium
              "
            >
              Open
            </span>
          </div>

          

          {/* Email */}
          {reporter?.emailAddress && (
            <div className="mt-1 truncate text-xs text-gray-500">
              {reporter.emailAddress}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER AREA */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 font-medium">
        <span className="group-hover:text-gray-900 transition-colors">
          View Issue
        </span>

        <span
          className="
            transform transition-transform duration-300 
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </div>
    </button>
  );
}
