import colours from './colours';
import { DropdownProps, DropdownState } from '../components/Dropdown';

export default (props: DropdownProps, state: DropdownState, { selected = false }) => ({
  backgroundColor: selected ? colours.purple.lighter : 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.95em',
  outline: 'none',
  overflow: 'hidden',
  padding: '5px 10px',
  textAlign: 'left',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',

  '&:hover': {
    backgroundColor: selected ? colours.purple.light : colours.greys.lighter,
  },

  '&:focus': {
    backgroundColor: selected ? colours.purple.light : colours.greys.lighter,
  },

  '.option-icon': {
    paddingRight: '5px',
  },
});
