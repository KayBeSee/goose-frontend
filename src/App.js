import React from 'react';
import './App.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { AUTHORIZATION } from './constants';
import { offWhite } from './utils/colors';

// Pages
import Shows from './pages/shows';
import Show from './pages/show';
import Songs from './pages/songs';
import Song from './pages/song';
import Track from './pages/track'
import Login from './pages/login';
import Signup from './pages/signup';
import Homepage from './pages/homepage';
import NewShow from './pages/new-show';
import NewVideo from './pages/new-video';

// Other display components
import Header from './components/Nav/Header';
import Footer from './components/footer';

const httpLink = new HttpLink({
  uri: 'https://dry-atoll-86403.herokuapp.com/',
  // uri: 'http://localhost:4000/',
  credentials: 'same-origin'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const authorization = localStorage.getItem(AUTHORIZATION);
  if (authorization) {
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
            <Route path="/shows/:id" component={Show} />
            <Route path="/setlists" component={Shows} />
            <Route path="/songs/:id" component={Song} />
            <Route path="/songs" component={Songs} />
            <Route path="/track/:id" component={Track} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/new-show" component={NewShow} />
            <Route path="/new-video" component={NewVideo} />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/*">
              <img src={require("./assets/ski-goose.png")} style={{ maxWidth: 500 }} alt="logo" />
              <h1>Ooops!</h1>
            </Route>
          </Switch>
        </PageWrapper>
        {/* <Footer /> */}
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
  background: ${offWhite};
`;

export default App;
