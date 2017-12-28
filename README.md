Sr Technical assessment
========

*Option 3: Take Home Code Exercise*

This would be an exercise in which you do on your own time and push to a public repository on GitHub in a language of your choice
The following is a good guideline on what we might look for.

http://willkle.in/posts/submitting-code-samples.html

*Exercise 3*

Write some code that will evaluate a poker hand and determine its
rank.
 
Example:  
Hand: Ah As 10c 7d 6s (Pair of Aces)  
Hand: Kh Kc 3s 3h 2d (2 Pair)  
Hand: Kh Qh 6h 2h 9h (Flush)  


## Overview

The application inputs a set of cards and outputs the name of the highest poker hand. It does this by counting cards of each value and lists of cards by suit. The resulting data features are run through a series of "detection" checks to determine if a poker hand. The hand with the highest value is then run through a formatting function to display hand appropriately to the user

The project could reasonably be extended to include comparisons to evaluate which of two hands is of higher value. Additinally, the output could be made to be more specific, for example, outputting the suit of a flush or card value of a pair.


## Quickstart

open bash and install the dependencides and transpile the typescript to javascript

```bash
yarn install # OR npm install
yarn build # OR npm build
```

To see the application output, use npm to run the default script with the target value as a parameter

```bash
hand="Ah As 10c 7d 6s"
yarn start "$hand" # OR npm start $target_value

Pair of Aces

hand="Kh Qh 6h 2h 9h"
yarn start "$hand"

Flush
```

There are a few unit tests available to validate the application code is working correctly. 

```bash
yarn test # OR npm run test

$ jest
 PASS  __tests__/detect.test.ts
 PASS  __tests__/suit.test.ts

Test Suites: 2 passed, 2 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        5.949s
```

Documentation can be auto-generated with [typedoc](http://typedoc.org/) and viewed in a web browser

```bash
yarn docs # or npm run docs
open ./doc/index.html
```