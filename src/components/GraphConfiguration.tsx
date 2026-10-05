interface GraphConfigurationProps {
  nodeCount: number;
  error: string;
  onNodeCountChange: (value: number) => void;
  onGenerateRandom: () => void;
  onGenerateManual: () => void;
}

export function GraphConfiguration({
  nodeCount,
  error,
  onNodeCountChange,
  onGenerateRandom,
  onGenerateManual,
}: GraphConfigurationProps) {
  return (
    <section className="card configuration">
      <h2>Configuración del grafo</h2>

      <div className="configuration-grid">
        <div className="field">
          <label htmlFor="nodes">Cantidad de nodos</label>

          <input
            id="nodes"
            className="number-input"
            type="number"
            min={5}
            max={10}
            value={nodeCount}
            onChange={(event) =>
              onNodeCountChange(Number(event.target.value))
            }
          />
        </div>

        <div className="field">
          <label>Método de generación</label>

          <div className="actions">
            <button
              className="button button-primary"
              onClick={onGenerateRandom}
            >
              Generar aleatorio
            </button>

            <button
              className="button button-secondary"
              onClick={onGenerateManual}
            >
              Ingreso manual
            </button>
          </div>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </section>
  );
}