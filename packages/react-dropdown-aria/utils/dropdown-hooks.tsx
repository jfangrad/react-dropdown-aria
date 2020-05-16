import React, { useState, useRef, useCallback, useMemo, Dispatch, SetStateAction } from "react";
import { DropdownProps, StyleKey, ExtraState, Option, DropdownOption } from './types';
import defaultStyles from '../styles/Dropdown';
import { css } from 'emotion';
import { useClickListener, useScroll } from './dom-hooks';
import { arrayReducer, filterDropdownOptions } from './helper';
import { IdPrefix } from './constants';

const listbox: 'listbox' = 'listbox';
const listboxStyle = {
  height: 0,
  width: 0,
  overflow: 'hidden',
};
const useAriaList = (flattenedOptions: Option[], selectedIndex: number, mergedId: string) => {
  const optionMarkup = flattenedOptions.map((o, i) => (
    <div role="option" id={`${mergedId}_list_${i}`} key={`${mergedId}_list_${i}`} aria-selected={i === selectedIndex} />
  ));
  return (
    <div role={listbox} id={`${mergedId}_list`} style={listboxStyle}>
      {optionMarkup}
    </div>
  )
};

const useSearch = (setFocusedIndex: Dispatch<SetStateAction<number>>, options: DropdownOption[], searchable: boolean) => {
  const [searchTerm, setSearchTermState] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;
    return filterDropdownOptions(options, searchTerm)
  }, [options, searchTerm]);

  const setSearchTerm = useCallback((newSearchTerm: string) => {
    setSearchTermState(newSearchTerm)
    setFocusedIndex(0);
  }, [setFocusedIndex, setSearchTermState]);

  return { searchTerm, setSearchTerm, filteredOptions };
}

const useDropdownHooks = (props: DropdownProps, mergedId: string) => {
  const { style, options, searchable, onChange, disabled, ariaDescribedBy, ariaLabel, ariaLabelledBy, value, defaultOpen } = props;
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [open, setOpen] = useState(defaultOpen);
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
    setFocusedIndex(0)
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

  const selectedIndex = useMemo(() => flattenedOptions.map(o => o.value).indexOf(value), [flattenedOptions, value]);
  const ariaProps = useMemo(() => ({
    'aria-hidden': disabled,
    'aria-expanded': open,
    'aria-haspopup': listbox,
    'aria-activedescendant': `${mergedId}_list_${focusedIndex}`,
    'aria-controls': `${mergedId}_list`,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
  }), [disabled, open, mergedId, focusedIndex, ariaLabel, ariaLabelledBy, ariaDescribedBy]);

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

const isTest = process.env.NODE_ENV === 'test';
let idCount = 0;
export const useId = (idProp: string): string => {
  const mergedId = useMemo(() => {
    if (idProp) return idProp;

    let id: string | number;
    if (isTest) {
      id = 'test';
    } else {
      id = idCount;
      idCount += 1;
    }
    return `${IdPrefix}${id}`;
  }, [idProp]);

  return mergedId;
}

export default useDropdownHooks;
