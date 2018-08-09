import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dropdown from '../Dropdown';
import { CUSTOM_OPTIONS } from './constants';

const foo = () => {};

describe('Check Props', () => {
  it('Matches snapshot with default props', () => {
    const dropdown = shallow(<Dropdown setSelected={foo} />);
    expect(toJson(dropdown)).toMatchSnapshot();
  });

  it('Matches snapshot with custom props', () => {
    const dropdown = shallow(
      <Dropdown
        placeholder="Custom Placeholder..."
        className="custom-class"
        id="dropdown"
        ariaLabel="React Simple Dropdown"
        options={CUSTOM_OPTIONS}
        setSelected={foo}
        disabled
        width={400}
        maxContentHeight={150}
      />,
    );
    expect(toJson(dropdown)).toMatchSnapshot();
  });
});

describe('Navigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Dropdown options={CUSTOM_OPTIONS} setSelected={foo} />);
  });

  it('Opens dropdown when clicked', () => {
    wrapper.find('.dropdown-select').simulate('click');

    expect(wrapper.state('open')).toBeTruthy();
  });

  it('Closes when clicked again', () => {
    wrapper.find('.dropdown-select').simulate('click');
    wrapper.find('.dropdown-select').simulate('click');

    expect(wrapper.state('open')).toBeFalsy();
  });
});
