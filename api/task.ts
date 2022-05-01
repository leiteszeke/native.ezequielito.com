import { gql } from "@apollo/client";

const TASKS_QUERY = gql`
  query ($filters: TasksInput) {
    tasks(filters: $filters) {
      id
      name
      desc
      status
      project {
        name
      }
    }
  }
`;

export default {
  all: TASKS_QUERY,
};
