import React from 'react';

const DropdownItem = props => {
  const optionClass = props.selected ? 'dropdown-option-selected' : 'dropdown-option';
  const { option } = props
  return (
    <button
      className={ optionClass }
      role='button'
      tabIndex='0'
      title={ option.name }
      aria-label={ option.name }
      onClick={ props.onOptionClicked } >
      { option.name }
    </button>
  );
};

export default DropdownItem;
