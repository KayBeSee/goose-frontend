import React from 'react';
import styled from 'styled-components';

const ShowAudio = ({ archiveUrl, nugsNetId, bandcampAlbumId }) => {
  return (
    <Container>
      <Header>Available on</Header>
      <StreamContainer>
        {archiveUrl && <StreamLink
          active={archiveUrl}
          target="_blank"
          href={`https://archive.org/details/${archiveUrl}`}>
          <StreamImage src={require("../../assets/relisten_app_icon.png")} />
        </StreamLink>}
        {nugsNetId && <StreamLink active={nugsNetId} target="_blank" href={`https://play.nugs.net/#/catalog/recording/${nugsNetId}`}>
          <StreamImage src={require("../../assets/nugs_with_words.png")} />
        </StreamLink>}
        {bandcampAlbumId && <StreamLink active={bandcampAlbumId} target="_blank" href={`https://goosetheband.bandcamp.com/album/${bandcampAlbumId}`}>
          <StreamImage src={require("../../assets/bandcamp_logo_large.png")} />
        </StreamLink>}
      </StreamContainer>
    </Container>
  )
}

const Header = styled.h2`
  // font-family: 'Montserrat', sans-serif;
  // margin: 48px 0 24px;
`;

const StreamContainer = styled.div`
	display: flex;
  flex-direction: row;
  align-items: center;
`;

const StreamImage = styled.img`
  width: 100%;
`;

const StreamLink = styled.a`
	flex: 1;
	opacity: ${props => props.active ? 1 : 0.25};
	pointer-events: ${props => props.active ? 'auto' : 'none'};
	margin: 0 0.1em;
	padding: 2em;
	text-decoration: none;
	justify-content: center;
  color: #b24d3b;
`;

const Container = styled.div`
  padding: 24px;
  border-radius: 4px;
  line-height: 1.5;
  background: #fff;
  margin: 24px 0;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
  border-radius: 4px;
`;

export default ShowAudio;