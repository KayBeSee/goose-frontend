import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { Route, Link, useLocation } from "react-router-dom";
import moment from 'moment';
import lighten from 'polished/lib/color/lighten';


import AttendanceButton from '../shows/AttendanceButton';
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
              song {
                id
                name
              }
              set {
                id
                show {
                  id
                  date
                  venue {
                    id
                    name
                  }
                  setlist {
                    id
                    name
                    tracks {
                      id
                      song {
                        id
                        name
                      }
                    }
                  }
                }
              }
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
const getVideosFromSetlist = (setlist) => {
  let videoIds = [];
  const videos = setlist.reduce((videoIdArray, set) => {
    return videoIdArray.concat(set.tracks.reduce((trackAccume, track) => {
      return trackAccume.concat(track.videos.reduce((videoAccume, video) => {
        if (!videoIds.includes(video.videoId)) {
          videoIds.push(video.videoId);
          return videoAccume.concat(video);
        }
        return videoAccume;
      }, []));
    }, []));
  }, []);
  return videos;
}

const Show = (props) => {
  const { loading: showLoading, error: showError, data: showData } = useQuery(SHOW, { variables: { id: props.match.params.id } })

  const location = useLocation();

  if (showLoading) return <p>Loading...</p>;
  if (showError) return <p>Error :(</p>;
  const { id, date, eventName, setlist, venue, relisten, nugsNetId, bandcampAlbumId } = showData.show;

  document.title = `${moment(date).format('M/D/YYYY')} Goose Setlist - El Göose`;

  // get all videos from tracks
  let setlistVideos = getVideosFromSetlist(setlist);

  return (
    <Wrapper key={id}>
      <ShowHeaderWrapper>
        <BandDateWrapper>
          <ShowDateWrapper>{moment(date).format('dddd M/D/YYYY')}</ShowDateWrapper>
          <BandNameWrapper>Goose</BandNameWrapper>
        </BandDateWrapper>

        <DesktopAttendanceButton>
          <AttendanceButton showId={id} />
        </DesktopAttendanceButton>

        <ShowLinkWrapperDesktop>
          <ShowLink to={`setlist`} active={isSetlistPage(location)}>Setlist</ShowLink>
          <ShowLink to={`audio`} active={isAudioPage(location)}>Audio</ShowLink>
          <ShowLink to={`videos`} active={isVideosPage(location)}>Videos</ShowLink>
          <ShowLink to={`/edit-show/${id}`} active={false}>Edit</ShowLink>
        </ShowLinkWrapperDesktop>
      </ShowHeaderWrapper>

      <VenueInfoContainer>
        <div>
          <Header>{eventName ? eventName : venue.name}</Header>
          {venue.city && venue.state && <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>}
        </div>
      </VenueInfoContainer>

      <ShowLinkWrapperMobile>
        <ShowLink to={`setlist`} active={isSetlistPage(location)}>Setlist</ShowLink>
        <ShowLink to={`audio`} active={isAudioPage(location)}>Audio</ShowLink>
        <ShowLink to={`videos`} active={isVideosPage(location)}>Videos</ShowLink>
        <ShowLink to={`/edit-show/${id}`} active={false}>Edit</ShowLink>
      </ShowLinkWrapperMobile>

      <Route path="/shows/:id/videos" component={() => <Videos videos={setlistVideos} show={showData.show} />} />
      <Route path="/shows/:id/audio" exact component={() => <Audio relisten={relisten} nugsNetId={nugsNetId} bandcampAlbumId={bandcampAlbumId} />} />
      <Route path="/shows/:id/setlist" exact component={() => <Setlist show={showData.show} />} />

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
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
  margin-top: -16px;

  ${mobile(css`
    font-size: 24px;
    margin-top: 0px;
  `)};  
`;

const AttendanceButtonContainer = styled.div``;

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

const DesktopAttendanceButton = styled.div`
  display: flex;
  margin: 12px;

  ${mobile(css`
    display: none;
  `)};
`;

export default Show;