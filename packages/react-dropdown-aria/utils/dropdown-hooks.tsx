import React, { useState, useRef, useCallback, useMemo, RefObject, useEffect, Dispatch, SetStateAction } from "react";
import { css } from 'emotion';
import { DropdownProps, StyleKey, ExtraState, Option, DropdownOption } from './types';
import defaultStyles from '../styles';
import { arrayReducer, filterDropdownOptions } from './helper';
import { IdPrefix } from "./constants";

const listbox: 'listbox' = 'listbox';
const listboxStyle = {
  height: 0,
  width: 0,
  overflow: 'hidden',
};
const useAriaList = (flattenedOptions: Option[], selectedIndex: number, mergedId: string) => {
  const optionMarkup = flattenedOptions.map((o, i) => (
    <div
      role="option"
      id={`${mergedId}_list_${i}`}
      key={`${mergedId}_list_${i}`}
      aria-selected={i === selectedIndex}
      aria-label={o.value}
    />
  ));
  return (
    <div role={listbox} id={`${mergedId}_list`} style={listboxStyle}>
      {optionMarkup}
    </div>
  )
};

const useClickListener = (closeDropdown: () => void, container: RefObject<HTMLDivElement>) => {
  const onClick = (e: Event) => {
    if (container.current && !container.current.contains(e.target as Node)) {
      closeDropdown();
    }
  };
  useEffect(() => {
    document.addEventListener('mouseup', onClick, false);
    document.addEventListener('touchend', onClick, false);
    return () => {
      document.removeEventListener('mouseup', onClick);
      document.removeEventListener('touchend', onClick);
    }
  }, []);
};

const ScrollBuffer = 8;
const useScroll = (focusedIndex: number, optionContainer: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (optionContainer.current && focusedIndex >= 0) {
      const children = optionContainer.current.getElementsByClassName('dropdown-option');
      const focusedChild = children && children.length ?
        children[focusedIndex] as HTMLDivElement :
        null;
      if (focusedChild && focusedChild.getBoundingClientRect) {
        const { height: optionHeight } = focusedChild.getBoundingClientRect();
        const { height: listHeight } = optionContainer.current.getBoundingClientRect();
        const scrollTop = optionContainer.current.scrollTop;
        const isAbove = focusedChild.offsetTop <= scrollTop;
        const isInView = (
          focusedChild.offsetTop >= scrollTop &&
          focusedChild.offsetTop + optionHeight <= scrollTop + listHeight
        );

        if (!isInView) {
          if (isAbove) {
            optionContainer.current.scrollTo({ top: focusedChild.offsetTop });
          } else {
            optionContainer.current.scrollTo({ top: focusedChild.offsetTop - listHeight + optionHeight + ScrollBuffer});
          }
        }
      }
    }
  }, [focusedIndex]);
};

const useSearch = (setFocusedIndex: Dispatch<SetStateAction<number>>, options: DropdownOption[], searchable: boolean) => {
  const [searchTerm, setSearchTermState] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;
    return filterDropdownOptions(options, searchTerm)
  }, [options, searchTerm]);

  const setSearchTerm = useCallback((newSearchTerm: string, resetFocusedIndex = true) => {
    setSearchTermState(newSearchTerm)
    if (resetFocusedIndex) {
      setFocusedIndex(0);
    }
  }, [setFocusedIndex, setSearchTermState]);

  return { searchTerm, setSearchTerm, filteredOptions };
};

export const useDropdownHooks = (props: DropdownProps, mergedId: string) => {
  const { style, options, searchable, onChange, disabled, ariaDescribedBy, ariaLabel, ariaLabelledBy, value, defaultOpen } = props;
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [open, setOpen] = useState(defaultOpen);
  const container = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listWrapper = useRef<HTMLDivElement>(null);
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
    setSearchTerm('', false);
    setOpen(false);
    // setFocusedIndex(0)
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current, setSearchTerm, setOpen, setFocusedIndex]);

  const setValue = useCallback((newOption?: Option, shouldClose = false) => {
    if (newOption) {
      onChange(newOption);
      setSearchTerm('', false);
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

const isClient = (
  typeof window !== 'undefined' &&
  window.document &&
  window.document.documentElement
);
const isBrowser = process.env.NODE_ENV !== 'test' && isClient;

let idCount = 0;
export const useId = (idProp: string): string => {
  const mergedId = useMemo(() => {
    if (idProp) return idProp;

    let id: string | number;
    if (isBrowser) {
      id = idCount;
      idCount += 1;
    } else {
      id = 'test_or_ssr';
    }
    return `${IdPrefix}${id}`;
  }, [idProp]);

  return mergedId;
};
