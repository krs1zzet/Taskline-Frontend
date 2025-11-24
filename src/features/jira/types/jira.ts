export type JiraIssueLinkTypeDTO = {
    id: string;      // backend'de String olduğu için burada da string
    name: string;
    inward: string;
    outward: string;
    self: string;
  };
  
  export type IssueLinkTypesDTO = JiraIssueLinkTypeDTO[];
  