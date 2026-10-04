import { useState } from 'react';
import './App.css';

function App() {
  // "Estados" en React: Variables que cuando cambian, actualizan la pantalla automáticamente
  const [nodos, setNodos] = useState<number>(5);
  const [matriz, setMatriz] = useState<number[][]>([]);
  const [error, setError] = useState<string>('');

  // Lógica matemática intacta: Generar matriz simétrica y diagonal en 0
  const generarMatrizAleatoria = (n: number) => {
    let nuevaMatriz: number[][] = [];
    
    for (let i = 0; i < n; i++) {
      nuevaMatriz[i] = [];
      for (let j = 0; j < n; j++) {
        nuevaMatriz[i]![j] = 0;
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) { 
        let pesoAleatorio = Math.floor(Math.random() * 20) + 1; 
        nuevaMatriz[i]![j] = pesoAleatorio;
        nuevaMatriz[j]![i] = pesoAleatorio;
      }
    }
    return nuevaMatriz;
  };

  // Evento al presionar el botón "Aleatorio"
  const handleAleatorio = () => {
    if (isNaN(nodos) || nodos < 5 || nodos > 10) {
      setError("Error: El número de nodos debe estar estrictamente entre 5 y 10.");
      setMatriz([]); // Borramos la tabla si hay error
      return;
    }
    setError('');
    const matrizGenerada = generarMatrizAleatoria(nodos);
    setMatriz(matrizGenerada);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Configuración del Grafo (Problema del Agente Viajero)</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Cantidad de nodos (n entre 5 y 10): </label>
        <input 
          type="number" 
          value={nodos} 
          // Al escribir, actualizamos la variable "nodos"
          onChange={(e) => setNodos(parseInt(e.target.value))} 
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p>¿Cómo deseas generar los costos (pesos) de las rutas?</p>
        <button onClick={handleAleatorio} style={{ marginRight: '10px' }}>
          Generar Aleatorio
        </button>
        <button onClick={() => alert("Interfaz manual en construcción...")}>
          Generar Manual
        </button>
      </div>

      {/* Si hay un error, lo mostramos en rojo */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Si la matriz tiene datos, la dibujamos iterando sobre los arreglos */}
      {matriz.length > 0 && (
        <div>
          <h3>Matriz de Adyacencia Generada ({nodos}x{nodos})</h3>
          <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
            <tbody>
              {matriz.map((fila, i) => (
                <tr key={i}>
                  {fila.map((celda, j) => (
                    <td key={j} style={{ backgroundColor: celda === 0 ? '#eee' : 'white' }}>
                      {celda === 0 ? <strong>0</strong> : celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;