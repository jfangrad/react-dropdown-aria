import React, { useCallback, MouseEvent } from 'react';

import { Option, ItemRenderer, OnOptionClicked } from '../utils/types';
import { cx } from '../utils/helper';

import { OptionItemWrap } from '../styles';

export interface OptionItemProps {
  option: Option;
  optionClass?: string;
  onOptionClicked: OnOptionClicked;
  itemRenderer?: ItemRenderer;
  index: number;
  selected: boolean;
  focused: boolean;
}

const OptionItem = (props: OptionItemProps) => {
  const { onOptionClicked, option, optionClass, itemRenderer, index, selected, focused } = props;

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onOptionClicked(option, true);
    },
    [onOptionClicked, option],
  );

  let content = (
    <>
      {option.iconClass && <i className={`${option.iconClass} dropdown-option-icon`} />}
      {option.value}
    </>
  );

  if (itemRenderer) {
    content = itemRenderer(props, index);
  }

  return (
    <OptionItemWrap
      aria-label={option.ariaLabel}
      aria-selected={selected}
      className={cx('dropdown-option', optionClass, { selected, focused })}
      onClick={handleClick}
      title={option.title}
      selected={selected}
      focused={focused}
    >
      {content}
    </OptionItemWrap>
  );
};

export default React.memo(OptionItem);
