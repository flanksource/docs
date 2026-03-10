import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import BoxNode from './diagrams/BoxNode';
import { Aws, Azure, K8S, Http, MissionControlWhite } from '@flanksource/icons/mi';
import { HiShieldCheck, HiUserGroup } from 'react-icons/hi2';

const COLORS = {
  primary: '#007fdf',
  background: '#f7fbfe',
  muted: '#607689',
  outputBorder: '#00ba85',
};

// ─── Color Swatches ──────────────────────────────────────────────────────────

function ColorSwatch({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-lg border shadow-sm flex-shrink-0" style={{ backgroundColor: hex }} />
      <div>
        <div className="font-mono text-sm font-bold">{hex}</div>
        <div className="text-xs font-semibold text-gray-700">{name}</div>
        <div className="text-xs text-gray-500">{usage}</div>
      </div>
    </div>
  );
}

export function ColorPalette() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl border bg-white">
      <ColorSwatch name="Primary" hex="#007fdf" usage="Borders, arrows, headers, accent text" />
      <ColorSwatch name="Background" hex="#f7fbfe" usage="Node fills, light backgrounds" />
      <ColorSwatch name="Muted" hex="#607689" usage="Secondary text, inactive borders" />
      <ColorSwatch name="OutputBorder" hex="#00ba85" usage="Output/result nodes (green)" />
    </div>
  );
}

// ─── Semantic Color Swatches ─────────────────────────────────────────────────

export function SemanticPalette() {
  const stages = [
    { name: 'Discover/Input', bg: 'bg-blue-600', body: 'bg-blue-50', hex: '#2563eb' },
    { name: 'Analyze/Process', bg: 'bg-amber-600', body: 'bg-amber-50', hex: '#d97706' },
    { name: 'Action/Output', bg: 'bg-violet-600', body: 'bg-violet-50', hex: '#7c3aed' },
    { name: 'Integration', bg: 'bg-emerald-500', body: 'bg-emerald-50', hex: '#10b981' },
    { name: 'Protocol/API', bg: 'bg-indigo-500', body: 'bg-indigo-50', hex: '#6366f1' },
    { name: 'Infrastructure', bg: 'bg-slate-500', body: 'bg-slate-100', hex: '#64748b' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-xl border bg-white">
      {stages.map(({ name, bg, body, hex }) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className="w-full rounded-lg overflow-hidden border shadow-sm">
            <div className={`${bg} px-3 py-1.5 text-center`}>
              <span className="text-white text-xs font-bold">{name}</span>
            </div>
            <div className={`${body} px-3 py-2 text-center`}>
              <span className="text-[10px] text-gray-600">Body area</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-gray-500">{hex}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Node Types ──────────────────────────────────────────────────────────────

function NodePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] rounded px-2 py-1 text-center"
      style={{ color: COLORS.muted, backgroundColor: COLORS.background, border: `1px solid ${COLORS.primary}` }}>
      {children}
    </div>
  );
}

export function NodeTypesShowcase() {
  const prefix = useId();
  const id = (name: string) => `${prefix}-nodes-${name}`;

  return (
    <div className="flex flex-wrap items-start gap-8 p-6 rounded-xl border bg-white">
      {/* BoxNode */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">BoxNode</span>
        <BoxNode
          id={id('boxnode')}
          title={<span className="flex items-center justify-center gap-1.5"><HiShieldCheck className="w-4 h-4" />Source</span>}
          headerColor={COLORS.primary}
          bodyColor={COLORS.background}
          borderColor={COLORS.primary}
          minWidth="160px"
        >
          <div className="flex flex-col gap-1">
            <NodePill>Item A</NodePill>
            <NodePill>Item B</NodePill>
          </div>
        </BoxNode>
      </div>

      {/* Icon+Label with border */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Icon+Label (bordered)</span>
        <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 shadow-lg"
          style={{ borderColor: COLORS.primary, backgroundColor: COLORS.background }}>
          <Http className="w-8 h-8" style={{ color: COLORS.primary }} />
          <span className="text-xs font-bold" style={{ color: COLORS.muted }}>HTTP Scraper</span>
        </div>
      </div>

      {/* IconNode (borderless) */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">IconNode (borderless)</span>
        <div className="flex flex-col items-center gap-1 px-2 py-1">
          <Aws className="w-7 h-7" style={{ color: COLORS.primary }} />
          <span className="text-[10px] font-bold" style={{ color: COLORS.muted }}>AWS</span>
        </div>
      </div>

      {/* Mission Control box */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mission Control</span>
        <div className="rounded-2xl overflow-hidden border-2 shadow-2xl"
          style={{ borderColor: COLORS.primary, backgroundColor: COLORS.background }}>
          <div className="px-4 py-2 text-center" style={{ backgroundColor: COLORS.primary }}>
            <div className="flex items-center justify-center gap-2">
              <MissionControlWhite className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-bold tracking-wide">Mission Control</span>
            </div>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2">
            <NodePill>Catalog</NodePill>
            <NodePill>Changes</NodePill>
          </div>
        </div>
      </div>

      {/* Output node */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output Node</span>
        <BoxNode
          title="Audit Report"
          headerColor={COLORS.outputBorder}
          bodyColor={COLORS.background}
          borderColor={COLORS.outputBorder}
          compact
          minWidth="160px"
        >
          <div className="flex flex-col gap-1">
            <NodePill>Result A</NodePill>
            <NodePill>Result B</NodePill>
          </div>
        </BoxNode>
      </div>

      {/* Dashed-border group */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Dashed Group</span>
        <div className="rounded-xl border-2 border-dashed px-4 py-3"
          style={{ borderColor: COLORS.primary }}>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <K8S className="w-8 h-8" />
              <span className="text-[9px] text-gray-500">K8s</span>
            </div>
            <div className="flex flex-col items-center">
              <Aws className="w-8 h-8" />
              <span className="text-[9px] text-gray-500">AWS</span>
            </div>
            <div className="flex flex-col items-center">
              <Azure className="w-8 h-8" />
              <span className="text-[9px] text-gray-500">Azure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Content Patterns ────────────────────────────────────────────────────────

export function ContentPatternsShowcase() {
  return (
    <div className="flex flex-wrap items-start gap-8 p-6 rounded-xl border bg-white">
      {/* NodePill */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">NodePill</span>
        <NodePill>Config Item</NodePill>
      </div>

      {/* NodeSection */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">NodeSection</span>
        <div className="flex flex-col gap-1">
          <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: COLORS.muted }}>
            Identity
          </div>
          <NodePill>Users</NodePill>
          <NodePill>Groups</NodePill>
        </div>
      </div>

      {/* Feature pill */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Feature Pill</span>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ backgroundColor: COLORS.primary }}>
          <HiShieldCheck className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Health Checks</span>
        </div>
      </div>

      {/* Catalog pill */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Catalog Pill</span>
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 border"
          style={{ backgroundColor: COLORS.background, borderColor: COLORS.primary }}>
          <HiUserGroup className="w-4 h-4" style={{ color: COLORS.primary }} />
          <span className="text-xs font-medium" style={{ color: COLORS.muted }}>Identities</span>
        </div>
      </div>

      {/* Section divider */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Section Divider</span>
        <div className="w-32">
          <NodePill>Above</NodePill>
          <div className="w-full h-px my-2" style={{ backgroundColor: COLORS.primary, opacity: 0.2 }} />
          <NodePill>Below</NodePill>
        </div>
      </div>
    </div>
  );
}

// ─── Arrow Styles ────────────────────────────────────────────────────────────

function ArrowShowcaseInner() {
  const prefix = useId();
  const id = (name: string) => `${prefix}-arrow-${name}`;

  return (
    <div className="flex flex-col gap-12 p-6 rounded-xl border bg-white" style={{ minHeight: '500px' }}>
      {/* Primary arrow */}
      <div className="flex items-center justify-center gap-32">
        <div id={id('p-start')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.primary, color: COLORS.primary }}>Source</div>
        <div id={id('p-end')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.primary, color: COLORS.primary }}>Target</div>
      </div>
      <div className="text-center text-xs font-bold text-gray-500 -mt-8">Primary — animated dashed, main data flow</div>

      {/* Secondary arrow */}
      <div className="flex items-center justify-center gap-32">
        <div id={id('s-start')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.muted, color: COLORS.muted }}>Source</div>
        <div id={id('s-end')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.muted, color: COLORS.muted }}>Target</div>
      </div>
      <div className="text-center text-xs font-bold text-gray-500 -mt-8">Secondary — animated dashed, supplementary flow</div>

      {/* ER Relationship */}
      <div className="flex items-center justify-center gap-32">
        <div id={id('er-start')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.muted, color: COLORS.muted }}>Table A</div>
        <div id={id('er-end')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.muted, color: COLORS.muted }}>Table B</div>
      </div>
      <div className="text-center text-xs font-bold text-gray-500 -mt-8">ER Relationship — static solid, structural</div>

      {/* Static connection (hub & spoke) */}
      <div className="flex items-center justify-center gap-32">
        <div id={id('hub-start')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.primary, color: COLORS.primary }}>Hub</div>
        <div id={id('hub-end')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.primary, color: COLORS.primary }}>Spoke</div>
      </div>
      <div className="text-center text-xs font-bold text-gray-500 -mt-8">Static Connection — solid with circle heads, hub & spoke</div>

      {/* Bidirectional */}
      <div className="flex items-center justify-center gap-32">
        <div id={id('bi-start')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.muted, color: COLORS.muted }}>Node A</div>
        <div id={id('bi-end')} className="rounded-lg px-3 py-2 border-2 text-xs font-bold"
          style={{ borderColor: COLORS.muted, color: COLORS.muted }}>Node B</div>
      </div>
      <div className="text-center text-xs font-bold text-gray-500 -mt-8">Bidirectional — solid with circle heads both ends</div>

      {/* Xarrows */}
      <Xarrow start={id('p-start')} end={id('p-end')} color={COLORS.primary} strokeWidth={3} headSize={4}
        dashness={{ strokeLen: 10, nonStrokeLen: 5, animation: 1 }} startAnchor="right" endAnchor="left" />
      <Xarrow start={id('s-start')} end={id('s-end')} color={COLORS.muted} strokeWidth={2} headSize={3}
        dashness={{ strokeLen: 6, nonStrokeLen: 4, animation: 1 }} startAnchor="right" endAnchor="left" />
      <Xarrow start={id('er-start')} end={id('er-end')} color={COLORS.muted} strokeWidth={1.5} headSize={4}
        startAnchor="right" endAnchor="left" />
      <Xarrow start={id('hub-start')} end={id('hub-end')} color={COLORS.primary} strokeWidth={2}
        headShape="circle" headSize={3} startAnchor="right" endAnchor="left" />
      <Xarrow start={id('bi-start')} end={id('bi-end')} color={COLORS.muted} strokeWidth={2}
        headShape="circle" tailShape="circle" headSize={3} tailSize={3} startAnchor="right" endAnchor="left" />
    </div>
  );
}

export function ArrowShowcase() {
  return (
    <BrowserOnly fallback={<div className="w-full h-96" />}>
      {() => <ArrowShowcaseInner />}
    </BrowserOnly>
  );
}

// ─── Mini Pipeline Demo ──────────────────────────────────────────────────────

function MiniPipelineInner() {
  const prefix = useId();
  const id = (name: string) => `${prefix}-pipe-${name}`;

  return (
    <div className="flex items-center justify-center gap-16 py-8">
      <BoxNode id={id('source')} title="Entra ID"
        headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary} minWidth="140px">
        <div className="flex flex-col gap-1">
          <NodePill>Users</NodePill>
          <NodePill>Groups</NodePill>
        </div>
      </BoxNode>

      <div className="flex flex-col items-center gap-1 px-2 py-1">
        <Http className="w-7 h-7" style={{ color: COLORS.primary }} />
        <span className="text-[10px] font-bold" style={{ color: COLORS.muted }}>HTTP</span>
      </div>

      <div id={id('mc')} className="rounded-2xl overflow-hidden border-2 shadow-2xl"
        style={{ borderColor: COLORS.primary, backgroundColor: COLORS.background }}>
        <div className="px-5 py-2 text-center" style={{ backgroundColor: COLORS.primary }}>
          <div className="flex items-center justify-center gap-2">
            <MissionControlWhite className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-bold tracking-wide">Mission Control</span>
          </div>
        </div>
        <div className="p-3 grid grid-cols-2 gap-2">
          <NodePill>Catalog</NodePill>
          <NodePill>Changes</NodePill>
        </div>
      </div>

      <BoxNode id={id('output')} title="Report"
        headerColor={COLORS.outputBorder} bodyColor={COLORS.background} borderColor={COLORS.outputBorder}
        compact minWidth="140px">
        <div className="flex flex-col gap-1">
          <NodePill>Access Review</NodePill>
        </div>
      </BoxNode>

      <Xarrow start={id('source')} end={id('mc')} {...{
        color: COLORS.primary, strokeWidth: 3, headSize: 4,
        dashness: { strokeLen: 10, nonStrokeLen: 5, animation: 1 },
      }} startAnchor="right" endAnchor="left" />
      <Xarrow start={id('mc')} end={id('output')} {...{
        color: COLORS.muted, strokeWidth: 2, headSize: 3,
        dashness: { strokeLen: 6, nonStrokeLen: 4, animation: 1 },
      }} startAnchor="right" endAnchor="left" />
    </div>
  );
}

export function MiniPipeline() {
  return (
    <BrowserOnly fallback={<div className="w-full h-40" />}>
      {() => <MiniPipelineInner />}
    </BrowserOnly>
  );
}

// ─── Typography Reference ────────────────────────────────────────────────────

export function TypographyShowcase() {
  return (
    <div className="p-6 rounded-xl border bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-xs text-gray-500">Element</th>
            <th className="py-2 text-xs text-gray-500">Class</th>
            <th className="py-2 text-xs text-gray-500">Live</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 text-xs text-gray-600">BoxNode header</td>
            <td className="py-2 font-mono text-[10px] text-gray-500">text-white text-xs font-bold</td>
            <td className="py-2"><span className="text-white text-xs font-bold bg-blue-600 px-2 py-1 rounded">Header</span></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-xs text-gray-600">Body text</td>
            <td className="py-2 font-mono text-[10px] text-gray-500">text-[10px]</td>
            <td className="py-2"><span className="text-[10px]" style={{ color: COLORS.muted }}>Body content text</span></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-xs text-gray-600">Section header</td>
            <td className="py-2 font-mono text-[10px] text-gray-500">text-[9px] font-bold uppercase tracking-wide</td>
            <td className="py-2"><span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: COLORS.muted }}>SECTION</span></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-xs text-gray-600">Icon label (tiny)</td>
            <td className="py-2 font-mono text-[10px] text-gray-500">text-[8px] text-gray-500</td>
            <td className="py-2"><span className="text-[8px] text-gray-500">Icon caption</span></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-xs text-gray-600">Arrow label</td>
            <td className="py-2 font-mono text-[10px] text-gray-500">text-[9px] font-semibold</td>
            <td className="py-2">
              <span className="text-[9px] font-semibold rounded px-1.5 py-0.5"
                style={{ backgroundColor: COLORS.background, color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}>
                Scraper
              </span>
            </td>
          </tr>
          <tr>
            <td className="py-2 text-xs text-gray-600">Catalog title</td>
            <td className="py-2 font-mono text-[10px] text-gray-500">text-white text-lg font-bold tracking-wide</td>
            <td className="py-2"><span className="text-white text-lg font-bold tracking-wide bg-blue-600 px-3 py-1 rounded">Title</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
