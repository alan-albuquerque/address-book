# Address Book

## Requirements

For development, you will only need Node.js (v14.xx.x) installed on your environment.

## Features
- MobX for state management;
- Lazy load and code splitting;
- Mobile first;
- Customizable webpack configuration;
- Prettify & eslint;

## Install

    $ git clone git@github.com:alan-albuquerque/address-book.git
    $ cd address-book
    $ npm install

## Start & watch

    $ npm start

## Test

    $ npm test

Or if you want the "watch" mode:

    $ npm run test:watch

## Build for production

    $ npm run build

After that, you can find all the static files for deployment in the `build` folder.

---

## Future
- Implement "windowing" with `react-virtualized` [working with the infinite scroll](https://github.com/bvaughn/react-virtualized/blob/master/docs/creatingAnInfiniteLoadingList.md) feature.
- Prefetch next users batch to optimize the user experience.

## Languages & main tools

### JavaScript

- [Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.
- [ESLint](https://eslint.org/) statically analyzes the code to quickly find problems.
- [React](https://reactjs.org/) is used for UI.
- [Jest](https://jestjs.io/) is a delightful JavaScript Testing Framework with a focus on simplicity.
- [axios](https://github.com/axios/axios) is a promise based HTTP client for the browser and node.js.
- [MobX](https://mobx.js.org/README.html) is used for state management.
- [TypeScript](https://www.typescriptlang.org/) is an open-source language which builds on JavaScript.
- [Prettify](https://github.com/helpers/handlebars-helper-prettify) is used for formatting (beautifying) HTML, JavaScript and CSS.


### React
- [react-router-dom](https://reactrouter.com/web/guides/quick-start) is a route manager for React.
- [react-lazyload](https://github.com/twobin/react-lazyload) is used to lazy load Components, Images or anything matters the performance.


### CSS

- [tailwindcss](https://tailwindcss.com/) is a utility-first CSS framework.
