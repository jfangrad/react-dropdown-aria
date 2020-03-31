import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const GreenCheckbox = withStyles({
  root: {
    padding: '3px',
    marginRight: '5px',
    marginLeft: '12px',
    color: grey[500],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const ExampleSection = ({ title, fileName, children }) => {
  const [disabled, setDisabled] = useState(false);
  const [searchable, setSearchable] = useState(true);

  const handleCheckboxClick = type => ({target}) => {
    if (type === 'disable') {
      setDisabled(target.checked);
    } else {
      setSearchable(target.checked);
    }
  };

  return (
    <div className="section">
      <div className="section-title">
        {title} |
        <a href={`https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/${fileName}`} className="section-source-link">
          Source
        </a>
      </div>
      {children({disabled, searchable})}
      <div className="buttons-container">
        <FormControlLabel
          label="Disabled"
          control={
            <GreenCheckbox
              checked={disabled}
              onChange={handleCheckboxClick('disable')}
            />
          }
        />
        <FormControlLabel
          label="Searchable"
          control={
            <GreenCheckbox
              checked={searchable}
              onChange={handleCheckboxClick('searchable')}
            />
          }
        />
      </div>
    </div>
  );
};

ExampleSection.propTypes = {
  title: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default ExampleSection;
