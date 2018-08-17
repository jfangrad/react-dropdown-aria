import React from 'react';
import PropTypes from 'prop-types';
import colours from '../styles/Colours';

export const optionItemStyle = (props, state, selected) => ({
  fontSize: '0.95em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: '5px 10px',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',
  outline: 'none',
  backgroundColor: selected ? colours.purple.lighter : 'white',
  border: 'none',

  '&:hover': {
    backgroundColor: selected ? colours.purple.light : colours.greys.lighter,
  },

  '&:focus': {
    backgroundColor: selected ? colours.purple.light : colours.greys.lighter,
  },

  '.option-icon': {
    paddingRight: '5px',
  },
});

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
