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
