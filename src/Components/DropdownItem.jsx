import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const DropdownItem = React.forwardRef((props, ref) => {
  const { option, selected, onOptionClicked } = props;
  const optionClass = ClassNames(option.className, selected ? 'dropdown-option-selected' : 'dropdown-option');

  return (
    <button
      type="button"
      className={optionClass}
      tabIndex="0"
      title={option.name}
      aria-label={option.ariaLabel}
      onClick={onOptionClicked}
      ref={ref}
    >
      { option.name }
    </button>
  );
});

DropdownItem.propTypes = {
  option: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default DropdownItem;
