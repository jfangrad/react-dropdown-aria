import React from 'react';
import OptionItem from './OptionItem';
import { OptionGroup as OptionGroupType, GetStyleFunction, ItemRenderer, OnOptionClicked } from '../utils/types';
import { StyleKeys } from '../utils/constants';
import { cx } from 'emotion';

interface OptionGroupProps {
  optionGroup: OptionGroupType,
  getStyle: GetStyleFunction,
  selectedOption: string,
  focusedIndex: number,
  startingIndex: number,
  onOptionClicked: OnOptionClicked,
  itemRenderer?: ItemRenderer,
  searchable: boolean,
};

const OptionGroup = ({
  optionGroup,
  getStyle,
  selectedOption,
  startingIndex,
  focusedIndex,
  onOptionClicked,
  itemRenderer,
  searchable,
}: OptionGroupProps) => {
  const { groupOptions, label } = optionGroup;
  let index = startingIndex;

  return (
    <div className={getStyle(StyleKeys.GroupContainer)}>
      <div className={getStyle(StyleKeys.GroupHeading)}>
        <div>{label.toUpperCase()} | &nbsp;</div>
        <div>{groupOptions.length}</div>
      </div>
      {
        groupOptions.map((groupOption) => {
          const selected = groupOption.value === selectedOption;
          const focused = index === focusedIndex;
          const groupOptionClass = cx(groupOption.className, getStyle(StyleKeys.OptionItem, { selected }));
          index += 1;

          return (
            <OptionItem
              key={groupOption.value}
              optionClass={groupOptionClass}
              onOptionClicked={onOptionClicked}
              option={groupOption}
              focused={focused}
              itemRenderer={itemRenderer}
              searchable={searchable}
            />
          );
        })
      }
      <div className={getStyle(StyleKeys.GroupDivider)} />
    </div>
  );
};

OptionGroup.defaultProps = {
  itemRenderer: undefined,
};

export default OptionGroup;
