import { DefaultTheme } from 'styled-components';

import { RdaThemeType, ThemeFunction, ThemeObjectOrFunction, StyleValue } from '../styles';
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

export function isObject(obj: any): obj is object {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function isFunction<T>(obj: any): obj is ThemeFunction<T> {
  return !!obj && typeof obj === 'function';
}

export function mergeThemes(provided: RdaThemeType, defaultTheme: RdaThemeType): RdaThemeType {
  const mergedTheme = { ...defaultTheme };

  for (const key in provided) {
    const value = provided[key];
    if (isObject(value) && key in defaultTheme) {
      mergedTheme[key] = mergeThemes(value, mergedTheme[key]);
    } else if (isFunction(value) && key in defaultTheme) {
      if (!isObject(mergedTheme[key]) && !isFunction(mergedTheme[key])) {
        mergedTheme[key] = value;
      } else {
        mergedTheme[key] = [value, mergedTheme[key]];
      }
    } else {
      mergedTheme[key] = value
    }
  }

  return mergedTheme;
}

function merge<T>(obj1: any, obj2: any): StyleValue<T> {
  if (!isObject(obj2)) {
    return obj2;
  }

  const merged = { ...obj1 };

  for (const key in obj2) {
    const val = obj2[key];
    if (isObject(val) && key in merged) {
      merged[key] = merge(merged[key], val);
    } else {
      merged[key] = val;
    }
  }

  return merged;
}

export function unpackTheme<T>(theme: ThemeObjectOrFunction<T> | StyleValue<T>, props: T) {
  let unpacked: any = {};

  if (isFunction<T>(theme)) {
    unpacked = unpackTheme(theme(props), props);
  } else if(isObject(theme)) {
    for (const key in theme) {
      if (Array.isArray(theme[key])) {
        const [func, obj] = theme[key] as [ThemeFunction<T>, DefaultTheme]
        unpacked[key] = unpackTheme(merge(obj, func(props)), props);
      } else {
        unpacked[key] = unpackTheme(theme[key], props);
      }
    }
  } else if (Array.isArray(theme)) {
    const [func, obj] = theme;
    unpacked = unpackTheme(merge(obj, func(props)), props);
  } else {
    unpacked = theme;
  }

  return unpacked;
}

// if (Array.isArray(theme)) {
//   const [func, obj] = theme as [ThemeFunction<T>, DefaultTheme]
//   unpacked = merge(obj, func(props));
// }
