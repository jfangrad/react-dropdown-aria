[![CircleCI](https://circleci.com/gh/jfangrad/react-aria-dropdown.svg?style=svg&circle-token=c8db79d70dddf853273a5964b860ec0bf53f5163)](https://circleci.com/gh/jfangrad/react-aria-dropdown/tree/master) [![npm](https://img.shields.io/npm/v/react-dropdown-aria.svg)](https://www.npmjs.com/package/react-dropdown-aria)
# react-dropdown-aria
Simple, lightweight, and accessible React dropdown component.

## Purpose
This component was created to be a light weight and fully accessible dropdown component for React. For a more feature heavy and powerful dropdown look to the [react-select](https://github.com/JedWatson/react-select) package. (This dropdown is inspired by react-select)

# Demo And Examples
For demo and examples checkout [https://jfangrad.github.io/react-dropdown-aria/](https://jfangrad.github.io/react-dropdown-aria/)

# Installation
Simply use npm or yarn to install the package.
```
// npm
$ npm install --save react-dropdown-aria
// Yarn
$ yarn add react-dropdown-aria
```

You can then include it as well as the styles in your project:
```js
import Dropdown from 'react-dropdown-aria';
import 'react-dropdown-aria/dist/react-dropdown-aria.min.scss';
```
(You only need to include the styles once in your project)

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

## Dropdown Props
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `ariaDescribedBy` | string | null | ID of element that should be used to describe the dropdown |
| `ariaLabel` | string | null | Aria Label to be applied to the main dropdown button |
| `ariaLabelledBy` | string | null | ID of element that should be used as the label for the dropdown |
| `arrowRenderer` | function | undefined | Custom function to render the arrow for the dropdown |
| `buttonClassName` | string | undefined | CSS class to be applied to main drodown button |
| `centerText` | boolean | false | Whether main dropdown button text should be centered or not |
| `contentClassName` | string | undefined | CSS class to be applied to the dropdown option `ul` container |
| `disabled` | boolean | false | Whether the dropdown should be disabled or not |
| `height` | number | null | Use to set the dropdown height manually |
| `hideArrow` | boolean | false | Controls whether dropdown component has the arrow or not |
| `id` | string | undefined | `id` to be passed to the main dropdown button |
| `maxContentHeight` | number | null | Controls the max height of the dropdown area that contains all options |
| `openUp` | boolean | false | Whether dropdown should open up or not |
| `optionRenderer` | function | undefined | Custom function to render the options displayed in the dropdown |
| `options` | array | [] | Array of option objects |
| `optionClassName` | string | undefined | CSS class to be applied to all options in the dropdown |
| `pageKeyTraverseSize` | number | 10 | Number of options page up or page down will move the current focused by |
| `placeholder` | string | `Select...` | Placeholder value for dropdown |
| `selectedOption` | string | null | The value of the option that is currently selected (as set by `setSelected`). If not provided, selected value will be tracked internally (not recomended) |
| `selectedOptionClassName` | string | undefined | CSS class to be applied to the selected option in the dropdown |
| `selectedValueClassName` | string | undefined | CSS class to be applied to main drodown button text |
| `searchable` | boolean | true | Whether or not the keyboard can be used to quickly navigate to an item through typing |
| `setSelected` | function | undefined | Function used to update the state of the selected value |
| `width` | number | null | Use to set the dropdown width manually |


## Developing
Clone the repo
```
git clone https://github.com/jfangrad/react-dropdown-aria.git
```

Install node modules and start in dev mode
```
npm install
npm run dev
```
