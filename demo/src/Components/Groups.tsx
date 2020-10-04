import React from 'react';
import Dropdown, { Option, OptionGroup } from 'react-dropdown-aria';
import ExampleSection from './ExampleSection';

const languageOptions: Option[] = [
  { value: 'ActionScript' },
  { value: 'Assembly' },
  { value: 'C#' },
  { value: 'Bash' },
  { value: 'Kotlin' },
  { value: 'LaTeX' },
  { value: 'Legoscript' },
  { value: 'Visual Basic' },
];

const frameworkOptions: Option[] = [
  { value: 'React' },
  { value: 'Vue' },
  { value: 'Angular' },
  { value: 'Meteor' },
];

const groupedOptions: OptionGroup[] = [
  {
    label: 'Languages',
    groupOptions: languageOptions,
  },
  {
    label: 'frameworks',
    groupOptions: frameworkOptions,
  },
];

class Groups extends React.Component {
  state = {
    interest: undefined,
  };

  setInterest = (selectedOption: Option) => {
    this.setState({ interest: selectedOption.value });
  }

  render() {
    const { interest } = this.state;

    return (
      <ExampleSection title="Grouped Options" fileName="Groups.jsx" sectionId="grouped_options">
        {(dropdownState) => (
          <Dropdown
            placeholder={"What's best?"}
            className="my-dropdown"
            ariaLabel="Grouped Options Dropdown"
            options={groupedOptions}
            value={interest}
            onChange={this.setInterest}
            width={400}
            maxContentHeight={150}
            {...dropdownState}
          />
        )}
      </ExampleSection>
    );
  }
}

export default Groups;
