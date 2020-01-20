import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import Setlist from '../components/setlist';

const SHOWS = gql`
  {
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
  const { loading, error, data } = useQuery(SHOWS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.shows.map((show) => (
    <Wrapper>
      <Setlist show={show} includeNotes={false} />
    </Wrapper>
  ));
}

const Wrapper = styled.div`
  background: #fff;
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  color: rgba(66,66,66,.95);
`;

export default Shows;