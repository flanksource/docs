import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  Aws,
  K8S,
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
import { FaCheckCircle, FaBan, FaEdit } from 'react-icons/fa';
import { HiUserGroup, HiCommandLine, HiCog6Tooth } from 'react-icons/hi2';
import { IoPencil } from 'react-icons/io5';

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
  title?: string | React.ReactNode;
  step?: number;
  className?: string; // Header/badge background e.g. "bg-slate-500"
  bodyClassName?: string; // Body background e.g. "bg-slate-100"
  border?: 'solid' | 'dashed';
  children?: React.ReactNode;
  badge?: {
    position: 'top' | 'bottom' | 'left' | 'right';
    offset?: { x?: number; y?: number };
    element: React.ReactNode;
  };
}

function BoxNode({
  title,
  step,
  className = '',
  bodyClassName = '',
  border = "solid",
  children,
  badge }: BoxNodeProps) {
  // Extract border color from className
  const bgMatch = className.match(/bg-(\w+)-(\d+)/);
  const borderClass = bgMatch ? `border-${bgMatch[1]}-${bgMatch[2]}` : '';

  const hasHeader = title !== undefined;
  const borderStyle = border ? `border-2 ${border === 'dashed' ? 'border-dashed' : 'border-solid'} ${borderClass}` : '';

  const getBadgeStyles = (): React.CSSProperties => {
    if (!badge) return {};
    const { position, offset = {} } = badge;
    const base: React.CSSProperties = { position: 'absolute' };
    switch (position) {
      case 'top':
        return { ...base, top: offset.y ?? -20, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { ...base, bottom: offset.y ?? -20, left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { ...base, left: offset.x ?? -20, top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { ...base, right: offset.x ?? -20, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  return (
    <div className="relative">
      {badge && <div style={getBadgeStyles()}>{badge.element}</div>}
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
        {children && (
          <div className={`${bodyClassName} ${hasHeader ? 'p-3' : 'px-4 py-2 flex flex-col items-center justify-center'}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

// Stages - Discover, Analyze, Playbooks using Tailwind flex layout
function StagesBox() {
  const playbooks = ['Scale Pods', 'Restart Service', 'Create PR'];

  return (
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
  );
}

// Users - DevOps, Developers, SREs
function UsersBox() {
  const users = [
    { Icon: HiCog6Tooth, label: 'DevOps' },
    { Icon: HiCommandLine, label: 'Developers' },
    { Icon: HiUserGroup, label: 'SREs' },
  ];

  return (
    <div id="users" className="rounded-xl px-5 py-2 flex items-center gap-5 bg-slate-50 border-2 border-slate-400">
      {users.map(({ Icon, label }) => (
        <div key={label} className="flex flex-col items-center">
          <Icon className="w-5 h-5 text-gray-600" />
          <span className="text-[10px] text-gray-600 mt-0.5 font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}

// Mission Control Container
function MissionControlBox() {
  return (
    <div id="missionControl" className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 border-3 border-blue-500 shadow-2xl">
      <div className="px-6 py-3 text-center border-b border-blue-800/50">
        <span className="text-white text-lg font-bold tracking-wide">MISSION CONTROL</span>
      </div>
      <div className="p-4">
        <StagesBox />
      </div>
    </div>
  );
}



// Git/IaC
function GitIaCBox() {
  return (
    <div id="gitIaC">
      <BoxNode title={<span className="flex items-center text-lg"><Github className="mr-2 h-6 w-auto" /> Git / IaC</span>} className="bg-emerald-500" bodyClassName="bg-emerald-50" border="solid">
        <IconGrid
          items={[

            { Icon: Flux, label: 'Flux' },
            { Icon: Argo, label: 'Argo' },
            { Icon: Github, label: 'Git' },
            { Icon: Terraform, label: 'Terraform' },
          ]}
        />
      </BoxNode>
    </div>
  );
}

// MCP Server
function MCPServerBox() {
  return (


    <div id="mcpServer" >
      <BoxNode title={<span className="flex items-center text-lg"><Mcp className="mr-2 h-6 w-auto text-white fill-white" /> MCP Protocol</span>} className="bg-indigo-500" bodyClassName="bg-indigo-50" border="solid" />

    </div>
  );
}

// LLM Models
function LLMModelsBox() {
  const models = [
    { Icon: Anthropic, label: 'Claude' },
    { Icon: Openai, label: 'GPT' },
    { Icon: Gemini, label: 'Gemini' },
  ];

  return (
    <div id="llmModels" className="rounded-xl px-5 py-3 flex items-center gap-5 bg-green-50 border-2 border-green-500 shadow-md">
      <span className="text-sm text-gray-600 font-semibold">LLMs:</span>
      {models.map(({ Icon, label }) => (
        <div key={label} className="flex flex-col items-center">
          <Icon className="w-7 h-7" />
          <span className="text-xs text-gray-600 mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

// Downward arrow badge for git→infrastructure connection
const DownArrow = ({ className }) => (
  <div className={className}>
    <svg width="16" height="12" viewBox="0 0 16 12">
      <path d="M8 12 L0 0 L16 0 Z" fill="currentColor" />
    </svg>
  </div>
);

interface HowItWorksDiagramProps {
  className?: string;
}

function HowItWorksDiagramInner({ className }: HowItWorksDiagramProps) {
  return (
    <div className={`${className || ''} relative flex flex-col items-center gap-16 py-8`}>
      {/* Users row */}
      <UsersBox />

      {/* Main row: Infrastructure | Mission Control | Git/IaC */}
      <div className="flex items-center gap-16">
        <div id="infrastructure">
          <BoxNode
            title="Infrastructure"
            className="bg-slate-500"
            bodyClassName="bg-slate-100"
            border="solid"
            badge={{ position: 'top', offset: { y: -10 }, element: <DownArrow className="text-emerald-500" /> }}
          >
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

        <MissionControlBox />

        <GitIaCBox />
      </div>

      {/* Bottom row: MCP Server and LLMs */}
      <div className="flex flex-col items-center gap-16">
        <MCPServerBox />
        <LLMModelsBox />
      </div>

      {/* Arrows connecting nodes */}

      <Xarrow
        start="infrastructure"
        end="missionControl"
        color="#2563eb"
        strokeWidth={4}
        startAnchor="right"
        headShape="circle"
        headSize={3}
        endAnchor="left"
        dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: 1 }}
      />
      <Xarrow
        start="missionControl"
        end="gitIaC"
        color="#16a34a"
        strokeWidth={4}
        headSize={3}
        startAnchor="right"
        headShape="circle"
        endAnchor="left"
        dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: 1 }}
      />
      <Xarrow
        start="gitIaC"
        end="infrastructure"
        color="#16a34a"
        strokeWidth={2}
        endAnchor={{ position: 'top', offset: { y: -10 } }}
        startAnchor={{ position: 'top' }}
        path="grid"
        labels={{
          middle: (
            <div className="relative bottom-4 flex items-center gap-1 bg-green-100 border border-green-300 rounded px-2 py-1 text-green-700 text-xs font-semibold"

            >
              <span className='flex flex-row'><IoPencil className='h-4 w-auto' /> Apply</span>
            </div>
          ),
        }}
        gridBreak="75"
        showHead={false}
      />
      <Xarrow end="missionControl" start="mcpServer" color="#3b82f6" strokeWidth={3} startAnchor="top" endAnchor="bottom" path='smooth' />
      <Xarrow start="llmModels" end="mcpServer" color="#4f46e5" strokeWidth={3} startAnchor="top" endAnchor="bottom" />
      <Xarrow
        start="llmModels"
        end="infrastructure"
        color="#ef4444"
        strokeWidth={2}
        startAnchor="left"
        endAnchor="bottom"
        dashness
        labels={{
          middle: (
            <div className="flex items-center gap-1 bg-red-100 border border-red-300 rounded px-2 py-1 text-red-700 text-xs font-semibold mb-10">
              <FaBan className="w-3 h-3" />
              <span>No Direct Access</span>
            </div>
          ),
        }}
      />

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
