import React from 'react';
import classNames from 'classnames';
// import OptionItem from '../components/OptionItem';


/*
This file needs changes once Enzyme updates to be able to handle forwardRef in tests
*/

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
                <button
                  aria-label={groupOption.ariaLabel}
                  className={groupOptionClass}
                  onClick={onOptionClicked}
                  onKeyDown={onOptionClicked}
                  ref={el => el && elementsRef.push(el)}
                  tabIndex="-1"
                  title={groupOption.title}
                  type="button"
                  key={groupOption.value}
                >
                  { groupOption.iconClass && <i className={`${groupOption.iconClass} option-icon`} />}
                  { groupOption.value }
                </button>
              );
              /* return (
                <OptionItem
                  key={groupOption.value}
                  optionClass={groupOptionClass}
                  onOptionClicked={onOptionClicked}
                  option={groupOption}
                  ref={el => el && elementsRef.push(el)}
                />
              ); */
            })
          }
        </div>
      );
    }

    const optionClass = classNames(className, (value === selectedOption) ? (selectedOptionClassName || 'dropdown-option-selected') : (optionClassName || 'dropdown-option'));
    return (
      <button
        aria-label={option.ariaLabel}
        className={optionClass}
        onClick={onOptionClicked}
        onKeyDown={onOptionClicked}
        ref={el => el && elementsRef.push(el)}
        tabIndex="-1"
        title={option.title}
        type="button"
        key={option.value}
      >
        { option.iconClass && <i className={`${option.iconClass} option-icon`} />}
        { option.value }
      </button>
    );
    // return (
    //   <OptionItem
    //     key={value}
    //     optionClass={optionClass}
    //     onOptionClicked={onOptionClicked}
    //     option={option}
    //     ref={el => el && elementsRef.push(el)}
    //   />
    // );
  });
}

export default defaultOptionRenderer;
