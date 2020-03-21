import React, { useState, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import darken from 'polished/lib/color/darken';
import { offWhite } from '../../utils/colors'
import { Input } from '../../components/FormComponents';

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

  if (error) return <p>Error :(</p>;

  console.log('possibleSongs: ', possibleSongs);
  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    console.log('userInput: ', userInput);
    setUserInput(userInput);
    setTrack({ name: userInput, new: true });
    const filteredOptions = possibleSongs.songs.filter((song, index) => song.name.toLowerCase().includes(userInput.toLowerCase()));
    console.log('filteredOptions: ', filteredOptions);
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
    setTrack({ song, segue })
    if (!song) {
      setUserInput(track.song.name);
    }
  }

  const toggleSegue = (song, segue) => {
    setTrack({ song, segue: !segue });
    setSegue(!segue);
  }

  console.log('possibleSongs: ', possibleSongs);
  console.log('track: ', track);
  return (
    <TrackContainer>
      <Number>{index + 1}) </Number>
      <SongContainer>
        {/* if (loading) return <p>Loading...</p>; */}
        {track.song ? (
          <SongOption onClick={() => selectSong()} >
            <SongName>{track.song.name}</SongName>
          </SongOption>
        ) : (loading) ? (
          <SongOption>
            <SongName>Loading...</SongName>
          </SongOption>
        ) : (
              <InputModified
                value={userInput}
                onChange={onChange}
                placeholder={"Song Title"} />
            )}
        <SongSuggestions>
          {showOptions && filteredOptions.map((option) => (
            <SongOption key={option.id} onClick={() => selectSong(option, segue)} >
              <SongName>{option.name}</SongName>
              <SongOriginalArtist>{option.originalArtist}</SongOriginalArtist>
            </SongOption>
          ))}
        </SongSuggestions>
        <Segue
          active={!!segue}
          onClick={() => toggleSegue(track.song, segue)}
        >></Segue>
      </SongContainer>
    </TrackContainer>
  )
}

const TrackContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`;

const SongContainer = styled.div`
  align-self: center;
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const Segue = styled.span`
  align-self: center;
  font-size: 28px;
  opacity: ${p => p.active ? '1' : '0.15'};
  margin: 8px;
  cursor: pointer;
`;

const Number = styled.span`
  align-self: center;
  margin-right: 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const InputModified = styled(Input)`
  margin: 8px 0;
  flex: 1;
`;

const SongSuggestions = styled.div`
  background: ${offWhite};
  z-index: 5;
  position: absolute;
  top: 48px;
  width: 100%;
`;

const SongOption = styled.div`
  padding: 8px;
  cursor: pointer;
    
  &:hover {
        background: ${darken(0.05, offWhite)};
    }
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