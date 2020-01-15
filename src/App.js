import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ShowsDisplayer from './pages/shows';
import ShowDisplayer from './pages/show';
import SongsDisplayer from './pages/songs';
import SongDisplayer from './pages/song';
import TrackDisplayer from './pages/track'
import Header from './components/header';

const client = new ApolloClient({
  uri: 'http://localhost:4466',
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <WindowWrapper>
          <Header />
          <PageWrapper>
            <Switch>
              <Route path="/shows/:id" component={ShowDisplayer} />
              <Route path="/setlists">
                <ShowsDisplayer />
              </Route>
              <Route path="/songs/:id" component={SongDisplayer} />
              <Route path="/songs">
                <SongsDisplayer />
              </Route>
              <Route path="/track/:id" component={TrackDisplayer} />
              <Route exact path="/*">
                <img src={require("./assets/ski-goose.png")} style={{ maxWidth: 500 }} alt="logo" />
                <h1>Ooops!</h1>
              </Route>
            </Switch>
          </PageWrapper>
        </WindowWrapper>
      </Router>
    </ApolloProvider>
  );
}

const WindowWrapper = styled.div`

`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Raleway', sans-serif;
`;

export default App;
