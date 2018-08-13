const style = {
  dropdownButtonStyle: base => ({
    ...base,
    border: '1px solid gray',
    borderRadius: '8px',
    transition: 'border 0.2s, padding: 0.2s, background-color 0.5s',

    '&:hover': {
      border: '1px solid rgb(103, 103, 103)',
      backgroundColor: '#f8f8f8',
      boxShadow: 'none',
    },

    '&:focus': {
      border: '2px solid rgb(0, 128, 188)',
      boxShadow: 'none',
      padding: '8px 4px',
    },

    '&:disabled': {
      backgroundColor: '#e6e6e6',
    },
  }),
  optionContainerStyle: base => ({
    ...base,
    padding: '5px 0',
    border: '1px solid rgb(154, 154, 154)',
    borderRadius: '5px',
  }),
  optionStyle: (base, state, selected) => ({
    ...base,
    fontSize: '0.95em',
    color: selected ? 'white' : 'black',
    backgroundColor: selected ? '#00A3EF' : 'white',

    '&:hover': {
      backgroundColor: selected ? '#0092d6' : '#e0f5ff',
    },

    '&:focus': {
      backgroundColor: selected ? '#0092d6' : '#e0f5ff',
    },
  }),
};

export default style;
