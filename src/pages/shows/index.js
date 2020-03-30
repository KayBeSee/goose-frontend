import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled, { css } from 'styled-components';

import { black, orange, gray, white } from '../../utils/colors';
import { mobile } from '../../utils/media';

import Setlist from './setlist';

const PAGE_SIZE = 25;

const SHOWS = gql`
 query getShows($first: Int!, $skip: Int!) {
    shows(
      first: $first,
      skip: $skip,
      orderBy: date_DESC
    ) {
      id
      date
      eventName
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
          videos {
            id
            videoId
          }
        }
      }
      relisten
      nugsNetId
      bandcampAlbumId
    }
  }
`;

const Shows = (props) => {
  document.title = "Setlists - El Göose";
  const [page, setPage] = useState(0);
  const { loading, error, data } = useQuery(SHOWS, { variables: { first: PAGE_SIZE, skip: page * PAGE_SIZE } })

  if (error) return <p>Error :(</p>;
  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Setlists
          </BandDateWrapper>
        <PaginationControls>
          <PaginationControl
            onClick={() => { if (page > 0) { setPage(page - 1) } }}
            active={page > 0}
            style={{ padding: 16 }}
          >{'<'}
          </PaginationControl>
          <PaginationControl
            onClick={() => setPage(page + 1)}
            active={true}
            style={{ padding: 16 }}
          >{'>'}
          </PaginationControl>
        </PaginationControls>
      </BandDateContainer>
      {loading ? (
        <div>
          <Setlist loading={loading} />
          <Setlist loading={loading} />
          <Setlist loading={loading} />
          <Setlist loading={loading} />
          <Setlist loading={loading} />
          <Setlist loading={loading} />
        </div>
      ) : (
          data.shows.map((show) => (
            <Setlist key={show.id} show={show} includeNotes={true} />
          ))
        )
      }

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
  color: ${black};
`;

const BandDateContainer = styled.div`
	border-top: 4px solid ${orange};
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  align-items: center;
`;

const BandDateWrapper = styled.span`
	background: ${orange};
	padding: 12px;
	color: ${white};
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0,0%,0%,0.15);
  margin-top: -16px;

  ${mobile(css`
    margin-top: 0px;
  `)};  
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
`;

const PaginationControl = styled.div`
  display: inline-flex;
  justify-content: center;
  border-radius: 50%;
  padding: 16px 0;
  color: ${prop => prop.active ? orange : gray};
  font-weight: 700;
  cursor: pointer;
`;

export default Shows;