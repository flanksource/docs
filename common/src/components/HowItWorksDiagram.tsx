import React from 'react';
import { ReactFlow, Background, Handle, Position, EdgeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  Aws,
  K8S,
  Git,
  Prometheus,
  Mcp,
  Anthropic,
  Openai,
  Gemini,
  Github,
  Changes,
  Health,
  Diff,
  Alarm,
  Flux,
  Argo,
  Terraform,
  Azure,
  GoogleCloud,
  Postgres,
} from '@flanksource/icons/mi';
import { FaCheckCircle, FaTimesCircle, FaCloudUploadAlt } from 'react-icons/fa';
import { HiUserGroup, HiCommandLine, HiCog6Tooth } from 'react-icons/hi2';

// Tailwind color values
const tw = {
  blue: { 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 100: '#dbeafe' },
  amber: { 500: '#f59e0b', 600: '#d97706', 100: '#fef3c7' },
  violet: { 500: '#8b5cf6', 600: '#7c3aed', 100: '#ede9fe' },
  green: { 500: '#22c55e', 600: '#16a34a', 100: '#dcfce7' },
  indigo: { 500: '#6366f1', 600: '#4f46e5', 100: '#e0e7ff' },
  slate: { 50: '#f8fafc', 100: '#f1f5f9', 400: '#94a3b8', 500: '#64748b', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
  emerald: { 50: '#ecfdf5', 500: '#10b981' },
  red: { 50: '#fef2f2', 500: '#ef4444' },
};

const colors = {
  discover: { bg: `linear-gradient(135deg, ${tw.blue[500]} 0%, ${tw.blue[700]} 100%)`, badge: tw.blue[600], light: tw.blue[100] },
  analyze: { bg: `linear-gradient(135deg, ${tw.amber[500]} 0%, ${tw.amber[600]} 100%)`, badge: tw.amber[600], light: tw.amber[100] },
  playbook: { bg: `linear-gradient(135deg, ${tw.violet[500]} 0%, ${tw.violet[600]} 100%)`, badge: tw.violet[600], light: tw.violet[100] },
  gitops: { bg: `linear-gradient(135deg, ${tw.green[500]} 0%, ${tw.green[600]} 100%)`, badge: tw.green[600], light: tw.green[100] },
  mcp: { bg: `linear-gradient(135deg, ${tw.indigo[500]} 0%, ${tw.indigo[600]} 100%)`, badge: tw.indigo[600], light: tw.indigo[100] },
  missionControl: { bg: `linear-gradient(135deg, ${tw.slate[700]} 0%, ${tw.slate[900]} 100%)`, border: tw.blue[500], light: tw.slate[800] },
  blocked: { line: tw.red[500], bg: tw.red[50] },
  users: { bg: tw.slate[50], border: tw.slate[400] },
  infra: { bg: tw.slate[100], border: tw.slate[500] },
  iac: { bg: tw.emerald[50], border: tw.emerald[500] },
};

// Reusable IconGrid component for displaying icons with labels
interface IconGridProps {
  items: Array<{ Icon: React.ComponentType<{ className?: string }>; label: string }>;
  layout?: 'grid' | 'row';
  cols?: 2 | 3;
  iconSize?: string;
  labelSize?: string;
}

function IconGrid({ items, layout = 'grid', cols = 2, iconSize = 'w-6 h-6', labelSize = 'text-[10px]' }: IconGridProps) {
  const gridClass = cols === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className={layout === 'grid' ? `grid ${gridClass} gap-2` : 'flex items-center gap-5'}>
      {items.map(({ Icon, label }) => (
        <div key={label} className="flex flex-col items-center">
          <Icon className={iconSize} />
          <span className={`${labelSize} text-gray-600`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// Reusable BoxNode component for workflow stages and tool containers
interface BoxNodeProps {
  title?: string;
  step?: number;
  className?: string; // Header/badge background e.g. "bg-slate-500"
  bodyClassName?: string; // Body background e.g. "bg-slate-100"
  border?: 'solid' | 'dashed';
  children?: React.ReactNode;
}

function BoxNode({ title, step, className = '', bodyClassName = '', border, children }: BoxNodeProps) {
  // Extract border color from className
  const bgMatch = className.match(/bg-(\w+)-(\d+)/);
  const borderClass = bgMatch ? `border-${bgMatch[1]}-${bgMatch[2]}` : '';

  const hasHeader = title !== undefined;
  const borderStyle = border ? `border-2 ${border === 'dashed' ? 'border-dashed' : 'border-solid'} ${borderClass}` : '';

  return (
    <div className="relative">
      {step && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full ${className} flex items-center justify-center text-white font-bold text-[11px] shadow-md border-2 border-white z-10`}>
          {step}
        </div>
      )}
      <div className={`rounded-xl overflow-hidden shadow-lg min-w-[120px] ${step ? 'mt-1.5' : ''} ${borderStyle}`}>
        {hasHeader && (
          <div className={`px-3 py-2 text-center ${className}`}>
            <span className="text-white text-xs font-bold">{title}</span>
          </div>
        )}
        <div className={`${bodyClassName} ${hasHeader ? 'p-3' : 'px-4 py-2 flex flex-col items-center justify-center'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Combined Stages Node - Discover, Analyze, Playbooks using Tailwind flex layout
function StagesNode() {
  const playbooks = ['Scale Pods', 'Restart Service', 'Create PR'];

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} id="left" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />

      <div className="flex items-start gap-6">
        <BoxNode title="Discover" step={1} className="bg-blue-600" bodyClassName="bg-blue-50" />

        <BoxNode title="Analyze" step={2} className="bg-amber-600" bodyClassName="bg-amber-50">
          <IconGrid
            items={[
              { Icon: Changes, label: 'Changes' },
              { Icon: Health, label: 'Health' },
              { Icon: Diff, label: 'Diffs' },
              { Icon: Alarm, label: 'Alerts' },
            ]}
            iconSize="w-5 h-5"
          />
        </BoxNode>

        <BoxNode title="Playbooks" step={3} className="bg-violet-600" bodyClassName="bg-violet-50">
          <div className="flex flex-col gap-1">
            {playbooks.map((pb) => (
              <div key={pb} className="flex items-center gap-1 text-[10px] text-violet-700 px-2 py-1 bg-violet-100 rounded">
                <FaCheckCircle className="w-2 h-2 text-violet-500" />
                <span>{pb}</span>
              </div>
            ))}
          </div>
        </BoxNode>
      </div>

      <Handle type="source" position={Position.Right} id="right" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'transparent', width: 1, height: 1 }} />
    </div>
  );
}

// Users Node - DevOps, Developers, SREs at the top
function UsersNode() {
  const users = [
    { Icon: HiCog6Tooth, label: 'DevOps' },
    { Icon: HiCommandLine, label: 'Developers' },
    { Icon: HiUserGroup, label: 'SREs' },
  ];

  return (
    <div className="relative">
      <div
        className="rounded-xl px-5 py-2 flex items-center gap-5"
        style={{ background: colors.users.bg, border: `2px solid ${colors.users.border}` }}
      >
        {users.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center">
            <Icon className="w-5 h-5 text-gray-600" />
            <span className="text-[10px] text-gray-600 mt-0.5 font-medium">{label}</span>
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'transparent', width: 1, height: 1 }} />
    </div>
  );
}

// Mission Control Container Node
function MissionControlNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: 'transparent', width: 1, height: 1 }} />
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: colors.missionControl.bg,
          border: `3px solid ${colors.missionControl.border}`,
          minWidth: 520,
          minHeight: 280,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <div className="px-6 py-3 text-center border-b border-blue-800/50">
          <span className="text-white text-lg font-bold tracking-wide">MISSION CONTROL</span>
        </div>
        <div className="p-4" style={{ minHeight: 240 }}>
          {/* Content rendered by child nodes positioned inside */}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: 'transparent', width: 1, height: 1 }} />
    </div>
  );
}

// Infrastructure Node - LEFT of Mission Control
function InfrastructureNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Right} id="right" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="target" position={Position.Bottom} id="bottom" style={{ background: 'transparent', width: 1, height: 1 }} />
      <BoxNode title="Infrastructure" className="bg-slate-500" bodyClassName="bg-slate-100" border="solid">
        <IconGrid
          items={[
            { Icon: Aws, label: 'AWS' },
            { Icon: Azure, label: 'Azure' },
            { Icon: K8S, label: 'K8s' },
            { Icon: GoogleCloud, label: 'GCP' },
            { Icon: Postgres, label: 'Databases' },
          ]}
        />
      </BoxNode>
    </div>
  );
}

// Git/IaC Node - RIGHT of Mission Control (outside)
function GitIaCNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} id="left" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="source" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />
      <BoxNode title="Git / IaC" className="bg-emerald-500" bodyClassName="bg-emerald-50" border="solid">
        <IconGrid
          items={[
            { Icon: Github, label: 'Git' },
            { Icon: Flux, label: 'Flux' },
            { Icon: Argo, label: 'Argo' },
            { Icon: Terraform, label: 'Terraform' },
          ]}
        />
      </BoxNode>
    </div>
  );
}

// MCP Server Node - Simple box with icon and text
function MCPServerNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />
      <div
        className="rounded-xl px-6 py-4 flex items-center gap-3"
        style={{
          background: colors.mcp.badge,
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
        }}
      >
        <Mcp className="w-8 h-8 text-white fill-white" />
        <span className="text-white text-base font-bold">MCP Server</span>
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="source" position={Position.Left} id="left" style={{ background: 'transparent', width: 1, height: 1 }} />
    </div>
  );
}

// LLM Models Node - Below MCP Server
function LLMModelsNode() {
  const models = [
    { Icon: Anthropic, label: 'Claude' },
    { Icon: Openai, label: 'GPT' },
    { Icon: Gemini, label: 'Gemini' },
  ];

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="source" position={Position.Left} id="left" style={{ background: 'transparent', width: 1, height: 1 }} />
      <div
        className="rounded-xl px-5 py-3 flex items-center gap-5"
        style={{ background: '#f0fdf4', border: '2px solid #22c55e', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <span className="text-sm text-gray-600 font-semibold">LLMs:</span>
        {models.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center">
            <Icon className="w-7 h-7" />
            <span className="text-xs text-gray-600 mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Blocked Access Node - Shows LLMs cannot directly access infrastructure (on L-shaped path)
function BlockedAccessNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Bottom} id="right" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="source" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />
      <div className="flex items-center gap-1 px-2 py-1 rounded bg-red-50 border border-red-300">
        <FaTimesCircle className="w-3 h-3 text-red-500" />
        <span className="text-[10px] font-semibold text-red-600">No Direct Access</span>


      </div>
    </div >
  );
}

// Apply Arrow Node - Shows IaC applying to Infra (between users and MC)
function ApplyArrowNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Right} id="right" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="source" position={Position.Left} id="left" style={{ background: 'transparent', width: 1, height: 1 }} />
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'transparent', width: 1, height: 1 }} />
      <div className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 border border-emerald-300">
        <FaCloudUploadAlt className="w-3 h-3 text-emerald-600" />
        <span className="text-[10px] font-semibold text-emerald-700">Apply</span>
      </div>
    </div>
  );
}

// Custom edge for blocked access (red dashed, straight L-shaped)
function BlockedEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  // Straight L-shape: horizontal to target X, then vertical to target Y
  const path = `M ${sourceX} ${sourceY} L ${targetX} ${sourceY} L ${targetX} ${targetY}`;

  return (
    <path
      id={id}
      d={path}
      fill="none"
      stroke={colors.blocked.line}
      strokeWidth={2}
      strokeDasharray="6 4"
    />
  );
}

// Custom edge for apply path (L-shaped: vertical then horizontal, or horizontal then vertical)
function ApplyEdge({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  let path: string;
  // If source is below target and to the right, go up first then horizontal left
  if (sourceY > targetY && sourceX > targetX) {
    path = `M ${sourceX} ${sourceY} L ${sourceX} ${targetY} L ${targetX} ${targetY}`;
  } else if (sourceX > targetX) {
    // Source is to the right, go horizontal first then down
    path = `M ${sourceX} ${sourceY} L ${targetX} ${sourceY} L ${targetX} ${targetY}`;
  } else {
    // Default: horizontal then vertical
    path = `M ${sourceX} ${sourceY} L ${targetX} ${sourceY} L ${targetX} ${targetY}`;
  }

  return (
    <path
      id={id}
      d={path}
      fill="none"
      stroke={colors.iac.border}
      strokeWidth={2}
      strokeDasharray="6 4"
      markerEnd="url(#applyArrow)"
    />
  );
}

const nodeTypes = {
  stagesNode: StagesNode,
  usersNode: UsersNode,
  missionControlNode: MissionControlNode,
  infrastructureNode: InfrastructureNode,
  gitIaCNode: GitIaCNode,
  mcpServerNode: MCPServerNode,
  llmModelsNode: LLMModelsNode,
  blockedAccessNode: BlockedAccessNode,
  applyArrowNode: ApplyArrowNode,
};

const edgeTypes = {
  blocked: BlockedEdge,
  apply: ApplyEdge,
};

const nodes = [
  // Users at the very top
  { id: 'users', type: 'usersNode', position: { x: 360, y: -30 }, data: {} },

  // Apply arrow - between users and Mission Control
  { id: 'applyArrow', type: 'applyArrowNode', position: { x: 420, y: 40 }, data: {} },

  // Infrastructure - LEFT of Mission Control
  { id: 'infrastructure', type: 'infrastructureNode', position: { x: 20, y: 150 }, data: {} },

  // Mission Control container - CENTER
  { id: 'missionControl', type: 'missionControlNode', position: { x: 180, y: 80 }, data: {} },

  // Git/IaC - RIGHT of Mission Control
  { id: 'gitIaC', type: 'gitIaCNode', position: { x: 740, y: 150 }, data: {} },

  // Workflow stages inside Mission Control (flex layout)
  { id: 'stages', type: 'stagesNode', position: { x: 210, y: 140 }, data: {} },

  // MCP Server - below Mission Control
  { id: 'mcpServer', type: 'mcpServerNode', position: { x: 360, y: 400 }, data: {} },

  // LLMs - below MCP Server
  { id: 'llmModels', type: 'llmModelsNode', position: { x: 330, y: 490 }, data: {} },

  // Blocked access - 100px below Infrastructure (Infra is at y:150, so this is at y:250 + height ~120 = ~370)
  { id: 'blockedAccess', type: 'blockedAccessNode', position: { x: 75, y: 370 }, data: {} },
];

const edgeStyle = { stroke: '#93c5fd', strokeWidth: 2 };

const edges = [
  // Users to Mission Control
  { id: 'users-mc', source: 'users', target: 'missionControl', sourceHandle: 'bottom', targetHandle: 'top', style: { stroke: '#94a3b8', strokeWidth: 2 } },

  // Infrastructure to Mission Control (scraping)
  { id: 'infra-mc', source: 'infrastructure', target: 'missionControl', sourceHandle: 'right', targetHandle: 'left', animated: true, style: { stroke: colors.discover.badge, strokeWidth: 2 } },



  // Mission Control to Git/IaC
  { id: 'mc-gitiac', source: 'missionControl', target: 'gitIaC', sourceHandle: 'right', targetHandle: 'left', animated: true, style: { stroke: colors.gitops.badge, strokeWidth: 2 } },

  // Mission Control to MCP Server
  { id: 'mc-mcp', source: 'missionControl', target: 'mcpServer', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: colors.missionControl.border, strokeWidth: 3 } },

  // MCP Server to LLMs
  { id: 'mcp-llm', source: 'mcpServer', target: 'llmModels', sourceHandle: 'bottom', targetHandle: 'top', animated: true, style: { stroke: colors.mcp.badge, strokeWidth: 3 } },

  // LLMs to Blocked Access (horizontal line going left)
  { id: 'llm-blocked', source: 'llmModels', target: 'blockedAccess', sourceHandle: 'left', targetHandle: 'right', type: 'blocked' },

  // Blocked to Infrastructure (vertical line going up)
  { id: 'blocked-infra', source: 'blockedAccess', target: 'infrastructure', sourceHandle: 'top', targetHandle: 'bottom', type: 'blocked' },

  // Git/IaC up to Apply Arrow (goes up then horizontal)
  { id: 'gitiac-apply', source: 'gitIaC', target: 'applyArrow', sourceHandle: 'top', targetHandle: 'right', type: 'apply' },

  // Apply left to Infrastructure (horizontal then down)
  { id: 'apply-infra', source: 'applyArrow', target: 'infrastructure', sourceHandle: 'left', targetHandle: 'top', type: 'apply' },
];

interface HowItWorksDiagramProps {
  className?: string;
}

function HowItWorksDiagramInner({ className }: HowItWorksDiagramProps) {
  return (
    <div className={`${className || ''} w-full`} style={{ height: 900 }}>
      <style>{`
        .react-flow__handle {
          display: hidden;
        }`}
      </style>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <marker id="applyArrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,8 L10,4 z" fill={colors.iac.border} />
          </marker>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#f8fafc" gap={24} />
      </ReactFlow>
    </div>
  );
}

export default function HowItWorksDiagram(props: HowItWorksDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <HowItWorksDiagramInner {...props} />}
    </BrowserOnly>
  );
}
