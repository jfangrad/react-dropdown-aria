/// <reference types="node" />
import React, { Component, MouseEvent, KeyboardEvent } from 'react';
import { DropdownOption } from './OptionItem';
declare type StyleFunction = (base: {}, state: DropdownState, extraState?: {}) => {};
interface DropdownStyle {
    arrow?: StyleFunction;
    dropdownButton?: StyleFunction;
    displayedValue?: StyleFunction;
    dropdownWrapper?: StyleFunction;
    groupContainer?: StyleFunction;
    groupHeading?: StyleFunction;
    optionContainer?: StyleFunction;
    optionItem?: StyleFunction;
}
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
    arrowRenderer: (open: boolean) => React.ReactNode;
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
    optionRenderer: (selectedOption: string, optionsArray: DropdownOption[], onOptionClicked: (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void, elementsRef: any[], getStyle: (key: string, extraState: {}) => string) => React.ReactNode;
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
declare class Dropdown extends Component<DropdownProps, DropdownState> {
    static defaultProps: {
        ariaDescribedBy: null;
        ariaLabel: null;
        ariaLabelledBy: null;
        arrowRenderer: undefined;
        buttonClassName: undefined;
        centerText: boolean;
        contentClassName: null;
        disabled: boolean;
        height: null;
        hideArrow: boolean;
        id: null;
        maxContentHeight: null;
        openUp: boolean;
        optionClassName: null;
        optionRenderer: undefined;
        options: never[];
        pageKeyTraverseSize: number;
        placeholder: string;
        searchable: boolean;
        selectedOption: null;
        selectedOptionClassName: null;
        selectedValueClassName: null;
        style: {};
        width: null;
    };
    state: DropdownState;
    private elements;
    private container;
    private button;
    constructor(props: DropdownProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private renderOptions;
    private onClick;
    private onDropdownClick;
    private onOptionClicked;
    private onKeyDown;
    private onNavigation;
    private getStyle;
    private setFocus;
    private closeDropdown;
    private searchDropdown;
    private clearTimer;
    private clearSearch;
    private searchList;
}
export default Dropdown;
