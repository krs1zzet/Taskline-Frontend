import { useQuery } from "@tanstack/react-query";
import { IssueLinkTypesDTO } from "../jira/types/jira";
import { getIssueLinkTypes } from "../jira/api/jiraApi";

const QK = {
  issueLinksAll: ["links"] as const,
};

export function useJiraLink() {
  return useQuery<IssueLinkTypesDTO>({
    queryKey: QK.issueLinksAll,
    queryFn: getIssueLinkTypes,
    retry: false,
    staleTime: 60_000,
  });
}
