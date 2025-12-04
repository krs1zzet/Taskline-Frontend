import { http } from "../../../../lib/http";
import { JiraRelatedIssuesDTO } from "../types/relatedIssues";

export async function getRelatedIssuesByUser(userId: string): Promise<JiraRelatedIssuesDTO> {
  const safeUserId = encodeURIComponent(userId);
  const res = await http.get<JiraRelatedIssuesDTO>(
    `/jira/issue-details/user/${safeUserId}/related-issues`
  );
  return res.data;
}
