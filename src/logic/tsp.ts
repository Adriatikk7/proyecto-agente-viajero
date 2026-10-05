export type RouteEvaluation = {
  route: number[];
  cost: number;
  isHamiltonian: boolean;
};

export type TSPResult = {
  evaluations: RouteEvaluation[];
  validCycles: RouteEvaluation[];
  bestCycle: RouteEvaluation | null;
};

function permutations<T>(items: T[]): T[][] {
  if (items.length === 0) {
    return [[]];
  }

  const result: T[][] = [];

  for (let i = 0; i < items.length; i++) {
    const current = items[i];

    const remaining = [
      ...items.slice(0, i),
      ...items.slice(i + 1),
    ];

    const remainingPermutations = permutations(remaining);

    for (const permutation of remainingPermutations) {
      result.push([current, ...permutation]);
    }
  }

  return result;
}

/**
 * Calcula el costo de una ruta.
 *
 * Si alguna de las aristas necesarias no existe,
 * devuelve Infinity.
 */
export function calculateRouteCost(
  route: number[],
  matrix: number[][],
): number {
  let totalCost = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const from = route[i];
    const to = route[i + 1];

    const weight = matrix[from]?.[to];

    if (
      weight === undefined ||
      weight <= 0
    ) {
      return Infinity;
    }

    totalCost += weight;
  }

  return totalCost;
}

/**
 * Comprueba si una ruta cerrada constituye
 * un ciclo hamiltoniano válido.
 */
export function isHamiltonianCycle(
  route: number[],
  matrix: number[][],
): boolean {
  const nodeCount = matrix.length;

  // Debe contener todos los nodos + regreso al inicial.
  if (route.length !== nodeCount + 1) {
    return false;
  }

  // Inicio y final deben ser iguales.
  if (route[0] !== route[route.length - 1]) {
    return false;
  }

  // Excluimos el último porque es la repetición del origen.
  const visitedNodes = route.slice(0, -1);

  // Cada nodo debe aparecer exactamente una vez.
  if (new Set(visitedNodes).size !== nodeCount) {
    return false;
  }

  // Todas las conexiones de la ruta deben existir.
  return calculateRouteCost(route, matrix) !== Infinity;
}

/**
 * Resuelve el Problema del Agente Viajero
 * mediante fuerza bruta.
 */
export function solveTSP(
  matrix: number[][],
  startNode = 0,
): TSPResult {
  const nodeCount = matrix.length;

  if (nodeCount === 0) {
    return {
      evaluations: [],
      validCycles: [],
      bestCycle: null,
    };
  }

  const remainingNodes = Array.from(
    { length: nodeCount },
    (_, index) => index,
  ).filter((node) => node !== startNode);

  const possibleOrders = permutations(remainingNodes);

  const evaluations: RouteEvaluation[] = [];

  let bestCycle: RouteEvaluation | null = null;

  for (const order of possibleOrders) {
    // Ejemplo:
    // startNode = A
    // order = B,C,D,E
    //
    // A → B → C → D → E → A

    const route = [
      startNode,
      ...order,
      startNode,
    ];

    const cost = calculateRouteCost(route, matrix);

    const evaluation: RouteEvaluation = {
      route,
      cost,
      isHamiltonian: cost !== Infinity,
    };

    evaluations.push(evaluation);

    if (
      evaluation.isHamiltonian &&
      (
        bestCycle === null ||
        evaluation.cost < bestCycle.cost
      )
    ) {
      bestCycle = evaluation;
    }
  }

  const validCycles = evaluations.filter(
    (evaluation) => evaluation.isHamiltonian,
  );

  return {
    evaluations,
    validCycles,
    bestCycle,
  };
}

export function nodeName(index: number): string {
  return String.fromCharCode(65 + index);
}

export function formatRoute(route: number[]): string {
  return route
    .map((node) => nodeName(node))
    .join(" → ");
}