import React from 'react';
import ExampleSection from './ExampleSection';
import Dropdown from '../../../lib';
import styles from '../styles/CustomStyles';

const airOptions = [
  { value: 'Helicopter', iconClass: 'fas fa-helicopter' },
  { value: 'Plane', iconClass: 'fas fa-plane' },
  { value: 'Rocket', iconClass: 'fas fa-rocket' },
];

const landOptions = [
  { value: 'Train', iconClass: 'fas fa-train' },
  { value: 'Bus', iconClass: 'fas fa-bus' },
  { value: 'Car', iconClass: 'fas fa-car' },
  { value: 'Ship', iconClass: 'fas fa-ship' },
  { value: 'Bike', iconClass: 'fas fa-bicycle' },
  { value: 'Motorcycle', iconClass: 'fas fa-motorcycle' },
];

const options = [
  { label: 'Air', groupOptions: airOptions },
  { label: 'Land', groupOptions: landOptions },
];

class CustomStyles extends React.Component {
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
      <ExampleSection title="Custom Styling" fileName="CustomStyles.jsx">
        {(dropdownState) => (
          <Dropdown
            {...dropdownState}
            placeholder="Transportation of Choice?"
            id="dropdown"
            ariaLabel="Custom styled Dropdown"
            options={options}
            selectedOption={interest}
            setSelected={this.setInterest}
            width={400}
            maxContentHeight={150}
            style={styles}
            pageKeyTraverseSize={3}
          />
        )}
      </ExampleSection>
    );
  }
}

export default CustomStyles;
