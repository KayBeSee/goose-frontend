import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import { black, orange } from '../../utils/colors';

const Setlist = ({ setlist, selectedVideos, boxShadow, margin }) => {
  let setlistNotes = [];

  return (
    <SetlistWrapper boxShadow={boxShadow} margin={margin}>
      {setlist.map(({ id, name, tracks }) => (
        <SetWrapper key={id}>
          <SetTitle>{name.replace('_', ' ')}: </SetTitle>
          {tracks.map(({ id, notes, song, segue, videos }, index) => {
            console.log('notes: ', typeof notes);
            if (!!notes) {
              setlistNotes.push(notes);
            }
            return (
              <TrackWrapper key={id}>
                <TrackLink to={`/songs/${song.id}`} active={(selectedVideos ? selectedVideos.includes(id) : true)}>{song.name}
                  {!!notes && <TrackNoteAnnotation active={(selectedVideos ? selectedVideos.includes(id) : true)}>{setlistNotes.length}</TrackNoteAnnotation>}
                  {segue ? <Segue active={(selectedVideos ? selectedVideos.includes(id) : true)}> > </Segue> : (tracks.length - 1 === index) ? ' ' : ', '}
                </TrackLink>

              </TrackWrapper>
            )
          })
          }
        </SetWrapper>
      )
      )}

      {
        !!setlistNotes.length && (
          <NotesWrapper>
            <NotesHeader>Coach's Notes</NotesHeader>
            {setlistNotes.map((note, index) => {
              return (
                <TrackNote>[{index + 1}] {note}</TrackNote>
              );
            })}
          </NotesWrapper>
        )
      }
    </SetlistWrapper >
  )
}

const SetlistWrapper = styled.div`
  padding: 24px;
  border-radius: 4px;
  line-height: 1.5;
  background: #fff;
  margin: ${p => p.margin ? p.margin : '24px 0'};
  box-shadow: ${ p => p.boxShadow ? p.boxShadow : '0 5px 15px 0 hsla(0, 0%, 0%, 0.15)'};
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
  opacity: ${p => p.active ? '1' : '0.25'};
    
  &: hover {
    text-decoration: underline;
  }
`;

const Segue = styled.span`
  opacity: ${p => p.active ? '1' : '0.25'};
`;

const TrackNoteAnnotation = styled.sup`
  opacity: ${p => p.active ? '1' : '0.25'};
`;

const TrackNote = styled.div``;

const NotesWrapper = styled.div``;

const NotesHeader = styled.h4`
  margin: 1.33em 0 .3em;
`;

export default Setlist;