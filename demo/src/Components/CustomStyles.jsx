import React from 'react';
import Dropdown from '../../../src/Dropdown';
import '../styles/CustomStyles.scss';

const options = [
  { value: 'Helicopter', iconClass: 'fas fa-helicopter' },
  { value: 'Plane', iconClass: 'fas fa-plane' },
  { value: 'Train', iconClass: 'fas fa-train' },
  { value: 'Bus', iconClass: 'fas fa-bus' },
  { value: 'Car', iconClass: 'fas fa-car' },
  { value: 'Ship', iconClass: 'fas fa-ship' },
  { value: 'Rocket', iconClass: 'fas fa-rocket' },
  { value: 'Bike', iconClass: 'fas fa-bicycle' },
  { value: 'Motorcycle', iconClass: 'fas fa-motorcycle' },
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
        <div className="section-title">Custom Styling <a href="https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/CustomStyles.jsx">(Source)</a></div>
        <Dropdown
          placeholder="Transportation of Choice?"
          buttonClassName="my-custom-dropdown"
          contentClassName="my-custom-dropdown-content"
          optionClassName="custom-option"
          selectedOptionClassName="custom-option-selected"
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
          <span className="checkbox-input"><input id="disable-checkbox" type="checkbox" onChange={this.onCheckboxClick} />Disable</span>
          <span className="checkbox-input"><input id="searchable-checkbox" type="checkbox" onChange={this.onCheckboxClick} checked={searchable} />Searchable</span>
        </div>
      </div>
    );
  }
}

export default Basic;
