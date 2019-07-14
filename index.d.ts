import * as React from 'react';

export type DropdownOption = {
  ariaLabel?: string,
  className?: string,
  title?: string,
  value: string,
  iconClass?: string,
};

export type StyleFunction = (base: {}, state: DropdownState, extraState?: {}) => {};

export type DropdownStyle = {
  arrow?: StyleFunction,
  dropdownButton?: StyleFunction,
  displayedValue?: StyleFunction,
  dropdownWrapper?: StyleFunction,
  groupContainer?: StyleFunction,
  groupHeading?: StyleFunction,
  optionContainer?: StyleFunction,
  optionItem?: StyleFunction,
};

export interface DropdownProps {
  ariaDescribedBy?: string,
  ariaLabel?: string,
  ariaLabelledBy?: string,
  arrowRenderer?: (open: boolean) => React.ReactNode,
  buttonClassName?: string,
  centerText?: boolean,
  contentClassName?: string,
  disabled?: boolean,
  height?: number,
  hideArrow?: boolean,
  id?: string,
  optionRenderer?: (selectedOption: string, optionsArray: DropdownOption[], onOptionClicked: (option: string) => void, elementsRef: any[], getStyle: (key: string, extraState: {}) => string) => React.ReactNode,
  maxContentHeight?: number,
  options: DropdownOption[],
  optionClassName?: string,
  openUp?: boolean,
  pageKeyTraverseSize?: number,
  placeholder?: string,
  searchable?: boolean,
  selectedOption?: string,
  selectedOptionClassName?: string,
  selectedValueClassName?: string,
  setSelected: (option: string) => void,
  style?: DropdownStyle,
  width?: number,
}

export interface DropdownState {
  open: boolean,
  searchTerm: string,
  searchTimer: number,
  focusedIndex: number,
  internalSelectedOption: string | null,
}

declare class Dropdown extends React.Component<DropdownProps, DropdownState>{}

export default Dropdown;
