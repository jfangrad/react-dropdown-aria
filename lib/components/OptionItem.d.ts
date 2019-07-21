import React, { MouseEvent, KeyboardEvent } from 'react';
import { Option } from '../utils/types';
interface OptionItemProps {
    option: Option;
    optionClass: string;
    onOptionClicked: ({ nativeEvent }: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
}
declare const OptionItem: React.ForwardRefExoticComponent<OptionItemProps & React.RefAttributes<HTMLButtonElement>>;
export default OptionItem;
