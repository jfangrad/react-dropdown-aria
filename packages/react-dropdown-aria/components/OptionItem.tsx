import React, { useCallback, MouseEvent } from 'react';
import { Option, ItemRenderer, OnOptionClicked } from '../utils/types';

export interface OptionItemProps {
  option: Option;
  optionClass: string;
  onOptionClicked: OnOptionClicked;
  itemRenderer?: ItemRenderer;
  index: number;
}

const OptionItem = (props: OptionItemProps) => {
  const {
    onOptionClicked,
    option,
    optionClass,
    itemRenderer,
    index,
  } = props;

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onOptionClicked(option, true);
  }, [onOptionClicked, option]);

  let content = (
    <>
      { option.iconClass && <i className={`${option.iconClass} dropdown-option-icon`} />}
      { option.value }
    </>
  );

  if (itemRenderer) {
    content = itemRenderer(props, index);
  }

  return (
    <div
      aria-label={option.ariaLabel}
      className={`dropdown-option ${optionClass}`}
      onClick={handleClick}
      tabIndex={-1}
      title={option.title}
    >
      {content}
    </div>
  );
};

export default React.memo(OptionItem);
