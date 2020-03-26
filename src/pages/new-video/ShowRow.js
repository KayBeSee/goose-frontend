import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { darkOffWhite, orange, offWhite, white, lightOrange } from '../../utils/colors';

const ShowRow = ({ odd, show, tracks, toggleTrack, selectAllTracks, clearAllTracks }) => {
  const [trackTrayOpen, setTrackTrayOpen] = useState(false);

  return (
    <ShowRowOuter key={show.id}>
      <ShowRowInner odd={odd} onClick={() => setTrackTrayOpen(!trackTrayOpen)}>
        <ShowColumn>
          {moment(show.date).format('M/D/YYYY')}
        </ShowColumn>
        <VenueColumn>
          <VenueName>{show.venue.name}</VenueName>
          {show.venue.city}, {show.venue.state}
        </VenueColumn>
        <ShowSelectColumn>
          {trackTrayOpen ? ' V' : '>'}
        </ShowSelectColumn>
      </ShowRowInner>
      {(trackTrayOpen) && (
        <TrackTray>
          <SelectButtons>
            <SelectAllButton onClick={() => selectAllTracks(show)} type="button">Select All</SelectAllButton>
            <ClearButton onClick={() => clearAllTracks()} type="button">Clear</ClearButton>
          </SelectButtons>
          <Setlist>
            {show.setlist.map((set, setIndex) => {
              return (
                <SetContainer key={set.id}>
                  <SetHeading>{set.name.replace('_', ' ')}</SetHeading>
                  {set.tracks.map((track, trackIndex) => (
                    <TrackRow
                      key={track.id}
                      odd={trackIndex % 2}
                      onClick={() => toggleTrack(track.id)}
                      selected={!!tracks.includes(track.id)}>
                      <TrackSelectColumn>
                        <Checkbox type="checkbox" readOnly checked={!!tracks.includes(track.id)} />
                      </TrackSelectColumn>
                      <TrackNameColumn>
                        {track.song.name}
                      </TrackNameColumn>
                    </TrackRow>
                  ))}
                </SetContainer>
              )
            })}
          </Setlist>
        </TrackTray>
      )}
    </ShowRowOuter>
  )
}

const ShowRowOuter = styled.div`
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const TrackSelectColumn = styled.div`
  flex: 1 0 50px;
`;

const TrackNameColumn = styled.div`
  flex: 3 0 250px;
`;

const ShowRowInner = styled.div`
  background: ${p => p.odd ? offWhite : white};
  padding: 24px;
  display: flex;
  cursor: pointer;
`;

const TrackRow = styled(ShowRowInner)`
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  background: ${p => p.selected ? lightOrange : 'auto'}
`;

const ShowColumn = styled.div`
  flex: 1;
`;

const ShowSelectColumn = styled(ShowColumn)`
  flex: 0 0 50px;
`;

const VenueColumn = styled(ShowColumn)`
  display: flex;
  flex: 3;
  flex-direction: column;
  font-size: 10px;
`;

const VenueName = styled.span`
  font-size: 18px;
`;

const SetContainer = styled.div`
  flex: 1 0 250px;
  padding: 12px;
`;

const SetHeading = styled.h5`
  margin: 8px 0;
`;

const TrackTray = styled.div`
  background: ${darkOffWhite};
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 2px 2px hsla(0,0%,0%,0.1), 0 -2px 0 hsla(0, 0%, 100%, .15);
`;

const Setlist = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SelectButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SelectAllButton = styled.button`
  background: transparent;
  border: 1px solid ${orange};
  border-radius: 4px;
  color: ${orange};
  cursor: pointer;
  outline: 0;

  &:focus {
    outline: 0;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  padding: 12px;
  color: rgba(66, 66, 66, 0.95);
  cursor: pointer;
  outline: none;

  &:focus {
    outline: 0;
  }
`;


export default ShowRow;