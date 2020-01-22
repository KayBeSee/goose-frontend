import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import moment from 'moment';
import { GrayLoadingAnimation } from '../components/Loading';
import { black } from '../utils/colors';

import { TableContainer, Table, THEAD, TableHeader, TableRow, TableDown, PaginationContainer, PaginationControls, TrackLink, SecondaryData } from '../components/tables';

const PAGE_SIZE = 10;

const LoadingRow = () => {
  return (
    <TableRow>
      <TableDown>
        <GrayLoadingAnimation />
      </TableDown>
      <TableDown>
        <GrayLoadingAnimation />
      </TableDown>
      <TableDown>
        <GrayLoadingAnimation />
      </TableDown>
      <TableDown>
        <GrayLoadingAnimation />
      </TableDown>
    </TableRow>
  )
}

const SONGS = gql`
query getSongs($first: Int!, $skip: Int!) {
    songs(
      first: $first,
      skip: $skip
    ) {
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
  const [ page, setPage ] = useState(0);
  const { loading, error, data } = useQuery(SONGS, { variables: { first: PAGE_SIZE, skip: page * PAGE_SIZE }})

  if (loading) {

  }
  if (error) return <p>Error :(</p>;

  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Songs
        </BandDateWrapper>
      </BandDateContainer>
      <TableContainer>
        <Table>
          <THEAD>
          <TableHeader>Song Name</TableHeader>
          <TableHeader alignRight>Debut</TableHeader>
          <TableHeader alignRight>Times</TableHeader>
          <TableHeader alignRight>Last</TableHeader>
          </THEAD>
            {loading ? (
              <tbody>
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
                <LoadingRow />
              </tbody>
            ) : (
              <tbody>
                {data.songs.map(({ id, name, originalArtist, tracks }) => (
                  <TableRow>
                    <TableDown>
                      <TrackLink to={`/songs/${id}`}>{name}</TrackLink>
                      <SecondaryData>{originalArtist}</SecondaryData>
                    </TableDown>
                    <TableDown alignRight>
                      {moment(tracks[tracks.length - 1].set.show.date).format('M/D/YYYY')}
                    </TableDown>
                    <TableDown alignRight>
                      {tracks.length}
                    </TableDown>
                    <TableDown alignRight>
                      {moment(tracks[0].set.show.date).format('M/D/YYYY')}
                    </TableDown>
                  </TableRow>
                ))}
              </tbody>
            )}
        </Table>
        <PaginationContainer>
          <PaginationControls 
            onClick={() => setPage(page - 1)}>
              {' < Prev Page '}
          </PaginationControls>
          <DispplayingSubtext>
            Displaying {PAGE_SIZE * page + 1} - {(PAGE_SIZE * page) + PAGE_SIZE} of 300
          </DispplayingSubtext>
          <PaginationControls
            onClick={() => setPage(page + 1)}>
              {' Next Page > '}
          </PaginationControls>
        </PaginationContainer>
      </TableContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #F5F7FA;
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${black};
`;

const BandDateContainer = styled.div`
	border-top: 4px solid #ff6f55;
  display: flex;
  margin-bottom: 24px;
`;

const DispplayingSubtext = styled.span`
  font-size: 14px;
  color: #576574;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
`;

export default Songs;