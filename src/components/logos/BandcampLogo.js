import React from 'react';
import styled from 'styled-components';


export const BandcampLogo = ({ active }) => (
    <BandcampImage active={active} src={require('../../assets/bandcamp_logo.png')}>

    </BandcampImage>
);

const BandcampImage = styled.img`
  width: 24px;
  height: 24px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;