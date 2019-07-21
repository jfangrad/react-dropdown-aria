import React from 'react';
import { DropdownOption } from '../components/OptionItem';
declare function defaultOptionRenderer(selectedOption: string, options: DropdownOption[], selectedOptionClassName: string, optionClassName: string, onOptionClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => void, elementsRef: HTMLButtonElement[], getStyle: (key: string, extraState?: {} | undefined) => string): JSX.Element[];
export default defaultOptionRenderer;
