import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  Mcp,
  MissionControlWhite,
  ConfigDbWhite,
  CanaryCheckerWhite,
  Playbook,
} from '@flanksource/icons/mi';
import { PiBrain } from 'react-icons/pi';
import { SiClaude } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { HiCommandLine } from 'react-icons/hi2';
import BoxNode from './diagrams/BoxNode';
import { COLORS, primaryArrowProps } from './diagrams/diagramUtils';

function AIClientsBox({ id }: { id: string }) {
  const clients = [
    { Icon: SiClaude, label: 'Claude Desktop' },
    { Icon: VscCode, label: 'VS Code' },
    { Icon: HiCommandLine, label: 'Claude Code' },
  ];

  return (
    <div id={id}>
      <BoxNode
        title="AI Clients"
        headerColor="#6366f1"
        bodyColor={COLORS.background}
        borderColor="#6366f1"
        border="solid"
      >
        <div className="flex flex-col gap-2">
          {clients.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-2 border"
              style={{ backgroundColor: COLORS.background, borderColor: '#6366f1' }}>
              <Icon className="w-4 h-4" style={{ color: '#6366f1' }} />
              <span className="text-xs font-medium" style={{ color: COLORS.muted }}>{label}</span>
            </div>
          ))}
        </div>
      </BoxNode>
    </div>
  );
}

function MCPEndpointBox({ id }: { id: string }) {
  const tools = [
    { Icon: ConfigDbWhite, label: 'Catalog' },
    { Icon: CanaryCheckerWhite, label: 'Health Checks' },
    { Icon: Playbook, label: 'Playbooks' },
    { Icon: PiBrain, label: 'Views' },
  ];

  return (
    <div
      id={id}
      className="rounded-2xl overflow-hidden border-2 shadow-2xl"
      style={{ borderColor: COLORS.primary, backgroundColor: COLORS.background }}
    >
      <div className="px-6 py-3 text-center" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex items-center justify-center gap-2">
          <MissionControlWhite className="w-6 h-6 text-white" />
          <span className="text-white text-lg font-bold tracking-wide">Mission Control</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2 rounded-lg px-3 py-2"
          style={{ backgroundColor: '#6366f1' }}>
          <Mcp className="w-5 h-5 text-white fill-white" />
          <span className="text-white text-xs font-bold">/mcp</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {tools.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ backgroundColor: COLORS.primary }}>
              <Icon className="w-4 h-4 text-white" />
              <span className="text-white text-[10px] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface MCPDiagramProps {
  className?: string;
}

function MCPDiagramInner({ className }: MCPDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex items-center justify-center gap-16 py-8`}>
      <AIClientsBox id={id('clients')} />
      <MCPEndpointBox id={id('mc')} />

      <Xarrow
        start={id('clients')}
        end={id('mc')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right"
        endAnchor="left"
        labels={{
          middle: <span className="text-[10px] font-medium px-2 py-0.5 rounded"
            style={{ color: COLORS.primary, backgroundColor: COLORS.background }}>
            HTTP + SSE
          </span>
        }}
      />
    </div>
  );
}

export default function MCPDiagram(props: MCPDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <MCPDiagramInner {...props} />}
    </BrowserOnly>
  );
}
