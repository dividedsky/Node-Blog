import React, {Component} from 'react';
import './App.css';
import Users from './components/Users';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Varela Round', sans-serif;
  }
`;
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <div className="App">
          <Users />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
