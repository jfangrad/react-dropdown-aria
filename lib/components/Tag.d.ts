/// <reference types="react" />
import { StyleKey, ExtraState } from '../utils/types';
interface TagProps {
    className?: string;
    value: string;
    onDeleteClick: (option: string) => void;
    getStyle: (key: StyleKey, extraState?: ExtraState) => string;
}
declare const Tag: {
    ({ className, value, onDeleteClick, getStyle }: TagProps): JSX.Element;
    defaultProps: {
        className: undefined;
    };
};
export default Tag;
