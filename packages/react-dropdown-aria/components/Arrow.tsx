import React, { ReactNode } from 'react';
import { ChevronDown, Search } from '../icons';

interface ArrowProps {
  hideArrow: boolean;
  arrowRenderer?: (dropdownOpen: boolean) => ReactNode;
  className: string;
  dropdownOpen: boolean;
  searchable: boolean;
}

const Arrow = ({ hideArrow, arrowRenderer, className, dropdownOpen, searchable }: ArrowProps) => {
  if (hideArrow) return null;

  if (arrowRenderer) return (
    <div className={className}>
      {arrowRenderer(dropdownOpen)}
    </div>
  );

  const showSearchIcon = dropdownOpen && searchable;
  return (
    <div className={className}>
      {showSearchIcon && <Search />}
      {!showSearchIcon && <ChevronDown />}
    </div>
  )
};

Arrow.defaultProps = {
  arrowRenderer: undefined,
  hideArrow: false,
}

export default React.memo(Arrow);
