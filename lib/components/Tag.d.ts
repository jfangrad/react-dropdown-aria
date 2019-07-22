/// <reference types="react" />
interface TagProps {
    className?: string;
    value: string;
    onDeleteClick: (option: string) => void;
}
declare const Tag: {
    ({ className, value, onDeleteClick }: TagProps): JSX.Element;
    defaultProps: {
        className: undefined;
    };
};
export default Tag;
