import React from 'react';
import styled from 'styled-components';
import ExampleSection from './ExampleSection';
import Dropdown, { Option, OptionGroup, StyledDropdownComponents } from 'react-dropdown-aria';
const { OptionContainer } = StyledDropdownComponents;

const airOptions: Option[] = [
  { value: 'Helicopter', iconClass: 'fas fa-helicopter' },
  { value: 'Plane', iconClass: 'fas fa-plane' },
  { value: 'Rocket', iconClass: 'fas fa-rocket' },
];

const landOptions: Option[] = [
  { value: 'Train', iconClass: 'fas fa-train' },
  { value: 'Bus', iconClass: 'fas fa-bus' },
  { value: 'Car', iconClass: 'fas fa-car' },
  { value: 'Ship', iconClass: 'fas fa-ship' },
  { value: 'Bike', iconClass: 'fas fa-bicycle' },
  { value: 'Motorcycle', iconClass: 'fas fa-motorcycle' },
];

const options: OptionGroup[] = [
  { label: 'Air', groupOptions: airOptions },
  { label: 'Land', groupOptions: landOptions },
];

const StyledDropdown = styled(Dropdown)`
  border: 2px solid #54854C;
  border-radius: 8px;
  transition: border 0.2s, background-color 0.5s;

  &:hover {
    border: 2px solid rgb(103, 103, 103);
    background-color: #f8f8f8;
  }

  &:focus {
    border: 2px solid rgb(0, 128, 188);
  }

  &:disabled {
    background-color: #e6e6e6;
  }

  ${OptionContainer} {
    padding: 5px 0;
    border: 1px solid rgb(154, 154, 154);
    border-radius: 5px;
  }
`;

class CustomStyles extends React.Component {
  state = {
    interest: undefined,
  };

  setInterest = (selectedOption: Option) => {
    this.setState({ interest: selectedOption.value });
  }

  render() {
    const { interest } = this.state;

    return (
      <ExampleSection title="Syled components Styling" fileName="StyledDropdown.jsx" sectionId="styled_components">
        {(dropdownState) => (
          <StyledDropdown
            {...dropdownState}
            placeholder="Transportation of Choice?"
            ariaLabel="Styled Dropdown"
            options={options}
            value={interest}
            onChange={this.setInterest}
            width={400}
            maxContentHeight={150}
            pageKeyTraverseSize={3}
          />
        )}
      </ExampleSection>
    );
  }
}

export default CustomStyles;
