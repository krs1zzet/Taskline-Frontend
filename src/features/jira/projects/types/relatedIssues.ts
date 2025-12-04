export type JiraReporterDTO = {
    emailAddress: string;
    displayName: string;
  };
  
  export type JiraRelatedIssueDTO = {
    id: string;
    key: string;
    fields: {
      reporter: JiraReporterDTO;
    };
  };
  
  export type JiraRelatedIssuesDTO = JiraRelatedIssueDTO[];
  