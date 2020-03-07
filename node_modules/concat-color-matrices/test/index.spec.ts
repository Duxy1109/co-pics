import { concatColorMatrices, concatTwoColorMatrices, Matrix } from '../src';

const normal: Matrix = [
  1, 0, 0, 0, 0,
  0, 1, 0, 0, 0,
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0
];

const invert: Matrix = [
  -1, 0, 0, 0, 1,
  0, -1, 0, 0, 1,
  0, 0, -1, 0, 1,
  0, 0, 0, 1, 0
];

const random = () => Array<number>(20).fill(0).map(Math.random) as Matrix;

test('concat two normal matrices to equal normal matrix', () => {
  expect(concatTwoColorMatrices(normal, normal)).toEqual(normal);
});

test('concat several normal matrices to equal normal matrix', () => {
  expect(concatColorMatrices([normal, normal, normal])).toEqual(normal);
});

test('concat x matrix with normal matrix to equal x matrix', () => {
  const x = random();

  expect(concatTwoColorMatrices(x, normal)).toEqual(x);
  expect(concatTwoColorMatrices(normal, x)).toEqual(x);
});

test('concat x matrix with several normal matrices to equal x matrix', () => {
  const x = random();

  expect(concatColorMatrices([x, normal, normal])).toEqual(x);
  expect(concatColorMatrices([normal, x, normal])).toEqual(x);
  expect(concatColorMatrices([normal, normal, x])).toEqual(x);
});

test('concat x matrix with invert matrix twice to equal x matrix', () => {
  const x = random();

  expect(concatColorMatrices([x, invert, invert])).toEqual(x);
});

test('concat x matrix with invert matrix to equal inverted x matrix', () => {
  const x = random();
  const expected = [
    -x[0], -x[1], -x[2], -x[3], 1 - x[4],
    -x[5], -x[6], -x[7], -x[8], 1 - x[9],
    -x[10], -x[11], -x[12], -x[13], 1 - x[14],
    x[15], x[16], x[17], x[18], x[19]
  ].map(i => i + 0);

  expect(concatTwoColorMatrices(x, invert)).toEqual(expected);
});
