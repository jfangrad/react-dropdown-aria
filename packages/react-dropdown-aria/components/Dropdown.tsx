import React, { KeyboardEvent, useCallback } from 'react';
import { cx } from 'emotion';
import { KEY_CODES, NAVIGATION_KEYS, StyleKeys } from '../utils/constants';
import defaultOptionRenderer from '../utils/defaultOptionRenderer';
import { DropdownProps, MouseKeyboardEvent } from '../utils/types';
import useDropdownHooks from '../utils/dropdown-hooks';

const Dropdown = (props: DropdownProps) => {
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
    options,
    optionItemRenderer,
    pageKeyTraverseSize,
    placeholder,
    searchable,
    setSelected,
    selectedOption,
    selectedValueClassName,
  } = props;

  const {
    internalSelectedOption, setInternalSelectedOption,
    getStyle,
    open, setOpen,
    focusedIndex, setFocusedIndex,
    dropdownButton,
    container,
    closeDropdown,
    searchDropdown,
    flattenedOptions,
  } = useDropdownHooks(props);

  const onDropdownClick = useCallback(({ nativeEvent }: MouseKeyboardEvent) => {
    if (nativeEvent instanceof KeyboardEvent) {
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    if (!disabled) {
      setOpen(p => !p);
      setFocusedIndex(p => (open ? -1 : p));
    }
  }, [open, disabled, setOpen]);

  const onOptionClicked = useCallback(({ nativeEvent }: MouseKeyboardEvent) => {
    if (nativeEvent instanceof KeyboardEvent) {
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    if (nativeEvent.target) {
      const newSelectedOption = (nativeEvent.target as HTMLButtonElement).innerText;
      setSelected(newSelectedOption);
      setOpen(false);
      setInternalSelectedOption(newSelectedOption);

      if (nativeEvent instanceof KeyboardEvent && nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER && dropdownButton.current) {
        dropdownButton.current.focus();
      }
    }
  }, [setSelected, setOpen, setInternalSelectedOption, dropdownButton.current])

  const onNavigation = useCallback((keyCode: number) => {
    switch (keyCode) {
      case KEY_CODES.UP_ARROW:
        setFocusedIndex(prev => {
          if(prev === -1) return 0;
          if(prev === 0) return flattenedOptions.length - 1;
          return prev - 1;
        });
        break;
      case KEY_CODES.DOWN_ARROW:
          setFocusedIndex(p => ((p + 1) % flattenedOptions.length));
        break;
      case KEY_CODES.PAGE_UP:
        setFocusedIndex(prev => {
          if (prev === -1 || (prev - pageKeyTraverseSize < 0 && prev !== 0)) return 0;
          if (prev - pageKeyTraverseSize < 0) return flattenedOptions.length - 1;
          return prev - pageKeyTraverseSize;
        });
        break;
      case KEY_CODES.PAGE_DOWN:
        setFocusedIndex(prev => {
          if (prev === -1 || prev === flattenedOptions.length - 1) return 0;
          if (prev + pageKeyTraverseSize > flattenedOptions.length - 1) return flattenedOptions.length - 1;
          return (prev + pageKeyTraverseSize) % flattenedOptions.length;
        });
        break;
      case KEY_CODES.ESCAPE:
        closeDropdown(true);
        break;
      default:
        break;
    }
  }, [setFocusedIndex, flattenedOptions, pageKeyTraverseSize])

  const onKeyDown = useCallback(({ nativeEvent }: KeyboardEvent) => {
    const { keyCode, key } = nativeEvent;

    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      nativeEvent.preventDefault();
      onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.TAB) {
      closeDropdown();
    } else if (key.length === 1 && searchable) {
      searchDropdown(key.toLowerCase());
    }
  }, [searchDropdown, onNavigation, closeDropdown, searchable]);

  // ---------------- RENDER METHODS ---------------
  const renderArrow = useCallback(() => {
    if (hideArrow) return null;
    if (arrowRenderer) return arrowRenderer(open);

    const arrowClass = getStyle(StyleKeys.Arrow);
    return <div className={arrowClass} />
  }, [open, hideArrow, arrowRenderer]);

  const displayedValue = selectedOption || internalSelectedOption || placeholder || '';
  const wrapperClass = getStyle(StyleKeys.DropdownWrapper);
  const dropdownButtonClass = cx(buttonClassName, getStyle(StyleKeys.DropdownButton));
  const displayedValueClass = cx(selectedValueClassName, getStyle(StyleKeys.DisplayedValue));
  const contentClass = cx(contentClassName, getStyle(StyleKeys.OptionContainer));

  return (
    <div
      className={wrapperClass}
      onKeyDown={onKeyDown}
      ref={container}
    >
      <button
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        className={dropdownButtonClass}
        disabled={disabled}
        id={id}
        onClick={onDropdownClick}
        onKeyDown={onDropdownClick}
        ref={dropdownButton}
        type="button"
      >
        <div className={displayedValueClass}>{ displayedValue }</div>
        { renderArrow() }
      </button>
      <ul className={contentClass}>
        { defaultOptionRenderer(selectedOption, options, focusedIndex, onOptionClicked, getStyle, optionItemRenderer) }
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  arrowRenderer: undefined,
  buttonClassName: undefined,
  centerText: false,
  contentClassName: null,
  disabled: false,
  height: null,
  hideArrow: false,
  id: null,
  maxContentHeight: null,
  openUp: false,
  optionItemRenderer: undefined,
  options: [],
  pageKeyTraverseSize: 10,
  placeholder: 'Select ...',
  searchable: true,
  selectedOption: null,
  selectedValueClassName: null,
  style: {},
  width: null,
};

export default Dropdown;
