import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { black, white, offWhite } from '../../utils/colors';

import DateForm from './DateForm';
import VenueForm from './VenueForm';
import SetlistForm from './SetlistForm';
import NotesForm from './NotesForm';

const CREATE_NEW_SHOW = gql`
  mutation createShow($date: DateTime, $venue: Venue) {
    createShow(data: {
      date: $date,
      venue: $venue
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
        notes
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
  setlist: [],
  notes: undefined
}

const NewShow = (props) => {
  document.title = "New Show - El Göose";
  // const { loading: showLoading, error: showError, data: showData } = useQuery(SHOW, { variables: { id: props.match.params.id }})
  const [createNewShow, { loading, error, data }] = useMutation(CREATE_NEW_SHOW);

  // console.log('showData: ', showData);
  console.log('undefinedShow.date: ', undefinedShow.date);
  const [ currentStep, setStep ] = useState(0);

  const [ date, setDate ] = useState(undefinedShow.date);
  const [ venue, setVenue ] = useState(undefinedShow.venue);
  const [ setlist, setSetlist ] = useState(undefinedShow.setlist);
  const [ notes, setNotes ] = useState(undefinedShow.notes);

  console.log('date: ', date);
  console.log('venue: ', venue);
  console.log('setlist: ', setlist);
  console.log('notes: ', notes);

  const handleChange = (event, setter, item) => {
    const { name, value } = event.target
    console.log('handleChange name value: ', name, value);
    console.log('handleChange item: ', item );
    if(item) {
      console.log('hits ifitem')
      setter({
        ...item,
        [name]: value
      })    
    } else {
      setter(value)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createNewShow({ variables: { date, venue, setlist, notes } });
  }
  
  console.log('index setlist: ', setlist);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  return (
    <Wrapper key={'abc'}>
      <FormContainer>
        <NewShowContainer>
          <NewShowHeader>NewShow to El Göose</NewShowHeader>
          <NewShowForm>
            
            <DateForm date={date} handleChange={(e) => handleChange(e, setDate)} />

            <VenueForm venue={venue} handleChange={(e) => handleChange(e, setVenue, venue)}  />

            <SetlistForm setlist={setlist}setSetlist={setSetlist} />

            <NotesForm notes={notes} handleChange={(e) => handleChange(e, setNotes)} />

          <button type="button" onClick={(e) => { 
              e.preventDefault();
              console.log('foo')
              const newSetlist = [...setlist, { name: 'SET_3', tracks: [] }]; 
              setSetlist(newSetlist)
            }}>Add Set</button>



            <SignupButton>Review</SignupButton>
          </NewShowForm>
        </NewShowContainer>
      </FormContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
background: ${offWhite};
  width: 100%;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: ${black};
  // margin-top: -1px;
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: ${offWhite};
`;

const NewShowContainer = styled.div`
  background: ${white};
  box-shadow: 0 1px 46px -4px rgba(0,0,0,.28);
  max-width: 750px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 18px;
  border-radius: 4px;
`;

const NewShowHeader = styled.h1`
  text-align: center;
  color: #ff6f55;
`;

const NewShowForm = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
`;

const SignupButton = styled.button`
  padding: 16px;
  background: #ff6f55;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  &:active, &:focus {
    outline: 0;
    background: #e5634c;
  }
`;

export default NewShow;