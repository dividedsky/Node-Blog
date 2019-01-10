import React from 'react';
import axios from 'axios';
import styled, {ThemeProvider} from 'styled-components';

// theme for styled components
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
  border-radius: 5px;

  &:hover {
    color: ${props => props.theme.black};
    font-weight: bold;
    transform: scale(1.2, 1.5);
    background-color: ${props => props.theme.gray};
    border-radius: 200px;
  }
`;

const Users = props => {
  if (!props.users.length) return <h3>loading</h3>;
  return (
    <ThemeProvider theme={theme}>
      <>
        <h2>users</h2>
        <UserList>
          {props.users.map(user => (
            <User
              onClick={() => props.history.push(`/${user.id}`)}
              key={user.id}>
              <p>{user.name}</p>
            </User>
          ))}
        </UserList>
      </>
    </ThemeProvider>
  );
};

export default Users;
