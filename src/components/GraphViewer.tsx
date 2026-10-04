interface GraphViewerProps {
  matrix: number[][];
}

export function GraphViewer({ matrix }: GraphViewerProps) {
  return (
    <section className="card">
      <h2>Visualización del grafo</h2>

      {matrix.length === 0 ? (
        <div className="empty-graph">
          <strong>Grafo pendiente</strong>
          <span>Genera una matriz para visualizar el grafo.</span>
        </div>
      ) : (
        <div className="empty-graph">
          <strong>Grafo generado</strong>
          <span>
            Aquí renderizaremos los nodos y aristas con React Flow.
          </span>
        </div>
      )}
    </section>
  );
}