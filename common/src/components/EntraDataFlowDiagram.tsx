import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  AzureAd,
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

interface EntraDataFlowDiagramProps {
  className?: string;
}

function EntraDataFlowDiagramInner({ className }: EntraDataFlowDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex items-center justify-center gap-12 py-8`}
      style={{ minWidth: '900px' }}>

      {/* Left: Entra ID */}
      <div id={id('entra')}>
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
        >
          <div className="flex flex-col gap-2">
            <NodeSection title="Identity" items={[
              'Users & Groups', 'App Registrations', 'Enterprise Apps', 'Role Assignments',
            ]} />
            <NodeSection title="Activity" items={['Sign-in Logs']} />
          </div>
        </BoxNode>
      </div>

      {/* Center: Mission Control */}
      <div id={id('mc')}>
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
          minWidth="280px"
        >
          <div className="flex gap-4">
            <div id={id('ingestion')}>
              <NodeSection title="Ingestion" items={['HTTP Scraper', 'Logs Scraper', 'Event Hub']} />
            </div>
            <div className="w-px" style={{ backgroundColor: COLORS.primary, opacity: 0.3 }} />
            <div id={id('catalog')}>
              <NodeSection title="Catalog" items={['Users & Groups', 'Access Records']} />
            </div>
          </div>
        </BoxNode>
      </div>

      {/* Right: Outputs */}
      <div className="flex flex-col gap-4">
        <div id={id('app')}>
          <BoxNode
            title="Application CRD"
            headerColor={COLORS.primary}
            bodyColor={COLORS.background}
            borderColor={COLORS.primary}
            compact
          >
            <div className="flex flex-col gap-1">
              {['Access Control', 'Backups', 'Cost', 'Environments'].map((item) => (
                <NodePill key={item}>{item}</NodePill>
              ))}
            </div>
          </BoxNode>
        </div>
        <div id={id('views')}>
          <BoxNode
            title="Audit Views"
            headerColor={COLORS.outputBorder}
            bodyColor={COLORS.background}
            borderColor={COLORS.outputBorder}
            compact
          >
            <div className="flex flex-col gap-1">
              {['Who Accessed, When', 'Inventory', 'Change Trail'].map((item) => (
                <div key={item} className="text-[10px] rounded px-2 py-0.5 text-center"
                  style={{ color: COLORS.muted, backgroundColor: COLORS.background, border: `1px solid ${COLORS.outputBorder}` }}>
                  {item}
                </div>
              ))}
            </div>
          </BoxNode>
        </div>
      </div>

      {/* Entra → MC ingestion */}
      <Xarrow start={id('entra')} end={id('ingestion')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
        labels={{ middle: <ArrowLabel text="Scrapers" /> }}
      />

      {/* Ingestion → Catalog (internal MC flow) */}
      <Xarrow start={id('ingestion')} end={id('catalog')}
        {...secondaryArrowProps}
        startAnchor="right" endAnchor="left"
      />

      {/* MC → Application CRD */}
      <Xarrow start={id('mc')} end={id('app')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />

      {/* MC → Audit Views */}
      <Xarrow start={id('mc')} end={id('views')}
        {...primaryArrowProps}
        startAnchor="right" endAnchor="left"
      />
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

export default function EntraDataFlowDiagram(props: EntraDataFlowDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <EntraDataFlowDiagramInner {...props} />}
    </BrowserOnly>
  );
}
