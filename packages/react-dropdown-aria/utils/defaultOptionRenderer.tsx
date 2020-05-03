import React from 'react';
import { cx } from 'emotion';
import OptionItem, { OptionItemProps } from '../components/OptionItem';
import OptionGroup from '../components/OptionGroup';
import { isOptionGroup } from './helper';
import { DropdownOption, GetStyleFunction, OptionRendererFunction, OnOptionClicked } from './types';
import { StyleKeys } from './constants';

function defaultOptionRenderer(
  selectedOption: string,
  options: DropdownOption[],
  focusedIndex: number,
  onOptionClicked: OnOptionClicked,
  getStyle: GetStyleFunction,
  searchable: boolean,
  optionItemRenderer?: OptionRendererFunction,
) {
  const itemRenderer = optionItemRenderer ?
    (props: OptionItemProps) => optionItemRenderer(props, getStyle) :
    undefined;

  let index = 0;
  return options.map((option) => {
    if (isOptionGroup(option)) { // Is group of options
      const startingIndex = index;
      index += option.groupOptions.length;
      return (
        <OptionGroup
          key={option.label}
          optionGroup={option}
          selectedOption={selectedOption}
          focusedIndex={focusedIndex}
          startingIndex={startingIndex}
          onOptionClicked={onOptionClicked}
          getStyle={getStyle}
          itemRenderer={itemRenderer}
        />
      );
    }

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
      />
    );
  });
}

export default defaultOptionRenderer;
