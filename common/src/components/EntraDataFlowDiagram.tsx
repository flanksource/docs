import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  AzureAd,
  AzureLogAnalytics,
  AzureServiceBus,
  Http,
  MissionControlWhite,
} from '@flanksource/icons/mi';
import BoxNode from './diagrams/BoxNode';

const COLORS = {
  primary: '#2d7de4',
  background: '#f7fbfe',
  accent: '#1069dc',
  muted: '#62758a',
  outputBorder: '#10b981',
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

function NodeSection({ title, items, id }: { title: string; items: string[]; id?: string }) {
  return (
    <div id={id} className="flex flex-col gap-1">
      <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: COLORS.muted }}>
        {title}
      </div>
      {items.map((item) => (
        <NodePill key={item}>{item}</NodePill>
      ))}
    </div>
  );
}


function IconNode({ id, icon: Icon, label }: {
  id: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
}) {
  return (
    <div id={id} className="flex flex-col items-center gap-1 px-2 py-1">
      <Icon className="w-7 h-7" style={{ color: COLORS.accent }} />
      <span className="text-[10px] font-bold" style={{ color: COLORS.muted }}>{label}</span>
    </div>
  );
}

const auditRows = [
  { name: 'J. Smith', role: 'Admin', lastAccess: '2h ago', reviewed: '30d ago' },
  { name: 'A. Chen', role: 'User', lastAccess: '1d ago', reviewed: '7d ago' },
  { name: 'svc-deploy', role: 'User', lastAccess: '5m ago', reviewed: 'Never' },
];

function AuditTable() {
  const cellStyle: React.CSSProperties = {
    color: COLORS.muted, fontSize: '9px', padding: '2px 6px', whiteSpace: 'nowrap',
  };
  const headerStyle: React.CSSProperties = {
    ...cellStyle, fontWeight: 700, borderBottom: `1px solid ${COLORS.outputBorder}`,
  };
  return (
    <table className="w-full" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['User', 'Role', 'Last Access', 'Reviewed'].map((h) => (
            <th key={h} style={headerStyle}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {auditRows.map((r) => (
          <tr key={r.name}>
            <td style={cellStyle}>{r.name}</td>
            <td style={cellStyle}>{r.role}</td>
            <td style={cellStyle}>{r.lastAccess}</td>
            <td style={cellStyle}>{r.reviewed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface EntraDataFlowDiagramProps {
  className?: string;
}

function EntraDataFlowDiagramInner({ className }: EntraDataFlowDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative py-8`} style={{ minWidth: '950px' }}>
      <div className="flex items-start justify-center gap-6">

        {/* Col 1: Entra ID */}
        <div id={id('entra')} className="self-center">
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
            minWidth="180px"
          >
            <div className="flex flex-col gap-3">
              <NodeSection title="Identity" items={[
                'Users & Groups', 'App Registrations', 'Enterprise Apps', 'Role Assignments',
              ]} />
              <NodeSection id={id('signin')} title="Sign-in Logs" items={[
                'Interactive', 'Non-interactive',
              ]} />
            </div>
          </BoxNode>
        </div>

        {/* Col 2: Middle — icons sit below the sign-in arrow line */}
        <div className="flex flex-col items-center self-end mb-2" style={{ minWidth: '180px' }}>
          <div className="flex gap-3">
            <IconNode id={id('loganalytics')} icon={AzureLogAnalytics} label="Log Analytics" />
            <IconNode id={id('eventhub')} icon={AzureServiceBus} label="Event Hub" />
          </div>
        </div>

        {/* Col 3: Mission Control */}
        <div id={id('mc')} className="self-center">
          <BoxNode
            title={
              <span className="flex items-center justify-center gap-2">
                <MissionControlWhite className="w-5 h-5" />
                Mission Control
              </span>
            }
            headerColor={COLORS.primary}
            bodyColor={COLORS.background}
            borderColor={COLORS.primary}
            minWidth="240px"
          >
            <div className="flex flex-col gap-3">
              <NodeSection title="Catalog" items={[
                'Users & Groups', 'Roles & Policies', 'Access Records', 'Sign-in Logs',
              ]} />
              <div className="w-full h-px" style={{ backgroundColor: COLORS.primary, opacity: 0.2 }} />
              <NodeSection title="Scrapers" items={[
                'HTTP Scraper', 'Logs Scraper', 'PubSub Scraper',
              ]} />
            </div>
          </BoxNode>
        </div>

        {/* Spacer between MC and Audit Report for longer arrow */}
        <div style={{ minWidth: '60px' }} />

        {/* Col 4: Audit Report */}
        <div id={id('report')} className="self-center">
          <BoxNode
            title="Audit Report"
            headerColor={COLORS.outputBorder}
            bodyColor={COLORS.background}
            borderColor={COLORS.outputBorder}
            compact
            minWidth="220px"
          >
            <AuditTable />
          </BoxNode>
        </div>
      </div>

      {/* --- Arrows --- */}

      {/* Entra → MC (primary, box border to box border) */}
      <Xarrow start={id('entra')} end={id('mc')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />

      {/* Sign-in Logs → MC (gray line, aligned between Interactive/Non-interactive) */}
      <Xarrow start={id('entra')} end={id('mc')}
        {...secondaryArrowProps}
        startAnchor={{ position: 'right', offset: { y: 110 } }}
        endAnchor={{ position: 'left', offset: { y: 110 } }}
        path="straight"
      />

      {/* MC → Audit Report */}
      <Xarrow start={id('mc')} end={id('report')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />
    </div>
  );
}

export default function EntraDataFlowDiagram(props: EntraDataFlowDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <EntraDataFlowDiagramInner {...props} />}
    </BrowserOnly>
  );
}
