import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import moment from 'moment';

const SONGS = gql`
  {
    songs {
      id
      name
      originalArtist
      notes
      tracks {
        id
        set {
          id
          show {
            id
            date
            venue {
              id
            }
          }
        }
      }
    }
}
`;

const Songs = (props) => {
  const { loading, error, data } = useQuery(SONGS)

  console.log('data: ', data);
  console.log('error: ', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Songs
        </BandDateWrapper>
      </BandDateContainer>
      <TrackTable>
        <thead>
        <TableHeader>Song Name</TableHeader>
        <TableHeader>Original Artist</TableHeader>
        <TableHeader>Debut</TableHeader>
        <TableHeader>Times</TableHeader>
        <TableHeader>Last</TableHeader>
        </thead>
        <tbody>
          {data.songs.map(({ id, name, originalArtist, tracks }) => (
            <TrackRow>
              <TableDown>
                <TrackLink to={`/songs/${id}`}>{name}</TrackLink>
              </TableDown>
              <TableDown>{originalArtist}</TableDown>
              <TableDown>{moment(tracks[0].set.show.date).format('M/D/YYYY')}</TableDown>
              <TableDown>{tracks.length}</TableDown>
              <TableDown>{moment(tracks[tracks.length - 1].set.show.date).format('M/D/YYYY')}</TableDown>
            </TrackRow>
          ))}

        </tbody>
        {/* <tfooter></tfooter> */}
      </TrackTable>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: rgba(66,66,66,.95);
`;

const BandDateContainer = styled.div`
	border-top: 4px solid #ff6f55;
  display: flex;
  margin-bottom: 24px;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
`;

const TrackTable = styled.table``;

const TableHeader = styled.th``;

const TrackRow = styled.tr``;

const TableDown = styled.td``;

const TrackLink = styled(Link)`
  color: rgba(66,66,66,.95);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Songs;