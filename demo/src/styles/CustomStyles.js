const style = {
  DropdownButton: base => ({
    ...base,
    border: '2px solid #54854C',
    borderRadius: '8px',
    transition: 'border 0.2s, padding: 0.2s, background-color 0.5s',

    '&:hover': {
      border: '2px solid rgb(103, 103, 103)',
      backgroundColor: '#f8f8f8',
      boxShadow: 'none',
    },

    '&:focus': {
      border: '2px solid rgb(0, 128, 188)',
      boxShadow: 'none',
    },

    '&:disabled': {
      backgroundColor: '#e6e6e6',
    },
  }),
  OptionContainer: base => ({
    ...base,
    padding: '5px 0',
    border: '1px solid rgb(154, 154, 154)',
    borderRadius: '5px',
  }),
  OptionItem: (base, state, { selected, focused }) => ({
    ...base,
    fontSize: '0.95em',
    color: selected ? 'white' : '#54854C',
  }),
  Arrow: (base, { open }) => ({
    ...base,
    color: '#54854C',

    'svg': {
      width: open ? 16 : 24,
      height: open ? 16 : 24,
    }
  }),
};

export default style;
