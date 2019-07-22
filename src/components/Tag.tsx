import React, { MouseEvent } from 'react';
import { css, cx } from 'emotion';
import { CSSObject } from 'create-emotion';

interface TagProps {
  className?: string,
  value: string,
  onDeleteClick: (option: string) => void,
};

const TagStyle: CSSObject = {
  backgroundColor: '#dedace',
  borderRadius: 6,
  fontSize: 12,
  marginRight: 4,
  padding: 4,
  width: 'max-content',

  '.tag-delete-btn': {
    borderLeft: '1px solid #a3a29e',
    marginBottom: 2,
    marginLeft: 6,
    marginTop: 2,
    paddingLeft: 2,

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

  return (
    <div className={cx(className, buttonClass)}>
      {value}
      <span className="tag-delete-btn" onClick={onClick}>
        X
      </span>
    </div>
  );
}

Tag.defaultProps = {
  className: undefined,
};

export default Tag;

