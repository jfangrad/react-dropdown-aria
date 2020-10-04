import React from 'react';
import ExampleSection from './ExampleSection';
import Dropdown, { Option } from 'react-dropdown-aria';
import '../styles/CustomArrow.scss';

const options: Option[] = [
  { value: 'Custom' },
  { value: 'Arrow' },
  { value: 'Render' },
  { value: 'Function' },
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '4' },
  { value: '5' },
  { value: '6' },
  { value: '7' },
  { value: '8' },
  { value: '9' },
  { value: '10' },
];

class CustomArrow extends React.Component {
  state = {
    disabled: false,
    interest: undefined,
  };

  setInterest = (selectedOption: Option) => {
    this.setState({ interest: selectedOption.value });
  }

  customArrowRenderer = (open: boolean) => {
    const arrowClass = open ? 'far fa-smile custom-arrow' : 'far fa-frown custom-arrow';
    return <i className={arrowClass} />;
  }

  render() {
    const { interest } = this.state;

    return (
      <ExampleSection title="Custom Arrow Render Function" fileName="CustomArrow.jsx" sectionId="custom_arrow_render">
        {(dropdownState) => (
          <Dropdown
            className="my-dropdown"
            ariaLabel="Custom Arrow Dropdown"
            arrowRenderer={this.customArrowRenderer}
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

export default CustomArrow;
