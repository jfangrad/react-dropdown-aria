import { Option, OptionGroup, DropdownOption } from './types';
import { IdPrefix } from './constants';

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

const isClient = (
  typeof window !== undefined &&
  window.document &&
  window.document.documentElement
);

const isBrowser = process.env.NODE_ENV !== 'test' && isClient;

let idCount = 0;
export function getId(): string {
  let id: string | number;
  if (isBrowser) {
    id = idCount;
    idCount += 1;
  } else {
    id = 'TEST';
  }
  return `${IdPrefix}${id}`;
}
