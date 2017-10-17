import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';

import ChannelList from './ChannelList';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const client = new ApolloClient({
  networkInterface,
})

class App extends Component {
  render() {
    return (

      <ApolloProvider client={client}>
        <BrowserRouter>      
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Chatty</h1>
            </header>
            <Switch>
              <Route exact path='/' component={ ChannelList }/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;

// FOR MOCKING API //
// import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
// import { typeDefs } from './schema';
// const schema = makeExecutableSchema({ typeDefs });
// addMockFunctionsToSchema({ schema });
// const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });
// const client = new ApolloClient({
//   networkInterface: mockNetworkInterface
// });