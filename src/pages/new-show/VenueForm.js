import React, { useState } from 'react';
import styled from 'styled-components';
import darken from 'polished/lib/color/darken';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { offWhite } from '../../utils/colors'

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from '../../components/FormComponents';

const VENUES = gql`
  query {
    venues {
      id
      name
      city
      state
    }
  }
`;

export const VenueFormExplainer = () => (
  <FormExplainer>
    <FormSectionHeader>
      Venue
      </FormSectionHeader>
    <FormSectionSubtext>
      Here is some explainer text about the section. Yada, yada, yada...
      </FormSectionSubtext>
  </FormExplainer>
)

const VenueForm = ({ venue, setVenue }) => {
  const { loading, error, data: possibleVenues } = useQuery(VENUES);
  const [filteredOptions, setFilteredOptions] = useState(possibleVenues);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    setUserInput(userInput);
    console.log('possibleVenues: ', possibleVenues);
    const filteredOptions = possibleVenues.venues.filter((venue, index) => venue.name.toLowerCase().includes(userInput.toLowerCase()));
    setFilteredOptions(filteredOptions);
    if (filteredOptions.length > 0 && userInput !== '') {
      setShowOptions(true);
    } else if (userInput === '') {
      setShowOptions(false);
    } else {
      setShowOptions(false);
    }
  }

  const selectVenue = (venue) => {
    setShowOptions(false);
    setVenue(venue);
    setUserInput(venue.name);
  }

  return (
    <FormSection>
      <VenueFormExplainer />
      <ActualForm>
        <Input
          readOnly={loading}
          name={"name"}
          value={userInput}
          onChange={onChange}
          placeholder={loading ? 'Loading Venues...' : "Venue Name"} />
        {error && <p>Error :(</p>}
        <VenueSuggestions>
          {showOptions && filteredOptions.map((option) => (
            <VenueOption onClick={() => selectVenue(option)} >
              <VenueName>{option.name}</VenueName>
              <VenueLocation>{option.city}, {option.state}</VenueLocation>
            </VenueOption>
          ))}
        </VenueSuggestions>

        <div>
          {venue.city && <Input
            name={"city"}
            value={venue.city}
            placeholder={"Venue City"} />}
          {venue.state && <Input
            name={"state"}
            value={venue.state}
            placeholder={"Venue State"} />}
        </div>
      </ActualForm>
    </FormSection>
  )
}

const VenueSuggestions = styled.div`
  background: ${offWhite};
  z-index: 5;
  position: absolute;
  top: 48px;
  width: 100%;
`;

const VenueOption = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: ${darken(0.05, offWhite)};
  }
`;

const VenueName = styled.div`
  font-weight: 700;
  font-size: 1em;
`
const VenueLocation = styled.div`
  font-weight: 100;
  font-size: 0.5em;
`

export default VenueForm;