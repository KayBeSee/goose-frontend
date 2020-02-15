import React from 'react';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from './StyledComponents';

const VenueForm = ({ venue, handleChange}) => (
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
    {/* <UsernameInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"Show Notes"} /> */}
    </ActualForm>
  </FormSection>
);

export default VenueForm;