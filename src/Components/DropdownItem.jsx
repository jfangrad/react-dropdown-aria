import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const DropdownItem = React.forwardRef((props, ref) => {
  const { option, selected } = props;
  const optionClass = ClassNames(option.className, selected ? 'dropdown-option-selected' : 'dropdown-option');

  return (
    <button
      className={ optionClass }
      tabIndex='0'
      title={ option.name }
      aria-label={ option.name }
      onClick={ props.onOptionClicked }
      ref={ ref } >
      { option.name }
    </button>
  );
});

DropdownItem.propTypes = {
  option: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};

export default DropdownItem;
