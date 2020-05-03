import React, { ReactNode } from 'react';
import { StyleKeys } from '../utils/constants';
import { GetStyleFunction } from '../utils/types';
import { ChevronDown, Search } from '../icons';

interface ArrowProps {
  hideArrow?: boolean;
  arrowRenderer?: (dropdownOpen: boolean) => ReactNode;
  getStyle: GetStyleFunction;
  dropdownOpen: boolean;
  searchable: boolean;
}

const Arrow = ({ hideArrow, arrowRenderer, getStyle, dropdownOpen, searchable }: ArrowProps) => {
  if (hideArrow) return null;

  const arrowClass = getStyle(StyleKeys.Arrow);

  if (arrowRenderer) return (
    <span>
      {arrowRenderer(dropdownOpen)}
    </span>
  );

  const showSearchIcon = dropdownOpen && searchable;
  return (
    <div className={arrowClass}>
      {showSearchIcon && <Search />}
      {!showSearchIcon && <ChevronDown />}
    </div>
  )
};

// WHY???
export default Arrow;
