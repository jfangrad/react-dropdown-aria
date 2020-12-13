import styled, { DefaultTheme } from 'styled-components';

import { colours } from '../utils/constants';
import { unpackTheme } from '../utils/helper';
import { DropdownProps, DropdownStyleDependantState, ExtraState } from '../utils/types';

export type StyleValue<T> = string | number | undefined | { [key: string]: StyleValue<T> | ThemeObject<T> | ThemeFunction<T> };
export type ThemeFunction<T> = (props: T) => ThemeObject<T> | StyleValue<T>;
export type ThemeObject<T> = { [key: string]: ThemeFunction<T> | StyleValue<T> };
export type ThemeObjectOrFunction<T = undefined> = ThemeObject<T> | ThemeFunction<T> | [ThemeFunction<T>, DefaultTheme];

export type RdaTheme = {
  wrapper?: ThemeObjectOrFunction<DropdownWrapperProps>;
  selector?: ThemeObjectOrFunction<DropdownSelectorProps>;
  selectorSearch?: ThemeObjectOrFunction;
  selectedValue?: ThemeObjectOrFunction<SelectedValueProps>;
  placeholder?: ThemeObjectOrFunction<PlaceholderProps>;
  arrow?: ThemeObjectOrFunction<ArrowProps>;
  optionContainer?: ThemeObjectOrFunction<OptionContainerProps>;
  groupContainer?: ThemeObjectOrFunction;
  groupHeading?: ThemeObjectOrFunction;
  groupDivider?: ThemeObjectOrFunction;
  optionItem?: ThemeObjectOrFunction<OptionItemWrapProps>;
};

export const DropdownTheme: RdaTheme = {
  wrapper: {
    backgroundColor: ({ disabled }: DropdownWrapperProps) => disabled ? colours.greys.light : colours.greys.lightest,
    border: ({ open, dropdownFocused }: DropdownWrapperProps) => `2px solid ${(open || dropdownFocused) ? colours.states.focused : colours.greys.darker}`,
    borderRadius: '7px',
    cursor: ({ disabled }: DropdownWrapperProps) => disabled ? 'not-allowed' : 'pointer',
    fontSize: '1em',
    display: 'flex',
    flexDirection: 'column',
    height: (p: DropdownWrapperProps) => p.height,
    position: 'relative',
    width: ({ width }: DropdownWrapperProps) => width,

    '&:hover': {
      border: (p: DropdownWrapperProps) => `2px solid ${(p.open || p.dropdownFocused) ? colours.states.focused : colours.greys.darker}`,
    },

    '&:disabled': {
      backgroundColor: colours.states.disabled,
      cursor: 'unset',
    },
  },
  selector: {
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: (p: DropdownSelectorProps) => (p.open && p.searchable) ? 'text' : 'inherit',
    display: 'flex',
    height: '32px',
    padding: '0 11px',
    position: 'relative',
    width: '100%',

    'input': {
      backgroundColor: 'inherit',
      border: 'none',
      fontSize: 'inherit',
      height: '30px',
      outline: 'none',
      width: '100%',
    },
  },
  selectorSearch: {
    bottom: 0,
    left: '11px',
    position: 'absolute',
    right: '25px',
    top: 0,
  },
  selectedValue: {
    bottom: 0,
    color: ({ value, open }: SelectedValueProps) => (value && !open) ? 'black' : colours.greys.base,
    left: '11px',
    lineHeight: '30px',
    overflow: 'hidden',
    position: 'absolute',
    right: '25px',
    textOverflow: 'ellipsis',
    top: 0,
    whiteSpace: 'nowrap',
    marginLeft: '3px',
  },
  placeholder: {
    bottom: 0,
    color: colours.greys.base,
    left: '11px',
    lineHeight: '30px',
    overflow: 'hidden',
    position: 'absolute',
    right: '25px',
    textAlign: ({ centerText }: PlaceholderProps) => centerText ? 'center' : 'left',
    textOverflow: 'ellipsis',
    top: 0,
    whiteSpace: 'nowrap',
    marginLeft: '3px',
  },
  arrow: {
    alignItems: 'center',
    bottom: 0,
    color: colours.greys.base,
    display: 'flex',
    position: 'absolute',
    right: '10px',
    top: 0,
  },
  optionContainer: {
    backgroundColor: colours.greys.lightest,
    border: `2px solid ${colours.greys.darker}`,
    borderRadius: '4px',
    bottom: ({ openUp }: OptionContainerProps) => openUp ? '105%' : undefined,
    boxShadow: ({ openUp }: OptionContainerProps) => `0px ${openUp ? '-4px' : '4px'} 4px rgba(0, 0, 0, 0.25)`,
    boxSizing: 'border-box',
    color: 'black',
    display: ({ open }: OptionContainerProps) => open ? 'block' : 'none',
    left: '0',
    listStyleType: 'none',
    margin: '0',
    maxHeight: ({ maxContentHeight }: OptionContainerProps) => maxContentHeight || '175px',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '2px 0',
    position: 'absolute',
    top: ({ openUp }: OptionContainerProps) => openUp ? undefined : '100%',
    width: '100%',
    zIndex: 9999,

    '.dropdown-selector-content--empty': {
      alignItems: 'center',
      color: colours.greys.base,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4px 0',
    },

    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#ddd',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#666',
    },
  },
  groupContainer: {
    padding: '1em 0 0 0',
  },
  groupHeading: {
    color: 'grey',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '0.9em',
    padding: '0 10px 3px 5px',
  },
  groupDivider: {
    borderBottom: `1px solid ${colours.greys.dark}`,
    margin: 'auto',
    paddingTop: 10,
    width: '85%',
  },
  optionItem: {
    backgroundColor: ({ focused, selected }: OptionItemWrapProps) => {
      let backgroundColor = colours.greys.lightest;
      if (focused && selected) {
        backgroundColor = colours.greys.dark;
      } else if (focused) {
        backgroundColor = colours.greys.lighter;
      } else if (selected) {
        backgroundColor = colours.greys.light;
      }
      return backgroundColor;
    },
    border: 'none',
    color: (p: OptionItemWrapProps) => (p.focused && p.selected ? colours.greys.lightest : 'inherit'),
    cursor: 'pointer',
    fontSize: '0.95em',
    overflow: 'hidden',
    padding: '5px 10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    display: 'flex',
    alignItems: 'center',

    '&:hover': ({ selected }: OptionItemWrapProps) => ({
      backgroundColor: selected ? colours.greys.dark : colours.greys.light,
      color: selected ? colours.greys.lightest : undefined,
    }),

    '.dropdown-option-icon': {
      paddingRight: '5px',
    },
  }
};

export type DropdownWrapperProps =
  Pick<DropdownProps, 'width' | 'height' | 'disabled'> &
  Pick<DropdownStyleDependantState,'open' | 'dropdownFocused'>;
export const DropdownWrapper = styled.div<DropdownWrapperProps>(
  (props) => unpackTheme(props.theme.wrapper, props)
);

export type DropdownSelectorProps = Pick<DropdownProps, 'searchable'> & Pick<DropdownStyleDependantState, 'open'>;
export const DropdownSelector = styled.div<DropdownSelectorProps>(
  props => unpackTheme(props.theme.selector, props)
);

export const SelectorSearch = styled.span(
  (props) => unpackTheme(props.theme.selectorSearch, props),
);

export type SelectedValueProps = Pick<DropdownProps, 'centerText' | 'value'> & Pick<DropdownStyleDependantState, 'open'>;
export const SelectedValue = styled.span<SelectedValueProps>(
  props => unpackTheme(props.theme.selectedValue, props)
);

export type PlaceholderProps = Pick<DropdownProps, 'centerText'>;
export const Placeholder = styled.span<PlaceholderProps>(
  (props) => unpackTheme(props.theme.placeholder, props)
);

export type ArrowProps = Pick<DropdownStyleDependantState, 'open'>;
export const Arrow = styled.div<ArrowProps>(
  (props) => unpackTheme(props.theme.arrow, props)
);

export type OptionContainerProps = Pick<DropdownProps, 'openUp' | 'maxContentHeight'> & Pick<DropdownStyleDependantState, 'open'>;
export const OptionContainer = styled.span<OptionContainerProps>(
  (props) => unpackTheme(props.theme.optionContainer, props)
);

export const GroupContainer = styled.div(
  (props) => unpackTheme(props.theme.groupContainer, props),
);

export const GroupHeading = styled.div(
  (props) => unpackTheme(props.theme.groupHeading, props),
);

export const GroupDivider = styled.div(
  (props) => unpackTheme(props.theme.groupDivider, props),
);

export type OptionItemWrapProps = Pick<ExtraState, 'selected' | 'focused'>;
export const OptionItemWrap = styled.div<OptionItemWrapProps>(
  (props) => unpackTheme(props.theme.optionItem, props)
);
