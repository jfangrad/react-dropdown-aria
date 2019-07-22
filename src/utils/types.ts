import { MouseEvent, KeyboardEvent, ReactNode } from 'react';
import { StyleKeys } from './constants';

export interface ExtraState { [key: string]: any };

export type StyleKey = keyof typeof StyleKeys;

type StyleFunction = (base: {}, state: DropdownState, extraState?: {}) => {};

type OptionRendererFunction = (
  selectedOption: string | string[],
  optionsArray: DropdownOption[],
  onOptionClicked: (e:  MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void,
  elementsRef: any[],
  getStyle: (key: StyleKey, extraState?: ExtraState) => string
) => ReactNode;

interface DropdownStyle {
  arrow?: StyleFunction,
  dropdownButton?: StyleFunction,
  displayedValue?: StyleFunction,
  dropdownWrapper?: StyleFunction,
  groupContainer?: StyleFunction,
  groupHeading?: StyleFunction,
  optionContainer?: StyleFunction,
  optionItem?: StyleFunction,
};

export interface Option {
  ariaLabel?: string,
  className?: string,
  title?: string,
  value: string,
  iconClass?: string,
}

export interface OptionGroup {
  label: string,
  groupOptions: Option[],
}

export type DropdownOption = Option | OptionGroup;

export interface DropdownState {
  open: boolean,
  searchTerm: string,
  searchTimer: NodeJS.Timer | null,
  focusedIndex: number,
  internalSelectedOption: string | string[],
};

export interface DropdownProps {
  ariaDescribedBy: string,
  ariaLabel: string,
  ariaLabelledBy: string,
  arrowRenderer: (open: boolean) => ReactNode,
  buttonClassName: string,
  centerText: boolean,
  contentClassName: string,
  disabled: boolean,
  height: number,
  hideArrow: boolean,
  id: string,
  maxContentHeight: number,
  multi: boolean,
  openUp: boolean,
  options: DropdownOption[],
  optionClassName: string,
  optionRenderer: OptionRendererFunction,
  pageKeyTraverseSize: number,
  placeholder: string,
  searchable: boolean,
  selectedOption: string | string[],
  selectedOptionClassName: string,
  selectedValueClassName: string,
  setSelected: (option: string | string[]) => void,
  style: DropdownStyle,
  width: number,
}
