import React, { KeyboardEvent, useCallback, ChangeEvent } from 'react';
import { cx } from 'emotion';
import { KEY_CODES, NAVIGATION_KEYS, StyleKeys } from '../utils/constants';
import defaultOptionRenderer from '../utils/defaultOptionRenderer';
import Arrow from './Arrow';
import { DropdownProps } from '../utils/types';
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
    setDropdownFocused,
    setValue,
    closeDropdown,
    searchTerm, setSearchTerm,
    filteredOptions,
    flattenedOptions,
    container,
    inputRef,
    listWrapper,
  } = useDropdownHooks(props);

  const forwardFocus = useCallback(() => {
    if (inputRef.current) {
      // Pass focus on to input
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const onDropdownClick = useCallback(({ nativeEvent }: React.MouseEvent<HTMLDivElement>) => {
    forwardFocus();

    if (!disabled && (!open || !searchable)) {
      setFocusedIndex(p => (open ? -1 : p));
      console.log('Called');
      setOpen(p => !p);
    }
  }, [open, disabled, searchable, setOpen, setFocusedIndex]);

  const onOptionClicked = useCallback(({ nativeEvent }: React.MouseEvent<HTMLDivElement>) => {
    nativeEvent.preventDefault();
    nativeEvent.stopPropagation();
    if (nativeEvent.target) {
      const newOptionText = (nativeEvent.target as HTMLDivElement).innerText;
      const newOption = flattenedOptions.find(({ value: optionValue }) => optionValue === newOptionText);
      setValue(newOption, true);
    }
  }, [setValue, container.current])

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
    console.log('Keydown', keyCode);

    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      nativeEvent.preventDefault();
      nativeEvent.stopPropagation();
      onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.ENTER && !open) {
      setOpen(true);
    } else if (keyCode === KEY_CODES.TAB && (!searchable)) {
      closeDropdown();
    }
  }, [onNavigation, setOpen, searchable, closeDropdown, open]);

  const handleTermChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const handleInputKeyDown = useCallback(({ nativeEvent }: KeyboardEvent) => {
    const { keyCode } = nativeEvent;
    if (keyCode === KEY_CODES.TAB || keyCode === KEY_CODES.ENTER) {
      if (flattenedOptions.length > 0 && focusedIndex >= 0 && open) {
        nativeEvent.stopPropagation();
        nativeEvent.preventDefault();
        setValue(flattenedOptions[focusedIndex], true);
      }
    }
  }, [flattenedOptions, setValue, focusedIndex, open]);

  const onFocus = useCallback(() => setDropdownFocused(true), [setDropdownFocused]);
  const onBlur = useCallback(() => setDropdownFocused(false), [setDropdownFocused]);

  // ---------------------- RENDER -----------------------
  const wrapperClass = cx('dropdown', getStyle(StyleKeys.DropdownWrapper));
  const selectorClass = cx('dropdown-selector', getStyle(StyleKeys.DropdownSelector));
  const searchClass = cx('dropdown-selector-search', getStyle(StyleKeys.SelectorSearch));
  const placeholderClass = cx('dropdown-selector-placeholder', getStyle(StyleKeys.Placeholder));
  const displayedValueClass = cx('dropdown-selector-value', selectedValueClassName, getStyle(StyleKeys.SelectedValue));
  const contentClass = cx('dropdown-selector-content', contentClassName, getStyle(StyleKeys.OptionContainer));

  return (
    <div
      ref={container}
      className={wrapperClass}
      onKeyDown={onKeyDown}
      onFocus={forwardFocus}
      onClick={onDropdownClick}
    >
      <div className={selectorClass}>
        <span className={searchClass}>
          <input
            ref={inputRef}
            value={searchTerm}
            onChange={handleTermChange}
            onKeyDown={handleInputKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={!open || !searchable}
            disabled={disabled}
            autoComplete="off"
          />
        </span>
        {(!value && !searchTerm) && <span className={placeholderClass}>{placeholder}</span>}
        {(value && !searchTerm) && <span className={displayedValueClass}>{value}</span>}
        <Arrow
          dropdownOpen={open}
          searchable={searchable}
          getStyle={getStyle}
          hideArrow={hideArrow}
          arrowRenderer={arrowRenderer}
        />
      </div>
      <ul className={contentClass} ref={listWrapper}>
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
