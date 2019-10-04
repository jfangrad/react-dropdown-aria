import React, { MouseEvent, KeyboardEvent } from 'react';
import { cx } from 'emotion';
import { KEY_CODES, StyleKeys } from '../utils/constants';
import { StyleKey, ExtraState } from '../utils/types';

interface TagProps {
  className?: string,
  value: string,
  onDeleteClick: (option: string) => void,
  getStyle: (key: StyleKey, extraState?: ExtraState) => string
};

const Tag = ({ className, value, onDeleteClick, getStyle }: TagProps) => {
  const buttonClass = getStyle(StyleKeys.Tag);

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDeleteClick(value);
  };

  const onKeyDown = ({ nativeEvent }: KeyboardEvent) => {
    if (nativeEvent.keyCode === KEY_CODES.ENTER) {
      onDeleteClick(value);
    }
  }

  return (
    <div className={cx(className, buttonClass)}>
      {value}
      <div className="tag-delete-btn" role="button" tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>
        X
      </div>
    </div>
  );
}

Tag.defaultProps = {
  className: undefined,
};

export default Tag;

