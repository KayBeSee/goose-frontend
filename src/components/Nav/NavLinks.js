import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import rem from '../../utils/rem';
import { orange, black } from '../../utils/colors';

// const Wrapper = styled.nav`
//   display: flex;
//   align-items: center;
//   flex: 0 0 auto;
//   margin-right: ${rem(30)};
// `;

// const Nav = styled.div`
//     display: flex;
//     flex-direction: row;
// `;

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

const NavMiddle = styled.div`
  display: flex;
`;


const NavRight = styled.div`
  display: flex;
`;

const NavLinks = ({ token, data, setIsOpen }) => (
  <Fragment>
    {/* <Wrapper> */}
    {/* <Nav> */}
    <NavMiddle>
      {/* <NavItem setIsOpen={setIsOpen} to="/new-video">New Video</NavItem> */}
      {/* <NavItem setIsOpen={setIsOpen} to="/new-show">New Show</NavItem> */}
      <NavItem setIsOpen={setIsOpen} to="/setlists">Setlists</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/videos">Videos</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/songs">Songs</NavItem>
      <NavItem setIsOpen={setIsOpen} to="/about">About</NavItem>
    </NavMiddle>
    <NavRight>
      {token && data && data.me.email && <NavItem to="/me" setIsOpen={setIsOpen}><SignupNavItem>{data.me.email}</SignupNavItem></NavItem>}
      {!token && <NavItem setIsOpen={setIsOpen} to="/login">Login</NavItem>}
      {!token && <NavItem setIsOpen={setIsOpen} to="/signup"><SignupNavItem>Sign Up</SignupNavItem></NavItem>}
    </NavRight>
    {/* </Nav> */}
    {/* </Wrapper> */}
  </Fragment>
);

export default NavLinks;