import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { Route, Link, useLocation } from "react-router-dom";
import moment from 'moment';
import lighten from 'polished/lib/color/lighten';

import Setlist from './Setlist';
import Videos from './ShowVideos';
import Audio from './ShowAudio';
import NewShow from '../NewShow';

import { black, orange, offWhite, gray } from '../../utils/colors';
import { mobile } from '../../utils/media';

const SHOW = gql`
  query getShow($id: ID!) {
    show(where: {
      id: $id
    }) {
      id
      date
      eventName
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
            tracks {
              id
            }
					}
        }
      }
			relisten
			nugsNetId
			bandcampAlbumId
    }
  }
`;

const isVideosPage = (location) => {
  return location.pathname.indexOf('video') > -1;
}

const isSetlistPage = (location) => {
  return location.pathname.indexOf('setlist') > -1;
}

const isAudioPage = (location) => {
  return location.pathname.indexOf('audio') > -1;
}

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

  const location = useLocation();
  console.log('location: ', location);
  location.pathname.indexOf('video');

  if (showLoading) return <p>Loading...</p>;
  if (showError) return <p>Error :(</p>;
  const { id, date, eventName, setlist, venue, relisten, nugsNetId, bandcampAlbumId } = showData.show;

  document.title = `${moment(date).format('M/D/YYYY')} Goose Setlist - El Göose`;

  // get all videos from tracks
  let setlistVideoIds = getAllVideos(setlist);

  console.log('props.match: ', props.match);
  return (
    <Wrapper key={id}>
      <ShowHeaderWrapper>
        <BandDateWrapper>
          <ShowDateWrapper>{moment(date).format('dddd M/D/YYYY')}</ShowDateWrapper>
          <BandNameWrapper>Goose</BandNameWrapper>
        </BandDateWrapper>

        <ShowLinkWrapperDesktop>
          <ShowLink to={`setlist`} active={isSetlistPage(location)}>Setlist</ShowLink>
          <ShowLink to={`audio`} active={isAudioPage(location)}>Audio</ShowLink>
          <ShowLink to={`videos`} active={isVideosPage(location)}>Videos</ShowLink>
        </ShowLinkWrapperDesktop>
      </ShowHeaderWrapper>

      <VenueInfoContainer>
        <div>
          <Header>{eventName ? eventName : venue.name}</Header>
          {venue.city && venue.state && <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>}
        </div>
        <div>
          <Link to={'setlist/edit'}>Edit Show</Link>
        </div>
      </VenueInfoContainer>

      <ShowLinkWrapperMobile>
        <ShowLink to={`setlist`} active={isSetlistPage(location)}>Setlist</ShowLink>
        <ShowLink to={`audio`} active={isAudioPage(location)}>Audio</ShowLink>
        <ShowLink to={`videos`} active={isVideosPage(location)}>Videos</ShowLink>
      </ShowLinkWrapperMobile>

      <Route path="/shows/:id/videos" component={() => <Videos videosIds={setlistVideoIds} show={showData.show} />} />
      <Route path="/shows/:id/audio" exact component={() => <Audio relisten={relisten} nugsNetId={nugsNetId} bandcampAlbumId={bandcampAlbumId} />} />
      <Route path="/shows/:id/setlist" exact component={() => <Setlist setlist={showData.show.setlist} />} />
      <Route path="/shows/:id/setlist/edit" component={() => <NewShow show={showData.show} />} />

      {/* <Setlist show={showData.show} /> */}
      {/* <Videos videos={setlistVideos} show={showData.show} /> */}
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
    display: flex;
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
  display: flex;
  flex-wrap: wrap;
`;

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 24px;
	font-weight: 400;
`;

export const ShowLink = styled(Link)`
  color: ${props => props.active ? orange : lighten(0.10, gray)};
  font-weight: 700;
  text-decoration: none;
  padding: 12px;
  align-self: flex-end;
  cursor: pointer;
`;

const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
`;

export default Show;