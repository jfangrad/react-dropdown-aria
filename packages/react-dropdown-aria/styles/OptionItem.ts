import colours from './colours';
import { ExtraState, DropdownProps, DropdownStyleDependantState } from '../utils/types';
import { CSSObject } from 'create-emotion';

export default (props: DropdownProps, state: DropdownStyleDependantState, { selected, focused }: ExtraState): CSSObject => {
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
    boxSizing: 'border-box',
    color,
    cursor: 'pointer',
    fontSize: '0.95em',
    outline: 'none',
    overflow: 'hidden',
    padding: '5px 10px',
    textAlign: 'left',
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
};
