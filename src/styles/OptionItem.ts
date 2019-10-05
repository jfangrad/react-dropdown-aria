import colours from './colours';
import { ExtraState, DropdownProps, DropdownState } from '../utils/types';
import { CSSObject } from 'create-emotion';

export default (props: DropdownProps, state: DropdownState, { selected = false }: ExtraState): CSSObject => ({
  backgroundColor: selected ? colours.greys.light : colours.greys.lighter,
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
    backgroundColor: selected ? colours.greys.dark : colours.greys.light,
    color: selected ? colours.greys.lighter : undefined,
  },

  '&:focus': {
    backgroundColor: selected ? colours.greys.dark : colours.greys.light,
    color: selected ? colours.greys.lighter : undefined,
  },

  '.option-icon': {
    paddingRight: '5px',
  },
});
