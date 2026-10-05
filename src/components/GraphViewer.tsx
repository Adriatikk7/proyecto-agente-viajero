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

function isEdgeInRoute(
  source: string,
  target: string,
  route: number[],
): boolean {
  for (let i = 0; i < route.length - 1; i++) {
    const from = String(route[i]);
    const to = String(route[i + 1]);

    const matchesForward =
      source === from && target === to;

    const matchesBackward =
      source === to && target === from;

    if (matchesForward || matchesBackward) {
      return true;
    }
  }

  return false;
}

interface GraphViewerProps {
  matrix: number[][];
  activeRoute?: number[];
}

export function GraphViewer({
  matrix,
  activeRoute = [],
}: GraphViewerProps) {
  const initialElements = matrixToFlowElements(matrix);

  const [nodes, setNodes, onNodesChange] =
    useNodesState(initialElements.nodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialElements.edges);

  const displayedEdges = edges.map((edge) => {
    const active = isEdgeInRoute(
      edge.source,
      edge.target,
      activeRoute,
    );

    return {
      ...edge,

      style: {
        ...edge.style,

        stroke: active
          ? "#c58b32"
          : "#c7b3a3",

        strokeWidth: active ? 4 : 1.5,

        opacity:
          activeRoute.length > 0 && !active
            ? 0.35
            : 1,
      },

      labelStyle: {
        fill: active
          ? "#8b5b18"
          : "#79695d",

        fontWeight: active ? 800 : 600,
      },
    };
  });

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
            edges={displayedEdges}
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