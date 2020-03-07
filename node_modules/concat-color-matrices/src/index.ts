import invariant from 'invariant';

// based on android sdk sources: https://goo.gl/MMDopQ

export type Matrix = [
  number, number, number, number, number, number, number, number, number, number,
  number, number, number, number, number, number, number, number, number, number
];

export const concatTwoColorMatrices = (matB: Matrix, matA: Matrix) => {
  invariant(
    Array.isArray(matB) && matB.length === 20,
    `Color matrix matB should be an array with 20 elements.`
  );

  invariant(
    Array.isArray(matA) && matA.length === 20,
    `Color matrix matA should be an array with 20 elements.`
  );

  const tmp = Array(20);

  let index = 0;
  for (let j = 0; j < 20; j += 5) {
    for (let i = 0; i < 4; i++) {
      tmp[index++] = matA[j + 0] * matB[i + 0] + matA[j + 1] * matB[i + 5] +
        matA[j + 2] * matB[i + 10] + matA[j + 3] * matB[i + 15];
    }
    tmp[index++] = matA[j + 0] * matB[4] + matA[j + 1] * matB[9] +
      matA[j + 2] * matB[14] + matA[j + 3] * matB[19] + matA[j + 4];
  }

  return tmp as Matrix;
};

export const concatColorMatrices = (matrices: ReadonlyArray<Matrix>) => {
  invariant(
    Array.isArray(matrices) && matrices.length > 0,
    `Matrices should be an array of non zero length.`
  );

  return matrices.reduce(concatTwoColorMatrices);
};
