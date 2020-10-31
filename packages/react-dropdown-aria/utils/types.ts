import { ReactNode } from 'react';
import { OptionItemProps } from '../components/OptionItem';

export interface ExtraState {
  [key: string]: any;
}

export type OptionRendererFunction = (
  props: OptionItemProps,
  index: number,
) => JSX.Element;

export type OnOptionClicked = (option: Option, shouldClose?: boolean) => void;

export type ItemRenderer = (
  props: OptionItemProps,
  index: number,
) => JSX.Element;

export interface Option {
  value: string;
  ariaLabel?: string;
  className?: string;
  title?: string;
  iconClass?: string;
}

export interface OptionGroup {
  label: string;
  groupOptions: Option[];
}

export type DropdownOption = Option | OptionGroup;

export interface DropdownStyleDependantState {
  open: boolean;
  focusedIndex: number;
  dropdownFocused: boolean;
}

export interface DropdownState extends DropdownStyleDependantState {
  searchTerm: string;
}

export interface DropdownProps {
  ariaDescribedBy: string;
  ariaLabel: string;
  ariaLabelledBy: string;
  arrowRenderer: (open: boolean) => ReactNode;
  className: string;
  centerText: boolean;
  contentClassName: string;
  defaultOpen: boolean;
  disabled: boolean;
  height: number;
  hideArrow: boolean;
  id: string;
  maxContentHeight: number;
  openUp: boolean;
  options: DropdownOption[];
  optionItemRenderer: OptionRendererFunction;
  pageKeyTraverseSize: number;
  placeholder: string;
  searchable: boolean;
  value: string;
  selectedValueClassName: string;
  onChange: (option: Option) => void;
  width: number;
}
