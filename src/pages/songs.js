import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Search, KeyboardArrowRight } from '@styled-icons/material';
import moment from 'moment';

import { black, orange, offWhite } from '../utils/colors';
import { StyledIcon } from '../components/logos';

import { TableContainer, Table, THEAD, TableHeader, TableRow, LoadingTableRow, TableDown, PaginationWrapper, PaginationContainer, PaginationControls, TrackLink, SecondaryData } from '../components/tables';

const PAGE_SIZE = 100;

const SONGS = gql`
query getSongs($first: Int!, $skip: Int!) {
    songs(
      first: $first,
      skip: $skip,
      orderBy: name_ASC
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
  const [page, setPage] = useState(0);
  const { loading, error, data } = useQuery(SONGS, { variables: { first: PAGE_SIZE, skip: page * PAGE_SIZE } })

  if (loading) {

  }
  if (error) return <p>Error :(</p>;

  document.title = `Goose Songs - El Göose`;
  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Songs
        </BandDateWrapper>
        <StyledIcon as={Search} size={36} />
      </BandDateContainer>
      <TableContainer>
        <Table>
          <THEAD>
            <TableHeader>Name</TableHeader>
            <TableHeader alignRight hideMobile>Debut</TableHeader>
            <TableHeader alignRight hideMobile>Times</TableHeader>
            <TableHeader alignRight hideMobile>Last</TableHeader>
            <TableHeader alignRight hideDesktop></TableHeader>
          </THEAD>
          {loading ? (
            <tbody>
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
              <LoadingTableRow />
            </tbody>
          ) : (
              <tbody>
                {data.songs.map(({ id, name, originalArtist, tracks }, songIndex) => (
                  <TableRow key={id} odd={songIndex % 2}>
                    <TableDown style={{ padding: 0 }}>
                      <TrackLink to={`/songs/${id}`} style={{ padding: 24, display: 'block' }}>
                        <div>{name}</div>
                        <SecondaryData>{originalArtist}</SecondaryData>
                      </TrackLink>
                    </TableDown>
                    <TableDown alignRight hideMobile>
                      {moment(tracks[tracks.length - 1].set.show.date).format('M/D/YYYY')}
                    </TableDown>
                    <TableDown alignRight hideMobile>
                      {tracks.length}
                    </TableDown>
                    <TableDown alignRight hideMobile>
                      {moment(tracks[0].set.show.date).format('M/D/YYYY')}
                    </TableDown>
                    <TableDown hideDesktop>
                      <StyledIcon as={KeyboardArrowRight} size={36} />
                    </TableDown>
                  </TableRow>
                ))}
              </tbody>
            )}
        </Table>
        <PaginationWrapper>
          <PaginationContainer>
            <PaginationControls
              onClick={() => setPage(page - 1)}>
              {' < Prev Page '}
            </PaginationControls>
            <PaginationControls
              onClick={() => setPage(page + 1)}>
              {' Next Page > '}
            </PaginationControls>
          </PaginationContainer>
          <DisplayingSubtext>
            Displaying {PAGE_SIZE * page + 1} - {(PAGE_SIZE * page) + PAGE_SIZE} of 300
          </DisplayingSubtext>
        </PaginationWrapper>
      </TableContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${offWhite};
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  color: ${black};
`;

const BandDateContainer = styled.div`
	border-top: 4px solid ${orange};
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  align-items: center;
`;

const DisplayingSubtext = styled.span`
  font-size: 14px;
  color: #576574;
  align-self: center;
  padding: 12px;
`;

const BandDateWrapper = styled.span`
	background: ${orange};
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
`;

export default Songs;