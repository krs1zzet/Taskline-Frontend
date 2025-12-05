import IssueCard from "./IssueCard";
import { useRelatedIssues } from "../hooks/useRelatedIssues";
import type { JiraRelatedIssuesDTO } from "../types/relatedIssues";

export default function Projects() {
  const userId = "712020:d3c49c95-498f-4583-b492-f70852cd8397";
  const { data, isLoading, error } = useRelatedIssues(userId);

  const issues: JiraRelatedIssuesDTO =
    Array.isArray(data) ? data : (data as any)?.issues ?? (data as any)?.relatedIssues ?? [];

  const onOpenIssue = (key: string) => {
    console.log("open", key);
  };

  return (
    <section className="space-y-4">
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg">
          Bir hata oluştu.
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-[90px] w-full rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {issues.filter(Boolean).map((i) => (
            <div
              key={i.id ?? i.key}
              onClick={() => onOpenIssue(i.key)}
              className="
                cursor-pointer 
                transition-transform 
                hover:-translate-y-1 
                hover:shadow-xl 
                rounded-xl
              "
            >
              <IssueCard issue={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
