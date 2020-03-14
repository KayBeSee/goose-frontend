import React from 'react';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from './StyledComponents';

const DateForm = ({ date, setDate }) => {

  const onChange = (e) => {
    const date = e.currentTarget.value;
    setDate(date);
  }

  return (
    <FormSection>
      <FormExplainer>
        <FormSectionHeader>
          Date
          </FormSectionHeader>
        <FormSectionSubtext>
          Here is some explainer text about the section. Yada, yada, yada...
          </FormSectionSubtext>
      </FormExplainer>
      <ActualForm>
        <Input
          autoFocus
          value={date}
          name="date"
          onChange={onChange}
          placeholder={"Date"} />
      </ActualForm>
    </FormSection>
  );
}

export default DateForm;