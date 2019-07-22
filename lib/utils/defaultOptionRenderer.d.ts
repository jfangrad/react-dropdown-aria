import React from 'react';
import { StyleKey, ExtraState, DropdownOption } from './types';
declare function defaultOptionRenderer(selectedOption: string | string[], options: DropdownOption[], selectedOptionClassName: string, optionClassName: string, onOptionClicked: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) => void, elementsRef: HTMLButtonElement[], getStyle: (key: StyleKey, extraState?: ExtraState) => string): JSX.Element[];
export default defaultOptionRenderer;
