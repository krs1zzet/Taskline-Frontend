import IssueCard from "./IssueCard";
import { useRelatedIssues } from "../hooks/useRelatedIssues";
import type { JiraRelatedIssuesDTO } from "../types/relatedIssues";

export default function Projects() {
  const userId = "712020:d3c49c95-498f-4583-b492-f70852cd8397";
  const { data, isLoading, error } = useRelatedIssues(userId);

  const issues: JiraRelatedIssuesDTO =
    Array.isArray(data) ? data : (data as any)?.issues ?? (data as any)?.relatedIssues ?? [];

  // Eski pattern gibi buraya koyabilirsin
  const onOpenIssue = (key: string) => {
    console.log("open", key);
  };

  return (
    <section className="space-y-3">
      {error ? <div className="text-red-600">Hata</div> : null}

      {isLoading ? (
        <div className="h-[92px] w-full rounded-2xl border bg-slate-50" />
      ) : (
        issues
          .filter(Boolean)
          .map((i) => (
            <div key={i.id ?? i.key} onClick={() => onOpenIssue(i.key)}>
              <IssueCard issue={i} />
            </div>
          ))
      )}
    </section>
  );
}
