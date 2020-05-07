import React from 'react';
import Dropdown from 'react-dropdown-aria';
import ExampleSection from './ExampleSection';

const options = [
  { value: 'Java', className: 'test', ariaLabel: 'test-aria' },
  { value: 'JavaScript', title: 'testing title' },
  { value: 'Swift' },
  { value: 'C' },
  { value: 'Go', className: 'test' },
  { value: 'Ruby' },
  { value: 'C++' },
  { value: 'Python', iconClass: 'fab fa-python' },
];

class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interest: null,
    };
  }

  setInterest = (selectedOption) => {
    this.setState({ interest: selectedOption.value });
  }

  render() {
    const { interest } = this.state;

    return (
      <ExampleSection title="Basic Usage" fileName="Basic.jsx">
        {(dropdownState) => (
          <Dropdown
            placeholder="Language of Choice?"
            buttonClassName="my-dropdown"
            id="dropdown"
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
