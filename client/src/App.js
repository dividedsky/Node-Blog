import React, {Component} from 'react';
import './App.css';
import Users from './components/Users';
import UserPosts from './components/UserPosts';
import {createGlobalStyle} from 'styled-components';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';

// axios instance with base url to simplify requests
const ax = axios.create({
  baseURL: 'http://localhost:5000',
});

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Varela Round', sans-serif;
  }
`;
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    ax.get('/users')
      .then(res => {
        this.setState({users: res.data});
      })
      .catch(err =>
        console.log(`there was an error fetching the users: ${err}`),
      );
  }
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <div className="App">
          <Route
            path="/"
            exact
            render={props => <Users {...props} users={this.state.users} />}
          />
          <Route path="/:id" render={props => <UserPosts {...props} />} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
