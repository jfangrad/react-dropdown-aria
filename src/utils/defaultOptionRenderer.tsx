import React from 'react';
import { cx } from 'emotion';
import OptionItem, { DropdownOption, OptionGroup, Option } from '../components/OptionItem';

const pushRef = (elementsRef: HTMLButtonElement[]) => (element: HTMLButtonElement) => {
  if (element) {
    elementsRef.push(element);
  }
}

function defaultOptionRenderer(
  selectedOption: string,
  options: DropdownOption[],
  selectedOptionClassName: string,
  optionClassName: string,
  onOptionClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => void,
  elementsRef: HTMLButtonElement[],
  getStyle: (key: string, extraState?: {} | undefined) => string
) {
  return options.map((option) => {

    if ((option as OptionGroup).groupOptions) { // Is group of options
      const { groupOptions, label } = (option as OptionGroup);
      return (
        <div key={label} className={getStyle('groupContainer')}>
          <div className={getStyle('groupHeading')}>
            <div>{label.toUpperCase()}</div>
            <div>{groupOptions.length}</div>
          </div>
          {
            groupOptions.map((groupOption) => {
              const groupOptionClass = cx(groupOption.className, getStyle('optionItem', groupOption.value === selectedOption));
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

    const { value, className } = (option as Option);
    const optionClass = cx(className, getStyle('optionItem', { selected: value === selectedOption }));
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
