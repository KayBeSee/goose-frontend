import React, { Fragment } from 'react';
import styled from 'styled-components';
import { orange, offWhite } from '../../utils/colors';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from '../../components/FormComponents';

const VenueForm = ({
  notes,
  setNotes,
  archiveUrl,
  setArchiveUrl,
  nugsNetId,
  setNugsNetId,
  bandcampAlbumId,
  setBandcampAlbumId
}) => (
    <Fragment>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Show Notes
      </FormSectionHeader>
          <FormSectionSubtext>
            Here is some explainer text about the section. Yada, yada, yada...
      </FormSectionSubtext>
        </FormExplainer>
        <ActualForm>
          <NotesTextArea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={"Show Notes"} />
        </ActualForm>
      </FormSection>

      <FormSectionGray>
        <FormExplainer>
          <FormSectionHeader>
            Archive.org URL
      </FormSectionHeader>
          <FormSectionSubtext>
            Here is some explainer text about the section. Yada, yada, yada...
      </FormSectionSubtext>
        </FormExplainer>
        <ActualForm>
          <Input
            value={archiveUrl}
            onChange={(e) => setArchiveUrl(e.target.value)}
            placeholder={"https://archive.org/details/gd77-05-08.sbd.hicks.4982.sbeok.shnf"} />
        </ActualForm>
      </FormSectionGray>
      <FormSection>
        <FormExplainer>
          <FormSectionHeader>
            Nugs.net ID
      </FormSectionHeader>
          <FormSectionSubtext>
            Here is some explainer text about the section. Yada, yada, yada...
      </FormSectionSubtext>
        </FormExplainer>
        <ActualForm>
          <Input
            value={nugsNetId}
            onChange={(e) => setNugsNetId(e.target.value)}
            placeholder={"123abc"} />
        </ActualForm>
      </FormSection>
      <FormSectionGray>
        <FormExplainer>
          <FormSectionHeader>
            Bandcamp Album ID
      </FormSectionHeader>
          <FormSectionSubtext>
            Here is some explainer text about the section. Yada, yada, yada...
      </FormSectionSubtext>
        </FormExplainer>
        <ActualForm>
          <Input
            value={bandcampAlbumId}
            onChange={(e) => setBandcampAlbumId(e.target.value)}
            placeholder={"2019-11-16-nietzsches-buffalo-ny"} />
        </ActualForm>
      </FormSectionGray>
    </Fragment >
  );

const NotesTextArea = styled.textarea`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid rgb(241, 243, 245);
  box-shadow: 0px;
  outline: 0;
  text-align: left;
  font-family: 'Raleway', sans-serif;

  &:active, &:focus {
    border: 1px solid ${orange};
    outline: 0;
  }
`;

const FormSectionGray = styled(FormSection)`
  background: ${offWhite};
`;

export default VenueForm;