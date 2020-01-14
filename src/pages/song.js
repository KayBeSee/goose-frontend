import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

const SONGS = gql`
 query getSong($id: ID!) {
  song(where: {
    id: $id
    }) {
    id
    name
    notes
    tracks {
      id
      notes
      set {
        id
        name
        show {
          date
          venue {
            name
            city
            state
          }
        }
      }
    }
  }
}
`;

console.log('SONGS: ', SONGS);

const SongDisplayer = (props) => {
  console.log('props.match.params.id: ', props.match.params.id);
  const { loading, error, data } = useQuery(SONGS, { variables: { id: props.match.params.id }})

  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

   return(
    <Wrapper key={data.song.id}>
      <SongTitle>{data.song.name}</SongTitle>
      <SongDescription>{data.song.notes}</SongDescription>
      <TrackTable>
        {data.song.tracks.map((track) => (
          <TrackRow>{track.set.show.date} - {track.set.show.venue.name}</TrackRow>
        ))}
      </TrackTable>
    </Wrapper>
   )
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

const SongTitle = styled.h2``;

const SongDescription = styled.h5``;

const TrackTable = styled.table``;

const TrackRow = styled.tr``;

export default SongDisplayer;