import React from 'react';
import styled from 'styled-components';

import rem from '../../utils/rem';
import { Link } from "react-router-dom";
import { orange, black } from '../../utils/colors';

const NAVBAR_HEIGHT = 75;

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: ${rem(30)};
`;

const Nav = styled.div`
    display: flex;
    flex-direction: row;
`;

const NavItem = styled(Link).attrs(props => ({
  onClick: (e) => { props.setIsOpen && props.setIsOpen(false); }
}))`
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

const NavLinks = ({ token, data, logout, setIsOpen }) => (
  <Wrapper>
    <Nav>
      <NavItem setIsOpen={setIsOpen} to="/new-show">New Show</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/setlists">Setlists</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/songs">Songs</NavItem>
      {token && data && data.me.email && <NavItem setIsOpen={setIsOpen} style={{ fontWeight: 700 }}>{data.me.email}</NavItem>}
      {token && data && data.me.id && <LogoutButton setIsOpen={setIsOpen} onClick={logout}>Logout</LogoutButton>}
      {!token && <NavItem setIsOpen={setIsOpen} to="/login">Login</NavItem>}
      {!token && <NavItem setIsOpen={setIsOpen} to="/signup"><SignupNavItem>Sign Up</SignupNavItem></NavItem>}
        </Nav>
  </Wrapper>
);

export default NavLinks;