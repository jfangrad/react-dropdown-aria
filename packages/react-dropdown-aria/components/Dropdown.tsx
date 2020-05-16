import React, { KeyboardEvent, useCallback, ChangeEvent, useMemo } from 'react';
import { cx } from 'emotion';
import { KEY_CODES, NAVIGATION_KEYS, StyleKeys } from '../utils/constants';
import DropdownContent from './DropdownContent';
import { DropdownProps } from '../utils/types';
import useDropdownHooks, { useId } from '../utils/dropdown-hooks';
import { ChevronDown, Search } from './icons';

const Dropdown = (props: DropdownProps) => {
  const {
    arrowRenderer,
    contentClassName,
    className,
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

  const mergedId = useId(id);

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
    ariaProps,
    ariaList,
  } = useDropdownHooks(props, mergedId);

  // Pass focus on to input
  const forwardFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const onDropdownClick = useCallback(() => {
    forwardFocus();
    if (!disabled && (!open || !searchable)) {
      setFocusedIndex(0);
      setOpen(p => !p);
    }
  }, [open, disabled, searchable, setOpen, setFocusedIndex]);

  const onNavigation = useCallback((keyCode: number) => {
    switch (keyCode) {
      case KEY_CODES.UP_ARROW:
        setFocusedIndex(prev => {
          if(prev === 0) return flattenedOptions.length - 1;
          return prev - 1;
        });
        break;
      case KEY_CODES.DOWN_ARROW:
          setFocusedIndex(p => ((p + 1) % flattenedOptions.length));
        break;
      case KEY_CODES.PAGE_UP:
        setFocusedIndex(prev => {
          if (prev - pageKeyTraverseSize < 0 && prev !== 0) return 0;
          if (prev - pageKeyTraverseSize < 0) return flattenedOptions.length - 1;
          return prev - pageKeyTraverseSize;
        });
        break;
      case KEY_CODES.PAGE_DOWN:
        setFocusedIndex(prev => {
          if (prev === flattenedOptions.length - 1) return 0;
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

  const handleInputKeyDown = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e;

    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault();
      e.stopPropagation();
      onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.ENTER && !open) {
      setOpen(true);
    } else if (keyCode === KEY_CODES.TAB && (!searchable)) {
      closeDropdown();
    } else if (
      (keyCode === KEY_CODES.TAB || keyCode === KEY_CODES.ENTER) &&
      flattenedOptions.length > 0 && focusedIndex >= 0 && open
    ) {
      e.stopPropagation();
      e.preventDefault();
      setValue(flattenedOptions[focusedIndex], true);
    }
  }, [flattenedOptions, setValue, focusedIndex, open, onNavigation, setOpen, searchable, closeDropdown]);

  const handleTermChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const onFocus = useCallback(() => setDropdownFocused(true), [setDropdownFocused]);
  const onBlur = useCallback(() => setDropdownFocused(false), [setDropdownFocused]);

  // ---------------------- RENDER -----------------------
  const wrapperClass = cx('dropdown', className, getStyle(StyleKeys.DropdownWrapper));
  const selectorClass = cx('dropdown-selector', getStyle(StyleKeys.DropdownSelector));
  const searchClass = cx('dropdown-selector-search', getStyle(StyleKeys.SelectorSearch));
  const placeholderClass = cx('dropdown-selector-placeholder', getStyle(StyleKeys.Placeholder));
  const selectorValueClass = cx('dropdown-selector-value', selectedValueClassName, getStyle(StyleKeys.SelectedValue));
  const contentClass = cx('dropdown-selector-content', contentClassName, getStyle(StyleKeys.OptionContainer));
  const arrowClass = cx('dropdown-arrow', getStyle(StyleKeys.Arrow));

  const ArrowMarkup = useMemo(() => {
    if (hideArrow) return null;

    if (arrowRenderer) return (
      <div className={arrowClass}>
        {arrowRenderer(open)}
      </div>
    );

    const showSearchIcon = open && searchable;
    return (
      <div className={arrowClass}>
        {showSearchIcon && <Search />}
        {!showSearchIcon && <ChevronDown />}
      </div>
    )
  }, [open, arrowRenderer, arrowClass, searchable, hideArrow])

  return (
    <div
      id={id}
      ref={container}
      className={wrapperClass}
      onFocus={forwardFocus}
      onClick={onDropdownClick}
    >
      <div className={selectorClass}>
        <span className={searchClass}>
          <input
            id={mergedId}
            ref={inputRef}
            value={searchTerm}
            onChange={handleTermChange}
            onKeyDown={handleInputKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={!open || !searchable}
            disabled={disabled}
            autoComplete="off"
            role="combobox"
            {...ariaProps}
          />
        </span>
        {(!value && !searchTerm) && <span className={placeholderClass}>{placeholder}</span>}
        {(value && !searchTerm) && <span className={selectorValueClass}>{value}</span>}
        {ArrowMarkup}
      </div>
      {ariaList}
      <ul className={contentClass} ref={listWrapper}>
        <DropdownContent
          selectedOption={value}
          options={filteredOptions}
          focusedIndex={focusedIndex}
          onOptionClicked={setValue}
          optionItemRenderer={optionItemRenderer}
          getStyle={getStyle}
        />
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  arrowRenderer: undefined,
  centerText: false,
  className: undefined,
  contentClassName: null,
  defaultOpen: false,
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
