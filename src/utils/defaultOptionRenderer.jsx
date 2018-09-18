import React from 'react';
import { cx } from 'emotion';
import OptionItem from '../components/OptionItem';

function defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, onOptionClicked, elementsRef, getStyle) {
  return options.map((option) => {
    const { groupOptions, label, value, className } = option;

    if (groupOptions) { // Is group of options
      return (
        <div key={label} className={getStyle('groupContainer')}>
          <div className={getStyle('groupHeading')}>
            <div>{label.toUpperCase()}</div>
            <div>{groupOptions.length}</div>
          </div>
          {
            option.groupOptions.map((groupOption) => {
              const groupOptionClass = cx(groupOption.className, getStyle('optionItem', groupOption.value === selectedOption));
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

    const optionClass = cx(className, getStyle('optionItem', { selected: value === selectedOption }));
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
