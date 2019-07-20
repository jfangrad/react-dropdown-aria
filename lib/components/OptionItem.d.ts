import React, { MouseEvent, KeyboardEvent } from 'react';
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
interface OptionItemProps {
    option: Option;
    optionClass: string;
    onOptionClicked: ({ nativeEvent }: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
}
declare const OptionItem: React.ForwardRefExoticComponent<OptionItemProps & React.RefAttributes<HTMLButtonElement>>;
export default OptionItem;
