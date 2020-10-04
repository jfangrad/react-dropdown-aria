import React from 'react';
import Dropdown, { Option } from 'react-dropdown-aria';
import ExampleSection from './ExampleSection';

const options: Option[] = [
  { value: 'Java', className: 'test', ariaLabel: 'test-aria' },
  { value: 'JavaScript', title: 'testing title' },
  { value: 'Swift' },
  { value: 'C' },
  { value: 'Go', className: 'test' },
  { value: 'Ruby' },
  { value: 'C++' },
  { value: 'Python', iconClass: 'fab fa-python' },
];

interface IState {
  interest?: string;
}

class Basic extends React.Component<{}, IState> {
  state = {
    interest: undefined
  };

  setInterest = (selectedOption: Option) => {
    this.setState({ interest: selectedOption.value });
  }

  render() {
    const { interest } = this.state;

    return (
      <ExampleSection title="Basic Usage" fileName="Basic.jsx" sectionId="basic">
        {(dropdownState) => (
          <Dropdown
            placeholder="Language of Choice?"
            className="my-dropdown"
            ariaLabel="React Simple Dropdown"
            options={options}
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

export default Basic;
