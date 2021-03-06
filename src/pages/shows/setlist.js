import React from 'react';
import moment from 'moment';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

import { black, orange, darkOffWhite } from '../../utils/colors';
import { mobile } from '../../utils/media';

import SetlistLoading from './SetlistLoading';
import AttendanceButton from './AttendanceButton';


const Setlist = ({ loading, show, includeNotes = true }) => {
  if (loading) {
    return <SetlistLoading />
  } else {
    const { id, date, eventName, venue, setlist, notes, relisten, nugsNetId, bandcampAlbumId } = show;

    let setlistNotes = [];
    let setlistVideos = [];

    const hasStream = relisten || nugsNetId || bandcampAlbumId;
    return (
      <Wrapper>
        <BandDateContainer>
          <BandDateWrapper>
            Goose, <ShowLink to={`/shows/${id}/setlist`}>{moment(date).format('dddd M/D/YYYY')}</ShowLink>
          </BandDateWrapper>
        </BandDateContainer>
        <ShowDataBody>
          <VenueInfoContainer>
            <Header>{eventName ? eventName : venue.name}</Header>
            {venue.city && venue.state && <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>}
          </VenueInfoContainer>
          <DesktopAttendanceButton>
            <AttendanceButton showId={id} />
          </DesktopAttendanceButton>
        </ShowDataBody>
        <NotesContainer>{notes}</NotesContainer>
        <SetlistWrapper>
          {setlist.map(({ name, tracks }) => (
            <SetWrapper>
              <SetTitle>{name.replace('_', ' ')}: </SetTitle>
              {tracks.map(({ id, notes, song, segue, videos }, index) => {
                // add note to the notes array for later renderin
                if (!!notes) {
                  setlistNotes.push(notes);
                }
                if (videos) {
                  setlistVideos.push(...videos);
                }
                return (
                  <TrackWrapper key={id}>
                    <TrackLink to={`/songs/${song.id}`}>{song.name}</TrackLink>
                    {!!notes && <TrackNoteAnnotation>[{setlistNotes.length}]</TrackNoteAnnotation>}
                    {segue ? ' > ' : (tracks.length - 1 === index) ? ' ' : ', '}

                  </TrackWrapper>
                )
              })
              }
            </SetWrapper>
          )
          )}

          {includeNotes && !!setlistNotes.length && (
            <NotesWrapper>
              <NotesHeader>Coach's Notes</NotesHeader>
              {setlistNotes.map((note, index) => (
                <TrackNote>[{index + 1}] {note}</TrackNote>
              ))}
            </NotesWrapper>
          )}
          {hasStream && (
            <MediaWrapper>
              <span>Available on </span>
              {nugsNetId && <span>Nugs.net, </span>}
              {bandcampAlbumId && <span>Bandcamp, </span>}
              {relisten && <span>Relisten, </span>}
              {!!setlistVideos.length && <span>YouTube </span>}
            </MediaWrapper>
          )}
        </SetlistWrapper>
        <MobileAttendanceButton>
          <AttendanceButton showId={id} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, width: '100%' }} />
        </MobileAttendanceButton>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #fff;
  margin: 48px 0;
  box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.15);
  border-radius: 4px;
`;

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 1.5em;
	font-weight: 400;
`;

const BandDateContainer = styled.div`
	border-top: 4px solid ${orange};
	display: flex;
`;

const ShowLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ShowDataBody = styled.div`
  padding: 0 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const NotesContainer = styled.div``;

const NotesWrapper = styled.div`
  padding: 0 0 12px 0;
`;

const NotesHeader = styled.h5`
  margin: 1.33em 0 .3em;
`;

const BandDateWrapper = styled.span`
	background: ${orange};
	padding: 8px;
	color: #ffffff;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  margin-top: -16px;
`;

const VenueInfoContainer = styled.div``;

const SetlistWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  line-height: 1.5;
`;

const SetWrapper = styled.div`
	padding: 16px 0;
`;

const SetTitle = styled.span`
	font-size: 16px;
	font-weight: 700;
	color: ${orange};
`;

const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
  font-size: 2em;
`;

const TrackWrapper = styled.span``;

const TrackLink = styled(Link)`
  text-decoration: none;
  letter-spacing: -.01em;
  color: ${black};
  &:hover {
    text-decoration: underline;
  }
`;

const TrackNoteAnnotation = styled.sup``;

const TrackNote = styled.div`
  margin-left: 12px;
`;

const MediaWrapper = styled.div`
  font-size: 12px;
  border-top: 1px solid ${darkOffWhite};
  padding: 12px 8px 0;
`;

const DesktopAttendanceButton = styled.div`
  display: inline;
  ${mobile(css`
    display: none;
  `)};
`;

const MobileAttendanceButton = styled.div`
  display: none;
  ${mobile(css`
    display: inline;
  `)};
`;

export default Setlist;