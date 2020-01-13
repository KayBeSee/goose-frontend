import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import ShowDisplayer from './components/shows';

const client = new ApolloClient({
  uri: 'http://localhost:4466',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ShowDisplayer />
      </div>
    </ApolloProvider>
  );
}

export default App;
