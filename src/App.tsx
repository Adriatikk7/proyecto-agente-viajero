import { useState } from "react";
import "./App.css";

function App() {
  const [nodos, setNodos] = useState<number>(5);
  const [matriz, setMatriz] = useState<number[][]>([]);
  const [error, setError] = useState("");

  const generarMatrizAleatoria = (n: number): number[][] => {
    const nuevaMatriz: number[][] = Array.from(
      { length: n },
      () => Array(n).fill(0)
    );

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const pesoAleatorio = Math.floor(Math.random() * 20) + 1;

        nuevaMatriz[i][j] = pesoAleatorio;
        nuevaMatriz[j][i] = pesoAleatorio;
      }
    }

    return nuevaMatriz;
  };

  const handleAleatorio = () => {
    if (!Number.isInteger(nodos) || nodos < 5 || nodos > 10) {
      setError("La cantidad de nodos debe ser un número entre 5 y 10.");
      setMatriz([]);
      return;
    }

    setError("");
    setMatriz(generarMatrizAleatoria(nodos));
  };

  const handleManual = () => {
    alert("La configuración manual será implementada próximamente.");
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Problema del Agente Viajero</h1>
          <p>
            Construye un grafo ponderado y encuentra la ruta óptima mediante
            fuerza bruta.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="card configuration">
          <h2>Configuración del grafo</h2>

          <div className="configuration-grid">
            <div className="field">
              <label htmlFor="nodes">
                Cantidad de nodos
              </label>

              <input
                id="nodes"
                className="number-input"
                type="number"
                min={5}
                max={10}
                value={nodos}
                onChange={(e) =>
                  setNodos(Number(e.target.value))
                }
              />
            </div>

            <div className="field">
              <label>Método de generación</label>

              <div className="actions">
                <button
                  className="button button-primary"
                  onClick={handleAleatorio}
                >
                  Generar aleatorio
                </button>

                <button
                  className="button button-secondary"
                  onClick={handleManual}
                >
                  Ingreso manual
                </button>
              </div>
            </div>
          </div>

          {error && <div className="error">{error}</div>}
        </section>

        <div className="workspace">
          <section className="card">
            <h2>Matriz de costos</h2>

            {matriz.length > 0 ? (
              <div className="matrix-wrapper">
                <table className="matrix">
                  <tbody>
                    {matriz.map((fila, i) => (
                      <tr key={i}>
                        {fila.map((celda, j) => (
                          <td
                            key={j}
                            className={i === j ? "diagonal" : ""}
                          >
                            {celda}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-graph">
                <strong>Sin matriz generada</strong>
                <span>Configura el grafo para comenzar.</span>
              </div>
            )}
          </section>

          <section className="card">
            <h2>Visualización del grafo</h2>

            <div className="empty-graph">
              <strong>Grafo pendiente</strong>
              <span>
                Aquí mostraremos los nodos y aristas con React Flow.
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;