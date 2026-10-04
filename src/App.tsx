import { useState } from "react";

import { GraphConfiguration } from "./components/GraphConfiguration";
import { CostMatrix } from "./components/CostMatrix";
import { GraphViewer } from "./components/GraphViewer";

import {
  generateRandomCostMatrix,
  isValidNodeCount,
} from "./logic/graph";

import "./App.css";

function App() {
  const [nodeCount, setNodeCount] = useState(5);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [error, setError] = useState("");

  const handleGenerateRandom = () => {
    if (!isValidNodeCount(nodeCount)) {
      setError("La cantidad de nodos debe estar entre 5 y 10.");
      setMatrix([]);
      return;
    }

    setError("");
    setMatrix(generateRandomCostMatrix(nodeCount));
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
            Construye un grafo ponderado y encuentra la ruta óptima
            mediante fuerza bruta.
          </p>
        </div>
      </header>

      <main className="container">
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
      </main>
    </div>
  );
}

export default App;