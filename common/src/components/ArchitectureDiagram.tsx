import { Aws, Azure, CanaryCheckerWhite, ConfigDb, Flux, Gcp, Helm, K8S, Mcp, Playbook, Terraform, Prometheus, Datadog, Argo, ConfigDbWhite, GoogleCloud, AwsCloudwatch, Opensearch, Github, AzureDevops, Gitlab, Dynatrace, Kustomize, Postgres, SqlServer } from '@flanksource/icons/mi';
import { PiBrain } from 'react-icons/pi';
import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ReactFlow, Node, Edge, NodeProps, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Arrow } from './Shapes';

// Helper Components
function CacheComponent({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width="160" height="25" rx="3" fill="#fbbf24" />
      <text x={x + 80} y={y + 17} textAnchor="middle" fontSize="11" fill="#78350f">
        {label}
      </text>
    </g>
  );
}

function MetricItem({ x, y, label, value }: { x: number; y: number; label: string; value: string }) {
  return (
    <g>
      <text x={x} y={y} className="arch-small-label">
        {label}
      </text>
      <text x={x + 130} y={y} className="arch-small-label" fill="#059669">
        {value}
      </text>
    </g>
  );
}

// Connector Component - Draws an arrow between two HTML elements
interface ConnectorProps {
  svgRef: React.RefObject<SVGSVGElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  fromPosition?: 'top' | 'bottom' | 'center';
  toPosition?: 'top' | 'bottom' | 'center';
}

function Connector({ svgRef, fromRef, toRef, fromPosition = 'bottom', toPosition = 'top' }: ConnectorProps) {
  const [points, setPoints] = useState<{ from: { x: number; y: number }; to: { x: number; y: number } } | null>(null);

  useEffect(() => {
    console.log("laying out", svgRef.current, fromRef, toRef)
    if (!svgRef.current || !fromRef.current || !toRef.current) return;

    const svg = svgRef.current;

    const toSvgPoint = (el: HTMLElement, position: 'top' | 'bottom' | 'center'): { x: number; y: number } => {
      const rect = el.getBoundingClientRect();
      const pt = svg.createSVGPoint();
      pt.x = rect.left + rect.width / 2;

      if (position === 'top') {
        pt.y = rect.top;
      } else if (position === 'bottom') {
        pt.y = rect.bottom;
      } else {
        pt.y = rect.top + rect.height / 2;
      }

      const res = pt.matrixTransform(svg.getScreenCTM()!.inverse());
      return { x: res.x, y: res.y };
    };

    setPoints({
      from: toSvgPoint(fromRef.current, fromPosition),
      to: toSvgPoint(toRef.current, toPosition),
    });
  }, [svgRef, fromRef, toRef]);

  if (!points) {
    console.log(fromRef, toRef)
    return null;
  }

  return (
    <Arrow
      startX={points.from.x}
      startY={points.from.y}
      endX={points.to.x}
      endY={points.to.y}
    />
  );
}

// Mission Control Node Component
function MissionControlNode({ data }: NodeProps) {
  return (
    <div>

      <Box
        width={220}
        variant="container"
        flexWrap="wrap"
        gap={20}
        asSVG={true}
        padding={20}
      >
        <Box width={180} height={40} label="Health Checks" icon={<CanaryCheckerWhite />} variant="primary" hoverable={true} />
        <Box width={180} height={40} label="Unified Catalog" icon={<ConfigDbWhite />} variant="primary" hoverable={true} />
        <Box width={180} height={40} label="Playbooks" icon={<Playbook />} variant="primary" hoverable={true} />
        <Box width={180} height={40} label="Real-Time RAG" icon={<PiBrain />} variant="primary" hoverable={true} />
      </Box>
      <Handle type="source" position={Position.Bottom} id="mc-bottom" className='w-16 !bg-teal-500' isConnectable={false} isConnectableEnd={false} isConnectableStart={false} />
    </div>
  );
}

// Integrations Node Component
function IntegrationsNode({ data }: NodeProps) {
  const integrations = [
    <Aws key="aws" />,
    <Azure key="azure" />,
    <GoogleCloud key="gcloud" />,
    <K8S key="k8s" />,
    <Terraform key="terraform" />,
    <Flux key="flux" />,
    <Argo key="argo" />,
    <Helm key="helm" />,
    <Kustomize key="kustomize" />,
    <AwsCloudwatch key="awscloudwatch" />,
    <Opensearch key="opensearch" />,
    <Prometheus key="prometheus" />,
    <Datadog key="datadog" />,
    <Dynatrace key="dynatrace" />,
    <Postgres key="postgres" />,
    <SqlServer key="sqlserver" />,
    <ConfigDb key="configdb" />,
    <Github key="github" />,
    <AzureDevops key="azuredevops" />,
    <Gitlab key="gitlab" />,
    <Mcp key="mcp" />
  ];

  return (
    <div>
      <Handle type="target" position={Position.Top} id="int-top" className='!bg-white' isConnectable={false} isConnectableStart={false} />
      <Box
        asSVG={true}
        width={360}
        variant="unstyled"
        flexWrap="wrap"
        gap={0}
        padding={0}
      >
        {integrations.map((icon, index) => (
          <Box
            key={index}
            width={35}
            height={35}
            icon={icon}
            iconSize={25}
            className="fill-white"
            hoverable={true}
          />
        ))}
      </Box>
    </div>
  );
}

// Custom node types
const nodeTypes = {
  missionControl: MissionControlNode,
  integrations: IntegrationsNode,
};

// Client-side component with ReactFlow
function ArchitectureDiagramClient({ className, variant }: { className?: string, variant?: string }) {
  // Define nodes
  const nodes: Node[] = [
    {
      id: 'mission-control',
      type: 'missionControl',
      position: { x: 115, y: 0 },
      data: {},
    },
    {
      id: 'integrations',
      type: 'integrations',
      position: { x: 45, y: 350 },
      data: {},
    },
  ];

  // Define bidirectional edges
  const edges: Edge[] = [
    {
      id: 'ingestion-flow',
      source: 'mission-control',
      sourceHandle: 'mc-bottom',
      target: 'integrations',
      targetHandle: 'int-top',

      markerEnd: {
        type: 'arrowclosed',
        width: 24,
        offset: 10,
        height: 24,
      },

      animated: true,
      style: { stroke: '#60A5FA', strokeWidth: 2 },
      labelStyle: { fill: '#60A5FA', fontSize: 12 },
    },
  ];

  return (
    <div className={className} style={{ width: '450px', height: '600px' }}>
      <ReactFlow
        nodes={nodes}

        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{
          hideAttribution: true,
        }}
        zoomOnScroll={false}
        panOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={true}
        attributionPosition={undefined}
      />
    </div>
  );
}

// Wrapper component with BrowserOnly
export default function ArchitectureDiagram({ className, variant }: { className?: string, variant?: string }) {
  return (
    <>
      <style>{`
        .hover-scale-group:hover {
          transform: scale(1.1);
        }
        .hover-scale-group {
          transition: transform 0.1s ease-in-out;
        }

        .hoverable-box:hover {
          transform: !important scale(1.4);
        }
      `}</style>
      <BrowserOnly fallback={<div className={className} style={{ width: '450px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading architecture diagram...</div>}>
        {() => <ArchitectureDiagramClient className={className} variant={variant} />}
      </BrowserOnly>
    </>
  );
}

