import { useEffect } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { matrixToFlowElements } from "../logic/graph";

interface GraphViewerProps {
  matrix: number[][];
}

export function GraphViewer({ matrix }: GraphViewerProps) {
  const initialElements = matrixToFlowElements(matrix);

  const [nodes, setNodes, onNodesChange] =
    useNodesState(initialElements.nodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialElements.edges);

  useEffect(() => {
    const elements = matrixToFlowElements(matrix);

    setNodes(elements.nodes);
    setEdges(elements.edges);
  }, [matrix, setNodes, setEdges]);

  return (
    <section className="card graph-card">
      <div className="graph-header">
        <div>
          <h2>Visualización del grafo</h2>

          {matrix.length > 0 && (
            <span className="graph-info">
              {nodes.length} nodos · {edges.length} aristas
            </span>
          )}
        </div>
      </div>

      {matrix.length === 0 ? (
        <div className="empty-graph">
          <strong>Grafo pendiente</strong>
          <span>
            Genera una matriz para visualizar el grafo.
          </span>
        </div>
      ) : (
        <div className="graph-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            fitViewOptions={{
              padding: 0.2,
            }}
            minZoom={0.5}
            maxZoom={1.8}
            nodesConnectable={false}
          >
            <Background
              gap={22}
              size={1}
              color="#ddcdbd"
            />

            <Controls />

          </ReactFlow>
        </div>
      )}
    </section>
  );
}