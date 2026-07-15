import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  Prometheus,
  Postgres,
  Http,
  ConfigDb,
  Changes,
  Slack,
} from '@flanksource/icons/mi';
import { FaFilePdf, FaFileCsv, FaFileCode, FaMarkdown } from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';
import BoxNode from './diagrams/BoxNode';
import { COLORS, primaryArrowProps, outputArrowProps, NodePill } from './diagrams/diagramUtils';

interface IconGridProps {
  items: Array<{ Icon: React.ComponentType<{ className?: string }>; label: string }>;
}

function IconGrid({ items }: IconGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(({ Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-0.5">
          <Icon className="w-5 h-5" />
          <span className="text-[9px]" style={{ color: COLORS.muted }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

interface ViewsVariablesDiagramProps {
  className?: string;
}

function ViewsVariablesDiagramInner({ className }: ViewsVariablesDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex flex-row items-stretch justify-center gap-8 py-8`}>

      {/* Col 1: Data Sources */}
      <div className="flex flex-col justify-center">
        <div id={id('sources')}>
          <BoxNode title="Data Sources" headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary}>
            <IconGrid items={[
              { Icon: ConfigDb, label: 'configs' },
              { Icon: Changes, label: 'changes' },
              { Icon: Prometheus, label: 'prometheus' },
              { Icon: Postgres, label: 'sql' },
              { Icon: Http, label: 'http' },
              { Icon: ConfigDb, label: 'viewTable' },
            ]} />
          </BoxNode>
        </div>
      </div>

      {/* Col 2: Named Queries */}
      <div className="flex flex-col justify-center">
        <div id={id('queries')}>
          <BoxNode title="Named Queries" headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary}>
            <NodePill>each → SQLite table</NodePill>
          </BoxNode>
        </div>
      </div>

      {/* Col 3: In-memory SQLite */}
      <div className="flex flex-col justify-center">
        <div id={id('sqlite')}>
          <BoxNode title="In-memory SQLite" headerColor={COLORS.primary} bodyColor={COLORS.sqliteBg} borderColor={COLORS.primary}>
            <NodePill>optional merge SQL</NodePill>
          </BoxNode>
        </div>
      </div>

      {/* Col 4: PostgreSQL */}
      <div className="flex flex-col justify-center">
        <div id={id('postgres')}>
          <BoxNode title="PostgreSQL Table" headerColor={COLORS.outputBorder} bodyColor={COLORS.background} borderColor={COLORS.outputBorder}>
            <span className="text-[10px] font-mono" style={{ color: COLORS.muted }}>
              view_&lt;ns&gt;_&lt;name&gt;
            </span>
          </BoxNode>
        </div>
      </div>

      {/* Col 5: PostgREST API */}
      <div className="flex flex-col justify-center">
        <div id={id('api')}>
          <BoxNode title="PostgREST API" headerColor={COLORS.muted} bodyColor={COLORS.background} borderColor={COLORS.muted}>
            <div className="flex flex-col gap-1 items-center">
              <NodePill>Column Filters</NodePill>
              <NodePill>→ WHERE clauses</NodePill>
            </div>
          </BoxNode>
        </div>
      </div>

      {/* Col 6: Outputs */}
      <div className="flex flex-col justify-center gap-4">
        <div id={id('panels')}>
          <BoxNode title="UI / Panels" headerColor={COLORS.outputBorder} bodyColor={COLORS.background} borderColor={COLORS.outputBorder}>
            <NodePill>visualizations</NodePill>
          </BoxNode>
        </div>
        <div id={id('table')}>
          <BoxNode title="Table" headerColor={COLORS.outputBorder} bodyColor={COLORS.background} borderColor={COLORS.outputBorder}>
            <NodePill>typed columns</NodePill>
          </BoxNode>
        </div>
        <div id={id('report')}>
          <BoxNode title="Report Action" headerColor={COLORS.outputBorder} bodyColor={COLORS.background} borderColor={COLORS.outputBorder}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { Icon: FaFilePdf, label: 'PDF' },
                { Icon: FaFileCsv, label: 'CSV' },
                { Icon: VscJson, label: 'JSON' },
                { Icon: FaFileCode, label: 'HTML' },
                { Icon: FaMarkdown, label: 'MD' },
                { Icon: Slack, label: 'Slack' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-0.5">
                  <Icon className="w-4 h-4" style={{ color: COLORS.muted }} />
                  <span className="text-[9px]" style={{ color: COLORS.muted }}>{label}</span>
                </div>
              ))}
            </div>
          </BoxNode>
        </div>
      </div>

      {/* Arrow: Sources → Queries with $(var.key) label */}
      <Xarrow
        start={id('sources')}
        end={id('queries')}
        {...primaryArrowProps}
        path="smooth"
        startAnchor="right"
        endAnchor="left"
        labels={{
          middle: (
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
              style={{ color: COLORS.primary, backgroundColor: COLORS.background, borderColor: COLORS.primary }}
            >
              $(var.key)
            </span>
          ),
        }}
      />

      {/* Arrows: Queries → SQLite → PostgreSQL → API */}
      <Xarrow start={id('queries')} end={id('sqlite')} {...primaryArrowProps}
        path="smooth" startAnchor="right" endAnchor="left" />
      <Xarrow start={id('sqlite')} end={id('postgres')} {...primaryArrowProps}
        path="smooth" startAnchor="right" endAnchor="left" />
      <Xarrow start={id('postgres')} end={id('api')} {...primaryArrowProps}
        path="smooth" startAnchor="right" endAnchor="left" />

      {/* Arrows: API → Outputs (fan-out) */}
      <Xarrow start={id('api')} end={id('panels')} {...outputArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: -20 } }} />
      <Xarrow start={id('api')} end={id('table')} {...outputArrowProps} path="smooth"
        startAnchor="right" endAnchor="left" />
      <Xarrow start={id('api')} end={id('report')} {...outputArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: 20 } }} />
    </div>
  );
}

export default function ViewsVariablesDiagram(props: ViewsVariablesDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full min-h-[400px]" />}>
      {() => <ViewsVariablesDiagramInner {...props} />}
    </BrowserOnly>
  );
}
