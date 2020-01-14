import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from "react-router-dom";  

const SONGS = gql`
  {
    songs {
      id
      name
      notes
      tracks {
        id
      }
    }
}
`;

const SongDisplayer = (props) => {
  const { loading, error, data } = useQuery(SONGS)

  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.songs.map(({ id, name, tracks }) => (
    <Wrapper key={id}>
      <Link to={`/songs/${id}`}>{name}</Link> - Times Played: {tracks.length} - Lyrics - History
    </Wrapper>
  ));
}

const Wrapper = styled.div`
  background: #fff;
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: rgba(66,66,66,.95);
  margin: 12px;
`;

export default SongDisplayer;