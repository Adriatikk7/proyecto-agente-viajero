interface CostMatrixProps {
  matrix: number[][];
}

export function CostMatrix({ matrix }: CostMatrixProps) {
  return (
    <section className="card">
      <h2>Matriz de costos</h2>

      {matrix.length > 0 ? (
        <div className="matrix-wrapper">
          <table className="matrix">
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((value, j) => (
                    <td
                      key={j}
                      className={i === j ? "diagonal" : ""}
                    >
                      {value}
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
  );
}