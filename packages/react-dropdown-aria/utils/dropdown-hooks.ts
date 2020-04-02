/* tslint:disable:object-literal-sort-keys */
import { useState, useRef, MutableRefObject, useCallback, useMemo } from "react";
import { DropdownProps, StyleKey, ExtraState } from './types';
import useSearch from './search-hooks';
import defaultStyles from '../styles/Dropdown';
import { css } from 'emotion';
import useClickListener from './dom-hooks';
import { arrayReducer } from './helper';

const useDropdownHooks = (props: DropdownProps) => {
  const { style, options, searchable } = props;
  const [internalSelectedOption, setInternalSelectedOption] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [open, setOpen] = useState(false);
  const container: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const dropdownButton: MutableRefObject<HTMLButtonElement | null> = useRef(null);

  const { searchTerm, setSearchTerm, filteredOptions } = useSearch(setFocusedIndex, options, searchable);
  const flattenedOptions = useMemo(() => filteredOptions.reduce(arrayReducer, []), [options]);

  const getStyle = useCallback((key: StyleKey, extraState?: ExtraState) => {
    const state = { focusedIndex, open, internalSelectedOption };
    const baseStyle = defaultStyles[key](props, state, extraState || {});
    const customStyle = style[key];
    return customStyle ? css(customStyle(baseStyle, state, extraState)) : css(baseStyle);
  }, [style, focusedIndex, open, internalSelectedOption]);

  const closeDropdown = useCallback((focus = false) => {
    setOpen(false);
    setFocusedIndex(p => (internalSelectedOption ? p : -1))
    if (focus && dropdownButton.current) {
      dropdownButton.current.focus();
    }
  }, [dropdownButton.current, internalSelectedOption]);

  useClickListener(closeDropdown, container);

  return {
    internalSelectedOption, setInternalSelectedOption,
    focusedIndex, setFocusedIndex,
    open, setOpen,
    searchTerm, setSearchTerm,
    filteredOptions,
    getStyle,
    closeDropdown,
    dropdownButton,
    container,
    flattenedOptions,
  }
};

export default useDropdownHooks;
