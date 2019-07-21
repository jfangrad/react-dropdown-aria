import { DropdownProps, DropdownState } from '../utils/types';
import { CSSObject } from 'create-emotion';
declare const defaultStyles: {
    Arrow: (props: DropdownProps, { open }: DropdownState) => CSSObject;
    DisplayedValue: ({ hideArrow, selectedOption, centerText }: DropdownProps, { internalSelectedOption }: DropdownState) => CSSObject;
    DropdownButton: (props: DropdownProps, { open }: DropdownState) => CSSObject;
    DropdownWrapper: ({ width, height }: DropdownProps) => CSSObject;
    GroupContainer: () => CSSObject;
    GroupHeading: () => CSSObject;
    OptionContainer: ({ openUp, maxContentHeight }: DropdownProps, { open }: DropdownState) => CSSObject;
    OptionItem: (props: DropdownProps, state: DropdownState, { selected }: import("../utils/types").ExtraState) => CSSObject;
};
export default defaultStyles;
