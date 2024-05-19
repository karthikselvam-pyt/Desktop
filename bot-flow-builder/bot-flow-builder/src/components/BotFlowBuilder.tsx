import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { useToast } from "@chakra-ui/react";

const initialNodes: Node[] = [
  { id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "black" },
  },
];

const FlowBuilder = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeCreated, setNodeCreated] = useState<boolean>(false);

  const toast = useToast();

  const addTextNode = useCallback(() => {
    setNodes((nds) => [
      ...nds,
      {
        id: (nds.length + 1).toString(),
        type: "textNode",
        position: { x: Math.random() * 250, y: Math.random() * 250 },
        data: { label: "New Text Node" },
      },
    ]);
    setNodeCreated(true);
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) =>
      addEdge({ ...params, animated: true, style: { stroke: "black" } }, eds)
    );
  }, []);

  const onNodeHandler = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const updateTextChange = useCallback((e: string, node: Node) => {
    setNodes((nds) =>
      nds.map((nde) =>
        nde.id === node.id ? { ...node, data: { ...node.data, label: e } } : nde
      )
    );
  }, []);

  const validateNodes = useCallback(() => {
    const connectedNodeIds = new Set();

    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    const unconnectedNodes = nodes.filter(
      (node) => !connectedNodeIds.has(node.id)
    );
    return unconnectedNodes.length >= 1;
  }, [edges, nodes]);

  const handleSubmit = useCallback(() => {
    const validation = validateNodes();
    if (validation) {
      toast({
        status: "error",
        isClosable: true,
        title: "Cannot save Flow",
        description: "it does have unconnected nodes.please check once",
        position: "top",
      });
    } else {
      toast({
        status: "success",
        isClosable: true,
        title: "Congrats Flow saved. But,.",
        description: "I didnt stored this Data",
        position: "top",
      });
    }
  }, [toast, validateNodes]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <NodesPanel
        addTextNode={addTextNode}
        handleSubmit={handleSubmit}
        isNotValid={nodeCreated}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeHandler}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={12} color="blue" />
        {selectedNode && (
          <SettingsPanel
            selectedNode={selectedNode}
            updateTextChange={updateTextChange}
          />
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
