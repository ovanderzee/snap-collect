[![Build Status](https://travis-ci.org/ovanderzee/snap-collect.svg?branch=master)](https://travis-ci.org/ovanderzee/snap-collect)
[![Coverage Status](https://coveralls.io/repos/github/ovanderzee/snap-collect/badge.svg?branch=master)](https://coveralls.io/github/ovanderzee/snap-collect?branch=master)

# snap-collect

Keep subsets of data collections without needing to modify the data itself.
In this way you do not have set contextual properties (like: selected, isCurrent) on your object
and risk these properties end up in the database.

The keys for internal reference are converted to strings and no falsy keys are stored.
When making subsets, values are JSON.stringified before comparison.
All is aimed at working with simple objects literals.

None of the methods change the data or the input: the module has no side effects

## Install

Install the package as npm package. Provided are
a umd-formatted file in the dist folder to require or to just load

```html
<script src="../../node_modules/dist/snapCollect.js"></script>
<script src="https://unpkg.com/snap-collect@latest"></script>
```

and an es-module in the module folder to import

```js
import { snapCollect } from 'snap-collect'
```

## Usage

Just call the function
with the unique identifier of the objects
to get a ready-to-use object

```js
const myCollection = snapCollect('id')
```

add objects to the snapCollection
and use these in your script

```js
record1 = {id: 7324324658, a: 'a'}
records = [{id: 4535436507, a: 'b'}, {id: 5934526798, a: 'c'}]

// core methods
myCollection.delete(7324365307)
myRecord = myCollection.get(5665523009)
myBoolean = myCollection.has(4392432645)
myCount = myCollection.length
myCollection.set(7324324658, record1)

// maintenance methods
myRecords = myCollection.add(record1, record2, ...records)
myCollection.clear()
myRecords = myCollection.cross(records)
myRecords = myCollection.drop({property: 'redundant', feature: 'useless'})
myRecords = myCollection.hold({property: 'essential', feature: 'needed'})
myRecords = myCollection.toggle(recordX)

// yielding methods (not changing the collection)
myKeysAndValues = myCollection.entries()
myIdentifiers = myCollection.keys()
myRecords = myCollection.values()
mySortedRecords = myCollection.sort('major', 'minor')
mySubset = myCollection.where({property: 'essential', feature: 'useless'})
myUniqueRecords = myCollection.combination(otherRecords)
myPagedRecords = myCollection.intersection(pagedRecords)
```

and more:
[see API description](./API.md)
