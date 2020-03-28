import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import ShowForm from '../components/ShowForm';

import { black, white, offWhite, orange } from '../utils/colors';

const SHOW = gql`
  query getShow($id: ID!) {
    show(where: {
      id: $id
    }) {
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

// KBC-TODO: update this function
const updateShow = gql`
  query {
    shows {
      id
    }
  }
`;

const buildSetlistQueryObject = (setlist) => {
  return `{ "create": [
        ${setlist.map((set) => (`
          {
            "name": "${set.name}",
            "tracks": {
              "create": [
                ${ set.tracks.map((track) => (`
                    {
                      "notes": "${track.notes}",
                      "segue": "${track.segue}",
                      "song": {
                        "connect": {
                          "id": "${track.song.id}"
                        }
                      }
                    }
                  `))}
              ]
            }
          }
        `))}
      ]
    }`;
}

const buildVenueQueryObject = (venue) => {
  return `{
      "connect": {
        "id": "${venue.id}"
      }
    }`;
}

const EditShow = (props) => {
  document.title = "Edit Show - El Göose";
  const { loading, error, data: showData } = useQuery(SHOW, { variables: { id: props.match.params.id } });
  const [currentStep, setStep] = useState(4);
  let history = useHistory();

  const handleSubmit = async (setlist, venue, date, notes, bandcampAlbumId, nugsNetId, archiveUrl) => {
    // parse and build query for prisma
    const setlistQueryString = buildSetlistQueryObject(setlist);
    const setlistQueryObject = JSON.parse(setlistQueryString)
    const venueQueryString = buildVenueQueryObject(venue);
    const venueQueryObject = JSON.parse(venueQueryString);
    const momentDate = moment(date).utc();

    const { data, error } = await updateShow({ variables: { id: props.match.params.id, date: momentDate, venue: venueQueryObject, setlist: setlistQueryObject, notes, bandcampAlbumId, nugsNetId, archiveUrl } });
    if (!error && data) {
      history.push(`shows/${data.updateShow.id}`);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  document.title = `Edit ${moment(showData.show.date).format('MM/DD/YYYY')} - El Göose`;

  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Edit Show
          </BandDateWrapper>
      </BandDateContainer>
      <FormContainer>
        <ShowFormContainer>
          <ShowForm show={showData.show} currentStep={currentStep} setStep={setStep} handleSubmit={handleSubmit} />
        </ShowFormContainer>
      </FormContainer>
    </Wrapper >
  )
}

const Wrapper = styled.div`
  max-width: 750px;
  width: 100%;
  margin-bottom: 24px;
  text-align: left;
  color: ${black};
  min-height: 340px;
`;

const BandDateContainer = styled.div`
  border-top: 4px solid ${orange};
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  max-width: 750px;
`;

const BandDateWrapper = styled.span`
  background: ${orange};
  padding: 12px;
  color: ${white};
  font-weight: 700;
  font-size: 36px;
  box-shadow: 0 5px 15px 0 hsla(0, 0 %, 0 %, 0.15);
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: ${offWhite};
  transition: height .5s ease-in-out;
`;

const ShowFormContainer = styled.div`
  background: ${white};
  box-shadow: 0 1px 46px 4px rgba(0, 0, 0, .28);
  max-width: 750px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 18px;
  border-radius: 4px;
  min-height: 340px;
`;

export default EditShow;