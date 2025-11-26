import React from 'react';
import { ReactFlow, Background, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  Github,
  AzureDevops,
  Gitlab,
  Aws,
  Terraform,
  Azure,
  ConfigDbWhite,
  ConfigDb,
  K8S,
  Gcp,
  Flux,
  Argo,
  Prometheus,
  Datadog,
  Dynatrace,
  AwsCloudwatch,
  Opensearch,
  Postgres,
  SqlServer,
} from '@flanksource/icons/mi';
import { Box } from './Shapes';

// Git Sources / CI/CD
const gitCicdIcons = [
  <Github key="github" />,
  <AzureDevops key="azuredevops" />,
  <Gitlab key="gitlab" />,
  <Flux key="flux" />,
  <Argo key="argo" />,
];

// Cloud/K8s
const cloudK8sIcons = [
  <Aws key="aws" />,
  <Azure key="azure" />,
  <Gcp key="gcp" />,
  <K8S key="k8s" />,
  <Terraform key="terraform" />,
];

// Databases
const databaseIcons = [
  <Postgres key="postgres" />,
  <SqlServer key="sqlserver" />,
  <ConfigDb key="configdb" />,
];

// Insights (monitoring/observability)
const insightsIcons = [
  <Prometheus key="prometheus" />,
  <Datadog key="datadog" />,
  <Dynatrace key="dynatrace" />,
  <AwsCloudwatch key="cloudwatch" />,
  <Opensearch key="opensearch" />,
];

function GitCicdNode() {
  return (
    <div className="relative">
      <Box
        asSVG={true}
        width={200}
        borderVariant="dashed"
        variant="unstyled"
        flexWrap="wrap"
        gap={0}
        padding={5}
      >
        {gitCicdIcons.map((icon, index) => (
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
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: 'transparent', width: 1, height: 1 }}
      />
    </div>
  );
}

function CloudK8sNode() {
  return (
    <div className="relative">
      <Box
        asSVG={true}
        width={200}
        borderVariant="dashed"
        variant="unstyled"
        flexWrap="wrap"
        gap={0}
        padding={5}
      >
        {cloudK8sIcons.map((icon, index) => (
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
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: 'transparent', width: 1, height: 1 }}
      />
    </div>
  );
}

function DatabasesNode() {
  return (
    <div className="relative">
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{ background: 'transparent', width: 1, height: 1 }}
      />
      <Box
        asSVG={true}
        width={120}
        borderVariant="dashed"
        variant="unstyled"
        flexWrap="wrap"
        gap={0}
        padding={5}
      >
        {databaseIcons.map((icon, index) => (
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

function InsightsNode() {
  return (
    <div className="relative">
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        style={{ background: 'transparent', width: 1, height: 1 }}
      />
      <Box
        asSVG={true}
        width={200}
        borderVariant="dashed"
        variant="unstyled"
        flexWrap="wrap"
        gap={0}
        padding={5}
      >
        {insightsIcons.map((icon, index) => (
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

function UnifiedCatalogNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} id="top-1" style={{ background: 'transparent', width: 1, height: 1, left: '25%' }} />
      <Handle type="target" position={Position.Top} id="top-2" style={{ background: 'transparent', width: 1, height: 1, left: '75%' }} />
      <div
        className="flex items-center gap-2 rounded-lg px-4 py-2"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
        }}
      >
        <ConfigDbWhite className="w-8 h-8 text-white" />
        <span className="text-white font-semibold text-sm">Unified Catalog</span>
      </div>
      <Handle type="target" position={Position.Bottom} id="bottom-1" style={{ background: 'transparent', width: 1, height: 1, left: '25%' }} />
      <Handle type="target" position={Position.Bottom} id="bottom-2" style={{ background: 'transparent', width: 1, height: 1, left: '75%' }} />
    </div>
  );
}

const nodeTypes = {
  gitCicdNode: GitCicdNode,
  cloudK8sNode: CloudK8sNode,
  databasesNode: DatabasesNode,
  insightsNode: InsightsNode,
  unifiedCatalogNode: UnifiedCatalogNode,
};

const nodes = [
  {
    id: 'gitCicd',
    type: 'gitCicdNode',
    position: { x: 50, y: 0 },
    data: {},
  },
  {
    id: 'cloudK8s',
    type: 'cloudK8sNode',
    position: { x: 300, y: 0 },
    data: {},
  },
  {
    id: 'catalog',
    type: 'unifiedCatalogNode',
    position: { x: 200, y: 100 },
    data: {},
  },
  {
    id: 'databases',
    type: 'databasesNode',
    position: { x: 100, y: 200 },
    data: {},
  },
  {
    id: 'insights',
    type: 'insightsNode',
    position: { x: 270, y: 200 },
    data: {},
  },
];

const edges = [
  {
    id: 'gitCicd-catalog',
    source: 'gitCicd',
    target: 'catalog',
    sourceHandle: 'bottom',
    targetHandle: 'top-1',
    animated: true,
    style: { stroke: '#93c5fd', strokeWidth: 3 },
  },
  {
    id: 'cloudK8s-catalog',
    source: 'cloudK8s',
    target: 'catalog',
    sourceHandle: 'bottom',
    targetHandle: 'top-2',
    animated: true,
    style: { stroke: '#93c5fd', strokeWidth: 3 },
  },
  {
    id: 'databases-catalog',
    source: 'databases',
    target: 'catalog',
    sourceHandle: 'top',
    targetHandle: 'bottom-1',
    animated: true,
    style: { stroke: '#93c5fd', strokeWidth: 3 },
  },
  {
    id: 'insights-catalog',
    source: 'insights',
    target: 'catalog',
    sourceHandle: 'top',
    targetHandle: 'bottom-2',
    animated: true,
    style: { stroke: '#93c5fd', strokeWidth: 3 },
  },
];

interface CatalogDiagramProps {
  className?: string;
}

function CatalogDiagramInner({ className }: CatalogDiagramProps) {
  return (
    <div className={className} style={{ width: 550, height: 320 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#f1f5f9" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default function CatalogDiagram(props: CatalogDiagramProps) {
  return (
    <BrowserOnly fallback={<div style={{ width: 550, height: 320 }} />}>
      {() => <CatalogDiagramInner {...props} />}
    </BrowserOnly>
  );
}
