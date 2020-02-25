import React from 'react';
import styled from 'styled-components';


export const YouTubeLogo = ({ videoId }) => {
  return (
    <YoutubeLink
      target="_blank"
      href={`https://www.youtube.com/watch?v=${videoId}`}
      active={videoId}
    >
      <YoutubeImage src={require('../../assets/youtube_logo.png')} />
    </YoutubeLink>
  );
}

const YoutubeLink = styled.a`
  pointer-events: ${props => props.active ? 'auto' : 'none'}
  opacity: ${props => !!props.active ? 0.95 : 0.25}
`;

const YoutubeImage = styled.img`
  width: 24px;
  height: 24px;
`;