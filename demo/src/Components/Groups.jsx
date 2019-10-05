import React from 'react';
import Dropdown from '../../../lib';
import ExampleSection from './ExampleSection';

const languageOptions = [
  { value: 'ActionScript' },
  { value: 'Assembly' },
  { value: 'C#' },
  { value: 'Bash' },
  { value: 'Kotlin' },
  { value: 'LaTeX' },
  { value: 'Legoscript' },
  { value: 'Visual Basic' },
];

const frameworkOptions = [
  { value: 'React' },
  { value: 'Vue' },
  { value: 'Angular' },
  { value: 'Elm' },
];

const groupedOptions = [
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
  constructor(props) {
    super(props);

    this.state = {
      interest: null,
    };
  }

  setInterest = (selectedOption) => {
    this.setState({ interest: selectedOption });
  }

  render() {
    const { interest } = this.state;

    return (
      <ExampleSection title="Grouped Options" fileName="Groups.jsx">
        {(dropdownState) => (
          <Dropdown
            placeholder={"What's best?"}
            buttonClassName="my-dropdown"
            id="dropdown"
            ariaLabel="Grouped Options Dropdown"
            options={groupedOptions}
            selectedOption={interest}
            setSelected={this.setInterest}
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
