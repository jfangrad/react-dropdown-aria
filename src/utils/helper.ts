import { Option, OptionGroup } from './types';

export function isOptionGroup(option: Option | OptionGroup): option is OptionGroup {
  return (option as OptionGroup).groupOptions !== undefined;
}

export function isArray(value: any | any[]): value is any[] {
  return Array.isArray(value);
}
