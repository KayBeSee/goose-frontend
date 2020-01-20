import React from 'react';
import styled from 'styled-components';


export const YouTubeLogo = ({ active }) => {
  return (
      <YoutubeImage active={active} src={require('../../assets/youtube_logo.png')} />
  );
}


const YoutubeImage = styled.img`
  width: 24px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;