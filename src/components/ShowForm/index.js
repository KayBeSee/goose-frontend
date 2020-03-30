import React, { useState } from 'react';
import styled from 'styled-components';

import { orange } from '../../utils/colors';

import DateForm from './DateForm';
import VenueForm from './VenueForm';
import SetlistForm from './SetlistForm';
import NotesForm from './NotesForm';
import ReviewScreen from './ReviewScreen';

const ShowForm = ({ show, currentStep, setStep, handleSubmit }) => {
  const [date, setDate] = useState(show.date);
  const [venue, setVenue] = useState(show.venue);
  const [setlist, setSetlist] = useState(show.setlist);
  const [notes, setNotes] = useState(show.notes);
  const [nugsNetId, setNugsNetId] = useState(show.nugsNetId);
  const [archiveUrl, setArchiveUrl] = useState(show.archiveUrl);
  const [bandcampAlbumId, setBandcampAlbumId] = useState(show.bandcampAlbumId);

  return (
    <ShowFormWrapper>
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
          setStep={setStep}
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
          e.preventDefault();
          if (currentStep === 4) {
            handleSubmit(setlist, venue, date, notes, bandcampAlbumId, nugsNetId, archiveUrl)
          }
          setStep(currentStep + 1)
        }}>
        {currentStep !== 3 ? 'Next' : currentStep === 3 ? 'Preview' : 'Save Show'}
      </SignupButton>
    </ShowFormWrapper>
  )
}

const ShowFormWrapper = styled.form`
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
  background: ${orange};
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

export default ShowForm
