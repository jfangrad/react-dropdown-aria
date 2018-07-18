[![npm](https://img.shields.io/npm/v/react-aria-dropdown.svg)](https://www.npmjs.com/package/react-aria-dropdown) ![CircleCI](https://circleci.com/gh/jfangrad/react-aria-dropdown.svg?style=svg&circle-token=c8db79d70dddf853273a5964b860ec0bf53f5163)
# react-aria-dropdown
Simple, lightweight, and accessible React dropdown component.

## Purpose
This component was created to be a light weight and fully accessible dropdown component for React. For a more feature heavy dropdown look to [react-select](https://github.com/JedWatson/react-select)

# Demo And Examples
For demo and examples checkout [https://jfangrad.github.io/react-aria-dropdown/](https://jfangrad.github.io/react-aria-dropdown/)

# Installation
Simply use npm or yarn to install the package.
```
// npm
$ npm install --save react-aria-dropdown
// Yarn
$ yarn add react-aria-dropdown
```

You can then include it as well as the styles in your project:
```js
import Dropdown from 'react-aria-dropdown';
import 'react-aria-dropdown/dist/react-aria-dropdown.min.scss';
```

# Usage
Options should be provided to the Dropdown as an array of objects.
### Example:
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
| key | Type | Required? | Default | Description |
| `ariaLabel` | string | no | null | Aria Label to be applied to the option |
| `className` | string | no | null | CSS class to be applied to the option |
| `title` | string | no | null | HTML title to be used for the option |
| `value` | string | yes | null | The value to be displayed in the dropdown |

## Dropdown Props
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `ariaDescribedBy` | string | null | ID of element that should be used to describe the dropdown |
| `ariaLabel` | string | null | Aria Label to be applied to the main dropdown button |
| `ariaLabelledBy` | string | null | ID of element that should be used as the label for the dropdown |
| `className` | string | undefined | CSS class to be applied to main drodown button |
| `centerText` | boolean | false | Whether main dropdown button text should be centered or not |
| `disabled` | boolean | false | Whether the dropdown should be disabled or not |
| `height` | number | null | Use to set the dropdown height manually |
| `hideArrow` | boolean | false | Controls whether dropdown component has the arrow or not |
| `id` | string | undefined | `id` to be passed to the main dropdown button |
| `maxContentHeight` | number | null | Controls the max height of the dropdown area that contains all options |
| `options` | Array | undefined | Array of option objects |
| `placeholder` | string | `Select...` | Placeholder value for dropdown |
| `setSelected` | function | undefined | Function used to update the state of the selected value |
| `width` | number | null | Use to set the dropdown width manually |


## Developing
```
npm install
npm start
```
