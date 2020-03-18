import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';
import { black, orange, offWhite } from '../utils/colors';

const TRACK = gql`
  query getTrack($id: ID!) {
    track(where: {
      id: $id
    }) {
      id
      notes
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
            city
            state
          }
        }
      }
      videos {
        id
        videoId
      }
    }
  }
`;

const TrackDisplayer = (props) => {
  const { loading, error, data } = useQuery(TRACK, { variables: { id: props.match.params.id } })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let setlistVideos = [];

  const { id, notes, videos, song, set: { show: { id: showId, date, venue } } } = data.track;
  return (
    <Wrapper key={id}>
      <Container>
        <BandDateContainer>
          <BandDateWrapper>
            Goose, <ShowLink to={`/shows/${showId}`}>{moment(date).format('dddd M/D/YYYY')}</ShowLink>
          </BandDateWrapper>
        </BandDateContainer>
        <HeaderContainer>
          <Header>{song.name}</Header>
          <ViewSongButton to={`/songs/${song.id}`}>View Song</ViewSongButton>
        </HeaderContainer>
        <VenueSubheader>{venue.name} - {venue.city}, {venue.state}</VenueSubheader>
        <NotesContainer>{notes}</NotesContainer>
      </Container>
      <Container>
        <Header>Videos</Header>
        {videos.map((video, index) => {
          return <YouTube key={index} videoId={video.videoId} />
        })}
      </Container>
      <Container>
        <Header>Comments</Header>

      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${offWhite};
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${black};
  margin-top: -1px;
`;

const VenueSubheader = styled.div`
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 400;
`;

const ShowLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BandDateContainer = styled.div`
	border-top: 4px solid ${orange};
	display: flex;
`;

const BandDateWrapper = styled.span`
	background: ${orange};
	padding: 8px;
	color: #ffffff;
	font-weight: 700;
`;

const Container = styled.div``;

const NotesContainer = styled.div``;

const Header = styled.h1`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ViewSongButton = styled(Link)`
  display: flex;
  align-items: center;
  color: #ffffff;
  background: #312b51;
  padding: 12px;
  border-radius: 4px;
  border: none;
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  margin: 0.67em 0;

  &:active, &:focus {
    border: none;
    outline: 0;
    background: #221e38;
    cursor: pointer;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default TrackDisplayer;