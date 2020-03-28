import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import darken from 'polished/lib/color/darken';
import { NoteAdd } from '@styled-icons/material';

import { StyledIcon } from '../logos';
import { Input } from '../FormComponents';

import { offWhite } from '../../utils/colors'

const SONGS = gql`
  query {
    songs {
      id
      name
      originalArtist
    }
  }
`;

const TrackForm = ({ track, setTrack, index }) => {
  const { loading, error, data: possibleSongs } = useQuery(SONGS);
  const [filteredOptions, setFilteredOptions] = useState(possibleSongs);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [segue, setSegue] = useState(false);
  const [displayNotes, setDisplayNotes] = useState(false);
  const [notes, setNotes] = useState();

  if (error) return <p>Error :(</p>;

  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    setUserInput(userInput);
    let updatedTrack = {
      new: true,
      name: userInput,
      segue
    };
    if (!!notes) {
      updatedTrack.notes = notes;
    }
    setTrack(updatedTrack);
    const filteredOptions = possibleSongs.songs.filter((song, index) => song.name.toLowerCase().includes(userInput.toLowerCase()));
    setFilteredOptions(filteredOptions);
    if (filteredOptions.length > 0 && userInput !== '') {
      setShowOptions(true);
    } else if (userInput === '') {
      setShowOptions(false);
    } else {
      setShowOptions(false);
    }
  }

  const selectSong = (song, segue) => {
    setShowOptions(false);
    let updatedTrack = { song, segue };
    if (!!notes) {
      updatedTrack.notes = notes;
    };
    setTrack(updatedTrack)
    if (!song) {
      setUserInput(track.song.name);
    }
  }

  const toggleSegue = (song, segue) => {
    let updatedTrack = { song, segue: !segue };
    if (!!notes) {
      updatedTrack.notes = notes;
    };

    setTrack(updatedTrack);
    setSegue(!segue);
  }

  const changeNotes = (song, segue, notes) => {
    let updatedTrack = { song, segue };
    if (!!notes) {
      updatedTrack.notes = notes;
    };
    setTrack(updatedTrack)
    setNotes(notes);
  }

  return (
    <TrackWrapper>
      <TrackContainer>
        <SongContainer>
          <Number>{index + 1}) </Number>
          {track.song ? (
            <SuggestionSongOption onClick={() => selectSong()} >
              <SongName>{track.song.name}</SongName>
            </SuggestionSongOption>
          ) : (loading) ? (
            <SongOption>
              <SongName>Loading...</SongName>
            </SongOption>
          ) : (
                <SongOption>
                  <InputModified
                    value={userInput}
                    onChange={onChange}
                    placeholder={"Song Title"} />
                </SongOption>
              )}
          <SongSuggestions>
            {showOptions && filteredOptions.map((option) => (
              <SuggestionSongOption key={option.id} onClick={() => selectSong(option, segue)} >
                <SongName>{option.name}</SongName>
                <SongOriginalArtist>{option.originalArtist}</SongOriginalArtist>
              </SuggestionSongOption>
            ))}
          </SongSuggestions>
          <Segue
            active={!!segue}
            onClick={() => toggleSegue(track.song, segue)}
          >></Segue>
          <NoteIconContainer
            active={!!displayNotes}
            value={notes}
            onClick={() => {
              if (!!displayNotes) {
                setDisplayNotes(false);
              } else {
                setDisplayNotes(true);
              }
            }}>
            <StyledIcon as={NoteAdd} size={24} />
          </NoteIconContainer>
        </SongContainer>
        <NoteContainer show={!!displayNotes}>
          <span style={{ padding: '0 8px 0 0' }}>Notes:</span> <NotesInput onChange={(e) => changeNotes(track.song, segue, e.target.value ? e.target.value : undefined)} />
        </NoteContainer>
      </TrackContainer>
    </TrackWrapper >
  )
}

const TrackWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  padding: 8px;
`;

const TrackContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SongContainer = styled.div`
  align-self: center;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Segue = styled.div`
  align-self: center;
  font-size: 28px;
  opacity: ${p => p.active ? '1' : '0.15'};
  margin: 0 8px;
  cursor: pointer;
`;

const NoteIconContainer = styled.div`
  opacity: ${p => p.active ? '1' : '0.15'}
`;

const NoteContainer = styled.div`
  display: ${p => p.show ? 'flex' : 'none'};
  font-size: 12px;
  padding: 4px 0;
  margin-left: 28px;
  margin-right: 52px;
  align-items: center;
`;

const NotesInput = styled(Input)`
  padding: 2px;
  flex: 1;
`;

const Number = styled.span`
  align-self: center;
  margin-right: 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const InputModified = styled(Input)`
  flex: 1;
`;

const SongSuggestions = styled.div`
  background: ${offWhite};
  z-index: 2;
  position: absolute;
  top: 48px;
  width: 100%;
`;

const SongOption = styled.div`
  display: flex;
  flex: 1;
  cursor: pointer;
  flex-direction: column;
    
  &:hover {
    background: ${darken(0.05, offWhite)};
  }
`;

const SuggestionSongOption = styled(SongOption)`
  padding: 8px;
`;

const SongName = styled.div`
  font-weight: 700;
  font-size: 1em;
`;

const SongOriginalArtist = styled.div`
  font-weight: 100;
  font-size: 0.5em;
`;

export default TrackForm;