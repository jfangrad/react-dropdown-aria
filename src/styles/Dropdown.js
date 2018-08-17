import colours from './Colours';
import { optionItemStyle as optionItem } from '../components/OptionItem';

const dropdownWrapper = ({ width, height }) => ({
  width,
  height,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

const dropdownButton = (props, { open }) => ({
  fontSize: '1em',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  padding: '9px 5px',
  margin: '0',
  borderRadius: '0',
  borderBottom: `2px solid ${colours.greys.light}`,
  borderTop: 'none',
  borderRight: 'none',
  borderLeft: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: open ? `0px 1px 3px 2px ${colours.greys.lighter}` : 'none',

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

const displayedValue = ({ hideArrow, selectedOption, centerText }, { internalSelectedOption }) => ({
  flex: '1',
  borderRight: hideArrow ? 'none' : `1px solid ${colours.greys.light}`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: (selectedOption || internalSelectedOption) ? 'black' : colours.greys.base,
  textAlign: centerText ? 'center' : 'left',
});

const arrow = (props, { open }) => ({
  content: '""',
  width: '0',
  height: '0',
  marginLeft: '8px',
  marginRight: '5px',
  borderRight: '5px solid transparent',
  borderLeft: '5px solid transparent',
  borderTop: open ? '0' : `5px solid ${colours.greys.base}`,
  borderBottom: open ? `5px solid ${colours.greys.base}` : '0',
});

const optionContainer = ({ openUp, maxContentHeight }, { open }) => ({
  width: '100%',
  maxHeight: maxContentHeight || '175px',
  overflowY: maxContentHeight ? 'scroll' : null,
  zIndex: '9999',
  overflowX: 'hidden',
  position: 'absolute',
  left: '0',
  listStyleType: 'none',
  margin: '0',
  padding: '2px 0',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '2px',
  display: open ? 'block' : 'none',
  boxSizing: 'border-box',
  top: openUp ? null : '100%',
  bottom: openUp ? '105%' : null,
  boxShadow: openUp ? `0px -3px 3px 2px ${colours.greys.lighter}` : `0px 3px 3px 2px ${colours.greys.lighter}`,

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
  fontSize: '0.9em',
  padding: '0 10px 3px 5px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const defaultStyles = {
  arrow,
  dropdownButton,
  displayedValue,
  dropdownWrapper,
  groupContainer,
  groupHeading,
  optionContainer,
  optionItem,
};

export default defaultStyles;
