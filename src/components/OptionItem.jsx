import React from 'react';
import PropTypes from 'prop-types';

const OptionItem = React.forwardRef((props, ref) => {
  const {
    onOptionClicked,
    option,
    optionClass,
  } = props;

  return (
    <button
      aria-label={option.ariaLabel}
      className={optionClass}
      onClick={onOptionClicked}
      onKeyDown={onOptionClicked}
      ref={ref}
      tabIndex="-1"
      title={option.title}
      type="button"
    >
      { option.iconClass && <i className={`${option.iconClass} option-icon`} />}
      { option.value }
    </button>
  );
});

// Please Keep Alphabetical
OptionItem.propTypes = {
  ariaLabel: PropTypes.string,
  option: PropTypes.shape({
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
  optionClass: PropTypes.string,
};

export default OptionItem;
