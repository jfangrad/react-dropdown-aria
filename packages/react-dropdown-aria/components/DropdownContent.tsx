import React from 'react';
import OptionItem, { OptionItemProps } from '../components/OptionItem';
import { isOptionGroup } from '../utils/helper';
import { DropdownOption, OptionRendererFunction, OnOptionClicked } from '../utils/types';
import { Inbox } from './icons';

import { GroupContainer, GroupDivider, GroupHeading } from '../styles';

interface DropdownContentProps {
  selectedOption: string;
  options: DropdownOption[];
  focusedIndex: number;
  onOptionClicked: OnOptionClicked;
  optionItemRenderer?: OptionRendererFunction;
  empty: boolean;
}

function DropdownContent({
  selectedOption,
  options,
  focusedIndex,
  onOptionClicked,
  optionItemRenderer,
  empty,
}: DropdownContentProps) {
  if (empty) {
    return (
      <div className="dropdown-selector-content--empty">
        <Inbox />
        No data
      </div>
    );
  }

  const itemRenderer = optionItemRenderer ?
    (props: OptionItemProps, index: number) => optionItemRenderer(props, index) :
    undefined;

  let index = 0;
  const renderedOptions = options.map((option) => {
    if (isOptionGroup(option)) { // Is group of options
      const { groupOptions, label } = option;

      const optionItems = groupOptions.map((groupOption) => {
        const selected = groupOption.value === selectedOption;
        const focused = index === focusedIndex;
        index += 1;
        return (
          <OptionItem
            key={groupOption.value}
            optionClass={groupOption.className}
            onOptionClicked={onOptionClicked}
            option={groupOption}
            itemRenderer={itemRenderer}
            index={index - 1}
            selected={selected}
            focused={focused}
          />
        );
      });

      return optionItems.length ? (
        <GroupContainer key={option.label}>
          <GroupHeading>
            <span>{label.toUpperCase()} | &nbsp;</span>
            <span>{groupOptions.length}</span>
          </GroupHeading>
          {optionItems}
          <GroupDivider />
        </GroupContainer>
      ) : null;
    }

    // Single option
    const { value, className } = option;
    const focused = index === focusedIndex;
    const selected = value === selectedOption;
    index += 1;
    return (
      <OptionItem
        key={value}
        optionClass={className}
        onOptionClicked={onOptionClicked}
        option={option}
        itemRenderer={itemRenderer}
        index={index - 1}
        selected={selected}
        focused={focused}
      />
    );
  });

  return (<>{renderedOptions}</>);
}

export default DropdownContent;
