# dgsw-meal
Daegu Software High School meal Parsing Library for node.js

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
| parameter | type   | required |
|:---------:|:------ | -------- |
| year      | number | true     |
| month     | number | true     |

- example
```js
const dgswMeal = require('dgsw-meal');

const meal = dgswMeal.getMeal(2020, 5);
```

## Licence
MIT
