# concat-color-matrices
[![npm version](https://badge.fury.io/js/concat-color-matrices.svg?t=1495378566925)](https://badge.fury.io/js/concat-color-matrices)
[![CircleCI](https://circleci.com/gh/iyegoroff/concat-color-matrices.svg?style=svg)](https://circleci.com/gh/iyegoroff/concat-color-matrices)
[![codecov](https://codecov.io/gh/iyegoroff/concat-color-matrices/branch/master/graph/badge.svg?t=1520230083925)](https://codecov.io/gh/iyegoroff/concat-color-matrices)
[![Dependency Status](https://david-dm.org/iyegoroff/concat-color-matrices.svg?t=1495378566925)](https://david-dm.org/iyegoroff/concat-color-matrices)
[![devDependencies Status](https://david-dm.org/iyegoroff/concat-color-matrices/dev-status.svg)](https://david-dm.org/iyegoroff/concat-color-matrices?type=dev)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg?t=1495378566925)](src/index.d.ts)
[![npm](https://img.shields.io/npm/l/express.svg?t=1495378566925)](https://www.npmjs.com/package/concat-color-matrices)

Functions for combining color matrices

## Getting started

`$ npm install concat-color-matrices --save`

## Reference

### Functions

```typescript
concatColorMatrices(matrices: Matrix[]): Matrix
concatTwoColorMatrices(matB: Matrix, matA: Matrix): Matrix
```

### Matrix type

- A 4x5 matrix for color transformations represented by array -
  consult [Android docs](https://developer.android.com/reference/android/graphics/ColorMatrix)
	for more specific info about it's format

## Credits

- `concatTwoColorMatrices` function is based on Android SDK [sources](https://goo.gl/MMDopQ)
