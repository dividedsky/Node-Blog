import React from 'react';
import axios from 'axios';

const ax = axios.create({
  baseUrl: 'http://localhost:5000', // this isn't working for some reason
});

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    ax.get('http://localhost:5000/users')
      .then(res => {
        this.setState({users: res.data});
      })
      .catch(err =>
        console.log(`there was an error fetching the users: ${err}`),
      );
  }

  render() {
    if (!this.state.users.length) return <h3>loading</h3>;
    return (
      <div>
        <h2>users</h2>
        {this.state.users.map(user => (
          <p>{user.name}</p>
        ))}
      </div>
    );
  }
}

export default Users;
