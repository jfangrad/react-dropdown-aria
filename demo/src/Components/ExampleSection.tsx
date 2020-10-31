import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type ChildrenFunction = (params: { disabled: boolean, searchable: boolean }) => React.ReactNode;

interface IProps {
  title: string;
  fileName: string;
  sectionId: string;
  children: ChildrenFunction;
}

const ExampleSection = ({ title, fileName, sectionId, children }: IProps) => {
  const [disabled, setDisabled] = useState(false);
  const [searchable, setSearchable] = useState(true);

  const handleCheckboxClick = (type: string) => ({ target }: CheckboxChangeEvent) => {
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
