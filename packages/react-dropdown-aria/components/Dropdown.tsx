import React, { KeyboardEvent, useCallback, ChangeEvent, useMemo } from 'react';
import { KEY_CODES, NAVIGATION_KEYS } from '../utils/constants';
import DropdownContent from './DropdownContent';
import { DropdownProps } from '../utils/types';
import { cx } from '../utils/helper';
import { useDropdownHooks, useId } from '../utils/dropdown-hooks';
import { ChevronDown, Search } from './icons';

import {
  DropdownWrapper,
  DropdownSelector,
  SelectorSearch,
  SelectedValue,
  Placeholder,
  Arrow,
  OptionContainer,
} from '../styles';

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
    open,
    dropdownFocused,
    focusedIndex,
    setFocusedIndex,
    setDropdownFocused,
    setValue,
    openDropdown,
    closeDropdown,
    searchTerm,
    setSearchTerm,
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
      if (open) {
        closeDropdown(true);
      } else {
        openDropdown();
      }
    }
  }, [open, disabled, searchable, closeDropdown, openDropdown]);

  const onNavigation = useCallback(
    (keyCode: number) => {
      switch (keyCode) {
        case KEY_CODES.UP_ARROW:
          setFocusedIndex(prev => {
            if (prev === 0) return flattenedOptions.length - 1;
            return prev - 1;
          });
          break;
        case KEY_CODES.DOWN_ARROW:
          setFocusedIndex(p => (p + 1) % flattenedOptions.length);
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
    },
    [setFocusedIndex, flattenedOptions, pageKeyTraverseSize, closeDropdown],
  );

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const { keyCode } = e;

      if (NAVIGATION_KEYS.indexOf(keyCode) !== -1) {
        e.preventDefault();
        e.stopPropagation();
        onNavigation(keyCode);
      } else if ((keyCode === KEY_CODES.ENTER || (keyCode === KEY_CODES.SPACE && !searchable)) && !open) {
        e.preventDefault();
        openDropdown();
      } else if (keyCode === KEY_CODES.TAB && !searchable) {
        closeDropdown();
      } else if (
        (keyCode === KEY_CODES.TAB || keyCode === KEY_CODES.ENTER) &&
        flattenedOptions.length > 0 &&
        focusedIndex >= 0 &&
        open
      ) {
        e.stopPropagation();
        e.preventDefault();
        setValue(flattenedOptions[focusedIndex], true);
      }
    },
    [flattenedOptions, setValue, focusedIndex, open, onNavigation, openDropdown, searchable, closeDropdown],
  );

  const handleTermChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm],
  );

  const onFocus = useCallback(() => setDropdownFocused(true), [setDropdownFocused]);
  const onBlur = useCallback(() => setDropdownFocused(false), [setDropdownFocused]);

  // ---------------------- RENDER -----------------------

  const ArrowMarkup = useMemo(() => {
    if (hideArrow) return null;
    if (arrowRenderer) return <Arrow className={'dropdown-arrow'}>{arrowRenderer(open)}</Arrow>;

    const showSearchIcon = open && searchable;
    return (
      <Arrow className={'dropdown-arrow'}>
        {showSearchIcon && <Search />}
        {!showSearchIcon && <ChevronDown />}
      </Arrow>
    );
  }, [open, arrowRenderer, searchable, hideArrow]);

  return (
    <DropdownWrapper
      ref={container}
      onFocus={forwardFocus}
      onClick={onDropdownClick}
      role="button"
      width={props.width}
      height={props.height}
      disabled={disabled}
      open={open}
      dropdownFocused={dropdownFocused}
      className={cx('dropdown', className)}
    >
      <DropdownSelector className={'dropdown-selector'} open={open} searchable={props.searchable}>
        <SelectorSearch className={'dropdown-selector-search'}>
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
        </SelectorSearch>
        {!value && !searchTerm && (
          <Placeholder className={'dropdown-selector-placeholder'} centerText={props.centerText}>
            {placeholder}
          </Placeholder>
        )}
        {value && !searchTerm && (
          <SelectedValue
            className={cx('dropdown-selector-value', selectedValueClassName)}
            centerText={props.centerText}
            value={value}
            open={open}
          >
            {value}
          </SelectedValue>
        )}
        {ArrowMarkup}
      </DropdownSelector>
      {ariaList}
      <OptionContainer
        maxContentHeight={props.maxContentHeight}
        openUp={props.openUp}
        open={open}
        className={cx('dropdown-selector-content', contentClassName)}
        ref={listWrapper}
      >
        <DropdownContent
          selectedOption={value}
          options={filteredOptions}
          focusedIndex={focusedIndex}
          onOptionClicked={setValue}
          optionItemRenderer={optionItemRenderer}
          empty={flattenedOptions.length === 0}
        />
      </OptionContainer>
    </DropdownWrapper>
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
  pageKeyTraverseSize: 10,
  placeholder: 'Select ...',
  searchable: false,
  selectedValueClassName: null,
  style: {},
  value: undefined,
  width: null,
};

export default Dropdown;
