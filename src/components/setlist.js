import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AttendanceButton from './attendance-button'

let setlistNotes = [];

const Setlist = ({ show, includeNotes = true }) => {
  const { id, date, venue, setlist, notes } = show;

  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Goose, <ShowLink to={`/shows/${id}`}>{moment(date).format('dddd M/D/YYYY')}</ShowLink>
        </BandDateWrapper>
      </BandDateContainer>
      <ShowDataBody>
        <VenueInfoContainer>
          <Header>{venue.name}</Header>
          {venue.city && venue.state && <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>}
        </VenueInfoContainer>
        <AttendanceButtonContainer>
          <AttendanceButton showId={id} />
        </AttendanceButtonContainer>
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
                  <TrackWrapper>
                    <TrackLink to={`/track/${id}`}>{song.name}</TrackLink>
                    {notes && <TrackNoteAnnotation>[{setlistNotes.length}]</TrackNoteAnnotation>}
                    {segue ? ' > ' : (tracks.length -1 === index) ? ' ' : ', '}
                    
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
                    <TrackNote>[{index+1}] {note}</TrackNote>
                ))}
          </NotesWrapper>
        )}
      </SetlistWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div``;

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 24px;
	font-weight: 400;
`;

const BandDateContainer = styled.div`
	border-top: 4px solid #ff6f55;
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
  justify-content: space-between;
`;

const NotesContainer = styled.div``;

const NotesWrapper = styled.div``;

const NotesHeader = styled.h4``;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 8px;
	color: #ffffff;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

const VenueInfoContainer = styled.div``;
const AttendanceButtonContainer = styled.div``;

const SetlistWrapper = styled.div`
  padding: 12px 12px;
	border-radius: 4px;
`;

const SetWrapper = styled.div`
	padding: 16px 0;
`;

const SetTitle = styled.span`
	font-size: 16px;
	font-weight: 700;
	color: #ff6f55;
`;

const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
`;

const TrackWrapper = styled.span``;

const TrackLink = styled(Link)`
  text-decoration: none;
  color: rgba(66,66,66,.95);
  &:hover {
    text-decoration: underline;
  }
`;

const TrackNoteAnnotation = styled.sup``;

const TrackNote = styled.span;

export default Setlist;