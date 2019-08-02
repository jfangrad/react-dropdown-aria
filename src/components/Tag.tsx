import React, { MouseEvent, KeyboardEvent } from 'react';
import { css, cx } from 'emotion';
import { CSSObject } from 'create-emotion';
import { KEY_CODES } from '../utils/constants';

interface TagProps {
  className?: string,
  value: string,
  onDeleteClick: (option: string) => void,
};

const TagStyle: CSSObject = {
  alignItems: 'center',
  backgroundColor: '#dedace',
  borderRadius: 6,
  display: 'flex',
  fontSize: 12,
  justifyContent: 'space-between',
  marginRight: 4,
  minWidth: 30,
  padding: '4px 6px',
  width: 'max-content',

  '.tag-delete-btn': {
    borderLeft: '1px solid #a3a29e',
    display: 'inline-block',
    marginBottom: 2,
    marginLeft: 6,
    marginTop: 2,
    paddingLeft: 6,

    '&:hover': {
      color: '#c93c00',
    },
  },
};

const Tag = ({ className, value, onDeleteClick }: TagProps) => {
  const buttonClass = css(TagStyle);

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

