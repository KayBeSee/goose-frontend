import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

import { black, orange, offWhite, gray } from '../../utils/colors';

const ShowSetlist = ({ show, videoIds, boxShadow, margin }) => {
  console.log('show: ', show)
  const { eventName, setlist, venue } = show;
  let setlistNotes = [];

  return (
    <SetlistWrapper boxShadow={boxShadow} margin={margin}>
      {setlist.map(({ name, tracks }) => (
        <SetWrapper>
          <SetTitle>{name.replace('_', ' ')}: </SetTitle>
          {tracks.map(({ id, notes, song, segue, videos }, index) => {
            if (notes) {
              setlistNotes.push(...notes);
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

      {!!setlistNotes.length && (
        <NotesWrapper>
          <NotesHeader>Coach's Notes</NotesHeader>
          {setlistNotes.map((note, index) => (
            <TrackNote>[{index + 1}] {note}</TrackNote>
          ))}
        </NotesWrapper>
      )}
    </SetlistWrapper>
  )
}

const SetlistWrapper = styled.div`
  padding: 12px 12px;
  border-radius: 4px;
  line-height: 1.5;
  background: #fff;
  margin: ${p => p.margin ? '0' : '24px 0'};
  box-shadow: ${ p => p.noBoxShadow ? 'none' : '0 5px 15px 0 hsla(0, 0 %, 0 %, 0.15)'};
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
  color: ${ black};
    
  &: hover {
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