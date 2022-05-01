import { gql } from "@apollo/client";

const SPRINTS_QUERY = gql`
  query ($filters: SprintInput) {
    sprints(filters: $filters) {
      id
      name
      dateFrom
      dateTo
      status
      project {
        name
      }
      tasks {
        id
        name
        status
      }
    }
  }
`;

export default {
  all: SPRINTS_QUERY,
};
