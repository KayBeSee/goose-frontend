import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const SHOWS = gql`
  {
    shows {
      id
      date
      venue {
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

const ShowDisplayer = (props) => {
  const { loading, error, data } = useQuery(SHOWS)

  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.shows.map(({ id, date, venue, setlist }) => (
    <Wrapper key={id}>
      <ShowHeader>
        <Link to={`/shows/${id}`}>{date}</Link>: {venue.name}
      </ShowHeader>
        <SetlistWrapper>
          {setlist.map(({ name, tracks }) => (
              <SetWrapper>
                <SetTitle>{name}</SetTitle>
                {tracks.map(({ song }) => <Link to={`/songs/${song.id}`}>{song.name}, </Link> )}
              </SetWrapper>
            )
          )}
        </SetlistWrapper>
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

const ShowHeader = styled.div`
  padding: 8px;
  background: #ff6f55;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.8px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const SetlistWrapper = styled.div`
  padding: 12px;
  border: 1px solid #e7e7e7;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const SetWrapper = styled.div``;

const SetTitle = styled.h4``;



export default ShowDisplayer;