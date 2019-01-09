import React from 'react';
import axios from 'axios';
import styled, {ThemeProvider} from 'styled-components';

const ax = axios.create({
  baseURL: 'http://localhost:5000', // this isn't working for some reason
});

const theme = {
  granite: '#6d6466',
  gray: '#9f9f92',
  lightGreen: '#d0fcb3',
  darkGreen: '#9bc59d',
  black: '#271f30',
};

const UserList = styled.div`
  width: 60%;
  border: 2px solid ${props => props.theme.black};
  background-color: ${props => props.theme.darkGreen};
  margin: 0 auto;
  box-shadow: 4px 4px 10px ${props => props.theme.black};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const User = styled.div`
  border: 2px solid ${props => props.theme.black};
  width: 50%;
  padding: 10px;
  margin: 10px;
  box-shadow: 2px 2px 10px ${props => props.theme.granite};
  color: ${props => props.theme.granite};
  transition: all 0.2s ease-out;

  &:hover {
    color: ${props => props.theme.black};
    font-weight: bold;
    transform: scale(1.2, 1.5);
    background-color: ${props => props.theme.gray};
  }
`;

class Users extends React.Component {
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
    if (!this.state.users.length) return <h3>loading</h3>;
    return (
      <ThemeProvider theme={theme}>
        <>
          <h2>users</h2>
          <UserList>
            {this.state.users.map(user => (
              <User key={user.id}>
                <p>{user.name}</p>
              </User>
            ))}
          </UserList>
        </>
      </ThemeProvider>
    );
  }
}

export default Users;
