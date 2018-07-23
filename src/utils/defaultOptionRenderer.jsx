import React from 'react';
import DropdownItem from '../Components/DropdownItem';

function defaultOptionRenderer(selectedOption, options, onOptionClicked, elementsRef) {
  return options.map((option) => {
    const selected = (option.value === selectedOption);
    return (
      <DropdownItem
        key={option.value}
        ref={el => (el && elementsRef.push(el))}
        selected={selected}
        onOptionClicked={onOptionClicked}
        option={option}
      />
    );
  });
}

export default defaultOptionRenderer;
