[![CircleCI](https://circleci.com/gh/jfangrad/react-dropdown-aria.svg?style=svg&circle-token=c8db79d70dddf853273a5964b860ec0bf53f5163)](https://circleci.com/gh/jfangrad/react-dropdown-aria/tree/master) [![npm](https://img.shields.io/npm/v/react-dropdown-aria.svg)](https://www.npmjs.com/package/react-dropdown-aria)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-dropdown-aria?color=important)
![npm](https://img.shields.io/npm/dm/react-dropdown-aria)
# react-dropdown-aria
This component was created to be a light weight and fully accessible dropdown component for React. For a more feature heavy and powerful dropdown look to the [react-select](https://github.com/JedWatson/react-select) package. (This dropdown is inspired by react-select)

## **Upgrading to v3**
Please take note when upgrading from v2 to v3 there are breaking changes. Be sure to carefully read the [changelog entry for v3.0.0](https://github.com/jfangrad/react-dropdown-aria/blob/master/packages/react-dropdown-aria/CHANGELOG.md#200).

## Features
1. Fully customizable styling (powered by styled-components)
2. Grouped options
3. Accessible
4. Searchable
5. Custom render function props
6. Typescript typings

### Peer dependencies:
- Styled-components (Used for styling)

# Demo And Examples
For demo and examples see [https://jfangrad.github.io/react-dropdown-aria/](https://jfangrad.github.io/react-dropdown-aria/)

# Installation
Simply use npm or yarn to install the package.
```
// Yarn
$ yarn add react-dropdown-aria styled-components

// npm
$ npm install --save react-dropdown-aria styled-components
```

You can then include it in your project as needed:
```js
import Dropdown from 'react-dropdown-aria';
```

# Usage
Options should be provided to the Dropdown as an array of objects.
### Simple Example:
```js
<Dropdown
  ...
  options: {[
    { value: 'one' },
    { value: 'two' },
    { value: 'three' }
  ]}
/>
```

Each option object in the array of options can have the following keys:

| key | Type | Default | Description |
|:---|:---|:---|:---|
| `ariaLabel` | string | null | Aria Label to be applied to the option |
| `className` | string | null | CSS class to be applied to this option |
| `title` | string | null | HTML title to be used for the option |
| `value` | string | null | The value to be displayed in the dropdown (Required) |

### Groups Example
Groups of items can also be implemented by pasing an array of objects of the following form to the dropdown options prop:
```js
<Dropdown
  ...
  options: {[
    { label: 'Group 1', groupOptions: optionsGroup1 },
    { label: 'Group 2', groupOptions: optionsGroup2 },
  ]}
/>
```
Where the `groupOptions` is an array of options as described above, and the `label` is the string to display above the group in the dropdown.

## Styling
Custom styling can be applied to the dropdown through 2 ways:
1. CSS className props (As seen in props table below)
2. JavaScript Objects passed to the `theme` prop ([Example](https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/CustomStyles.jsx))
3. Using the styled-components library ([Example](https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/StyledDropdown.jsx))

### Option 1
The suggested method is by using the theme prop as shown in the [Custom Styling Example](https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/CustomStyles.jsx).
The theme prop can have keys of the following form:
```typescript
type RdaTheme = {
  wrapper?: ThemeObjectOrFunction<DropdownWrapperProps>;
  selector?: ThemeObjectOrFunction<DropdownSelectorProps>;
  selectorSearch?: ThemeObjectOrFunction;
  selectedValue?: ThemeObjectOrFunction<SelectedValueProps>;
  placeholder?: ThemeObjectOrFunction<PlaceholderProps>;
  arrow?: ThemeObjectOrFunction<ArrowProps>;
  optionContainer?: ThemeObjectOrFunction<OptionContainerProps>;
  groupContainer?: ThemeObjectOrFunction;
  groupHeading?: ThemeObjectOrFunction;
  groupDivider?: ThemeObjectOrFunction;
  optionItem?: ThemeObjectOrFunction<OptionItemWrapProps>;
};
```
As is shown above, each key in the `theme` object can be either a plain object or function. If you need access to the current state of the dropdown then you should pass a function which will be called with the appropiate state.
The theme object you provide will be merged with the default theme.

### option 3
If you would prefer to use **option 3**, you can apply styles to the sub components of the dropdown using the method described [here](https://styled-components.com/docs/advanced#referring-to-other-components). The sub components can be imported via
```js
import { StyledDropdownComponents } from 'react-dropdown-aria';
```
Each component is a property on that import and has the same keys as those listed above using typical component casing. ([Example](https://github.com/jfangrad/react-aria-dropdown/blob/master/demo/src/Components/StyledDropdown.jsx))
## Dropdown Props
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `ariaDescribedBy` | string | null | ID of element that should be used to describe the dropdown |
| `ariaLabel` | string | null | Aria Label to be applied to the main dropdown button |
| `ariaLabelledBy` | string | null | ID of element that should be used as the label for the dropdown |
| `arrowRenderer` | function | undefined | Custom function to render the arrow for the dropdown |
| `centerText` | boolean | false | Whether main dropdown button text should be centered or not |
| `className` | string | undefined | CSS class to be applied to the drodown |
| `contentClassName` | string | undefined | CSS class to be applied to the dropdown option `ul` container |
| `defaultOpen` | boolean | false | Whether the dropdown should be open by default |
| `disabled` | boolean | false | Whether the dropdown should be disabled or not |
| `height` | number | null | Use to set the dropdown height manually |
| `hideArrow` | boolean | false | Controls whether dropdown component has the arrow or not |
| `id` | string | undefined | `id` to be passed to the main dropdown button |
| `maxContentHeight` | number | null | Controls the max height of the dropdown area that contains all options |
| `onChange` | function | undefined | Function called when the selected value changes |
| `openUp` | boolean | false | Whether dropdown should open up or not |
| `optionRenderer` | function | undefined | Custom function to render the options displayed in the dropdown |
| `options` | array | [] | Array of option objects |
| `optionClassName` | string | undefined | CSS class to be applied to all options in the dropdown |
| `pageKeyTraverseSize` | number | 10 | Number of options page up or page down will move the current focused by |
| `placeholder` | string | `Select...` | Placeholder value for dropdown |
| `value` | string | null | The value of the option that is currently selected (as set by `setSelected`). |
| `selectedValueClassName` | string | undefined | CSS class to be applied to main drodown button text |
| `searchable` | boolean | true | Whether or not the keyboard can be used to quickly navigate to an item through typing |
| `theme` | [RdaTheme](https://github.com/jfangrad/react-dropdown-aria/blob/master/packages/react-dropdown-aria/styles/index.ts#L12) | undefined | Use to change the style of the dropdown through js instead of css (see styling section) |
| `width` | number | null | Use to set the dropdown width manually |

# Developing
Clone the repo
```
git clone https://github.com/jfangrad/react-dropdown-aria.git
```

Install node modules
```
yarn install
```

Then in two seperate consoles start the library and demo
```
yarn lib:dev
yarn demo:start
```
