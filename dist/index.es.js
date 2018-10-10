import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cx, css } from 'emotion';

const KEY_CODES = {
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ENTER: 13,
  ESCAPE: 27,
  TAB: 9,
  PAGE_UP: 33,
  PAGE_DOWN: 34
};

const NAVIGATION_KEYS = [KEY_CODES.ESCAPE, KEY_CODES.UP_ARROW, KEY_CODES.DOWN_ARROW, KEY_CODES.PAGE_UP, KEY_CODES.PAGE_DOWN];

const colours = {
  greys: {
    lighter: '#d9dadd',
    light: '#b5b6b7',
    base: '#808080',
    dark: '#595959',
    darker: '#404040'
  },
  purple: {
    lighter: '#ccd1ed',
    light: '#a7aedf',
    base: '#990099'
  }
};

const optionItemStyle = (props, state, { selected = false }) => ({
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
    backgroundColor: selected ? colours.purple.light : colours.greys.lighter
  },

  '&:focus': {
    backgroundColor: selected ? colours.purple.light : colours.greys.lighter
  },

  '.option-icon': {
    paddingRight: '5px'
  }
});

const OptionItem = React.forwardRef((props, ref) => {
  const {
    onOptionClicked,
    option,
    optionClass
  } = props;

  return React.createElement(
    'button',
    {
      'aria-label': option.ariaLabel,
      className: optionClass,
      onClick: onOptionClicked,
      onKeyDown: onOptionClicked,
      ref: ref,
      tabIndex: '-1',
      title: option.title,
      type: 'button'
    },
    option.iconClass && React.createElement('i', { className: `${option.iconClass} option-icon` }),
    option.value
  );
});

// Please Keep Alphabetical
OptionItem.propTypes = {
  ariaLabel: PropTypes.string,
  option: PropTypes.shape({
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string.isRequired
  }).isRequired,
  optionClass: PropTypes.string
};

function defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, onOptionClicked, elementsRef, getStyle) {
  return options.map(option => {
    const { groupOptions, label, value, className } = option;

    if (groupOptions) {
      // Is group of options
      return React.createElement(
        'div',
        { key: label, className: getStyle('groupContainer') },
        React.createElement(
          'div',
          { className: getStyle('groupHeading') },
          React.createElement(
            'div',
            null,
            label.toUpperCase()
          ),
          React.createElement(
            'div',
            null,
            groupOptions.length
          )
        ),
        option.groupOptions.map(groupOption => {
          const groupOptionClass = cx(groupOption.className, getStyle('optionItem', groupOption.value === selectedOption));
          return React.createElement(OptionItem, {
            key: groupOption.value,
            optionClass: groupOptionClass,
            onOptionClicked: onOptionClicked,
            option: groupOption,
            ref: el => el && elementsRef.push(el)
          });
        })
      );
    }

    const optionClass = cx(className, getStyle('optionItem', { selected: value === selectedOption }));
    return React.createElement(OptionItem, {
      key: value,
      optionClass: optionClass,
      onOptionClicked: onOptionClicked,
      option: option,
      ref: el => el && elementsRef.push(el)
    });
  });
}

const dropdownWrapper = ({ width, height }) => ({
  width,
  height,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
});

const dropdownButton = (props, { open }) => ({
  fontSize: '1em',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  padding: '9px 5px',
  margin: '0',
  borderRadius: '0',
  borderBottom: `2px solid ${colours.greys.light}`,
  borderTop: 'none',
  borderRight: 'none',
  borderLeft: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: open ? `0px 1px 3px 2px ${colours.greys.lighter}` : 'none',

  '&:hover': {
    boxShadow: `0px 1px 3px 2px ${colours.greys.lighter}`
  },

  '&:focus': {
    boxShadow: `0px 1px 3px 2px ${colours.greys.lighter}`
  },

  '&:disabled': {
    cursor: 'not-allowed'
  }
});

const displayedValue = ({ hideArrow, selectedOption, centerText }, { internalSelectedOption }) => ({
  flex: '1',
  borderRight: hideArrow ? 'none' : `1px solid ${colours.greys.light}`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: selectedOption || internalSelectedOption ? 'black' : colours.greys.base,
  textAlign: centerText ? 'center' : 'left'
});

const arrow = (props, { open }) => ({
  content: '""',
  width: '0',
  height: '0',
  marginLeft: '8px',
  marginRight: '5px',
  borderRight: '5px solid transparent',
  borderLeft: '5px solid transparent',
  borderTop: open ? '0' : `5px solid ${colours.greys.base}`,
  borderBottom: open ? `5px solid ${colours.greys.base}` : '0'
});

const optionContainer = ({ openUp, maxContentHeight }, { open }) => ({
  width: '100%',
  maxHeight: maxContentHeight || '175px',
  overflowY: maxContentHeight ? 'scroll' : null,
  zIndex: '9999',
  overflowX: 'hidden',
  position: 'absolute',
  left: '0',
  listStyleType: 'none',
  margin: '0',
  padding: '2px 0',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '2px',
  display: open ? 'block' : 'none',
  boxSizing: 'border-box',
  top: openUp ? null : '100%',
  bottom: openUp ? '105%' : null,
  boxShadow: openUp ? `0px -3px 3px 2px ${colours.greys.lighter}` : `0px 3px 3px 2px ${colours.greys.lighter}`,

  '&::-webkit-scrollbar': {
    width: '5px'
  },

  '&::-webkit-scrollbar-track': {
    background: '#ddd'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#666'
  }
});

const groupContainer = () => ({
  padding: '1em 0 0 0'
});

const groupHeading = () => ({
  color: 'grey',
  fontSize: '0.9em',
  padding: '0 10px 3px 5px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const defaultStyles = {
  arrow,
  dropdownButton,
  displayedValue,
  dropdownWrapper,
  groupContainer,
  groupHeading,
  optionContainer,
  optionItem: optionItemStyle
};

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.onClick = e => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    };

    this.onDropdownClick = ({ nativeEvent }) => {
      const { disabled } = this.props;

      if (nativeEvent instanceof KeyboardEvent) {
        // eslint-disable-line no-undef
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }

      if (!disabled) {
        this.setState(p => ({ open: !p.open, focusedIndex: p.open ? -1 : p.focusedIndex }));
      }
    };

    this.onOptionClicked = ({ nativeEvent }) => {
      const { setSelected } = this.props;

      if (nativeEvent instanceof KeyboardEvent) {
        // eslint-disable-line no-undef
        if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
        nativeEvent.preventDefault();
      }

      const selectedOption = nativeEvent.target.innerText;
      setSelected(selectedOption);
      this.setState({ open: false, internalSelectedOption: selectedOption });
      if (nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER) this.button.focus();
    };

    this.onKeyDown = ({ nativeEvent }) => {
      const key = nativeEvent.key && nativeEvent.key.toLowerCase();
      const { keyCode } = nativeEvent;
      const { searchable } = this.props;

      if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
        nativeEvent.preventDefault();
        this.onNavigation(keyCode);
      } else if (keyCode === KEY_CODES.TAB) {
        this.closeDropdown();
      } else if (key.length === 1 && searchable) {
        this.searchDropdown(key);
      }
    };

    this.onNavigation = keyCode => {
      const { focusedIndex } = this.state;
      const { pageKeyTraverseSize } = this.props;

      switch (keyCode) {
        case KEY_CODES.UP_ARROW:
          if (focusedIndex === -1) {
            this.setState({ focusedIndex: 0 }, this.setFocus);
          } else if (focusedIndex === 0) {
            this.setState({ focusedIndex: this.elements.length - 1 }, this.setFocus);
          } else {
            this.setState(p => ({ focusedIndex: p.focusedIndex - 1 }), this.setFocus);
          }
          break;
        case KEY_CODES.DOWN_ARROW:
          this.setState(p => ({ focusedIndex: (p.focusedIndex + 1) % this.elements.length }), this.setFocus);
          break;
        case KEY_CODES.PAGE_UP:
          if (focusedIndex === -1) {
            this.setState({ focusedIndex: 0 }, this.setFocus);
          } else if (focusedIndex - pageKeyTraverseSize < 0) {
            this.setState({ focusedIndex: this.elements.length - 1 }, this.setFocus);
          } else {
            this.setState(p => ({ focusedIndex: p.focusedIndex - pageKeyTraverseSize - 1 }), this.setFocus);
          }
          break;
        case KEY_CODES.PAGE_DOWN:
          this.setState(p => ({ focusedIndex: (p.focusedIndex + pageKeyTraverseSize - 1) % this.elements.length }), this.setFocus);
          break;
        case KEY_CODES.ESCAPE:
          this.closeDropdown(true);
          break;
        default:
          break;
      }
    };

    this.getStyle = (key, extraState) => {
      const { style } = this.props;
      const baseStyle = defaultStyles[key](this.props, this.state, extraState);
      const customStyle = style[key];
      return customStyle ? css(customStyle(baseStyle, this.state, extraState)) : css(baseStyle);
    };

    this.setFocus = () => {
      const { focusedIndex } = this.state;
      this.elements[focusedIndex].focus();
    };

    this.closeDropdown = (focus = false) => {
      this.setState(p => ({ open: false, focusedIndex: p.internalSelectedOption ? p.focusedIndex : -1 }));
      if (focus) {
        this.button.focus();
      }
    };

    this.searchDropdown = key => {
      const { searchTerm } = this.state;
      const oldTerm = searchTerm;
      this.setState(p => ({ searchTerm: p.searchTerm + key }));
      this.searchList(oldTerm + key);

      this.clearTimer();
      const timer = setTimeout(this.clearSearch, 1500);
      this.setState({ searchTimer: timer });
    };

    this.clearTimer = () => {
      const { searchTimer } = this.state;
      if (searchTimer !== -1) {
        clearTimeout(searchTimer);
        this.setState({ searchTimer: -1 });
      }
    };

    this.clearSearch = () => {
      this.setState({ searchTerm: '' });
    };

    this.searchList = value => {
      const element = this.elements.find(el => el.innerText.toLowerCase().indexOf(value) === 0);
      if (element) element.focus();
    };

    this.renderOptions = () => {
      const { optionRenderer, selectedOption, selectedOptionClassName, optionClassName, options } = this.props;
      const { internalSelectedOption } = this.state;
      this.elements = []; // Reset ref array

      if (optionRenderer) {
        return optionRenderer(selectedOption || internalSelectedOption, options, this.onOptionClicked, this.elements, this.getStyle);
      }

      return defaultOptionRenderer(selectedOption, options, selectedOptionClassName, optionClassName, this.onOptionClicked, this.elements, this.getStyle);
    };

    this.state = {
      open: false,
      searchTerm: '',
      searchTimer: -1,
      focusedIndex: -1,
      internalSelectedOption: null
    };
    this.elements = [];
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onClick, false); // eslint-disable-line no-undef
    document.addEventListener('touchend', this.onClick, false); // eslint-disable-line no-undef
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClick); // eslint-disable-line no-undef
    document.removeEventListener('touchend', this.onClick); // eslint-disable-line no-undef
  }

  render() {
    // Please Keep Alphabetical
    const {
      ariaDescribedBy,
      ariaLabel,
      ariaLabelledBy,
      arrowRenderer,
      contentClassName,
      buttonClassName,
      disabled,
      hideArrow,
      id,
      placeholder,
      selectedOption,
      selectedValueClassName
    } = this.props;

    const {
      internalSelectedOption,
      open
    } = this.state;

    const displayedValue = selectedOption || internalSelectedOption || placeholder || '';
    const wrapperClass = this.getStyle('dropdownWrapper');
    const dropdownButtonClass = cx(buttonClassName, this.getStyle('dropdownButton'));
    const displayedValueClass = cx(selectedValueClassName, this.getStyle('displayedValue'));
    const contentClass = cx(contentClassName, this.getStyle('optionContainer'));
    const arrowClass = this.getStyle('arrow');

    return React.createElement(
      'div',
      {
        className: wrapperClass,
        onKeyDown: this.onKeyDown,
        ref: div => this.container = div
      },
      React.createElement(
        'button',
        {
          'aria-label': ariaLabel,
          'ari-describedby': ariaDescribedBy,
          'aria-labelledby': ariaLabelledBy,
          className: dropdownButtonClass,
          disabled: disabled,
          id: id,
          onClick: this.onDropdownClick,
          onKeyDown: this.onDropdownClick,
          ref: btn => this.button = btn,
          type: 'button'
        },
        React.createElement(
          'div',
          { className: displayedValueClass },
          displayedValue
        ),
        !hideArrow && !arrowRenderer && React.createElement('div', { className: arrowClass }),
        !hideArrow && arrowRenderer && arrowRenderer(open)
      ),
      React.createElement(
        'ul',
        { className: contentClass },
        this.renderOptions()
      )
    );
  }
}

// Please Keep Alphabetical
Dropdown.propTypes = {
  ariaDescribedBy: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  arrowRenderer: PropTypes.func,
  buttonClassName: PropTypes.string,
  centerText: PropTypes.bool,
  contentClassName: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  hideArrow: PropTypes.bool,
  id: PropTypes.string,
  optionRenderer: PropTypes.func,
  maxContentHeight: PropTypes.number,
  options: PropTypes.array,
  optionClassName: PropTypes.string,
  openUp: PropTypes.bool,
  pageKeyTraverseSize: PropTypes.number,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  selectedOption: PropTypes.string,
  selectedOptionClassName: PropTypes.string,
  selectedValueClassName: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  style: PropTypes.shape({
    arrow: PropTypes.func,
    dropdownButton: PropTypes.func,
    displayedValue: PropTypes.func,
    dropdownWrapper: PropTypes.func,
    groupContainer: PropTypes.func,
    groupHeading: PropTypes.func,
    optionContainer: PropTypes.func,
    optionItem: PropTypes.func
  }),
  width: PropTypes.number
};

// Please Keep Alphabetical
Dropdown.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  arrowRenderer: undefined,
  buttonClassName: undefined,
  centerText: false,
  contentClassName: undefined,
  disabled: false,
  height: null,
  hideArrow: false,
  id: undefined,
  openUp: false,
  optionRenderer: undefined,
  options: [],
  optionClassName: undefined,
  maxContentHeight: null,
  pageKeyTraverseSize: 10,
  placeholder: 'Select ...',
  searchable: true,
  selectedOption: null,
  selectedOptionClassName: undefined,
  selectedValueClassName: undefined,
  style: {},
  width: null
};

export default Dropdown;
