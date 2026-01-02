import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  Aws,
  Azure,
  K8S,
  GoogleCloud,
  Terraform,
  Flux,
  Argo,
  Prometheus,
  Datadog,
  Github,
  Postgres,
  ConfigDbWhite,
  CanaryCheckerWhite,
  Playbook,
  Mcp,
  Helm,
  Kustomize,
  AwsCloudwatch,
  Opensearch,
  Dynatrace,
  SqlServer,
  AzureDevops,
  Gitlab,
} from '@flanksource/icons/mi';
import { PiBrain } from 'react-icons/pi';

interface IconGridProps {
  items: Array<{ Icon: React.ComponentType<{ className?: string }>; label?: string }>;
  cols?: number;
  iconSize?: string;
}

function IconGrid({ items, cols = 5, iconSize = 'w-6 h-6' }: IconGridProps) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map(({ Icon, label }, idx) => (
        <div key={label || idx} className="flex flex-col items-center">
          <Icon className={iconSize} />
          {label && <span className="text-[9px] text-gray-500 mt-0.5">{label}</span>}
        </div>
      ))}
    </div>
  );
}

interface BoxNodeProps {
  id?: string;
  title?: string | React.ReactNode;
  className?: string;
  bodyClassName?: string;
  border?: 'solid' | 'dashed';
  children?: React.ReactNode;
}

function BoxNode({ id, title, className = '', bodyClassName = '', border = 'solid', children }: BoxNodeProps) {
  const bgMatch = className.match(/bg-(\w+)-(\d+)/);
  const borderClass = bgMatch ? `border-${bgMatch[1]}-${bgMatch[2]}` : 'border-slate-300';
  const borderStyle = `border-2 ${border === 'dashed' ? 'border-dashed' : 'border-solid'} ${borderClass}`;
  const hasHeader = title !== undefined;

  return (
    <div id={id} className={`rounded-xl overflow-hidden shadow-lg min-w-[120px] ${borderStyle}`}>
      {hasHeader && (
        <div className={`px-3 py-2 text-center ${className}`}>
          <span className="text-white text-xs font-bold">{title}</span>
        </div>
      )}
      {children && (
        <div className={`${bodyClassName} ${hasHeader ? 'p-3' : 'p-3'}`}>
          {children}
        </div>
      )}
    </div>
  );
}

function K8SCRDsBox() {
  return (
    <div id="arch-k8s-crds" className="flex items-center gap-3 bg-blue-600 rounded-xl px-5 py-3 shadow-lg border-2 border-blue-400">
      <K8S className="w-8 h-8 text-white" />
      <span className="text-white font-bold text-sm">K8S CRDs</span>
    </div>
  );
}

function MissionControlBox() {
  const features = [
    { Icon: CanaryCheckerWhite, label: 'Health Checks' },
    { Icon: ConfigDbWhite, label: 'Unified Catalog' },
    { Icon: Playbook, label: 'Playbooks' },
    { Icon: PiBrain, label: 'Real-Time RAG' },
  ];

  return (
    <div id="arch-missionControl" className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-blue-500 shadow-2xl">
      <div className="px-6 py-3 text-center border-b border-blue-800/50">
        <span className="text-white text-lg font-bold tracking-wide">MISSION CONTROL</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          {features.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg px-3 py-2 cursor-default"
            >
              <Icon className="w-5 h-5 text-white" />
              <span className="text-white text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 bg-slate-600 rounded-lg px-3 py-2">
          <Postgres className="w-5 h-5" />
          <span className="text-white text-xs font-medium">Postgres</span>
        </div>
      </div>
    </div>
  );
}

function MCPServerBox() {
  return (
    <div id="arch-mcp-server" className="flex items-center gap-3 bg-indigo-600 rounded-xl px-5 py-3 shadow-lg border-2 border-indigo-400">
      <Mcp className="w-7 h-7 text-white fill-white" />
      <span className="text-white font-bold text-sm">MCP Server</span>
    </div>
  );
}

function IntegrationsBox() {
  const integrations = [
    { Icon: Aws },
    { Icon: Azure },
    { Icon: GoogleCloud },
    { Icon: K8S },
    { Icon: Terraform },
    { Icon: Flux },
    { Icon: Argo },
    { Icon: Helm },
    { Icon: Kustomize },
    { Icon: Prometheus },
    { Icon: Datadog },
    { Icon: Dynatrace },
    { Icon: AwsCloudwatch },
    { Icon: Opensearch },
    { Icon: Postgres },
    { Icon: SqlServer },
    { Icon: Github },
    { Icon: AzureDevops },
    { Icon: Gitlab },
    { Icon: Mcp },
  ];

  return (
    <div id="arch-integrations">
      <BoxNode
        title="40+ Integrations"
        className="bg-slate-500"
        bodyClassName="bg-slate-50"
        border="solid"
      >
        <IconGrid items={integrations} cols={5} iconSize="w-7 h-7" />
      </BoxNode>
    </div>
  );
}

interface ArchitectureDiagramProps {
  className?: string;
  variant?: string;
}

function ArchitectureDiagramInner({ className }: ArchitectureDiagramProps) {
  return (
    <div className={`${className || ''} relative flex flex-col items-center gap-10 py-8`}>
      <K8SCRDsBox />
      <MissionControlBox />
      <MCPServerBox />
      <IntegrationsBox />

      <Xarrow
        start="arch-k8s-crds"
        end="arch-missionControl"
        color="#3b82f6"
        strokeWidth={3}
        startAnchor="bottom"
        endAnchor="top"
        headSize={4}
        dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: 1 }}
      />
      <Xarrow
        start="arch-missionControl"
        end="arch-mcp-server"
        color="#6366f1"
        strokeWidth={3}
        startAnchor="bottom"
        endAnchor="top"
        headSize={4}
        dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: 1 }}
      />
      <Xarrow
        start="arch-mcp-server"
        end="arch-integrations"
        color="#6366f1"
        strokeWidth={3}
        startAnchor="bottom"
        endAnchor="top"
        headSize={4}
        dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: 1 }}
      />
    </div>
  );
}

export default function ArchitectureDiagram({ className, variant }: ArchitectureDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full h-96 flex items-center justify-center">Loading...</div>}>
      {() => <ArchitectureDiagramInner className={className} variant={variant} />}
    </BrowserOnly>
  );
}
