import React, { useState, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { gql } from 'apollo-boost';
import styled, { keyframes } from 'styled-components';
import { black, white, offWhite, orange, lightOrange } from '../../utils/colors';

import DateForm from './DateForm';
import VenueForm from './VenueForm';
import SetlistForm from './SetlistForm';
import NotesForm from './NotesForm';
import ReviewScreen from './ReviewScreen';

const CREATE_NEW_SHOW = gql`
  mutation createShow($date: DateTime, $venue: VenueCreateOneWithoutShowsInput!, $setlist: SetCreateManyWithoutShowInput!, $notes: String) {
    createShow(data: {
      date: $date,
      venue: $venue,
      setlist: $setlist,
      notes: $notes
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
          song {
            id
            name
          }
        }
      }
    }
  }
`;

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
			archiveUrl
			nugsNetId
			bandcampAlbumId
    }
  }
`;

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

const exampleShow = {
  date: '12/20/2020',
  venue: { id: "ck7w1jguv001w0852yfd9re61", name: "Cervantes' Other Side", city: "Denver", state: "CO", __typename: "Venue" },
  setlist: [
    {
      "name": "SET_1",
      "tracks": [
        {
          "song": {
            "id": "ck7w1jh1q002t0852mnsidin3",
            "name": "Elizabeth",
            "originalArtist": "Goose",
            "__typename": "Song"
          },
          "segue": false
        },
        {
          "song": {
            "id": "ck7w1jh21002x0852j9ccwocp",
            "name": "Danger Zone",
            "originalArtist": "Kenny Loggins",
            "__typename": "Song"
          },
          "segue": false
        },
        {
          "song": {
            "id": "ck7w1jh2900310852yfe1w3xb",
            "name": "One More Day",
            "originalArtist": "Goose",
            "__typename": "Song"
          },
          "segue": false
        }
      ]
    },
    {
      "name": "SET_2",
      "tracks": [
        {
          "song": {
            "id": "ck7w1jh2g00350852s4gqqrwx",
            "name": "Feliz Navidad",
            "originalArtist": "Traditional",
            "__typename": "Song"
          },
          "segue": false
        }
      ]
    },
    {
      "name": "ENCORE_3",
      "tracks": [
        {
          "song": {
            "id": "ck7w1jh2m00390852rkapi602",
            "name": "Jive I",
            "originalArtist": "Goose",
            "__typename": "Song"
          },
          "segue": false
        },
        {
          "song": {
            "id": "ck7w1jh2u003d0852w54an5wo",
            "name": "Jive Lee",
            "originalArtist": "Goose",
            "__typename": "Song"
          },
          "segue": false
        },
        {
          "song": {
            "id": "ck7w1jh8x004d0852qn1zz8hy",
            "name": "Jive II",
            "originalArtist": "Goose",
            "__typename": "Song"
          },
          "segue": false
        }
      ]
    }
  ],
  notes: 'This is blah blah blah',
  nugsNetId: '123abc',
  bandcampAlbumId: '2019-buffalo-blah-blah',
  archiveUrl: 'adfadf'
}

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
  const [createNewShow, { loading, error, data }] = useMutation(CREATE_NEW_SHOW);
  const [currentStep, setStep] = useState(0);
  let history = useHistory();

  const [date, setDate] = useState(undefinedShow.date);
  const [venue, setVenue] = useState(undefinedShow.venue);
  const [setlist, setSetlist] = useState(undefinedShow.setlist);
  const [notes, setNotes] = useState(undefinedShow.notes);
  const [nugsNetId, setNugsNetId] = useState(undefinedShow.nugsNetId);
  const [archiveUrl, setArchiveUrl] = useState(undefinedShow.archiveUrl);
  const [bandcampAlbumId, setBandcampAlbumId] = useState(undefinedShow.bandcampAlbumId);

  // console.log('date: ', date);
  // console.log('venue: ', venue);
  // console.log('setlist: ', setlist);
  // console.log('notes: ', notes);

  // console.log('buildSetlistQueryObject: ', buildSetlistQueryObject(setlist));


  const handleSubmit = async (e) => {
    e.preventDefault();
    // KBC-TODO: figure out this submit

    console.log('buildSetlistQueryObject: ', buildSetlistQueryObject(setlist));
    const setlistQueryString = buildSetlistQueryObject(setlist);
    console.log('setlistQueryString:', setlistQueryString);
    const setlistQueryObject = JSON.parse(setlistQueryString)
    const venueQueryString = buildVenueQueryObject(venue);
    console.log('venueQueryString: ', venueQueryString)
    const venueQueryObject = JSON.parse(venueQueryString);
    console.log('typeof venuequery: ', typeof venueQueryObject);
    console.log('date: ', date);
    console.log('venueQuery: ', venueQueryObject);
    console.log('setlist: ', setlistQueryObject);
    console.log('notes: ', notes);

    const momentDate = moment(date).utc();
    console.log('momentDate: ', momentDate);
    const { data, error } = await createNewShow({ variables: { date: momentDate, venue: venueQueryObject, setlist: setlistQueryObject, notes, bandcampAlbumId, nugsNetId, archiveUrl } });
    if (!error && data) {
      history.push(`shows/${data.createShow.id}`);
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
          <NewShowForm>
            {currentStep === 0 && <DateForm date={date} setDate={setDate} />}

            {currentStep === 1 && <VenueForm venue={venue} setVenue={setVenue} />}

            {currentStep === 2 && <SetlistForm setlist={setlist} setSetlist={setSetlist} />}

            {currentStep === 3 && (
              <NotesForm
                notes={notes}
                setNotes={setNotes}
                archiveUrl={archiveUrl}
                setArchiveUrl={setArchiveUrl}
                nugsNetId={nugsNetId}
                setNugsNetId={setNugsNetId}
                bandcampAlbumId={bandcampAlbumId}
                setBandcampAlbumId={setBandcampAlbumId} />
            )}

            {currentStep === 4 && (
              <ReviewScreen
                date={date}
                venue={venue}
                setlist={setlist}
                notes={notes}
                archiveUrl={archiveUrl}
                nugsNetId={nugsNetId}
                bandcampAlbumId={bandcampAlbumId} />
            )}

            <SignupButton
              type="button"
              onClick={(e) => {
                if (currentStep === 4) {
                  console.log('hits handleSubmit')
                  handleSubmit(e)
                }
                setStep(currentStep + 1)
              }}>
              {currentStep !== 3 ? 'Next' : currentStep === 3 ? 'Preview' : 'Save Show'}
            </SignupButton>
          </NewShowForm>
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
color: ${ black};
min-height: 340px;

// background: ${offWhite};
//   width: 100%;
//   text-align: left;
//   font-family: 'Montserrat', sans-serif;
//   color: ${black};
//   display: flex;
//   flex: 1;
//   justify-content: center;
//   flex-direction: column;
`;

const BandDateContainer = styled.div`
border-top: 4px solid ${orange};
display: flex;
margin-bottom: 24px;
justify-content: space-between;
// align-items: center;
max-width: 750px;
// margin-top: -6px;  
// justify-self: center;
// align-self: center;
`;

const BandDateWrapper = styled.span`
  background: ${ orange};
  padding: 12px;
  color: ${ white};
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
  background: ${ white};
  box-shadow: 0 1px 46px 4px rgba(0, 0, 0, .28);
  max-width: 750px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 18px;
  border-radius: 4px;
  min-height: 340px;
`;

const NewShowForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  border-radius: 0 0 4px 4px;
  position: relative;

  > div {
    flex: 1;
  }
`;

const SignupButton = styled.button`
  padding: 16px;
  background: ${ orange};
  color: #fff;
  border: none;
  border-radius: 0 0 4px 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  margin: 0;

    &: hover {
    cursor: pointer;
  }

    &: active, &: focus {
    outline: 0;
    background: #e5634c;
  }
`;

export default NewShow;