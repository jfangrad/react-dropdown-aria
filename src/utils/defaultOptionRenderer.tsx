import React from 'react';
import { cx } from 'emotion';
import OptionItem from '../components/OptionItem';
import { isOptionGroup, isArray } from './helper';
import { StyleKey, ExtraState, DropdownOption, OptionGroup, Option } from './types';
import { StyleKeys } from './constants';

const pushRef = (elementsRef: HTMLButtonElement[]) => (element: HTMLButtonElement) => {
  if (element) {
    elementsRef.push(element);
  }
}

function defaultOptionRenderer(
  selectedOption: string | string[],
  options: DropdownOption[],
  selectedOptionClassName: string,
  optionClassName: string,
  onOptionClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => void,
  elementsRef: HTMLButtonElement[],
  getStyle: (key: StyleKey, extraState?: ExtraState) => string
) {
  return options.map((option) => {

    if (isOptionGroup(option)) { // Is group of options
      const { groupOptions, label } = (option as OptionGroup);
      return (
        <div key={label} className={getStyle(StyleKeys.GroupContainer)}>
          <div className={getStyle(StyleKeys.GroupHeading)}>
            <div>{label.toUpperCase()}</div>
            <div>{groupOptions.length}</div>
          </div>
          {
            groupOptions.map((groupOption) => {
              const selected = isArray(selectedOption) ? selectedOption.indexOf(groupOption.value) !== -1 : groupOption.value === selectedOption;
              const groupOptionClass = cx(groupOption.className, getStyle(StyleKeys.OptionItem, { selected }));
              return (
                <OptionItem
                  key={groupOption.value}
                  optionClass={groupOptionClass}
                  onOptionClicked={onOptionClicked}
                  option={groupOption}
                  ref={pushRef(elementsRef)}
                />
              );
            })
          }
        </div>
      );
    }

    const { value, className } = option;
    const selected = isArray(selectedOption) ? selectedOption.indexOf(value) !== -1 : value === selectedOption;
    const optionClass = cx(className, getStyle(StyleKeys.OptionItem, { selected }));
    return (
      <OptionItem
        key={value}
        optionClass={optionClass}
        onOptionClicked={onOptionClicked}
        option={(option as Option)}
        ref={pushRef(elementsRef)}
      />
    );
  });
}

export default defaultOptionRenderer;
