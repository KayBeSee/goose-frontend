import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from "react-router-dom";

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

  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let setlistNotes = [];
  return data.shows.map(({ id, date, venue, setlist }) => (
    <Wrapper key={id}>
        <BandDateContainer>
          <BandDateWrapper>
            Goose, <ShowLink to={`/shows/${id}`}>{moment(date).format('dddd M/D/YYYY')}</ShowLink>
          </BandDateWrapper>
        </BandDateContainer>
        <OtherDataContainer>
          <Header>{venue.name}</Header>
          <VenueSubheader>{venue.city}, {venue.state}</VenueSubheader>
          <SetlistWrapper>
            {setlist.map(({ name, tracks }) => (
                <SetWrapper>
                  <SetTitle>{name.replace('_', ' ')}: </SetTitle>
                  {tracks.map(({ id, notes, song, videos }) => {
                    // add note to the notes array for later rendering
                    if (notes) {
                      setlistNotes.push(notes);
                    }
                    return (
                      <TrackWrapper>
                        <TrackLink to={`/track/${id}`}>{song.name}</TrackLink>
                        {notes && <TrackNoteAnnotation>[{setlistNotes.length}]</TrackNoteAnnotation>}
                        , 
                      </TrackWrapper>
                    )
                  })
                }
                </SetWrapper>
              )
            )}

            {/* <NotesHeader>Coach's Notes</NotesHeader>
            {setlistNotes.map((note, index) => {
              return <TrackNote>[{index+1}] {note}</TrackNote>
            })} */}
          </SetlistWrapper>
        </OtherDataContainer>
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

const VenueSubheader = styled.div`
	margin-bottom: 12px;
	font-size: 24px;
	font-weight: 400;
`;

const BandDateContainer = styled.div`
	border-top: 4px solid #ff6f55;
	display: flex;
`;

const ShowLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const OtherDataContainer = styled.div`
  padding: 0 12px;
`;

const BandDateWrapper = styled.span`
	background: #ff6f55;
	padding: 8px;
	color: #ffffff;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
`;

const SetlistWrapper = styled.div`
  padding: 12px 0;
	border-radius: 4px;
`;

const SetWrapper = styled.div`
	padding: 16px 0;
`;

const SetTitle = styled.span`
	font-size: 16px;
	font-weight: 700;
	color: #ff6f55;
`;

const Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 8px;
`;

const TrackWrapper = styled.span``;

const TrackLink = styled(Link)`
  text-decoration: none;
  color: rgba(66,66,66,.95);
  &:hover {
    text-decoration: underline;
  }
`;

const TrackNoteAnnotation = styled.sup``;

export default Shows;