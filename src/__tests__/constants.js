export const OPTIONS = [
  { value: '1' },
  { value: '2' },
  { value: '3' },
  { value: '4' },
  { value: '5' },
  { value: '6' },
  { value: '7' },
  { value: '8' },
  { value: '9' },
  { value: '10' },
];

const letters = [
  { value: 'a' },
  { value: 'b' },
  { value: 'c' },
  { value: 'd' },
  { value: 'e' },
  { value: 'f' },
  { value: 'g' },
  { value: 'h' },
  { value: 'i' },
  { value: 'j' },
];

export const CUSTOM_OPTIONS = [
  { value: '1', title: 'title', className: 'className', iconClass: 'fab fa-js-square', ariaLabel: 'ariaLabel' },
  { value: '2', title: 'title', className: 'className', iconClass: 'fab fa-js-square', ariaLabel: 'ariaLabel' },
  { value: '3', title: 'title', className: 'className', iconClass: 'fab fa-js-square', ariaLabel: 'ariaLabel' },
];

export const GROUPED_OPTIONS = [
  { label: 'numbers', groupOptions: OPTIONS },
  { label: 'letters', groupOptions: letters },
];
