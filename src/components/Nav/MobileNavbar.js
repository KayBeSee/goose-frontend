import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Search, KeyboardArrowDown } from '@styled-icons/material';
import rem from '../../utils/rem';
import { offWhite, secondaryMenu } from '../../utils/colors';
import { mobile } from '../../utils/media';
import { Link } from "react-router-dom";

import NavbarLinks from './NavLinks';

const HEADER_HEIGHT = 75;

const Wrapper = styled.div`
  display: none;
  ${mobile(css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${rem(HEADER_HEIGHT)};
  `)};
`;

const SecondaryMenu = styled.div`
  position: absolute;
  top: ${rem(HEADER_HEIGHT)};
  left: 0;
  right: 0;
  ${p =>
    p.isOpen
      ? css`
          height: ${rem(HEADER_HEIGHT)};
        `
      : css`
          height: 0;
        `} display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${rem(20)};
  transition: height 0.1s;
  user-select: none;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
  background: ${secondaryMenu};
  color: #868686;
`;

const ArrowWrapper = styled.div`
  transition: transform 0.2s;
  ${p =>
    p.shouldRotate &&
    css`
      transform-origin: center center;
      transform: rotate(180deg);
    `};
`;

const SecondaryMenuItem = styled.div`
  padding-right: ${rem(20)};
`;

const StyledIcon = styled.div`
  && {
    width: ${p => rem(p.size || 20)};
    height: ${p => rem(p.size || 20)};
  }
`;

const Logo = styled.img`
    height: 50px;
    max-width: 225px;
    margin-left: 24px;
    margin-top: 16px;
`;

const MobileNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, data, logout } = props;

  return (
    <Wrapper>
      {/* {showSideNav !== false && (
        <div active={!isSideFolded} onClick={onSideToggle}>
          {isSideFolded ? <FoldIcon /> : <CloseIcon />}
        </div>
      )} */}

      <Link to={'/'}>
        <Logo src={require('../../assets/logo.png')} />
      </Link>
      <div>
        {/* <div onClick={onSearchButtonClick}>
          <StyledIcon as={Search} size={28} />
        </div> */}

        <div onClick={() => setIsOpen(!isOpen)} active={isOpen}>
          <ArrowWrapper shouldRotate={isOpen}>
            <StyledIcon as={KeyboardArrowDown} size={36} />
          </ArrowWrapper>
        </div>
      </div>

      <SecondaryMenu isOpen={isOpen}>
        <NavbarLinks setIsOpen={setIsOpen} token={token} data={data} logout={logout} />
      </SecondaryMenu>
    </Wrapper>
  );
};

export default MobileNavbar;