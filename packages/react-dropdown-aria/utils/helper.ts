import { Option, OptionGroup, DropdownOption } from './types';

export function isOptionGroup(option: Option | OptionGroup): option is OptionGroup {
  return (option as OptionGroup).groupOptions !== undefined;
}

export const arrayReducer = (acc: Option[], val: DropdownOption): Option[] => {
  if (isOptionGroup(val)) {
    return acc.concat(val.groupOptions);
  }
  return acc.concat(val);
};

const filterGroup = (optionGroup: OptionGroup, searchTerm: string): OptionGroup => {
  return {
    ...optionGroup,
    groupOptions: optionGroup.groupOptions.filter(o => o.value.toLowerCase().includes(searchTerm)),
  };
};

export const filterDropdownOptions = (options: DropdownOption[], searchTerm: string): DropdownOption[] => {
  const filteredOptions: DropdownOption[] = [];
  const lowercaseTerm = searchTerm.toLowerCase();
  for (const option of options) {
    if (isOptionGroup(option)) {
      const filteredGroup = filterGroup(option, lowercaseTerm);
      if (filteredGroup.groupOptions.length >= 0) {
        filteredOptions.push(filteredGroup);
      }
    } else {
      if (option.value.toLowerCase().includes(lowercaseTerm)) {
        filteredOptions.push(option);
      }
    }
  }
  return filteredOptions;
}

export function cx(...args: (string | object | undefined)[]) {
  return args.filter(Boolean).map(c => {
    if (typeof c === 'string') {
      return c;
    } else if (c) {
      return Object.keys(c).filter(k => c[k]).join(' ');
    } else {
      return '';
    }
  }).join(' ');
}