import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import BoxNode from './diagrams/BoxNode';
import {
  ConfigDbWhite,
  MissionControlWhite,
  Http,
  Postgres,
  SqlServer,
  Clickhouse,
  Aws,
  Azure,
  GoogleCloud,
  AzureAd,
  Github,
} from '@flanksource/icons/mi';
import { HiUserGroup, HiShieldCheck, HiKey } from 'react-icons/hi2';
import { FaHistory, FaLightbulb, FaDatabase, FaFileCode, FaTerminal } from 'react-icons/fa';
import { COLORS, primaryArrowProps } from './diagrams/diagramUtils';

function ProtocolBox({ id, title, icons }: { id: string; title: string; icons: Array<{ Icon: React.ComponentType<{ className?: string }>; label: string }> }) {
  return (
    <div id={id}>
      <BoxNode
        title={title}
        headerColor={COLORS.primary}
        bodyColor={COLORS.background}
        borderColor={COLORS.primary}
        border="solid"
        compact
      >
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(3, minmax(0, 1fr))` }}>
          {icons.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center">
              <Icon className="w-6 h-6" />
              <span className="text-[9px] mt-0.5" style={{ color: COLORS.muted }}>{label}</span>
            </div>
          ))}
        </div>
      </BoxNode>
    </div>
  );
}

function DataSourcesColumn({ idFile, idHttp, idSql }: { idFile: string; idHttp: string; idSql: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <ProtocolBox id={idFile} title="File / Exec" icons={[
        { Icon: FaFileCode, label: 'File' },
        { Icon: FaTerminal, label: 'Exec' },
        { Icon: Github, label: 'Git' },
      ]} />
      <ProtocolBox id={idHttp} title="HTTP" icons={[
        { Icon: Http, label: 'REST' },
        { Icon: AzureAd, label: 'Entra ID' },
        { Icon: Aws, label: 'AWS' },
      ]} />
      <ProtocolBox id={idSql} title="SQL" icons={[
        { Icon: Postgres, label: 'Postgres' },
        { Icon: SqlServer, label: 'SQL Server' },
        { Icon: Clickhouse, label: 'Clickhouse' },
      ]} />
    </div>
  );
}

function ScraperBox({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="flex items-center gap-2 rounded-lg px-5 py-3 shadow-lg border-2"
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        borderColor: COLORS.primary,
        boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
      }}
    >
      <ConfigDbWhite className="w-7 h-7 text-white" />
      <div className="flex flex-col">
        <span className="text-white font-bold text-sm">ScrapeConfig</span>
        <span className="text-blue-200 text-[10px]">full: true</span>
      </div>
    </div>
  );
}

function JsonOutputBox({ id }: { id: string }) {
  const lines = [
    { text: '{', indent: 0 },
    { text: '"id": "db-prod-001",', indent: 1 },
    { text: '"type": "Database",', indent: 1 },
    { text: '"config": { ... },', indent: 1, highlight: true },
    { text: '"changes": [ ... ],', indent: 1, highlight: true },
    { text: '"access": [ ... ],', indent: 1, highlight: true },
    { text: '"logs": [ ... ],', indent: 1, highlight: true },
    { text: '"analysis": [ ... ],', indent: 1, highlight: true },
    { text: '"users": [ ... ]', indent: 1, highlight: true },
    { text: '}', indent: 0 },
  ];

  return (
    <div id={id}>
      <BoxNode
        title="Scraper Output"
        headerColor={COLORS.muted}
        bodyColor="#1e293b"
        borderColor={COLORS.muted}
        border="solid"
        minWidth="180px"
      >
        <pre className="m-0 p-0 text-[10px] leading-[1.6] font-mono" style={{ background: 'transparent' }}>
          {lines.map(({ text, indent, highlight }, i) => (
            <div key={i} style={{ paddingLeft: `${indent * 12}px`, color: highlight ? '#93c5fd' : '#94a3b8' }}>
              {text}
            </div>
          ))}
        </pre>
      </BoxNode>
    </div>
  );
}

function MissionControlBox({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="rounded-2xl overflow-hidden border-2 shadow-2xl"
      style={{ borderColor: COLORS.primary, backgroundColor: COLORS.background }}
    >
      <div className="px-5 py-2.5 text-center" style={{ backgroundColor: COLORS.primary }}>
        <div className="flex items-center justify-center gap-2">
          <MissionControlWhite className="w-5 h-5 text-white" />
          <span className="text-white text-sm font-bold tracking-wide">Mission Control</span>
        </div>
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        {[
          { Icon: FaDatabase, label: 'Config Item' },
          { Icon: FaHistory, label: 'Changes' },
          { Icon: HiKey, label: 'Access Records' },
          { Icon: HiUserGroup, label: 'Access Logs' },
          { Icon: FaLightbulb, label: 'Insights' },
          { Icon: HiShieldCheck, label: 'Users & Roles' },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-1.5 border"
            style={{ backgroundColor: '#ffffff', borderColor: COLORS.primary }}>
            <Icon className="w-3.5 h-3.5" style={{ color: COLORS.accent }} />
            <span className="text-[10px] font-medium" style={{ color: COLORS.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransformPipeline({ id }: { id: string }) {
  const steps = ['Exclude', 'Mask', 'Relationships', 'Changes'];
  return (
    <div id={id} className="flex items-center gap-1">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div
            className="rounded px-2 py-1 text-[9px] font-medium border"
            style={{ borderColor: '#a78bfa', backgroundColor: '#f5f3ff', color: '#6d28d9' }}
          >
            {step}
          </div>
          {i < steps.length - 1 && <span className="text-[10px]" style={{ color: '#a78bfa' }}>→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

interface CustomScraperDiagramProps {
  className?: string;
}

function CustomScraperDiagramInner({ className }: CustomScraperDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex items-center justify-center gap-10 py-6`}>
      <DataSourcesColumn idFile={id('file')} idHttp={id('http')} idSql={id('sql')} />

      <div className="flex flex-col items-center gap-3">
        <ScraperBox id={id('scraper')} />
        <TransformPipeline id={id('transform')} />
      </div>

      <JsonOutputBox id={id('json')} />
      <MissionControlBox id={id('mc')} />

      <Xarrow start={id('file')} end={id('scraper')} {...primaryArrowProps} path="smooth" startAnchor="right" endAnchor={{ position: 'left', offset: { y: -5 } }} />
      <Xarrow start={id('http')} end={id('scraper')} {...primaryArrowProps} path="straight" startAnchor="right" endAnchor="left" />
      <Xarrow start={id('sql')} end={id('scraper')} {...primaryArrowProps} path="smooth" startAnchor="right" endAnchor={{ position: 'left', offset: { y: 5 } }} />
      <Xarrow start={id('scraper')} end={id('json')} {...primaryArrowProps} path="straight" startAnchor="right" endAnchor="left" />
      <Xarrow start={id('json')} end={id('mc')} {...primaryArrowProps} path="straight" startAnchor="right" endAnchor="left" />
    </div>
  );
}

export default function CustomScraperDiagram(props: CustomScraperDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <CustomScraperDiagramInner {...props} />}
    </BrowserOnly>
  );
}
