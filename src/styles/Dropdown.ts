import colours from './colours';
import optionItem from './OptionItem';
import { DropdownProps, DropdownState } from '../components/Dropdown';

const dropdownWrapper = ({ width, height }: DropdownProps) => ({
  display: 'flex',
  flexDirection: 'column',
  height,
  position: 'relative',
  width,
});

const dropdownButton = (props: DropdownProps, { open }: DropdownState) => ({
  alignItems: 'center',
  backgroundColor: 'white',
  borderBottom: `2px solid ${colours.greys.light}`,
  borderLeft: 'none',
  borderRadius: '0',
  borderRight: 'none',
  borderTop: 'none',
  boxShadow: open ? `0px 1px 3px 2px ${colours.greys.lighter}` : 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1em',
  height: '100%',
  margin: '0',
  outline: 'none',
  padding: '9px 5px',
  textAlign: 'left',
  width: '100%',

  '&:hover': {
    boxShadow: `0px 1px 3px 2px ${colours.greys.lighter}`,
  },

  '&:focus': {
    boxShadow: `0px 1px 3px 2px ${colours.greys.lighter}`,
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
});

const displayedValue = ({ hideArrow, selectedOption, centerText }: DropdownProps, { internalSelectedOption }: DropdownState) => ({
  borderRight: hideArrow ? 'none' : `1px solid ${colours.greys.light}`,
  color: (selectedOption || internalSelectedOption) ? 'black' : colours.greys.base,
  flex: '1',
  overflow: 'hidden',
  textAlign: centerText ? 'center' : 'left',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const arrow = (props: DropdownProps, { open }: DropdownState) => ({
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

const optionContainer = ({ openUp, maxContentHeight }: DropdownProps, { open }: DropdownState) => ({
  backgroundColor: 'white',
  borderRadius: '2px',
  bottom: openUp ? '105%' : null,
  boxShadow: openUp ? `0px -3px 3px 2px ${colours.greys.lighter}` : `0px 3px 3px 2px ${colours.greys.lighter}`,
  boxSizing: 'border-box',
  color: 'black',
  display: open ? 'block' : 'none',
  left: '0',
  listStyleType: 'none',
  margin: '0',
  maxHeight: maxContentHeight || '175px',
  overflowX: 'hidden',
  overflowY: maxContentHeight ? 'scroll' : null,
  padding: '2px 0',
  position: 'absolute',
  top: openUp ? null : '100%',
  width: '100%',
  zIndex: '9999',

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

const groupContainer = () => ({
  padding: '1em 0 0 0',
});

const groupHeading = () => ({
  color: 'grey',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.9em',
  justifyContent: 'space-between',
  padding: '0 10px 3px 5px',
});

const defaultStyles = {
  arrow,
  displayedValue,
  dropdownButton,
  dropdownWrapper,
  groupContainer,
  groupHeading,
  optionContainer,
  optionItem,
};

export default defaultStyles;
