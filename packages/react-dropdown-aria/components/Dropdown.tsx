import React, { KeyboardEvent, useCallback, ChangeEvent } from 'react';
import { cx } from 'emotion';
import { KEY_CODES, NAVIGATION_KEYS, StyleKeys } from '../utils/constants';
import defaultOptionRenderer from '../utils/defaultOptionRenderer';
import Arrow from './Arrow';
import { DropdownProps } from '../utils/types';
import useDropdownHooks from '../utils/dropdown-hooks';
import { Inbox } from '../icons';

const Dropdown = (props: DropdownProps) => {
  const {
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
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

  const onDropdownClick = useCallback(() => {
    forwardFocus();

    if (!disabled && (!open || !searchable)) {
      setFocusedIndex(open ? -1 : 0);
      setOpen(p => !p);
    }
  }, [open, disabled, searchable, setOpen, setFocusedIndex]);

  const onOptionClicked = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target) {
      const newOptionText = (e.target as HTMLDivElement).innerText;
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

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e;

    if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
      e.preventDefault();
      e.stopPropagation();
      onNavigation(keyCode);
    } else if (keyCode === KEY_CODES.ENTER && !open) {
      setOpen(true);
      setFocusedIndex(0);
    } else if (keyCode === KEY_CODES.TAB && (!searchable)) {
      closeDropdown();
    }
  }, [onNavigation, setOpen, searchable, closeDropdown, open]);

  const handleTermChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  const handleInputKeyDown = useCallback((e: KeyboardEvent) => {
    const { keyCode } = e;
    if (keyCode === KEY_CODES.TAB || keyCode === KEY_CODES.ENTER) {
      if (flattenedOptions.length > 0 && focusedIndex >= 0 && open) {
        e.stopPropagation();
        e.preventDefault();
        setValue(flattenedOptions[focusedIndex], true);
      }
    }
  }, [flattenedOptions, setValue, focusedIndex, open]);

  const onFocus = useCallback(() => setDropdownFocused(true), [setDropdownFocused]);
  const onBlur = useCallback(() => setDropdownFocused(false), [setDropdownFocused]);

  // ---------------------- RENDER -----------------------
  const wrapperClass = cx('dropdown', className, getStyle(StyleKeys.DropdownWrapper));
  const selectorClass = cx('dropdown-selector', getStyle(StyleKeys.DropdownSelector));
  const searchClass = cx('dropdown-selector-search', getStyle(StyleKeys.SelectorSearch));
  const placeholderClass = cx('dropdown-selector-placeholder', getStyle(StyleKeys.Placeholder));
  const displayedValueClass = cx('dropdown-selector-value', selectedValueClassName, getStyle(StyleKeys.SelectedValue));
  const contentClass = cx('dropdown-selector-content', contentClassName, getStyle(StyleKeys.OptionContainer));

  const NoDataMarkup = (
    <div className="dropdown-selector-content--empty">
      <Inbox />
      No data
    </div>
  );

  const dropdownContent = (
    <>
      { filteredOptions.length === 0 && NoDataMarkup}
      { filteredOptions.length !== 0 && defaultOptionRenderer({
        selectedOption: value,
        options: filteredOptions,
        focusedIndex,
        onOptionClicked,
        getStyle,
        optionItemRenderer,
      })}
    </>
  )

  return (
    <div
      id={id}
      ref={container}
      className={wrapperClass}
      onKeyDown={onKeyDown}
      onFocus={forwardFocus}
      onClick={onDropdownClick}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-hidden={disabled}
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
        { dropdownContent }
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
