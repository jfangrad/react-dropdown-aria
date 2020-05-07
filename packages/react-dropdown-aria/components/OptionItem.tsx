import React from 'react';
import { Option, ItemRenderer, OnOptionClicked } from '../utils/types';

export interface OptionItemProps {
  option: Option,
  optionClass: string,
  onOptionClicked: OnOptionClicked,
  itemRenderer?: ItemRenderer,
};

const OptionItem = (props: OptionItemProps) => {
  const {
    onOptionClicked,
    option,
    optionClass,
    itemRenderer,
  } = props;

  if (itemRenderer) {
    return itemRenderer(props);
  }

  return (
    <div
      aria-label={option.ariaLabel}
      className={`dropdown-option ${optionClass}`}
      onClick={onOptionClicked}
      tabIndex={-1}
      title={option.title}
    >
      { option.iconClass && <i className={`${option.iconClass} dropdown-option-icon`} />}
      { option.value }
    </div>
  );
};

OptionItem.defaultProps = {
  itemRenderer: undefined,
  optionClass: undefined,
};

export default OptionItem;
