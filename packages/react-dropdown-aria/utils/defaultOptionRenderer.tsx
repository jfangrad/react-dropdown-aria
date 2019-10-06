import React, { MutableRefObject } from 'react';
import { cx } from 'emotion';
import OptionItem, { OptionItemProps } from '../components/OptionItem';
import OptionGroup from '../components/OptionGroup';
import { isOptionGroup } from './helper';
import { DropdownOption, GetStyleFunction, OptionRendererFunction } from './types';
import { StyleKeys } from './constants';

function defaultOptionRenderer(
  selectedOption: string,
  options: DropdownOption[],
  focusedIndex: number,
  onOptionClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => void,
  getStyle: GetStyleFunction,
  optionItemRenderer?: OptionRendererFunction,
) {
  const itemRenderer = optionItemRenderer ?
    (props: OptionItemProps, optionRef: MutableRefObject<HTMLButtonElement | null>) => optionItemRenderer(props, optionRef, getStyle) :
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
    const isFocused = index === focusedIndex;
    const optionClass = cx(className, getStyle(StyleKeys.OptionItem, { selected: value === selectedOption }));
    index += 1;
    return (
      <OptionItem
        key={value}
        optionClass={optionClass}
        onOptionClicked={onOptionClicked}
        option={option}
        focused={isFocused}
        itemRenderer={itemRenderer}
      />
    );
  });
}

export default defaultOptionRenderer;
