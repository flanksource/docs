import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  AzureAd,
  AzureLogAnalytics,
  MissionControlWhite,
  Http,
  AzureServiceBus,
} from '@flanksource/icons/mi';
import { HiShieldCheck } from 'react-icons/hi2';
import BoxNode from './diagrams/BoxNode';

const COLORS = {
  primary: '#2d7de4',
  background: '#f7fbfe',
  accent: '#1069dc',
  muted: '#62758a',
};

const pillStyle: React.CSSProperties = {
  color: COLORS.muted,
  backgroundColor: COLORS.background,
  border: `1px solid ${COLORS.primary}`,
};

const primaryArrowProps = {
  color: COLORS.primary,
  strokeWidth: 3,
  headSize: 4,
  dashness: { strokeLen: 10, nonStrokeLen: 5, animation: 1 },
} as const;

const secondaryArrowProps = {
  color: COLORS.muted,
  strokeWidth: 2,
  headSize: 3,
  dashness: { strokeLen: 6, nonStrokeLen: 4, animation: 1 },
} as const;

function NodePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] rounded px-2 py-1 text-center" style={pillStyle}>
      {children}
    </div>
  );
}

function DiagramNode({ id, icon: Icon, label }: { id: string; icon: React.ComponentType<{className?: string; style?: React.CSSProperties}>; label: string }) {
  return (
    <div id={id} className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 shadow-lg"
      style={{ borderColor: COLORS.primary, backgroundColor: COLORS.background }}>
      <Icon className="w-8 h-8" style={{ color: COLORS.accent }} />
      <span className="text-xs font-bold" style={{ color: COLORS.muted }}>{label}</span>
    </div>
  );
}

function MissionControlPill({ id }: { id: string }) {
  return (
    <div id={id} className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 shadow-lg"
      style={{ borderColor: COLORS.accent, backgroundColor: COLORS.background }}>
      <MissionControlWhite className="w-8 h-8" style={{ color: COLORS.primary }} />
      <span className="text-xs font-bold" style={{ color: COLORS.muted }}>Mission Control</span>
    </div>
  );
}

function EntraSourceBox({ id }: { id: string }) {
  return (
    <div id={id}>
      <BoxNode
        title={
          <span className="flex items-center justify-center gap-2">
            <AzureAd className="w-5 h-5" />
            Entra ID
          </span>
        }
        headerColor={COLORS.primary}
        bodyColor={COLORS.background}
        borderColor={COLORS.primary}
        compact
        minWidth="150px"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: COLORS.muted }}>Identity</div>
            <NodePill>Users & Groups</NodePill>
            <NodePill>App Registrations</NodePill>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: COLORS.muted }}>Sign-in Logs</div>
            <NodePill>Interactive</NodePill>
            <NodePill>Non-interactive</NodePill>
          </div>
        </div>
      </BoxNode>
    </div>
  );
}

function ArrowLabel({ text }: { text: string }) {
  return (
    <div className="rounded px-1.5 py-0.5 text-[9px] font-semibold mt-1"
      style={{ backgroundColor: COLORS.background, color: COLORS.accent, border: `1px solid ${COLORS.primary}` }}>
      {text}
    </div>
  );
}

// --- HTTP Scraper Diagram (left-to-right) ---

function HttpDiagramInner({ className }: { className?: string }) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex items-center justify-center gap-16 py-6`}>
      <EntraSourceBox id={id('entra')} />
      <DiagramNode id={id('scraper')} icon={Http} label="HTTP Scraper" />
      <MissionControlPill id={id('mc')} />

      <Xarrow start={id('entra')} end={id('scraper')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
        labels={{ middle: <ArrowLabel text="MS Graph" /> }}
      />
      <Xarrow start={id('scraper')} end={id('mc')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />
    </div>
  );
}

export function HttpScraperDiagram({ className }: { className?: string }) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <HttpDiagramInner className={className} />}
    </BrowserOnly>
  );
}

// --- Logs Scraper Diagram (left-to-right) ---

function LogsDiagramInner({ className }: { className?: string }) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex items-center justify-center gap-16 py-6`}>
      <EntraSourceBox id={id('entra')} />
      <DiagramNode id={id('backend')} icon={AzureLogAnalytics} label="Log Analytics" />
      <DiagramNode id={id('scraper')} icon={HiShieldCheck} label="Logs Scraper" />
      <MissionControlPill id={id('mc')} />

      <Xarrow start={id('entra')} end={id('backend')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
        labels={{ middle: <ArrowLabel text="Export" /> }}
      />
      <Xarrow start={id('backend')} end={id('scraper')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />
      <Xarrow start={id('scraper')} end={id('mc')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />
    </div>
  );
}

export function LogsScraperDiagram({ className }: { className?: string }) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <LogsDiagramInner className={className} />}
    </BrowserOnly>
  );
}

// --- Event Hub Streaming Diagram (left-to-right) ---

function EventHubDiagramInner({ className }: { className?: string }) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex items-center justify-center gap-16 py-6`}>
      <EntraSourceBox id={id('entra')} />
      <DiagramNode id={id('hub')} icon={AzureServiceBus} label="Event Hub" />
      <DiagramNode id={id('consumer')} icon={HiShieldCheck} label="Bridge Consumer" />
      <MissionControlPill id={id('mc')} />

      <Xarrow start={id('entra')} end={id('hub')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
      />
      <Xarrow start={id('hub')} end={id('consumer')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
        labels={{ middle: <ArrowLabel text="Stream" /> }}
      />
      <Xarrow start={id('consumer')} end={id('mc')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />
    </div>
  );
}

export function EventHubDiagram({ className }: { className?: string }) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <EventHubDiagramInner className={className} />}
    </BrowserOnly>
  );
}
