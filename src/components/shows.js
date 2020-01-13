import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
    <div key={id}>
      <p>
        {date}: {venue.name}
      </p>
    </div>
  ));
}


export default ShowDisplayer;