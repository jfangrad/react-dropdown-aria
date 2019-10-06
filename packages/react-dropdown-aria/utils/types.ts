import { ReactNode, MutableRefObject } from 'react';
import { StyleKeys } from './constants';
import { OptionItemProps } from '../components/OptionItem';

export interface ExtraState { [key: string]: any };

export type StyleKey = keyof typeof StyleKeys;

type StyleFunction = (base: {}, state: DropdownStyleDependantState, extraState?: {}) => {};
export type GetStyleFunction = (key: StyleKey, extraState?: ExtraState) => string;

export type OptionRendererFunction = (
  props: OptionItemProps,
  optionRef: MutableRefObject<HTMLButtonElement | null>,
  getStyle: GetStyleFunction,
) => JSX.Element;

export interface DropdownStyle {
  Arrow?: StyleFunction,
  DropdownButton?: StyleFunction,
  DisplayedValue?: StyleFunction,
  DropdownWrapper?: StyleFunction,
  GroupContainer?: StyleFunction,
  GroupHeading?: StyleFunction,
  GroupDivider?: StyleFunction,
  OptionContainer?: StyleFunction,
  OptionItem?: StyleFunction,
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

export interface DropdownStyleDependantState {
  open: boolean,
  focusedIndex: number,
  internalSelectedOption: string | null,
}

export interface DropdownState extends DropdownStyleDependantState {
  searchTerm: string,
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
  openUp: boolean,
  options: DropdownOption[],
  optionItemRenderer: OptionRendererFunction,
  pageKeyTraverseSize: number,
  placeholder: string,
  searchable: boolean,
  selectedOption: string,
  selectedValueClassName: string,
  setSelected: (option: string) => void,
  style: DropdownStyle,
  width: number,
}
