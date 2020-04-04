/* tslint:disable:object-literal-sort-keys */
import { useState, useRef, MutableRefObject, useCallback, useMemo, useEffect } from "react";
import { DropdownProps, StyleKey, ExtraState, Option } from './types';
import useSearch from './search-hooks';
import defaultStyles from '../styles/Dropdown';
import { css } from 'emotion';
import useClickListener from './dom-hooks';
import { arrayReducer } from './helper';

const useDropdownHooks = (props: DropdownProps) => {
  const { style, options, searchable, value, onChange } = props;
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [open, setOpen] = useState(false);
  const container: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dropdownButton: MutableRefObject<HTMLButtonElement | null> = useRef(null);

  const { searchTerm, setSearchTerm, filteredOptions, isSearching, setIsSearching } = useSearch(setFocusedIndex, options, searchable);
  const flattenedOptions = useMemo(() => filteredOptions.reduce(arrayReducer, []), [filteredOptions]);

  useEffect(() => {
    if (isSearching && searchTerm.trim() && !open) {
      setOpen(true);
    }
  }, [isSearching, searchTerm, open]);

  const getStyle = useCallback((key: StyleKey, extraState?: ExtraState) => {
    const state = { focusedIndex, open, searchable };
    const baseStyle = defaultStyles[key](props, state, extraState || {});
    const customStyle = style[key];
    return customStyle ? css(customStyle(baseStyle, state, extraState)) : css(baseStyle);
  }, [style, focusedIndex, open, searchable, props]);

  const closeDropdown = useCallback((focus = false) => {
    setSearchTerm('', false);
    setOpen(false);
    setFocusedIndex(p => (value ? p : -1))
    if (focus && dropdownButton.current) {
      dropdownButton.current.focus();
    }
  }, [dropdownButton.current, value, setSearchTerm, setOpen, setFocusedIndex, isSearching, setIsSearching]);

  const setValue = useCallback((newOption?: Option, shouldClose: boolean = false) => {
    if (newOption) {
      onChange(newOption);
      setSearchTerm('', false);
    }

    if (shouldClose) {
      closeDropdown(false);
    }
  }, [onChange, closeDropdown, setSearchTerm, setIsSearching]);

  useClickListener(closeDropdown, container);

  return {
    focusedIndex, setFocusedIndex,
    open, setOpen,
    searchTerm, setSearchTerm,
    setValue,
    isSearching, setIsSearching,
    filteredOptions,
    getStyle,
    closeDropdown,
    dropdownButton,
    container,
    flattenedOptions,
  }
};

export default useDropdownHooks;
