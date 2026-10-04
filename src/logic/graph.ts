export function generateRandomCostMatrix(n: number): number[][] {
  const matrix = Array.from(
    { length: n },
    () => Array<number>(n).fill(0)
  );

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const weight = Math.floor(Math.random() * 20) + 1;

      matrix[i][j] = weight;
      matrix[j][i] = weight;
    }
  }

  return matrix;
}

export function isValidNodeCount(n: number): boolean {
  return Number.isInteger(n) && n >= 5 && n <= 10;
}