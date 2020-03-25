import React, { Fragment } from 'react';
import styled from 'styled-components';

import { orange, darkOrange, gray, darkGray } from '../../utils/colors';

const ShowAudio = ({ archiveUrl, nugsNetId, bandcampAlbumId }) => {
  const hasStream = archiveUrl || nugsNetId || bandcampAlbumId;


  if (hasStream) {
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
  } else {
    return (
      <UnavailableContainer>
        <UnavailableTextContainer>
          <h2>Audio Unavailable</h2>

          <h5>No audio has been released for this show. Click follow or I was there to get notified if any content gets added later.</h5>
          <FollowButton>Follow Show</FollowButton>
        </UnavailableTextContainer>
        <MoonCabinImageContainer>
          <MoonCabinImage src={require("../../assets/moon_cabin.png")} />
        </MoonCabinImageContainer>
      </UnavailableContainer>
    )
  }
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

const UnavailableContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
`;

const UnavailableTextContainer = styled.div`
  flex: 2 1 300px;
`;

const MoonCabinImageContainer = styled.div`
  display: flex;
  flex: 1 0 200px;
`;

const MoonCabinImage = styled.img`
  width: 100%;
`;

const StreamImage = styled.img`
  width: 100%;
  flex 1;
`;

const FollowButton = styled.button`
  padding: 16px;
  background: ${props => props.active ? orange : gray};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  outline: 0;

  &:hover {
    cursor: pointer;
  }

  &:active {
    outline: 0;
    background: ${props => props.active ? darkOrange : darkGray};
  }

  &:focus {
    outline: 0;
  }
`;

export default ShowAudio;