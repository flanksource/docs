import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  Prometheus,
  Postgres,
  Http,
  K8S,
  ConfigDb,
  Changes,
  Slack,
} from '@flanksource/icons/mi';
import { FaFilePdf, FaFileCsv, FaFileCode, FaMarkdown } from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';
import BoxNode from './diagrams/BoxNode';
import { COLORS, primaryArrowProps, outputArrowProps, NodePill } from './diagrams/diagramUtils';

interface IconRowProps {
  items: Array<{ Icon: React.ComponentType<{ className?: string }>; label: string }>;
}

function IconRow({ items }: IconRowProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {items.map(({ Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-0.5">
          <Icon className="w-5 h-5" />
          <span className="text-[9px]" style={{ color: COLORS.muted }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

interface ViewsDiagramProps {
  className?: string;
}

function ViewsDiagramInner({ className }: ViewsDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex flex-row items-stretch justify-center gap-8 py-8`}>

      {/* Col 1: Sources */}
      <div className="flex flex-col justify-center gap-4">
        <div id={id('configs')}>
          <BoxNode title="Configs" headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary}>
            <IconRow items={[
              { Icon: ConfigDb, label: 'catalog' },
              { Icon: K8S, label: 'K8s' },
            ]} />
          </BoxNode>
        </div>
        <div id={id('changes')}>
          <BoxNode title="Changes" headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary}>
            <IconRow items={[{ Icon: Changes, label: 'audit trail' }]} />
          </BoxNode>
        </div>
        <div id={id('metrics')}>
          <BoxNode title="Metrics &amp; SQL &amp; HTTP" headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary}>
            <IconRow items={[
              { Icon: Prometheus, label: 'Prometheus' },
              { Icon: Postgres, label: 'SQL' },
              { Icon: Http, label: 'HTTP' },
            ]} />
          </BoxNode>
        </div>
        <div id={id('views')}>
          <BoxNode title="Views" headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary}>
            <NodePill>viewTableSelector</NodePill>
          </BoxNode>
        </div>
      </div>

      {/* Col 2: Queries */}
      <div className="flex flex-col justify-center">
        <div id={id('queries')}>
          <BoxNode title="Named Queries" headerColor={COLORS.primary} bodyColor={COLORS.background} borderColor={COLORS.primary}>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[11px] italic" style={{ color: COLORS.muted }}>$(var.key)</span>
              <NodePill>each → SQLite table</NodePill>
            </div>
          </BoxNode>
        </div>
      </div>

      {/* Col 3: SQLite */}
      <div className="flex flex-col justify-center">
        <div id={id('sqlite')}>
          <BoxNode title="In-memory SQLite" headerColor={COLORS.primary} bodyColor={COLORS.sqliteBg} borderColor={COLORS.primary}>
            <div className="flex flex-col gap-1 items-center">
              <NodePill>optional merge SQL</NodePill>
              <NodePill>join / aggregate</NodePill>
            </div>
          </BoxNode>
        </div>
      </div>

      {/* Col 4: Outputs */}
      <div className="flex flex-col justify-center gap-4">
        <div id={id('panels')}>
          <BoxNode title="Panels" headerColor={COLORS.outputBorder} bodyColor={COLORS.background} borderColor={COLORS.outputBorder}>
            <NodePill>pie · gauge · number</NodePill>
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

      {/* Arrows: Sources → Queries (fan-in) */}
      <Xarrow start={id('configs')} end={id('queries')} {...primaryArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: -30 } }} />
      <Xarrow start={id('changes')} end={id('queries')} {...primaryArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: -10 } }} />
      <Xarrow start={id('metrics')} end={id('queries')} {...primaryArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: 10 } }} />
      <Xarrow start={id('views')} end={id('queries')} {...primaryArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: 30 } }} />

      {/* Arrow: Queries → SQLite */}
      <Xarrow start={id('queries')} end={id('sqlite')} {...primaryArrowProps} path="smooth"
        startAnchor="right" endAnchor="left" />

      {/* Arrows: SQLite → Outputs (fan-out) */}
      <Xarrow start={id('sqlite')} end={id('panels')} {...outputArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: -20 } }} />
      <Xarrow start={id('sqlite')} end={id('table')} {...outputArrowProps} path="smooth"
        startAnchor="right" endAnchor="left" />
      <Xarrow start={id('sqlite')} end={id('report')} {...outputArrowProps} path="smooth"
        startAnchor="right" endAnchor={{ position: 'left', offset: { y: 20 } }} />
    </div>
  );
}

export default function ViewsDiagram(props: ViewsDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full min-h-[400px]" />}>
      {() => <ViewsDiagramInner {...props} />}
    </BrowserOnly>
  );
}
