import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { AUTHORIZATION } from '../constants';
import { orange, black } from '../utils/colors';

const logout = () => {
  localStorage.removeItem(AUTHORIZATION);
}

const ME = gql`
  query {
    me {
      id
      email
      shows {
        id
      }
    }
  }
`;

const Header = (props) => {
  const { loading, error, data } = useQuery(ME);
  const token = localStorage.getItem(AUTHORIZATION);

  return (
      <Wrapper>
          <HeaderWrapper>
              <Link to="/">
                <Logo src={require('../assets/logo.png')} />
              </Link>
              <Nav>
                  <NavItem to="/setlists">Setlists</NavItem>
                  <NavItem to="/songs">Songs</NavItem>
                  {token && data && data.me.email && <NavItem style={{ fontWeight: 700 }}>{data.me.email}</NavItem>}
                  {token && data && data.me.id && <LogoutButton onClick={logout}>Logout</LogoutButton>}
                  {!token && <NavItem to="/login">Login</NavItem>}
                  {!token && <NavItem to="/signup"><SignupNavItem>Sign Up</SignupNavItem></NavItem>}
              </Nav>
          </HeaderWrapper>
      </Wrapper>
  )
}


const Wrapper = styled.div`
  background: #fff;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${black};
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 12px;
  border: 1px solid #e7e7e7;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Logo = styled.img`
    height: 75px;
    max-width: 225px;
`;

const Nav = styled.div`
    display: flex;
    flex-direction: row;
`;

const NavItem = styled(Link)`
  padding: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${black};
`;

const LogoutButton = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${black};
  cursor: pointer;
`;

const SignupNavItem = styled(NavItem)`
  border: 1px solid ${orange};
  pointer-events: none;
  
  &:hover {
    text-decoration: none;
  }
`;


export default Header;