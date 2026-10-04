export interface GraphNode {
  id: string;
  label: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export type CostMatrix = number[][];