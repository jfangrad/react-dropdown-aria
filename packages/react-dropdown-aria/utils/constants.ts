export enum StyleKeys {
  Arrow = 'Arrow',
  DropdownSelector = 'DropdownSelector',
  DropdownWrapper = 'DropdownWrapper',
  SelectorSearch = 'SelectorSearch',
  SelectedValue = 'SelectedValue',
  Placeholder = 'Placeholder',
  GroupContainer = 'GroupContainer',
  GroupDivider = 'GroupDivider',
  GroupHeading = 'GroupHeading',
  OptionContainer = 'OptionContainer',
  OptionItem = 'OptionItem',
}

export enum KEY_CODES {
  DOWN_ARROW = 40,
  ENTER = 13,
  ESCAPE = 27,
  PAGE_DOWN = 34,
  PAGE_UP = 33,
  TAB = 9,
  UP_ARROW = 38,
}

export const NAVIGATION_KEYS = [
  KEY_CODES.ESCAPE,
  KEY_CODES.UP_ARROW,
  KEY_CODES.DOWN_ARROW,
  KEY_CODES.PAGE_UP,
  KEY_CODES.PAGE_DOWN,
];

export const IdPrefix = 'react_dropdown_aria_';
