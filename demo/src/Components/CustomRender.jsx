import React from 'react';
import Dropdown, { StyleKeys } from 'react-dropdown-aria';
import '../styles/CustomRender.scss';
import ExampleSection from './ExampleSection';

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

  renderOption = (props, getStyle) => {
    const { onOptionClicked, option } = props;
    const { selectedOption } = this.state;
    const classNames = getStyle(StyleKeys.OptionItem, { selected: option.value === selectedOption });

    return (
      <button
        aria-label={option.ariaLabel}
        className={classNames}
        onClick={onOptionClicked}
        onKeyDown={onOptionClicked}
        tabIndex="-1"
        title={option.title}
        type="button"
        key={option.value}
      >
        { option.value }
      </button>
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
