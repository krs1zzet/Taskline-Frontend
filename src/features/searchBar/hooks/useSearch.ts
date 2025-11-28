import { useQuery } from "@tanstack/react-query";
import { SearchIssueDTOList } from "../types/searchIssue";
import { getIssuesByStringQuery } from "../api/searchApi";


const QK = {
    issuePicker: (query : string) => ["jira", "issuePicker",query] as const,
};

export function useJiraIssuePicker(query: string){
    return useQuery<SearchIssueDTOList>({
        queryKey: QK.issuePicker(query),
        queryFn:() => getIssuesByStringQuery(query),
        enabled: query.trim().length > 0,
        retry: false,
        staleTime: 30_000,
        gcTime: 5 * 60_000,
    });
}