export function ProjectOverview() {
  return (
    <section className="project-overview">
      <div className="overview-item">
        <span className="overview-label">Problema</span>

        <h2>Problema del Agente Viajero</h2>

        <p>
          Encontrar el recorrido de menor costo que visite todos los nodos
          exactamente una vez y regrese al punto de partida.
        </p>
      </div>

      <div className="overview-divider" />

      <div className="overview-item">
        <span className="overview-label">Objetivo</span>

        <h2>Determinar la ruta óptima</h2>

        <p>
          Generar y evaluar los ciclos hamiltonianos mediante fuerza bruta,
          comparando sus costos para identificar el recorrido mínimo.
        </p>
      </div>

      <div className="overview-divider" />

      <div className="overview-item">
        <span className="overview-label">Método</span>

        <h2>Fuerza bruta</h2>

        <p>
          El algoritmo analiza sistemáticamente las rutas posibles y permite
          observar paso a paso cómo se obtiene la solución óptima.
        </p>
      </div>
    </section>
  );
}