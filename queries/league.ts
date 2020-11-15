import { gql } from '@apollo/client';

export const GET_MY_LEAGUES = gql`
  query GetMyLeagues {
    leagues {
      name
      id
    }
  }
`;

export const CREATE_LEAGUE = gql`
  mutation CreateLeague($name: String!, $creatorId: String) {
    insert_leagues_one(object: { name: $name, creator_id: $creatorId }) {
      name
      creator_id
    }
  }
`;
