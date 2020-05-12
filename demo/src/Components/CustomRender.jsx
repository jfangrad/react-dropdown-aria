import React from 'react';
import Dropdown, { StyleKeys } from 'react-dropdown-aria';
import ExampleSection from './ExampleSection';
import '../styles/CustomRender.scss';

const options = [
  { value: 'Custom' },
  { value: 'Render' },
  { value: 'Function' },
  { value: 'Example' },
];

const customStyle = {
  optionItem: (base, state, { index }) => ({
    ...base,
    'text-align': index % 2 === 0 ? 'left' : 'right',
  }),
};

class CustomRender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interest: null,
    };
  }

  setInterest = (selectedOption) => {
    this.setState({ interest: selectedOption.value });
  }

  renderOption = (props, getStyle, index) => {
    const { option } = props;
    const { selectedOption } = this.state;
    const classNames = getStyle(StyleKeys.OptionItem, { index });

    return (
      <span style={{ 'text-align': index % 2 === 0 ? 'left' : 'right', width: '100%' }}>
        { option.value }
      </span>
    );
  }

  render() {
    const { interest } = this.state;

    return (
      <ExampleSection title="Custom Option Render Function" fileName="CustomRender.jsx" sectionId="custom_option_renderer">
        {(dropdownState) => (
          <Dropdown
            buttonClassName="my-dropdown"
            id="dropdown"
            ariaLabel="Custom Option Rendering Dropdown"
            options={options}
            optionItemRenderer={this.renderOption}
            value={interest}
            onChange={this.setInterest}
            width={400}
            style={customStyle}
            {...dropdownState}
          />
        )}
      </ExampleSection>
    );
  }
}

export default CustomRender;
