# dgsw-meal
Daegu Software High School meal Parsing Library for node.js

![](https://github.com/wlsdud2194/dgsw-meal/workflows/build/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/dgsw-meal.svg)](https://badge.fury.io/js/dgsw-meal)

## Table of Contents
- Installation
- Usage Example
- Licence 

## Installation
you can install to use npm or yarn
```
npm install dgsw-meal
yarn install dgsw-meal
```

## Usage Example

### `getMeal(year, month)`

| parameter | type   | required | description                       |
|:---------:|:------ | :------- | :-------------------------------- |
| year      | number | true     | the year to search                |
| month     | number | true     | the month to search from 1 to 12  |

- example
```js
const dgswMeal = require('dgsw-meal'); // es5
import dgswMeal from 'dgsw-meal'; // es6

dgswMeal.getMeal(2020, 5).then(console.log);
/** console
  {
    "year": number,
    "month": number,
    "currentDay": number,
    "meal": {
      "1": string, // 1st menu
      "2": string,
      ...
      "31": "[조식]...[중식]...[석식]...",
    },
    "today": string,
  }
*/
```

## Licence
![MIT](https://github.com/wlsdud2194/dgsw-meal/blob/master/LICENSE)
