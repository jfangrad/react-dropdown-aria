import { DropdownProps, DropdownState } from '../components/Dropdown';
declare const defaultStyles: {
    arrow: (props: DropdownProps, { open }: DropdownState) => {
        borderBottom: string;
        borderLeft: string;
        borderRight: string;
        borderTop: string;
        content: string;
        height: string;
        marginLeft: string;
        marginRight: string;
        width: string;
    };
    displayedValue: ({ hideArrow, selectedOption, centerText }: DropdownProps, { internalSelectedOption }: DropdownState) => {
        borderRight: string;
        color: string;
        flex: string;
        overflow: string;
        textAlign: string;
        textOverflow: string;
        whiteSpace: string;
    };
    dropdownButton: (props: DropdownProps, { open }: DropdownState) => {
        alignItems: string;
        backgroundColor: string;
        borderBottom: string;
        borderLeft: string;
        borderRadius: string;
        borderRight: string;
        borderTop: string;
        boxShadow: string;
        cursor: string;
        display: string;
        flexDirection: string;
        fontSize: string;
        height: string;
        margin: string;
        outline: string;
        padding: string;
        textAlign: string;
        width: string;
        '&:hover': {
            boxShadow: string;
        };
        '&:focus': {
            boxShadow: string;
        };
        '&:disabled': {
            cursor: string;
        };
    };
    dropdownWrapper: ({ width, height }: DropdownProps) => {
        display: string;
        flexDirection: string;
        height: number;
        position: string;
        width: number;
    };
    groupContainer: () => {
        padding: string;
    };
    groupHeading: () => {
        color: string;
        display: string;
        flexDirection: string;
        fontSize: string;
        justifyContent: string;
        padding: string;
    };
    optionContainer: ({ openUp, maxContentHeight }: DropdownProps, { open }: DropdownState) => {
        backgroundColor: string;
        borderRadius: string;
        bottom: string | null;
        boxShadow: string;
        boxSizing: string;
        color: string;
        display: string;
        left: string;
        listStyleType: string;
        margin: string;
        maxHeight: string | number;
        overflowX: string;
        overflowY: string | null;
        padding: string;
        position: string;
        top: string | null;
        width: string;
        zIndex: string;
        '&::-webkit-scrollbar': {
            width: string;
        };
        '&::-webkit-scrollbar-track': {
            background: string;
        };
        '&::-webkit-scrollbar-thumb': {
            background: string;
        };
    };
    optionItem: (props: DropdownProps, state: DropdownState, { selected }: {
        selected?: boolean | undefined;
    }) => {
        backgroundColor: string;
        border: string;
        cursor: string;
        fontSize: string;
        outline: string;
        overflow: string;
        padding: string;
        textAlign: string;
        textOverflow: string;
        whiteSpace: string;
        width: string;
        '&:hover': {
            backgroundColor: string;
        };
        '&:focus': {
            backgroundColor: string;
        };
        '.option-icon': {
            paddingRight: string;
        };
    };
};
export default defaultStyles;
