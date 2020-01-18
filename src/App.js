import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, concat } from 'apollo-link';

import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { AUTHORIZATION } from './constants';

import ShowsDisplayer from './pages/shows';
import ShowDisplayer from './pages/show';
import SongsDisplayer from './pages/songs';
import SongDisplayer from './pages/song';
import TrackDisplayer from './pages/track'
import Login from './pages/login'
import Signup from './pages/signup'
import Header from './components/header';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  credentials: 'same-origin'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const authorization = localStorage.getItem(AUTHORIZATION);
  console.log('authorization: ', authorization);
  if(authorization) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization
      }
    }));
  } else {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers
      }
    }));
  }

  return forward(operation);
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authMiddleware, 
    httpLink
  ]),
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <WindowWrapper> */}
          <Header />
          <PageWrapper>
            <Switch>
              <Route path="/shows/:id" component={ShowDisplayer} />
              <Route path="/setlists" component={ShowsDisplayer} />
              <Route path="/songs/:id" component={SongDisplayer} />
              <Route path="/songs" component={SongsDisplayer} />
              <Route path="/track/:id" component={TrackDisplayer} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route exact path="/">
                foo
              </Route>
              <Route exact path="/*">
                <img src={require("./assets/ski-goose.png")} style={{ maxWidth: 500 }} alt="logo" />
                <h1>Ooops!</h1>
              </Route>
            </Switch>
          </PageWrapper>
        {/* </WindowWrapper> */}
      </Router>
    </ApolloProvider>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  flex: 1;
`;

export default App;
