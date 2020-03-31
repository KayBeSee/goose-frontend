import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import rem from '../../utils/rem';
import { orange, black } from '../../utils/colors';

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

const SignupNavItem = styled(NavItem)`
  border: 1px solid ${orange};
  pointer-events: none;
  
  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = ({ token, data, setIsOpen }) => (
  <Wrapper>
    <Nav>
      {/* <NavItem setIsOpen={setIsOpen} to="/new-video">New Video</NavItem> */}
      {/* <NavItem setIsOpen={setIsOpen} to="/new-show">New Show</NavItem> */}
      <NavItem setIsOpen={setIsOpen} to="/setlists">Setlists</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/videos">Videos</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/songs">Songs</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/about">About</NavItem>
      {token && data && data.me.email && <NavItem to="/me" setIsOpen={setIsOpen}><SignupNavItem>{data.me.email}</SignupNavItem></NavItem>}
      {!token && <NavItem setIsOpen={setIsOpen} to="/login">Login</NavItem>}
      {!token && <NavItem setIsOpen={setIsOpen} to="/signup"><SignupNavItem>Sign Up</SignupNavItem></NavItem>}
    </Nav>
  </Wrapper>
);

export default NavLinks;