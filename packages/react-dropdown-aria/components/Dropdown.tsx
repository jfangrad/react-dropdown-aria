import React, { KeyboardEvent, useCallback, ChangeEvent } from 'react';
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
    optionItemRenderer,
    pageKeyTraverseSize,
    placeholder,
    searchable,
    value,
    selectedValueClassName,
  } = props;

  const {
    getStyle,
    open, setOpen,
    focusedIndex, setFocusedIndex,
    setValue,
    dropdownButton,
    container,
    closeDropdown,
    searchTerm, setSearchTerm, isSearching,
    filteredOptions,
    flattenedOptions,
  } = useDropdownHooks(props);

  const onDropdownClick = useCallback(({ nativeEvent }: MouseKeyboardEvent<HTMLButtonElement>) => {
    if (nativeEvent instanceof KeyboardEvent) {
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    if (!disabled) {
      if (!(open && searchable)) {
        setOpen(p => !p);
        setFocusedIndex(p => (open ? -1 : p));
      }
    }
  }, [open, disabled, setOpen, searchable]);

  const onOptionClicked = useCallback(({ nativeEvent }: MouseKeyboardEvent<HTMLButtonElement>) => {
    if (nativeEvent instanceof KeyboardEvent) {
      if (nativeEvent.keyCode !== KEY_CODES.ENTER) return;
      nativeEvent.preventDefault();
    }

    if (nativeEvent.target) {
      const newOptionText = (nativeEvent.target as HTMLButtonElement).innerText;
      const newOption = flattenedOptions.find(({ value: optionValue }) => optionValue === newOptionText);
      setValue(newOption, true);

      if (nativeEvent instanceof KeyboardEvent && nativeEvent.keyCode && nativeEvent.keyCode === KEY_CODES.ENTER && dropdownButton.current) {
        dropdownButton.current.focus();
      }
    }
  }, [setValue, setOpen, dropdownButton.current])

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
  }, [setFocusedIndex, flattenedOptions, pageKeyTraverseSize, closeDropdown])

  const onKeyDown = useCallback(({ nativeEvent }: KeyboardEvent) => {
    const { keyCode } = nativeEvent;

    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      nativeEvent.preventDefault();
      nativeEvent.stopPropagation();
      onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.TAB && !searchable) {
      closeDropdown();
    }
  }, [onNavigation, setOpen, searchable, closeDropdown]);

  const handleTermChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const handleInputKeyDown = useCallback(({ nativeEvent }: KeyboardEvent) => {
    const { keyCode } = nativeEvent;
    if (keyCode === KEY_CODES.TAB || keyCode === KEY_CODES.ENTER) {
      if (searchable && searchTerm.trim() && flattenedOptions.length > 0) {
        nativeEvent.preventDefault();
        nativeEvent.stopPropagation();
        setValue(flattenedOptions[focusedIndex], true);
      }
    }
  }, [searchable, searchTerm, flattenedOptions, setValue]);

  // ---------------- RENDER METHODS ---------------
  const renderArrow = useCallback(() => {
    if (hideArrow) return null;
    if (arrowRenderer) return arrowRenderer(open);

    const arrowClass = getStyle(StyleKeys.Arrow);
    return <div className={arrowClass} />
  }, [open, hideArrow, arrowRenderer]);

  const displayedValue = value || placeholder || '';
  const inputValue = isSearching ? searchTerm : value;
  const wrapperClass = getStyle(StyleKeys.DropdownWrapper);
  const dropdownButtonClass = cx(buttonClassName, getStyle(StyleKeys.DropdownButton));
  const displayedValueClass = cx(selectedValueClassName, getStyle(StyleKeys.DisplayedValue));
  const inputValueClass = cx(selectedValueClassName, getStyle(StyleKeys.DropdownInput));
  const contentClass = cx(contentClassName, getStyle(StyleKeys.OptionContainer));

  const ValueMarkup = (searchable) ? (
    <input
      type="text"
      className={inputValueClass}
      value={inputValue}
      placeholder={placeholder}
      onChange={handleTermChange}
      onKeyDown={handleInputKeyDown}
      disabled={disabled}
    />
  ) : (
    <div className={displayedValueClass}>{ displayedValue }</div>
  );

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
        {ValueMarkup}
        { renderArrow() }
      </button>
      <ul className={contentClass}>
        { defaultOptionRenderer(value, filteredOptions, focusedIndex, onOptionClicked, getStyle, searchable, optionItemRenderer) }
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
  maxContentHeight: 150,
  openUp: false,
  optionItemRenderer: undefined,
  options: [],
  pageKeyTraverseSize: 10,
  placeholder: 'Select ...',
  searchable: false,
  selectedValueClassName: null,
  style: {},
  value: undefined,
  width: null,
};

export default Dropdown;
