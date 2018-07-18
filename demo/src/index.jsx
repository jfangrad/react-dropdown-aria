import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../../src/Dropdown';
import './index.scss';
import '../../src/styles/Dropdown.scss';

const options = [
  { value: 'React', className: 'test', ariaLabel: 'test-aria' },
  { value: 'Angular', title: 'testing title' },
  { value: 'Vue' },
  { value: 'Elm' },
  { value: 'Go', className: 'test' },
  { value: 'Ruby' },
  { value: 'C++' },
  { value: 'Python' },
];

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interest: null,
      disabled: false,
    };
  }

  setInterest = (selectedOption) => {
    this.setState({ interest: selectedOption });
  }

  render() {
    const { interest, disabled } = this.state;

    return (
      <Dropdown
        placeholder="Framework of Choice?"
        className="my-dropdown"
        id="dropdown"
        ariaLabel="React Simple Dropdown"
        options={options}
        selectedOption={interest}
        setSelected={this.setInterest}
        disabled={disabled}
        width={200}
        maxContentHeight={150}
      />
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Demo />, document.getElementById('root'));
