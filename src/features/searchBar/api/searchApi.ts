import { http } from "../../../lib/http";
import { SearchIssueDTOList } from "../types/searchIssue";


export async function getIssuesByStringQuery(query: string): Promise<SearchIssueDTOList>{
    const res = await http.get<SearchIssueDTOList>("/jira/issue/picker",{params: { query }});
    return res.data
}