import React, { useState, useRef, useCallback, useMemo } from "react";
import { DropdownProps, StyleKey, ExtraState, Option } from './types';
import useSearch from './search-hooks';
import defaultStyles from '../styles/Dropdown';
import { css } from 'emotion';
import { useClickListener, useScroll } from './dom-hooks';
import { arrayReducer } from './helper';

const useAriaList = (flattenedOptions: Option[], selectedIndex: number, mergedId: string) => {
  const optionMarkup = flattenedOptions.map((o, i) => (
    <div role="option" id={`${mergedId}_list_${i}`} key={`${mergedId}_list_${i}`} aria-selected={i === selectedIndex} />
  ));
  const style = {
    height: 0,
    width: 0,
    overflow: 'hidden',
  };
  return (
    <div role="listbox" id={`${mergedId}_list`} style={style}>
      {optionMarkup}
    </div>
  )
};

const useDropdownHooks = (props: DropdownProps, mergedId: string) => {
  const { style, options, searchable, onChange, disabled, ariaDescribedBy, ariaLabel, ariaLabelledBy, value } = props;
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listWrapper = useRef<HTMLUListElement>(null);
  const [dropdownFocused, setDropdownFocused] = useState(false);

  const { searchTerm, setSearchTerm, filteredOptions } = useSearch(setFocusedIndex, options, searchable);
  const flattenedOptions = useMemo(() => filteredOptions.reduce(arrayReducer, []), [filteredOptions]);

  const getStyle = useCallback((key: StyleKey, extraState?: ExtraState) => {
    const state = { focusedIndex, open, dropdownFocused };
    const baseStyle = defaultStyles[key](props, state, extraState || {});
    const customStyle = style[key];
    return customStyle ? css(customStyle(baseStyle, state, extraState)) : css(baseStyle);
  }, [style, focusedIndex, open, props, dropdownFocused]);

  const closeDropdown = useCallback((focus = false) => {
    setSearchTerm('');
    setOpen(false);
    setFocusedIndex(-1)
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current, setSearchTerm, setOpen, setFocusedIndex]);

  const setValue = useCallback((newOption?: Option, shouldClose = false) => {
    if (newOption) {
      onChange(newOption);
      setSearchTerm('');
    }

    if (shouldClose) {
      closeDropdown(true);
    }
  }, [onChange, closeDropdown, setSearchTerm]);

  useClickListener(closeDropdown, container);

  useScroll(focusedIndex, listWrapper);

  const selectedIndex = flattenedOptions.map(o => o.value).indexOf(value);
  const listbox: 'listbox' = 'listbox';
  const ariaProps = {
    'aria-hidden': disabled,
    'aria-expanded': open,
    'aria-haspopup': listbox,
    'aria-activedescendant': `${mergedId}_list_${focusedIndex}`,
    'aria-controls': `${mergedId}_list`,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
  };

  return {
    focusedIndex, setFocusedIndex,
    open, setOpen,
    searchTerm, setSearchTerm,
    dropdownFocused, setDropdownFocused,
    setValue,
    filteredOptions,
    getStyle,
    closeDropdown,
    flattenedOptions,
    container,
    inputRef,
    listWrapper,
    ariaProps,
    ariaList: useAriaList(flattenedOptions, selectedIndex, mergedId),
  }
};

export default useDropdownHooks;
