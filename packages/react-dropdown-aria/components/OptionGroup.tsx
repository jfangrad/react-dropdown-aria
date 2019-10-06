import React, { MutableRefObject } from 'react';
import OptionItem, { OptionItemProps } from './OptionItem';
import { OptionGroup as OptionGroupType, GetStyleFunction } from '../utils/types';
import { StyleKeys } from '../utils/constants';
import { cx } from 'emotion';

interface OptionGroupProps {
  optionGroup: OptionGroupType,
  getStyle: GetStyleFunction,
  selectedOption: string,
  focusedIndex: number,
  startingIndex: number,
  onOptionClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => void,
  itemRenderer?: ((props: OptionItemProps, buttonRef: MutableRefObject<HTMLButtonElement | null>) => JSX.Element) | undefined,
};

const OptionGroup = ({
  optionGroup,
  getStyle,
  selectedOption,
  startingIndex,
  focusedIndex,
  onOptionClicked,
  itemRenderer
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
