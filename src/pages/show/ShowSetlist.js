import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

import { black, orange, offWhite, gray } from '../../utils/colors';

const ShowSetlist = ({ show }) => {
  console.log('show: ', show)
  const { eventName, setlist, venue } = show;
  let setlistNotes = [];

  return (
    <Fragment>
      <VenueInfoContainer>
        <Header>{eventName ? eventName : venue.name}</Header>
        {venue.city && venue.state && <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>}
      </VenueInfoContainer>

      <SetlistWrapper>
        {setlist.map(({ name, tracks }) => (
          <SetWrapper>
            <SetTitle>{name.replace('_', ' ')}: </SetTitle>
            {tracks.map(({ id, notes, song, segue, videos }, index) => {
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

        {!!setlistNotes.length && (
          <NotesWrapper>
            <NotesHeader>Coach's Notes</NotesHeader>
            {setlistNotes.map((note, index) => (
              <TrackNote>[{index + 1}] {note}</TrackNote>
            ))}
          </NotesWrapper>
        )}
      </SetlistWrapper>
    </Fragment>
  )
}

const VenueInfoContainer = styled.div`
  padding: 0 12px;
`;

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 24px;
	font-weight: 400;
`;

const SetlistWrapper = styled.div`
  padding: 12px 12px;
  border-radius: 4px;
  line-height: 1.5;
  background: #fff;
  margin: 24px 0;
  box-shadow: 0 5px 15px 0 hsla(0, 0%, 0%, 0.15);
  border-radius: 4px;
`;

const SetWrapper = styled.div`
	padding: 16px 0;
`;

const SetTitle = styled.span`
	font-size: 16px;
	font-weight: 700;
	color: ${orange};
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

const NotesWrapper = styled.div``;

const NotesHeader = styled.h4``;

const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
`;

export default ShowSetlist;