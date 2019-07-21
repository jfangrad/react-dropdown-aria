import React from 'react';
import Dropdown from '../../../lib';

const languageOptions = [
  { value: 'ActionScript' },
  { value: 'Assembly' },
  { value: 'C#' },
  { value: 'Bash' },
  { value: 'Kotlin' },
  { value: 'LaTeX' },
  { value: 'Legoscript' },
  { value: 'Visual Basic' },
];

const frameworkOptions = [
  { value: 'React' },
  { value: 'Vue' },
  { value: 'Angular' },
  { value: 'Elm' },
];

const groupedOptions = [
  {
    label: 'Languages',
    groupOptions: languageOptions,
  },
  {
    label: 'frameworks',
    groupOptions: frameworkOptions,
  },
];

class Groups extends React.Component {
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
        <div className="section-title">Grouped Options <a href="https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/Groups.jsx">(Source)</a></div>
        <Dropdown
          placeholder={"What's best?"}
          buttonClassName="my-dropdown"
          id="dropdown"
          ariaLabel="Grouped Options Dropdown"
          options={groupedOptions}
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

export default Groups;
