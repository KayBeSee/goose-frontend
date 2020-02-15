import React from 'react';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from './StyledComponents';

const VenueForm = ({ venue, handleChange}) => (
  <FormSection>
    <FormExplainer>
      <FormSectionHeader>
        Venue
      </FormSectionHeader>
      <FormSectionSubtext>
        Here is some explainer text about the section. Yada, yada, yada...
      </FormSectionSubtext>
    </FormExplainer>
    <ActualForm>
      <Input
        name={"name"}
        value={venue.name}
        onChange={handleChange}
        placeholder={"Venue Name"} />
      <Input
      name={"city"}
        value={venue.city}
        onChange={handleChange}
        placeholder={"Venue City"} />
      <Input
      name={"state"}
        value={venue.state}
        onChange={handleChange}
        placeholder={"Venue State"} />
    </ActualForm>
  </FormSection>
);

export default VenueForm;