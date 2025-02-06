import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import App from "./App";

let uploadLink = createUploadLink({
  uri: "http://localhost:4000/v1/api/user/graphql", // Replace with your API endpoint
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
