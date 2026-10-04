import { useState } from "react";
import { ProjectOverview } from "./components/ProjectOverview";
import { GraphConfiguration } from "./components/GraphConfiguration";
import { CostMatrix } from "./components/CostMatrix";
import { GraphViewer } from "./components/GraphViewer";

import {
  generateRandomCostMatrix,
  isValidNodeCount,
} from "./logic/graph";
import { solveTSP, type TSPResult } from "./logic/tsp";

import "./App.css";

function App() {
  const [nodeCount, setNodeCount] = useState(5);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [error, setError] = useState("");
  const [tspResult, setTspResult] =
  useState<TSPResult | null>(null);

  const handleGenerateRandom = () => {
  if (!isValidNodeCount(nodeCount)) {
    setError("La cantidad de nodos debe estar entre 5 y 10.");
    setMatrix([]);
    setTspResult(null);
    return;
  }

  setError("");

  const newMatrix = generateRandomCostMatrix(nodeCount);

  setMatrix(newMatrix);
  setTspResult(null);
};

  const handleSolveTSP = () => {
  if (matrix.length === 0) {
    setError("Primero debes generar un grafo.");
    return;
  }

  const result = solveTSP(matrix);

  setTspResult(result);
};

  const handleGenerateManual = () => {
    alert("La configuración manual será implementada próximamente.");
  };

  return (
  <div className="app">
    <header className="app-header">
      <div className="header-content">
        <h1>Problema del Agente Viajero</h1>
        <p>
          Explora rutas, ciclos hamiltonianos y encuentra el recorrido óptimo.
        </p>
      </div>
    </header>

    <main className="container">
      <ProjectOverview />

      <GraphConfiguration
        nodeCount={nodeCount}
        error={error}
        onNodeCountChange={setNodeCount}
        onGenerateRandom={handleGenerateRandom}
        onGenerateManual={handleGenerateManual}
      />

      <div className="workspace">
        <CostMatrix matrix={matrix} />
        <GraphViewer matrix={matrix} />
      </div>
      {matrix.length > 0 && (
  <section className="card tsp-section">
    <div>
      <h2>Algoritmo de fuerza bruta</h2>
      <p className="tsp-description">
        Evalúa las rutas posibles para encontrar el ciclo
        hamiltoniano de menor costo.
      </p>
    </div>

    <button
      className="button button-primary"
      onClick={handleSolveTSP}
    >
      Resolver TSP
    </button>

    {tspResult && (
      <div className="tsp-result">
        <div>
          <span>Rutas evaluadas</span>
          <strong>{tspResult.evaluations.length}</strong>
        </div>

        <div>
          <span>Ciclos válidos</span>
          <strong>{tspResult.validCycles.length}</strong>
        </div>

        <div>
          <span>Mejor costo</span>
          <strong>
            {tspResult.bestCycle?.cost ?? "Sin solución"}
          </strong>
        </div>
      </div>
    )}
  </section>
)}
    </main>
  </div>
);
}

export default App;