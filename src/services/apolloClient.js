import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://dev.natureland.hipster-virtual.com/graphql'
});

// 🔐 Attach token automatically
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
/* checking changes */
/* import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// ✅ USE PROXY (IMPORTANT)
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/api/graphql'
});

// 🔐 Attach token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      key_pass: '07ba959153fe7eec778361bf42079439' // 👈 REQUIRED
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
}); */