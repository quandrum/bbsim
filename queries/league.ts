import { gql } from '@apollo/client';

export const GET_MY_LEAGUES = gql`
  query GetMyLeagues {
    leagues {
      name
      id
    }
  }
`;

export const GET_ONE_LEAGUE = gql`
  query GetOneLeague($id: uuid) {
    leagues(where: { id: { _eq: $id } }) {
      name
      year
      week
      status
    }
  }
`;

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($name: String!, $year: Int, $creatorId: String) {
    league(object: { name: $name, year: $year, creator_id: $creatorId }) {
      id
    }
  }
`;
