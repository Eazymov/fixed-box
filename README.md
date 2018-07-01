# FixedBox

[![npm](https://img.shields.io/npm/v/fixed-box.svg)](https://www.npmjs.com/package/fixed-box)
[![License](https://img.shields.io/npm/l/fixed-box.svg)](https://www.npmjs.com/package/fixed-box)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Eazymov/fixed-box/pulls)

> Fixed box component for React | [github.com/Eazymov/fixed-box](https://github.com/Eazymov/fixed-box#readme)

- [Installation](#installation)
- [Props](#props)
- [Questions](#questions)
- [License](#license)

## Installation

### Direct `<script />` include

The library will be exposed as a global `FixedBox` variable

```html
<script src="https://cdn.jsdelivr.net/npm/fixed-box@latest"></script>
```

**or** via unpkg

```html
<script src="https://unpkg.com/fixed-box@latest"></script>
```

### NPM

```bash
npm install fixed-box --save
```

### Yarn

```bash
yarn add fixed-box
```

## Props

### className

FixedBox container element class name
type: string
required: none

### minTopPos

Minimal top position for the child element
type: number
required: none

### minLeftPos

Minimal left position for the child element
type: number
required: none

### children

React node or function that returns react node and takes `isFixed` boolean value as argument
type: `React$Node | (isFixed: boolean) => React$Node`
required: none

## Questions

If you have any troubles, questions or proposals you can create the [issue](https://github.com/Eazymov/fixed-box/issues)  
Good pull requests are also appreciated :)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 - present, Eduard Troshin