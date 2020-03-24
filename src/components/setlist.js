import React from 'react';
import moment from 'moment';
import styled, { keyframes, css } from 'styled-components';
import { Link } from "react-router-dom";
import AttendanceButton from './attendance-button';
import LoadingSetlist from './setlist-loading';
import { black, orange } from '../utils/colors';
import { mobile } from '../utils/media';
import { ArchiveLogo, NugsNetLogo, YouTubeLogo, BandcampLogo } from '../components/logos';

let setlistNotes = [];

const Setlist = ({ loading, show, includeNotes = true }) => {
  if (loading) {
    return <LoadingSetlist />
  } else {
    const { id, date, eventName, venue, setlist, notes } = show;
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
              {tracks.map(({ id, notes, song, segue }, index) => {
                // add note to the notes array for later rendering
                if (notes) {
                  setlistNotes.push(notes);
                }
                return (
                  <TrackWrapper key={id}>
                    <TrackLink to={`/songs/${song.id}`}>{song.name}</TrackLink>
                    {notes && <TrackNoteAnnotation>[{setlistNotes.length}]</TrackNoteAnnotation>}
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

const NotesWrapper = styled.div``;

const NotesHeader = styled.h4``;

const BandDateWrapper = styled.span`
	background: ${orange};
	padding: 8px;
	color: #ffffff;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

const VenueInfoContainer = styled.div``;

const SetlistWrapper = styled.div`
  padding: 12px 12px;
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

const TrackNote = styled.span;


// Loading State

const placeHolderShimmer = keyframes`
  0%{
      background-position: -468px 0
  }
  100%{
      background-position: 468px 0
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