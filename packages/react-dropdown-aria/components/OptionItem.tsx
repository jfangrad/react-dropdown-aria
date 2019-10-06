import React, { MouseEvent, KeyboardEvent, useRef, MutableRefObject, useEffect } from 'react';
import { Option } from '../utils/types';

export interface OptionItemProps {
  option: Option,
  optionClass: string,
  onOptionClicked: ({ nativeEvent }: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void,
  focused: boolean,
  itemRenderer?: ((props: OptionItemProps, buttonRef: MutableRefObject<HTMLButtonElement | null>) => JSX.Element) | undefined,
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
  optionClass: undefined,
  itemRenderer: undefined,
};

export default OptionItem;
