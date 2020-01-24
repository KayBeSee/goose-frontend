import React from 'react';
import styled from 'styled-components';


export const BandcampLogo = ({ bandcampAlbumId }) => (
  <BandcampLink
    target="_blank" 
    href={`https://goosetheband.bandcamp.com/album/${bandcampAlbumId}`}
    active={bandcampAlbumId}>
      <BandcampImage active={bandcampAlbumId} src={require('../../assets/bandcamp_logo.png')} />
    </BandcampLink>
);

const BandcampLink = styled.a`
  pointer-events: ${props => props.active ? 'auto' : 'none'}
`;

const BandcampImage = styled.img`
  width: 24px;
  height: 24px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;