/* tslint:disable:object-literal-sort-keys */
import { useState, useRef, MutableRefObject, useCallback, useMemo, useEffect } from "react";
import { DropdownProps, StyleKey, ExtraState, Option } from './types';
import useSearch from './search-hooks';
import defaultStyles from '../styles/Dropdown';
import { css } from 'emotion';
import { useClickListener, useScroll } from './dom-hooks';
import { arrayReducer } from './helper';

const useDropdownHooks = (props: DropdownProps) => {
  const { style, options, searchable, value, onChange } = props;
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

  const setValue = useCallback((newOption?: Option, shouldClose: boolean = false) => {
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
  }
};

export default useDropdownHooks;
