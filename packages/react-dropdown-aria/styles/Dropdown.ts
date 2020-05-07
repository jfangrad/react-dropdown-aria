import { CSSObject } from 'create-emotion';
import colours from './colours';
import OptionItem from './OptionItem';
import { DropdownProps, DropdownStyleDependantState } from '../utils/types';

const DropdownWrapper = ({ width, height, disabled }: DropdownProps, { open, dropdownFocused }: DropdownStyleDependantState): CSSObject => ({
  backgroundColor: disabled ? colours.greys.light : colours.greys.lighter,
  border: `2px solid ${(open || dropdownFocused) ? colours.states.focused : colours.greys.dark}`,
  borderRadius: '7',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1em',
  height,
  position: 'relative',
  width,

  '&:hover': {
    border: `2px solid ${(open || dropdownFocused) ? colours.states.focused : colours.greys.darker}`,
  },

  '&:disabled': {
    backgroundColor: colours.states.disabled,
    cursor: 'unset',
  },
});

const DropdownSelector = (props: DropdownProps, { open }: DropdownStyleDependantState): CSSObject => ({
  alignItems: 'center',
  boxSizing: 'border-box',
  cursor: (open && props.searchable) ? 'text' : 'inherit',
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
});

const SelectorSearch = (): CSSObject => ({
  bottom: 0,
  left: '11px',
  position: 'absolute',
  right: '25px',
  top: 0,
});

const inputValueStyleBase  = ({ centerText }: DropdownProps): CSSObject => ({
  bottom: 0,
  left: '11px',
  lineHeight: '30px',
  overflow: 'hidden',
  position: 'absolute',
  right: '25px',
  textAlign: centerText ? 'center' : 'left',
  textOverflow: 'ellipsis',
  top: 0,
  whiteSpace: 'nowrap',
});

const SelectedValue = (props: DropdownProps, { open }: DropdownStyleDependantState): CSSObject => ({
  color: (props.value && !open) ? 'black' : colours.greys.base,
  ...inputValueStyleBase(props),
});

const Placeholder = (props: DropdownProps): CSSObject => ({
  color: colours.greys.base,
  ...inputValueStyleBase(props),
});

const Arrow = (): CSSObject => ({
  alignItems: 'center',
  bottom: 0,
  color: colours.greys.base,
  display: 'flex',
  position: 'absolute',
  right: '10px',
  top: 0,
});

const OptionContainer = ({ openUp, maxContentHeight }: DropdownProps, { open }: DropdownStyleDependantState): CSSObject => ({
  backgroundColor: colours.greys.lighter,
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
    height: `${(maxContentHeight || 175) - 8}px`,
    justifyContent: 'center',
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
});

const GroupContainer = (): CSSObject => ({
  padding: '1em 0 0 0',
});

const GroupHeading = (): CSSObject => ({
  color: 'grey',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.9em',
  padding: '0 10px 3px 5px',
});

const GroupDivider = (): CSSObject => ({
  borderBottom: `1px solid ${colours.greys.dark}`,
  margin: 'auto',
  paddingTop: 10,
  width: '85%',
});

export default {
  Arrow,
  DropdownSelector,
  DropdownWrapper,
  GroupContainer,
  GroupDivider,
  GroupHeading,
  OptionContainer,
  OptionItem,
  Placeholder,
  SelectedValue,
  SelectorSearch,
};
