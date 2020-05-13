import React from 'react';
import OptionItem from './OptionItem';
import { OptionGroup as OptionGroupType, GetStyleFunction, ItemRenderer, OnOptionClicked } from '../utils/types';
import { StyleKeys } from '../utils/constants';
import { cx } from 'emotion';

interface OptionGroupProps {
  optionGroup: OptionGroupType;
  getStyle: GetStyleFunction;
  selectedOption: string;
  focusedIndex: number;
  startingIndex: number;
  onOptionClicked: OnOptionClicked;
  itemRenderer?: ItemRenderer;
}

const OptionGroup = ({
  optionGroup,
  getStyle,
  selectedOption,
  startingIndex,
  focusedIndex,
  onOptionClicked,
  itemRenderer,
}: OptionGroupProps) => {
  const { groupOptions, label } = optionGroup;
  let index = startingIndex;

  const ItemsMarkup = groupOptions.map((groupOption) => {
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
    <div className={getStyle(StyleKeys.GroupContainer)}>
      <div className={getStyle(StyleKeys.GroupHeading)}>
        <span>{label.toUpperCase()} | &nbsp;</span>
        <span>{groupOptions.length}</span>
      </div>
      {ItemsMarkup}
      <div className={getStyle(StyleKeys.GroupDivider)} />
    </div>
  );
};

OptionGroup.defaultProps = {
  itemRenderer: undefined,
};

export default OptionGroup;
