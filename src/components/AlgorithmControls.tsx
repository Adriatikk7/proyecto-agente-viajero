import type { RouteEvaluation } from "../logic/tsp";
import { formatRoute } from "../logic/tsp";

interface AlgorithmControlsProps {
  evaluation: RouteEvaluation;
  currentStep: number;
  totalSteps: number;

  onPrevious: () => void;
  onNext: () => void;
}

export function AlgorithmControls({
  evaluation,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: AlgorithmControlsProps) {
  return (
    <section className="card algorithm-section">
      <div className="algorithm-header">
        <div>
          <span className="algorithm-label">
            Ejecución paso a paso
          </span>

          <h2>Evaluación de rutas</h2>

          <p>
            Observa cómo el algoritmo de fuerza bruta
            analiza cada recorrido posible.
          </p>
        </div>

        <div className="iteration-badge">
          Iteración {currentStep + 1} / {totalSteps}
        </div>
      </div>

      <div className="route-evaluation">
        <div className="route-information">
          <span className="route-label">
            Ruta actual
          </span>

          <strong className="route-value">
            {formatRoute(evaluation.route)}
          </strong>
        </div>

        <div className="cost-information">
          <span>Costo total</span>

          <strong>
            {evaluation.isHamiltonian
              ? evaluation.cost
              : "No válida"}
          </strong>
        </div>
      </div>

      <div className="algorithm-navigation">
        <button
          className="button button-secondary"
          onClick={onPrevious}
          disabled={currentStep === 0}
        >
          ← Anterior
        </button>

        <div className="step-progress">
          <div
            className="step-progress-bar"
            style={{
              width: `${
                ((currentStep + 1) / totalSteps) * 100
              }%`,
            }}
          />
        </div>

        <button
          className="button button-primary"
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
        >
          Siguiente →
        </button>
      </div>
    </section>
  );
}