import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { gql } from 'apollo-boost';
import styled, { keyframes } from 'styled-components';

import ShowForm from '../components/ShowForm';

import { black, white, offWhite, orange, lightOrange } from '../utils/colors';

const CREATE_NEW_SHOW = gql`
  mutation createShow($date: DateTime, $venue: VenueCreateOneWithoutShowsInput!, $setlist: SetCreateManyWithoutShowInput!, $notes: String, $bandcampAlbumId: String, $nugsNetId: String, $archiveUrl: String) {
    createShow(data: {
      date: $date,
      venue: $venue,
      setlist: $setlist,
      notes: $notes,
      bandcampAlbumId: $bandcampAlbumId
      nugsNetId: $nugsNetId
      archiveUrl: $archiveUrl
    }) {
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
          segue
          song {
            id
            name
          }
        }
      }
      notes
      bandcampAlbumId
      nugsNetId
    }
  }
`;

// const SHOW = gql`
//   query getShow($id: ID!) {
//     show(where: {
//       id: $id
//     }) {
//       id
//       date
//       venue {
//         id
//         name
//         city
//         state
//       }
//       setlist {
//         id
//         name
//         tracks {
//           id
//           notes
//           segue
//           song {
//             id
//             name
//             notes
//           }
// 					videos {
//             id
// 						videoId
// 					}
//         }
//       }
// 			archiveUrl
// 			nugsNetId
// 			bandcampAlbumId
//     }
//   }
// `;

const undefinedShow = {
  date: undefined,
  venue: {
    name: undefined,
    city: undefined,
    state: undefined
  },
  setlist: [{ name: `SET_${1}`, tracks: [''] }],
  notes: undefined
}

// const exampleShow = {
//   date: '12/20/2020',
//   venue: { id: "ck7w1jguv001w0852yfd9re61", name: "Cervantes' Other Side", city: "Denver", state: "CO", __typename: "Venue" },
//   setlist: [
//     {
//       "name": "SET_1",
//       "tracks": [
//         {
//           "song": {
//             "id": "ck7w1jh1q002t0852mnsidin3",
//             "name": "Elizabeth",
//             "originalArtist": "Goose",
//             "__typename": "Song"
//           },
//           "segue": false
//         },
//         {
//           "song": {
//             "id": "ck7w1jh21002x0852j9ccwocp",
//             "name": "Danger Zone",
//             "originalArtist": "Kenny Loggins",
//             "__typename": "Song"
//           },
//           "segue": false
//         },
//         {
//           "song": {
//             "id": "ck7w1jh2900310852yfe1w3xb",
//             "name": "One More Day",
//             "originalArtist": "Goose",
//             "__typename": "Song"
//           },
//           "segue": false
//         }
//       ]
//     },
//     {
//       "name": "SET_2",
//       "tracks": [
//         {
//           "song": {
//             "id": "ck7w1jh2g00350852s4gqqrwx",
//             "name": "Feliz Navidad",
//             "originalArtist": "Traditional",
//             "__typename": "Song"
//           },
//           "segue": false
//         }
//       ]
//     },
//     {
//       "name": "ENCORE_3",
//       "tracks": [
//         {
//           "song": {
//             "id": "ck7w1jh2m00390852rkapi602",
//             "name": "Jive I",
//             "originalArtist": "Goose",
//             "__typename": "Song"
//           },
//           "segue": false
//         },
//         {
//           "song": {
//             "id": "ck7w1jh2u003d0852w54an5wo",
//             "name": "Jive Lee",
//             "originalArtist": "Goose",
//             "__typename": "Song"
//           },
//           "segue": false
//         },
//         {
//           "song": {
//             "id": "ck7w1jh8x004d0852qn1zz8hy",
//             "name": "Jive II",
//             "originalArtist": "Goose",
//             "__typename": "Song"
//           },
//           "segue": false
//         }
//       ]
//     }
//   ],
//   notes: 'This is blah blah blah',
//   nugsNetId: '123abc',
//   bandcampAlbumId: '2019-buffalo-blah-blah',
//   archiveUrl: 'adfadf'
// }

const buildSetlistQueryObject = (setlist) => {
  return `{ "create": [
        ${setlist.map((set) => (`
          {
            "name": "${set.name}",
            "tracks": {
              "create": [
                ${set.tracks.map((track) => {
    if (!!track.notes) {
      return (`
                                {
                                  "notes": "${track.notes}",
                                  "segue": ${!!track.segue},
                                  "song": {
                                    "connect": {
                                      "id": "${track.song.id}"
                                    }
                                  }
                                }
                              `)
    } else {
      return (`
                {
                  "segue": ${!!track.segue},
                  "song": {
                    "connect": {
                      "id": "${track.song.id}"
                    }
                  }
                }
              `)
    }
  })}
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

const calculateProgress = (currentStep) => {
  switch (currentStep) {
    case 1:
      return 30
    case 2:
      return 75;
    case 3:
      return 85;
    case 4:
      return 100;
    default:
      return 15
  }
}

const NewShow = (props) => {
  document.title = "New Show - El Göose";
  // const { loading: showLoading, error: showError, data: showData } = useQuery(SHOW, { variables: { id: props.match.params.id }})
  const [createNewShow, { loading, error }] = useMutation(CREATE_NEW_SHOW);
  const [currentStep, setStep] = useState(0);
  let history = useHistory();

  const handleSubmit = async (setlist, venue, date, notes, bandcampAlbumId, nugsNetId, archiveUrl) => {
    console.log('NewShow handlesubmit: ', setlist, venue, date, notes, bandcampAlbumId, nugsNetId, archiveUrl);
    // parse and build query for prisma
    const setlistQueryString = buildSetlistQueryObject(setlist);
    console.log('buildSetlistQueryObject: ', buildSetlistQueryObject);
    const setlistQueryObject = JSON.parse(setlistQueryString);
    console.log('setlistQueryObject: ', setlistQueryObject);
    const venueQueryString = buildVenueQueryObject(venue);
    const venueQueryObject = JSON.parse(venueQueryString);
    const momentDate = moment(date).utc();

    let variablesObject = {
      date: momentDate,
      venue: venueQueryObject,
      setlist: setlistQueryObject
    };

    if (!!notes) {
      variablesObject.notes = notes
    }

    if (!!bandcampAlbumId) {
      variablesObject.bandcampAlbumId = bandcampAlbumId
    }

    if (!!nugsNetId) {
      variablesObject.nugsNetId = nugsNetId
    }

    if (!!archiveUrl) {
      variablesObject.archiveUrl = archiveUrl
    }

    const { data, error } = await createNewShow({ variables: variablesObject });
    if (!error && data) {
      history.push(`shows/${data.createShow.id}/setlist`);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  return (
    <Wrapper>
      <BandDateContainer>
        <BandDateWrapper>
          Add a New Show
          </BandDateWrapper>
      </BandDateContainer>
      <FormContainer>
        <NewShowContainer>
          <ProgressBarContainer>
            <ProgressBar progress={calculateProgress(currentStep) || 5} />
          </ProgressBarContainer>
          <ShowForm show={undefinedShow} currentStep={currentStep} setStep={setStep} handleSubmit={handleSubmit} />
        </NewShowContainer>
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

const ProgressBarContainer = styled.div`
  background: ${lightOrange};
  height: 3px;
  width: 100%;
`;

const Progress = keyframes`
  5% {
        width: 5%;
    };
  
  30% {
        width: 30%;
    };
  
  75% {
        width: 75%;
    };
  `;

const ProgressBar = styled.div`
  height: 3px;
  width: ${p => p.progress || 5}%;
  background: ${orange};
  transition-property: width;
  transition-duration: .25s;
  animation: ${Progress} 0s linear;
`;

const NewShowContainer = styled.div`
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

export default NewShow;