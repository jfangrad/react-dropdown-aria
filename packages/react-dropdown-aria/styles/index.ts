import { colours } from '../utils/constants';
import { DropdownProps, DropdownStyleDependantState, ExtraState } from '../utils/types';

import styled from 'styled-components';

export const DropdownWrapper = styled.div<
  Pick<DropdownProps, 'width' | 'height' | 'disabled'> & Pick<DropdownStyleDependantState, 'open' | 'dropdownFocused'>
>(({ width, height, disabled, open, dropdownFocused }) => ({
  backgroundColor: disabled ? colours.greys.light : colours.greys.lightest,
  border: `2px solid ${open || dropdownFocused ? colours.states.focused : colours.greys.dark}`,
  borderRadius: '7',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1em',
  height,
  position: 'relative',
  width,

  '&:hover': {
    border: `2px solid ${open || dropdownFocused ? colours.states.focused : colours.greys.darker}`,
  },

  '&:disabled': {
    backgroundColor: colours.states.disabled,
    cursor: 'unset',
  },
}));

export const DropdownSelector = styled.div<
  Pick<DropdownProps, 'searchable'> & Pick<DropdownStyleDependantState, 'open'>
>(({ searchable, open }) => ({
  alignItems: 'center',
  boxSizing: 'border-box',
  cursor: open && searchable ? 'text' : 'inherit',
  display: 'flex',
  height: '32px',
  padding: '0 11px',
  position: 'relative',
  width: '100%',

  input: {
    backgroundColor: 'inherit',
    border: 'none',
    fontSize: 'inherit',
    height: '30px',
    outline: 'none',
    width: '100%',
  },
}));

export const SelectorSearch = styled.span<any>(() => ({
  bottom: 0,
  left: '11px',
  position: 'absolute',
  right: '25px',
  top: 0,
}));

const inputValueStyleBase = {
  bottom: 0,
  left: '11px',
  lineHeight: '30px',
  overflow: 'hidden',
  position: 'absolute',
  right: '25px',
  textOverflow: 'ellipsis',
  top: 0,
  whiteSpace: 'nowrap',
} as const;

export const SelectedValue = styled.span<
  Pick<DropdownProps, 'centerText' | 'value'> & Pick<DropdownStyleDependantState, 'open'>
>(props => ({
  textAlign: props.centerText ? 'center' : 'left',
  color: props.value && !props.open ? 'black' : colours.greys.base,
  ...inputValueStyleBase,
}));

export const Placeholder = styled.span<Pick<DropdownProps, 'centerText'>>(({ centerText }) => ({
  color: colours.greys.base,
  textAlign: centerText ? 'center' : 'left',
  ...inputValueStyleBase,
}));

export const Arrow = styled.div<any>(() => ({
  alignItems: 'center',
  bottom: 0,
  color: colours.greys.base,
  display: 'flex',
  position: 'absolute',
  right: '10px',
  top: 0,
}));

export const OptionContainer = styled.span<
  Pick<DropdownProps, 'openUp' | 'maxContentHeight'> & Pick<DropdownStyleDependantState, 'open'>
>(({ openUp, maxContentHeight, open }) => ({
  backgroundColor: colours.greys.lightest,
  border: `2px solid ${colours.greys.darker}`,
  borderRadius: '4px',
  bottom: openUp ? '105%' : undefined,
  boxShadow: `0px ${openUp ? '-4px' : '4px'} 4px rgba(0, 0, 0, 0.25)`,
  boxSizing: 'border-box',
  color: 'black',
  display: open ? 'block' : 'none',
  left: '0',
  listStyleType: 'none',
  margin: '0',
  maxHeight: maxContentHeight || '175px',
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: '2px 0',
  position: 'absolute',
  top: openUp ? undefined : '100%',
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
}));

export const GroupContainer = styled.div<any>(() => ({
  padding: '1em 0 0 0',
}));

export const GroupHeading = styled.div<any>(() => ({
  color: 'grey',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.9em',
  padding: '0 10px 3px 5px',
}));

export const GroupDivider = styled.div<any>(() => ({
  borderBottom: `1px solid ${colours.greys.dark}`,
  margin: 'auto',
  paddingTop: 10,
  width: '85%',
}));

export const OptionItemWrap = styled.div<Pick<ExtraState, 'selected' | 'focused'>>(({ selected, focused }) => {
  let backgroundColor = colours.greys.lightest;
  let color = 'inherit';

  if (focused && selected) {
    backgroundColor = colours.greys.dark;
    color = colours.greys.lightest;
  } else if (focused) {
    backgroundColor = colours.greys.lighter;
  } else if (selected) {
    backgroundColor = colours.greys.light;
  }

  return {
    backgroundColor,
    border: 'none',
    color,
    cursor: 'pointer',
    fontSize: '0.95em',
    overflow: 'hidden',
    padding: '5px 10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: selected ? colours.greys.dark : colours.greys.light,
      color: selected ? colours.greys.lightest : undefined,
    },

    '.option-icon': {
      paddingRight: '5px',
    },
  };
});