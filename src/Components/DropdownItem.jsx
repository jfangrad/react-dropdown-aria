import React from 'react';
import PropTypes from 'prop-types';

const DropdownItem = props => {
  const { option, selected } = props;
  const optionClass = selected ? 'dropdown-option-selected' : 'dropdown-option';

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

DropdownItem.propTypes = {
  option: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};

export default DropdownItem;
