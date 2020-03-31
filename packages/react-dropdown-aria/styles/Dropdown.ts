import colours from './colours';
import OptionItem from './OptionItem';
import { DropdownProps, DropdownStyleDependantState } from '../utils/types';
import { CSSObject } from 'create-emotion';

const DropdownWrapper = ({ width, height }: DropdownProps): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
  height,
  position: 'relative',
  width,
});

const DropdownButton = (props: DropdownProps, { open }: DropdownStyleDependantState): CSSObject => ({
  alignItems: 'center',
  backgroundColor: colours.greys.lighter,
  border: `2px solid ${open ? colours.states.focused : colours.greys.dark}`,
  borderRadius: '7',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1em',
  height: '100%',
  margin: '0',
  outline: 'none',
  padding: '9px 5px 9px 12px',
  textAlign: 'left',
  width: '100%',

  '&:hover': {
    border: `2px solid ${colours.greys.darker}`,
  },

  '&:focus': {
    border: `2px solid ${colours.states.focused}`,
  },

  '&:disabled': {
    backgroundColor: colours.states.disabled,
    cursor: 'unset',
  },
});

const DisplayedValue = ({ hideArrow, selectedOption, centerText }: DropdownProps, { internalSelectedOption }: DropdownStyleDependantState): CSSObject => ({
  borderRight: hideArrow ? 'none' : `1px solid ${colours.greys.light}`,
  color: (selectedOption || internalSelectedOption) ? 'black' : colours.greys.base,
  flex: '1',
  overflow: 'hidden',
  textAlign: centerText ? 'center' : 'left',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const Arrow = (props: DropdownProps, { open }: DropdownStyleDependantState): CSSObject => ({
  borderBottom: open ? `5px solid ${colours.greys.base}` : '0',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderTop: open ? '0' : `5px solid ${colours.greys.base}`,
  content: '""',
  height: '0',
  marginLeft: '8px',
  marginRight: '5px',
  width: '0',
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
  overflowY: maxContentHeight ? 'scroll' : undefined,
  padding: '2px 0',
  position: 'absolute',
  top: openUp ? undefined : '100%',
  width: '100%',
  zIndex: 9999,

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

const defaultStyles = {
  Arrow,
  DisplayedValue,
  DropdownButton,
  DropdownWrapper,
  GroupContainer,
  GroupDivider,
  GroupHeading,
  OptionContainer,
  OptionItem,
};

export default defaultStyles;
