import React, { useState } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import moment from 'moment';

import { FormSection, FormExplainer, FormSectionHeader, FormSectionSubtext, ActualForm, Input } from '../../components/FormComponents';

export const DateFormExplainer = () => (
  <FormExplainer>
    <FormSectionHeader>
      Date
          </FormSectionHeader>
    <FormSectionSubtext>
      Here is some explainer text about the section. Yada, yada, yada...
          </FormSectionSubtext>
  </FormExplainer>
);

const DateForm = ({ date, setDate }) => {
  const [isFocused, setIsFocused] = useState(true);

  return (
    <FormSection>
      <DateFormExplainer />
      <ActualForm>
        <DayPickerSingleDateController
          date={moment(date)} // momentPropTypes.momentObj or null
          numberOfMonths={1}
          hidden={false}
          hideKeyboardShortcutsPanel={true}
          onDateChange={thedate => setDate(moment(thedate).format("MM/DD/YYYY"))} // PropTypes.func.isRequired
          focused={true} // PropTypes.bool
          onFocusChange={({ focused }) => setIsFocused(!isFocused)} // PropTypes.func.isRequired
          id="datepicker" // PropTypes.string.isRequired,
        />
      </ActualForm>
    </FormSection>
  );
}

export default DateForm;