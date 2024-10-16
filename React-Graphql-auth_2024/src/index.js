import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
import App from './App';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/v1/api/user/graphql',
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/v1/api/user/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

