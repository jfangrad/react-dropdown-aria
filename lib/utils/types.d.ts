/// <reference types="node" />
import { MouseEvent, KeyboardEvent, ReactNode } from 'react';
import { StyleKeys } from './constants';
export interface ExtraState {
    [key: string]: any;
}
export declare type StyleKey = keyof typeof StyleKeys;
declare type StyleFunction = (base: {}, state: DropdownState, extraState?: {}) => {};
declare type OptionRendererFunction = (selectedOption: string, optionsArray: DropdownOption[], onOptionClicked: (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void, elementsRef: any[], getStyle: (key: StyleKey, extraState?: ExtraState) => string) => ReactNode;
interface DropdownStyle {
    Arrow?: StyleFunction;
    DropdownButton?: StyleFunction;
    DisplayedValue?: StyleFunction;
    DropdownWrapper?: StyleFunction;
    GroupContainer?: StyleFunction;
    GroupHeading?: StyleFunction;
    GroupDivider?: StyleFunction;
    OptionContainer?: StyleFunction;
    OptionItem?: StyleFunction;
}
export interface Option {
    ariaLabel?: string;
    className?: string;
    title?: string;
    value: string;
    iconClass?: string;
}
export interface OptionGroup {
    label: string;
    groupOptions: Option[];
}
export declare type DropdownOption = Option | OptionGroup;
export interface DropdownState {
    open: boolean;
    searchTerm: string;
    searchTimer: NodeJS.Timer | null;
    focusedIndex: number;
    internalSelectedOption: string;
}
export interface DropdownProps {
    ariaDescribedBy: string;
    ariaLabel: string;
    ariaLabelledBy: string;
    arrowRenderer: (open: boolean) => ReactNode;
    buttonClassName: string;
    centerText: boolean;
    contentClassName: string;
    disabled: boolean;
    height: number;
    hideArrow: boolean;
    id: string;
    maxContentHeight: number;
    openUp: boolean;
    options: DropdownOption[];
    optionClassName: string;
    optionRenderer: OptionRendererFunction;
    pageKeyTraverseSize: number;
    placeholder: string;
    searchable: boolean;
    selectedOption: string;
    selectedOptionClassName: string;
    selectedValueClassName: string;
    setSelected: (option: string) => void;
    style: DropdownStyle;
    width: number;
}
export {};
