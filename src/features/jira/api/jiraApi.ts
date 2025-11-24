import { http } from "../../../lib/http";
import { IssueLinkTypesDTO } from "../types/jira";

export async function getIssueLinkTypes(): Promise<IssueLinkTypesDTO> {
  const res = await http.get<IssueLinkTypesDTO>("/jira/issues");
  return res.data; // burada res.data: IssueLinkTypesDTO yani JiraIssueLinkTypeDTO[]
}
