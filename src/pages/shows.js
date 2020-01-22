import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import Setlist from '../components/setlist';

const PAGE_SIZE = 5;

const SHOWS = gql`
 query getShows($first: Int!, $skip: Int!) {
    shows(
      first: $first,
      skip: $skip
    ) {
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
          notes
          segue
          song {
            id
            name
            notes
          }
        }
      }
    }
  }
`;

const Shows = (props) => {
  const [ page, setPage ] = useState(0);
  const { loading, error, data } = useQuery(SHOWS, { variables: { first: PAGE_SIZE, skip: page * PAGE_SIZE }})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    return (
      <Wrapper>
        <BandDateContainer>
          <BandDateWrapper>
            Setlists
          </BandDateWrapper>
          <PaginationControls>
            <PaginationControl
              onClick={() => {if(page > 0) { setPage(page - 1) }}}
              active={page > 0}
              style={{padding: 16}}
              >{'<'}
            </PaginationControl>
            <PaginationControl
              onClick={() => setPage(page + 1)}
              active={true}
              style={{padding: 16}}
              >{'>'}
            </PaginationControl>
          </PaginationControls>
        </BandDateContainer>
        {data.shows.map((show) => (
            <Setlist key={show.id} show={show} includeNotes={false} />
        ))}

        <PaginationControls>
          <PaginationControl
            onClick={() => setPage(page - 1)}
            active={page > 0}
            >{'< Previous Page'}
          </PaginationControl>
          <PaginationControl
            onClick={() => setPage(page + 1)}
            active={true}
            >{'Next Page >'}
          </PaginationControl>
        </PaginationControls>
      </Wrapper>

    )
}

const Wrapper = styled.div`
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  color: rgba(66,66,66,.95);
`;

const BandDateContainer = styled.div`
	border-top: 4px solid #ff6f55;
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  align-items: center;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaginationControl = styled.div`
  display: inline-flex;
  justify-content: center;
  border-radius: 50%;
  padding: 16px 0;
  color: ${prop => prop.active ? '#ff6f55' : '#bdc3c7'};
  font-weight: 700;
  cursor: pointer;
  // border: 1px solid #ff6f55;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 12px;
	color: #ffffff;
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
`;

export default Shows;