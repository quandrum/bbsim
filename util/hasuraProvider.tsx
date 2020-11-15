import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth } from './useAuth';

export const HasuraProvider = ({ children }) => {
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

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
