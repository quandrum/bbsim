import {
  ApolloClient,
  InMemoryCache,
  from,
  split,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth } from './useAuth';
import { ReactChild, ReactElement } from 'react';

type Props = {
  children: ReactChild;
};

export const HasuraProvider = ({ children }: Props): ReactElement => {
  const { token } = useAuth();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const httpLink = new HttpLink({
    uri: 'https://bbsim.hasura.app/v1/graphql',
    headers,
  });

  let link;

  if (typeof window !== 'undefined') {
    const wsLink = new WebSocketLink({
      uri: 'wss://bbsim.hasura.app/v1/graphql',
      options: {
        reconnect: true,
        connectionParams: {
          headers,
        },
      },
    });

    link = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === 'OperationDefinition' && def.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    );
  } else {
    link = httpLink;
  }

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    link: from([errorLink, link]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
