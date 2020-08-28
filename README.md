[![Build Status](https://travis-ci.org/ovanderzee/my-lib.svg?branch=master)](https://travis-ci.org/ovanderzee/contextual-collection)
[![Coverage Status](https://coveralls.io/repos/github/ovanderzee/my-lib/badge.svg?branch=master)](https://coveralls.io/github/ovanderzee/contextual-collection?branch=master)

# contextual-collection

Keep subsets of data collections without needing to modify the data itself

## Install and usage

Install the package as npm package. Provided are
a umd-formatted file in the dist folder to require or to just load

```html
<script src="../../node_modules/dist/contextualCollection.js"></script>
<script src="https://unpkg.com/contextual-collection@latest"></script>
```

and an es-module in the module folder to import the separate functions
or to import all

```js
import { contextualCollection } from 'contextual-collection'
```

then just call the function
with the unique identifier of the objects
to get a ready-to-use object

```js
let myCollection = contextualCollection('id')
```

## Demo

[see demo folder](./demo/demo.html)
