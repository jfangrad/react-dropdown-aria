import React from 'react';
import Dropdown from '../../../src/Dropdown';

const options = [
  { value: 'JavaScript', className: 'test', ariaLabel: 'test-aria' },
  { value: 'Java', title: 'testing title' },
  { value: 'Swift' },
  { value: 'C' },
  { value: 'Go', className: 'test' },
  { value: 'Ruby' },
  { value: 'C++' },
  { value: 'Python' },
];

class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interest: null,
      disabled: false,
      searchable: true,
    };
  }

  onCheckboxClick = ({ nativeEvent }) => {
    switch (nativeEvent.target.id) {
      case 'disable-checkbox':
        this.setState({ disabled: nativeEvent.target.checked });
        break;
      case 'searchable-checkbox':
        this.setState({ searchable: nativeEvent.target.checked });
        break;
      default:
        break;
    }
  }

  setInterest = (selectedOption) => {
    this.setState({ interest: selectedOption });
  }

  render() {
    const { disabled, interest, searchable } = this.state;

    return (
      <div className="section">
        <div className="section-title">Language Of Choice</div>
        <Dropdown
          placeholder="Language of Choice?"
          className="my-dropdown"
          id="dropdown"
          ariaLabel="React Simple Dropdown"
          options={options}
          selectedOption={interest}
          setSelected={this.setInterest}
          disabled={disabled}
          width={400}
          maxContentHeight={150}
          searchable={searchable}
        />
        <div className="buttons-container">
          <span className="checkbox-input"><input id="disable-checkbox" type="checkbox" onClick={this.onCheckboxClick} />Disable</span>
          <span className="checkbox-input"><input id="searchable-checkbox" type="checkbox" onClick={this.onCheckboxClick} checked={searchable} />Searchable</span>
        </div>
      </div>
    );
  }
}

export default Basic;
