import React, { useState } from 'react';
import { OPTIONS } from "./constants";
import Dropdown, { Option } from '../index';

interface Props {
  onChange: (value: Option) => void;
}

const DropdownTest = ({ onChange }: Props) => {
  const [value, setValue] = useState<string>();
  const handleOnChange = (val: Option) => {
    onChange(val);
    setValue(val.value);
  }
  return (
    <Dropdown options={OPTIONS} onChange={handleOnChange} className="test" value={value} />
  )
};

export default DropdownTest;
