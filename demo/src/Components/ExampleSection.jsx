import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const ExampleSection = ({ title, fileName, sectionId, children }) => {
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
      <div className="section-title" id={sectionId}>
        {title} |
        <a href={`https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/${fileName}`} className="section-source-link">
          Source
        </a>
      </div>
      {children({disabled, searchable})}
      <div className="buttons-container">
        <Checkbox
          checked={disabled}
          onChange={handleCheckboxClick('disable')}
        >
          Disabled
        </Checkbox>
        <Checkbox
          checked={searchable}
          onChange={handleCheckboxClick('searchable')}
        >
          Searchable
        </Checkbox>
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
