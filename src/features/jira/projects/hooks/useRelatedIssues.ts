import { useQuery } from "@tanstack/react-query";
import { JiraRelatedIssuesDTO } from "../types/relatedIssues";
import { getRelatedIssuesByUser } from "../api/jiraRelatedIssuesApi";

const QK = {
  relatedIssuesByUser: (userId: string) => ["jira", "related-issues", userId] as const,
};

export function useRelatedIssues(userId: string) {
  return useQuery<JiraRelatedIssuesDTO>({
    queryKey: QK.relatedIssuesByUser(userId),
    queryFn: () => getRelatedIssuesByUser(userId),
    enabled: Boolean(userId),
    retry: false,
    staleTime: 60_000,
  });
}
