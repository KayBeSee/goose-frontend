import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';

import { gray } from '../../utils/colors';
import { mobile } from '../../utils/media';

import Setlist from './Setlist';

const ShowSetlist = ({ show, boxShadow, margin, selectedVideos }) => {
  const { eventName, setlist, venue, archiveUrl, nugsNetId, bandcampAlbumId } = show;

  const hasStream = archiveUrl || nugsNetId || bandcampAlbumId;

  return (
    <Fragment>
      <Setlist setlist={show.setlist} />

      <Container>
        {hasStream && <Header>Stream / Download</Header>}
        {hasStream && (
          <StreamContainer>
            {archiveUrl && (<StreamLink
              active={archiveUrl}
              target="_blank"
              href={`https://archive.org/details/${archiveUrl}`}>
              <img
                src={require("../../assets/internet_archive_large.png")}
                style={{ width: "100%", maxHeight: 100 }}
              />
            </StreamLink>)}
            {nugsNetId && (<StreamLink
              active={nugsNetId}
              target="_blank"
              href={`https://play.nugs.net/#/catalog/recording/${nugsNetId}`}>
              <img
                src={"https://api.nugs.net/assets/nugsnet/images/shared/logo.png"}
                style={{ width: "100%", maxHeight: 100 }}
              />
            </StreamLink>)}
            {bandcampAlbumId && (<StreamLink active={bandcampAlbumId} target="_blank" href={`https://goosetheband.bandcamp.com/album/${bandcampAlbumId}`}>
              <img
                src={require("../../assets/bandcamp_logo_large.png")}
                style={{ width: "100%", maxHeight: 100 }}
              />
            </StreamLink>)}
          </StreamContainer>
        )}
      </Container>
    </Fragment>
  )
}

const Header = styled.h2`
  // font-family: 'Montserrat', sans-serif;
  margin: 48px 0 24px;
`;

const StreamContainer = styled.div`
	display: flex;
  flex-direction: row;
  
  ${mobile(css`
    flex-direction: column;
  `)};
`;

const StreamLink = styled.a`
	display: flex;
	flex: 1;
	opacity: ${props => props.active ? 1 : 0.25};
	pointer-events: ${props => props.active ? 'auto' : 'none'};
	// background: ${gray};
	margin: 0 0.1em;
	padding: 0.5em 0;
	text-decoration: none;
	justify-content: center;
	color: #b24d3b;
	font-size: 24px;
	font-weight: 700;
`;

const Container = styled.div`
  padding: 0 12px;
`;

export default ShowSetlist;