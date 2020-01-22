import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { AUTHORIZATION } from '../constants';
import { gray } from '../utils/colors';

const Footer = (props) => {
  return (
      <Wrapper>
          <FooterWrapper>
            <div>
              enjoyed with an ice cold mojito
            </div>
          </FooterWrapper>
      </Wrapper>
  )
}


const Wrapper = styled.div`
  background: #fff;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${gray};
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 48px;
  border: 1px solid #e7e7e7;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;


export default Footer;