import type { Edge, Node } from "@xyflow/react";

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

export function matrixToFlowElements(matrix: number[][]): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodeCount = matrix.length;

  const centerX = 300;
  const centerY = 220;
  const radius = 170;

  const nodes: Node[] = Array.from(
    { length: nodeCount },
    (_, index) => {
      const angle =
        (2 * Math.PI * index) / nodeCount - Math.PI / 2;

      return {
        id: String(index),
        position: {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        },
        data: {
          label: String.fromCharCode(65 + index),
        },
      };
    }
  );

  const edges: Edge[] = [];

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const weight = matrix[i][j];

      if (weight <= 0) continue;

      edges.push({
        id: `e-${i}-${j}`,
        source: String(i),
        target: String(j),
        label: String(weight),

        style: {
          stroke: "#9a6045",
          strokeWidth: 2,
        },

        labelStyle: {
          fill: "#5d4033",
          fontWeight: 700,
          fontSize: 13,
        },

        labelBgStyle: {
          fill: "#fffaf3",
          fillOpacity: 0.95,
        },

        labelBgPadding: [6, 4],
        labelBgBorderRadius: 6,
      });
    }
  }

  return { nodes, edges };
}