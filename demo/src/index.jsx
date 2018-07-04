import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../../src/Dropdown';
import './index.scss';

const options = [
  { name: 'React', className: 'test' },
  { name: 'Angular' },
  { name: 'Vue' },
  { name: 'Elm' },
  { name: 'Go', className: 'test' },
  { name: 'Ruby' },
  { name: 'C++' },
  { name: 'Python' },
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
        options={options}
        selectedOption={interest}
        setSelected={this.setInterest}
        disabled={disabled}
        width={200}
        maxContentHeight={150}
        hideArrow
        centerText
      />
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Demo />, document.getElementById('root'));
