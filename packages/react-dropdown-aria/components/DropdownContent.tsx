import React from 'react';
import { cx } from 'emotion';
import OptionItem, { OptionItemProps } from '../components/OptionItem';
import { isOptionGroup } from '../utils/helper';
import { DropdownOption, GetStyleFunction, OptionRendererFunction, OnOptionClicked } from '../utils/types';
import { StyleKeys } from '../utils/constants';
import { Inbox } from './icons';

interface DropdownContentProps {
  selectedOption: string;
  options: DropdownOption[];
  focusedIndex: number;
  onOptionClicked: OnOptionClicked;
  getStyle: GetStyleFunction;
  optionItemRenderer?: OptionRendererFunction;
}

function DropdownContent({
  selectedOption,
  options,
  focusedIndex,
  onOptionClicked,
  getStyle,
  optionItemRenderer,
}: DropdownContentProps) {
  if (options.length === 0) {
    return (
      <div className="dropdown-selector-content--empty">
        <Inbox />
        No data
      </div>
    );
  }

  const itemRenderer = optionItemRenderer ?
    (props: OptionItemProps, index: number) => optionItemRenderer(props, getStyle, index) :
    undefined;

  let index = 0;
  const renderedOptions = options.map((option) => {
    if (isOptionGroup(option)) { // Is group of options
      const { groupOptions, label } = option;

      const optionItems = groupOptions.map((groupOption) => {
        const selected = groupOption.value === selectedOption;
        const focused = index === focusedIndex;
        const optionClass = cx(groupOption.className, getStyle(StyleKeys.OptionItem, { selected, focused }));
        index += 1;
        return (
          <OptionItem
            key={groupOption.value}
            optionClass={optionClass}
            onOptionClicked={onOptionClicked}
            option={groupOption}
            itemRenderer={itemRenderer}
            index={index - 1}
          />
        );
      });

      return (
        <div className={getStyle(StyleKeys.GroupContainer)} key={option.label}>
          <div className={getStyle(StyleKeys.GroupHeading)}>
            <span>{label.toUpperCase()} | &nbsp;</span>
            <span>{groupOptions.length}</span>
          </div>
          {optionItems}
          <div className={getStyle(StyleKeys.GroupDivider)} />
        </div>
      );
    }

    // Single option
    const { value, className } = option;
    const focused = index === focusedIndex;
    const selected = value === selectedOption;
    const optionClass = cx(className, getStyle(StyleKeys.OptionItem, { selected, focused }));
    index += 1;
    return (
      <OptionItem
        key={value}
        optionClass={optionClass}
        onOptionClicked={onOptionClicked}
        option={option}
        itemRenderer={itemRenderer}
        index={index - 1}
      />
    );
  });

  return (<>{renderedOptions}</>);
}

export default DropdownContent;
