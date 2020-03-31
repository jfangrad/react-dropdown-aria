import React, { useRef, MutableRefObject, useEffect } from 'react';
import { Option, ItemRenderer, OnOptionClicked } from '../utils/types';

export interface OptionItemProps {
  option: Option,
  optionClass: string,
  onOptionClicked: OnOptionClicked,
  focused: boolean,
  itemRenderer?: ItemRenderer,
};

const OptionItem = (props: OptionItemProps) => {
  const buttonRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const {
    onOptionClicked,
    option,
    optionClass,
    focused,
    itemRenderer,
  } = props;
  useEffect(() => {
    if (focused && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [focused]);

  if (itemRenderer) {
    return itemRenderer(props, buttonRef);
  }

  return (
    <button
      ref={buttonRef}
      aria-label={option.ariaLabel}
      className={optionClass}
      onClick={onOptionClicked}
      onKeyDown={onOptionClicked}
      tabIndex={-1}
      title={option.title}
      type="button"
    >
      { option.iconClass && <i className={`${option.iconClass} option-icon`} />}
      { option.value }
    </button>
  );
};

OptionItem.defaultProps = {
  itemRenderer: undefined,
  optionClass: undefined,
};

export default OptionItem;
