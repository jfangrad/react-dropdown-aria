import React from 'react';
import classNames from 'classnames';
import OptionItem from '../components/OptionItem';

function defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, onOptionClicked, elementsRef) {
  return options.map((option) => {
    const { groupOptions, label, value, className } = option;

    if (groupOptions) { // Is group of options
      return (
        <div key={label} className="dropdown-group">
          <div className="dropdown-group-heading">
            <div>{label.toUpperCase()}</div>
            <div>{groupOptions.length}</div>
          </div>
          {
            option.groupOptions.map((groupOption) => {
              const groupOptionClass = classNames(groupOption.className, (groupOption.value === selectedOption) ? (selectedOptionClassName || 'dropdown-option-selected') : (optionClassName || 'dropdown-option'));
              return (
                <OptionItem
                  key={groupOption.value}
                  optionClass={groupOptionClass}
                  onOptionClicked={onOptionClicked}
                  option={groupOption}
                  ref={el => el && elementsRef.push(el)}
                />
              );
            })
          }
        </div>
      );
    }

    const optionClass = classNames(className, (value === selectedOption) ? (selectedOptionClassName || 'dropdown-option-selected') : (optionClassName || 'dropdown-option'));
    return (
      <OptionItem
        key={value}
        optionClass={optionClass}
        onOptionClicked={onOptionClicked}
        option={option}
        ref={el => el && elementsRef.push(el)}
      />
    );
  });
}

export default defaultOptionRenderer;
