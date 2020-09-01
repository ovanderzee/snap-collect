[![Build Status](https://travis-ci.org/ovanderzee/my-lib.svg?branch=master)](https://travis-ci.org/ovanderzee/snap-collect)
[![Coverage Status](https://coveralls.io/repos/github/ovanderzee/my-lib/badge.svg?branch=master)](https://coveralls.io/github/ovanderzee/snap-collect?branch=master)

# snap-collect

Keep subsets of data collections without needing to modify the data itself.
In this way you do not have set contextual properties (like: selected, isCurrent) on your object
and risk these properties end up in the database.
None of the collection-methods change the data or the input: the module has no side-effects

## Install and usage

Install the package as npm package. Provided are
a umd-formatted file in the dist folder to require or to just load

```html
<script src="../../node_modules/dist/snapCollect.js"></script>
<script src="https://unpkg.com/snap-collect@latest"></script>
```

and an es-module in the module folder to import the separate functions
or to import all

```js
import { snapCollect } from 'snap-collect'
```

then just call the function
with the unique identifier of the objects
to get a ready-to-use object

```js
let myCollection = snapCollect('id')
```

## Demo

[see demo folder](./demo/demo.html)
