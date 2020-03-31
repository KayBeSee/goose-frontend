import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { Search, KeyboardArrowRight } from '@styled-icons/material';
import moment from 'moment';

import { black, orange, offWhite, white } from '../utils/colors';
import { mobile } from '../utils/media';
import { removeToken } from '../utils/token';

import { StyledIcon } from '../components/logos';

import { TableContainer, Table, THEAD, TableHeader, TableRow, LoadingTableRow, TableDown, PaginationWrapper, PaginationContainer, PaginationControls, TrackLink, SecondaryData } from '../components/tables';

const logout = () => {
  removeToken();
  window.location.reload();
}

const ME = gql`
  query {
    me {
      id
      email
      shows {
        id
        date
        venue {
          id
          name
          city
          state
        }
        setlist {
          id
          name
          tracks {
            id
            segue
            notes
            song {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const Me = (props) => {
  const { loading, error, data } = useQuery(ME)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>;

  console.log('me data: ', data);

  document.title = `My Profile - El Göose`;
  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          {data.me.email}
          <UserProfileHeader>User Profile</UserProfileHeader>
        </BandDateWrapper>
        <div>
          <LogoutButton onClick={logout}>
            Logout
            </LogoutButton>
        </div>
      </BandDateContainer>
      <ShowsHeader>Show Attended</ShowsHeader>
      <TableContainer>
        <Table>
          <THEAD>
            <TableHeader>Date</TableHeader>
            <TableHeader>Venue</TableHeader>
            <TableHeader></TableHeader>
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
                {data.me.shows.map(({ id, date, venue, setlist }, songIndex) => (
                  <TableRow key={id} odd={songIndex % 2}>
                    <TableDown style={{ padding: 0 }}>
                      <TrackLink to={`/shows/${id}/setlist`} style={{ padding: 24, display: 'block' }}>
                        <div>{moment(date).format('MM/DD/YYYY')}</div>
                      </TrackLink>
                    </TableDown>
                    <TableDown>
                      <div>{venue.name}</div>
                      <SecondaryData>{venue.city}, {venue.state}</SecondaryData>
                    </TableDown>
                    {/* <TableDown alignRight hideMobile>
                      {tracks.length}
                    </TableDown>
                    <TableDown alignRight hideMobile>
                      {moment(tracks[0].set.show.date).format('M/D/YYYY')}
                    </TableDown> */}
                    <TableDown>
                      <StyledIcon as={KeyboardArrowRight} size={36} />
                    </TableDown>
                  </TableRow>
                ))}
              </tbody>
            )}
        </Table>
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

const UserProfileHeader = styled.div`
  color: ${white};
      font-size: 12px;
    `;

const ShowsHeader = styled.h3``;

const BandDateWrapper = styled.span`
	background: ${orange};
      padding: 12px;
      color: #ffffff;
      font-weight: 700;
      font-size: 36px;
      box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
      margin-top: -16px;
      min-width: 250px;
    
  ${mobile(css`
    margin-top: 0px;
  `)};  
    `;

const LogoutButton = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${black};
  cursor: pointer;
`;
export default Me;