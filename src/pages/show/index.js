import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import moment from 'moment';
import lighten from 'polished/lib/color/lighten';
import YouTube from 'react-youtube';
import { Route, useHistory } from "react-router-dom";

import Setlist from './ShowSetlist';
import Videos from './ShowVideos';

import { black, orange, offWhite, gray } from '../../utils/colors';
import { mobile } from '../../utils/media';

const SHOW = gql`
  query getShow($id: ID!) {
    show(where: {
      id: $id
    }) {
      id
      date
      venue {
        id
        name
        city
        state
      }
      setlist {
        id
        name
        tracks {
          id
          notes
          segue
          song {
            id
            name
            notes
          }
					videos {
            id
						videoId
					}
        }
      }
			archiveUrl
			nugsNetId
			bandcampAlbumId
    }
  }
`;

// some fire use of reduce right here
const getAllVideos = (setlist) => {
  const videoIds = setlist.reduce((videoIdArray, set) => {
    return videoIdArray.concat(set.tracks.reduce((trackAccume, track) => {
      return trackAccume.concat(track.videos.reduce((videoAccume, video) => {
        if (!trackAccume.includes(video.videoId) && !videoIdArray.includes(video.videoId)) {
          return videoAccume.concat(video.videoId);
        }
        return videoAccume;
      }, []));
    }, []));
  }, []);
  return videoIds;
}

const Show = (props) => {
  const { loading: showLoading, error: showError, data: showData } = useQuery(SHOW, { variables: { id: props.match.params.id } })
  let history = useHistory();

  if (showLoading) return <p>Loading...</p>;
  if (showError) return <p>Error :(</p>;
  const { id, date, eventName, setlist, venue, archiveUrl, nugsNetId, bandcampAlbumId } = showData.show;

  document.title = `${moment(date).format('M/D/YYYY')} Goose Setlist - El Göose`;

  // get all videos from tracks
  let setlistVideoIds = getAllVideos(setlist);

  console.log('setlistVideoIds: ', setlistVideoIds);


  const hasStream = archiveUrl || nugsNetId || bandcampAlbumId;

  return (
    <Wrapper key={id}>
      <ShowHeaderWrapper>
        <BandDateWrapper>
          <ShowDateWrapper>{moment(date).format('dddd M/D/YYYY')}</ShowDateWrapper>
          <BandNameWrapper>Goose</BandNameWrapper>
        </BandDateWrapper>

        <ShowLinkWrapperDesktop>
          <ShowLink onClick={() => history.push(`./${props.match.params.id}/`)} active>Setlist</ShowLink>
          <ShowLink>Stream</ShowLink>
          <ShowLink onClick={() => history.push(`./${props.match.params.id}/videos`)} enabled={setlistVideoIds.length}>Videos</ShowLink>
          <ShowLink>Stats</ShowLink>
        </ShowLinkWrapperDesktop>
      </ShowHeaderWrapper>

      <VenueInfoContainer>
        <Header>{eventName ? eventName : venue.name}</Header>
        {venue.city && venue.state && <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>}
      </VenueInfoContainer>

      <ShowLinkWrapperMobile>
        <ShowLink onClick={() => history.push(`./${props.match.params.id}/`)} active>Setlist</ShowLink>
        <ShowLink>Stream</ShowLink>
        <ShowLink onClick={() => history.push(`./${props.match.params.id}/videos`)} enabled={setlistVideoIds.length}>Videos</ShowLink>
        <ShowLink>Stats</ShowLink>
      </ShowLinkWrapperMobile>

      <Route path="/shows/:id/videos" component={() => <Videos videosIds={setlistVideoIds} show={showData.show} />} />
      <Route path="/shows/:id" exact component={() => <Setlist show={showData.show} />} />
      {/* <Setlist show={showData.show} /> */}

      {/* <Setlist show={showData.show} /> */}
      {/* <Videos videos={setlistVideos} show={showData.show} /> */}

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
      {/* <Container>
        <Header>Videos</Header>
					{setlistVideos.map((video, index) => {
						return <YouTube key={index} videoId={video.videoId} />
					})}
      </Container>
      <Container>
        <Header>Comments</Header>
      </Container> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${offWhite};
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  color: ${black};
  margin: 0 12px;
`;

const ShowHeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BandDateWrapper = styled.div`
  display: inline-block;
	background: ${orange};
	padding: 8px;
	color: #ffffff;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;

  ${mobile(css`
    font-size: 24px;
  `)};  
`;

const ShowDateWrapper = styled.div`
  font-weight: 700;
  font-size: 36px;

  ${mobile(css`
    font-size: 24px;
  `)};  
`;

const BandNameWrapper = styled.div`
  font-size: 16px;
`;

const ShowLinkWrapperMobile = styled.div`
  display: inline-flex;
  display: none;

  ${mobile(css`
    margin-top: 24px;
    display: block;
  `)};
`;

const ShowLinkWrapperDesktop = styled.div`
  display: inline-flex;

  ${mobile(css`
    display: none;
  `)};
`;

const VenueInfoContainer = styled.div`
  padding: 0 12px;
`;

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 24px;
	font-weight: 400;
`;

export const ShowLink = styled(Link)`
  color: ${props => props.active ? orange : props.enabled ? lighten(0.2, orange) : lighten(0.10, gray)};
  font-weight: 700;
  text-decoration: none;
  padding: 12px;
  align-self: flex-end;
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

const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
`;

export default Show;