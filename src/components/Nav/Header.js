import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import { black } from '../../utils/colors';
import { getToken, removeToken } from '../../utils/token';
import { mobile } from '../../utils/media';
import NavLinks from './NavLinks'

import MobileNavbar from './MobileNavbar';

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

const logout = () => {
  removeToken();
  window.location.reload();
}

const Header = (props) => {
  const { loading, error, data } = useQuery(ME);
  const token = getToken();

  // KBC-TODO: need to add loading and error state to navigation

  return (
    <Wrapper>
      <HeaderWrapper>
        <Link to="/">
          <Logo src={require('../../assets/logo.png')} />
        </Link>
        <NavLinks token={token} data={data} logout={logout} />
      </HeaderWrapper>
      <MobileNavbar token={token} data={data} logout={logout} />
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

  ${mobile(css`
    display: none;
  `)};
`;

const Logo = styled.img`
    height: 75px;
    max-width: 225px;
`;

export default Header;