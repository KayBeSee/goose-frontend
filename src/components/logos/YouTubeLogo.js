import React from 'react';
import styled from 'styled-components';


export const YouTubeLogo = ({ active }) => {
  console.log('active: ', active);
  return (
      <YoutubeImage active={active} src={require('../../assets/youtube_logo.png')}>
  
      </YoutubeImage>
  );
}


const YoutubeImage = styled.img`
  width: 24px;
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;