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

      className="group w-full shrink-0 rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-xl bg-slate-100" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">{projectKey}</span>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {issue.key}
            </span>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {reporter?.displayName ?? "—"}
            </span>
          </div>

          {/* İstersen burada issue summary vb. gösterebilirsin (response’da varsa) */}
          <div className="mt-1 truncate text-sm font-semibold text-slate-900">
            Reporter: {reporter?.displayName ?? "—"}
          </div>

          <div className="mt-1 truncate text-xs text-slate-500">
            {reporter?.emailAddress ?? ""}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span className="group-hover:text-slate-700">Open</span>
        <span aria-hidden>→</span>
      </div>
    </button>
  );
}
