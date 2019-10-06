import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';
import Dropdown from '../index';
import { CUSTOM_OPTIONS, OPTIONS, GROUPED_OPTIONS } from './constants';
import { KEY_CODES } from '../utils/constants';

expect.addSnapshotSerializer(createSerializer(emotion as any));

// tslint:disable-next-line: no-empty
const foo = () => {};

describe('Check Props', () => {
  it('Matches snapshot with default props', () => {
    const dropdown = mount(<Dropdown setSelected={foo} />);
    expect(toJson(dropdown)).toMatchSnapshot();
  });

  it('Matches snapshot with custom props', () => {
    const dropdown = mount(
      <Dropdown
        placeholder="Custom Placeholder..."
        buttonClassName="custom-class"
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

  it('Matches snapshot with grouped options', () => {
    const dropdown = mount(<Dropdown setSelected={foo} options={GROUPED_OPTIONS} />);
    expect(toJson(dropdown)).toMatchSnapshot();
  });
});

describe('Navigation', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let button: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeEach(() => {
    wrapper = mount(<Dropdown options={OPTIONS} setSelected={foo} buttonClassName="test" />);
    button = wrapper.find('.test'); // Actual dropdown button element
  });

  it('Opens dropdown when clicked', () => {
    button.simulate('click');
    const listContainer = wrapper.find('ul').first();
    expect(listContainer).toHaveStyleRule('display', 'block');
  });

  it('Opens dropdown with enter key', () => {
    button.simulate('keyDown', { nativeEvent: { key: 'enter', keyCode: KEY_CODES.ENTER, preventDefault: foo } });

    expect(wrapper.state('open')).toBeTruthy();
  });

  it('Closes when clicked again', () => {
    button.simulate('click');
    expect(wrapper.state('open')).toBeTruthy();

    button.simulate('click');
    expect(wrapper.state('open')).toBeFalsy();
  });

  it('Closes when enter pressed again', () => {
    button.simulate('keyDown', { nativeEvent: { key: 'enter', keyCode: KEY_CODES.ENTER, preventDefault: foo } });
    expect(wrapper.state('open')).toBeTruthy();

    button.simulate('keyDown', { nativeEvent: { key: 'enter', keyCode: KEY_CODES.ENTER, preventDefault: foo } });
    expect(wrapper.state('open')).toBeFalsy();
  });

  it('Closes when tab key pressed', () => {
    button.simulate('click');
    expect(wrapper.state('open')).toBeTruthy();

    button.simulate('keyDown', { nativeEvent: { key: 'tab', keyCode: KEY_CODES.TAB } });
    expect(wrapper.state('open')).toBeFalsy();
  });

  it('Closes when esc pressed', () => {
    button.simulate('click');
    expect(wrapper.state('open')).toBeTruthy();

    button.simulate('keyDown', { nativeEvent: { key: 'escape', keyCode: KEY_CODES.ESCAPE, preventDefault: foo } });
    expect(wrapper.state('open')).toBeFalsy();
  });

  it('Arrow key selects first element in list', () => {
    button.simulate('click');
    wrapper.simulate('keyDown', { nativeEvent: { key: 'downArrow', keyCode: KEY_CODES.DOWN_ARROW, preventDefault: foo } });

    expect(document.activeElement!.innerHTML).toBe('1'); // eslint-disable-line no-undef
  });

  it('Arrow key nav loops arround', () => {
    button.simulate('click');
    for (let i = 0; i < 10; i += 1) {
      wrapper.simulate('keyDown', { nativeEvent: { key: 'downArrow', keyCode: KEY_CODES.DOWN_ARROW, preventDefault: foo } });
    }
    expect(document.activeElement!.innerHTML).toBe('10'); // eslint-disable-line no-undef

    wrapper.simulate('keyDown', { nativeEvent: { key: 'downArrow', keyCode: KEY_CODES.DOWN_ARROW, preventDefault: foo } });
    expect(document.activeElement!.innerHTML).toBe('1'); // eslint-disable-line no-undef
  });
});

describe('Selecting Options', () => {
  let spy: any;

  beforeEach(() => {
    spy = sinon.spy();
  });

  it('calls setSelected with value when option selected', () => {
    const wrapper = mount(<Dropdown options={OPTIONS} setSelected={spy} buttonClassName="test" />);
    const button = wrapper.find('.test');

    button.simulate('click');
    wrapper.find('ul').childAt(0).simulate('click', { nativeEvent: { target: { innerText: '1' } } });

    expect(spy.calledWith('1')).toBe(true);
  });

  it('sets dropdown text to selected item', () => {
    const wrapper = mount(<Dropdown options={OPTIONS} setSelected={spy} buttonClassName="test" />);
    const button = wrapper.find('.test');

    button.simulate('click');
    wrapper.find('ul').childAt(0).simulate('click', { nativeEvent: { target: { innerText: '1' } } });

    expect(button.find('div').first().text()).toBe('1');
  });
});

describe('Special props', () => {
  it('Does not open when disabled', () => {
    const wrapper = mount(<Dropdown options={OPTIONS} setSelected={foo} buttonClassName="test" disabled />);
    wrapper.find('.test').simulate('click');

    expect(wrapper.state('open')).toBeFalsy();
  });
});
