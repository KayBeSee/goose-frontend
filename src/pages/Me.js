import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';
import { KeyboardArrowRight } from '@styled-icons/material';
import { useHistory } from "react-router-dom";
import moment from 'moment';

import { black, orange, offWhite, white, darkOrange } from '../utils/colors';
import { mobile } from '../utils/media';
import { removeToken } from '../utils/token';

import { StyledIcon } from '../components/logos';

import { TableContainer, Table, THEAD, TableHeader, TableRow, LoadingTableRow, TableDown, TrackLink, SecondaryData } from '../components/tables';

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
  const { loading, error, data } = useQuery(ME);
  const history = useHistory();

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>;

  const logout = () => {
    removeToken();
    history.push('login');
    window.location.reload();
  }

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
      {(data.me.shows.length > 0) && <ShowsHeader>Shows Attended</ShowsHeader>}
      {loading ? (
        <TableContainer>
          <Table>
            <THEAD>
              <TableHeader>Date</TableHeader>
              <TableHeader>Venue</TableHeader>
              <TableHeader></TableHeader>
            </THEAD>
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
          </Table>
        </TableContainer>
      ) : (data.me.shows.length > 0) ? (
        <TableContainer>
          <Table>
            <THEAD>
              <TableHeader>Date</TableHeader>
              <TableHeader>Venue</TableHeader>
              <TableHeader></TableHeader>
            </THEAD>
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
          </Table>
        </TableContainer>
      ) : (
            <NoShowsContainer>
              <NoShowsHeader>Add shows that you've attended</NoShowsHeader>
              <NoShowsSubtext>You can keep track of the Goose shows you've attended by clicking the "I was there" button on setlists throughout this website.</NoShowsSubtext>
              <Button type="button" onClick={() => history.push("setlists")}>Add Shows You've Attended</Button>
            </NoShowsContainer>
          )}
    </Wrapper >
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

const NoShowsContainer = styled.div`
  padding: 24px;
`;


const Button = styled.button`
  padding: 12px;
  color: ${white};
  background: ${orange};
  border-radius: 4px;
  font-size: 16px;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:active, &:focus {
    outline: 0;
    background: ${darkOrange};
  }
`;

const NoShowsHeader = styled.h3``;

const NoShowsSubtext = styled.h5`
  font-weight: 500;
`;

export default Me;