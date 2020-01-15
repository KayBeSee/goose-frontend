import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Header = (props) => (
    <Wrapper>
        <HeaderWrapper>
            <Link to="/">
              <Logo src={require('../assets/logo.png')} />
            </Link>
            <Nav>
                <NavItem to="/setlists">
                    Setlists
                </NavItem>
                <NavItem to="/songs">
                    Songs
                </NavItem>
            </Nav>
        </HeaderWrapper>
    </Wrapper>
)

const Wrapper = styled.div`
  background: #fff;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: rgba(66,66,66,.95);
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
  color: rgba(66,66,66,.95);

  &:hover {
    text-decoration: underline;
  }
`;


export default Header;