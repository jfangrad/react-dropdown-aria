import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const DropdownItem = React.forwardRef((props, ref) => {
  const { onOptionClicked, option, selected } = props;
  const optionClass = ClassNames(option.className, selected ? 'dropdown-option-selected' : 'dropdown-option');

  return (
    <button
      aria-label={option.ariaLabel}
      className={optionClass}
      onClick={onOptionClicked}
      ref={ref}
      tabIndex="-1"
      title={option.title}
      type="button"
    >
      { option.value }
    </button>
  );
});

// Please Keep Alphabetical
DropdownItem.propTypes = {
  ariaLabel: PropTypes.string,
  option: PropTypes.shape({
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool,
};

export default DropdownItem;
