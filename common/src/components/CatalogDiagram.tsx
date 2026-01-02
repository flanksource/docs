import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  Github,
  AzureDevops,
  Gitlab,
  Aws,
  Terraform,
  Azure,
  ConfigDbWhite,
  K8S,
  Gcp,
  Flux,
  Argo,
  Prometheus,
  Datadog,
  Dynatrace,
  AwsCloudwatch,
  Opensearch,
  Postgres,
  SqlServer,
  GoogleCloud,
  AzureAd,
  AwsCloudtrail,
  Clickhouse,
} from '@flanksource/icons/mi';

interface IconGridProps {
  items: Array<{ Icon: React.ComponentType<{ className?: string }>; label?: string }>;
  cols?: number;
  iconSize?: string;
}

function IconGrid({ items, cols = 5, iconSize = 'w-6 h-6' }: IconGridProps) {
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map(({ Icon, label }, idx) => (
        <div key={label || idx} className="flex flex-col items-center">
          <Icon className={iconSize} />
        </div>
      ))}
    </div>
  );
}

interface BoxNodeProps {
  id?: string;
  className?: string;
  bodyClassName?: string;
  border?: 'solid' | 'dashed';
  children?: React.ReactNode;
}

function BoxNode({ id, className = '', bodyClassName = '', border = 'dashed', children }: BoxNodeProps) {
  const bgMatch = className.match(/bg-(\w+)-(\d+)/);
  const borderClass = bgMatch ? `border-${bgMatch[1]}-${bgMatch[2]}` : 'border-slate-300';
  const borderStyle = `border-2 ${border === 'dashed' ? 'border-dashed' : 'border-solid'} ${borderClass}`;

  return (
    <div id={id} className={`rounded-xl overflow-hidden shadow-md ${borderStyle} ${bodyClassName}`}>
      <div className="p-3">{children}</div>
    </div>
  );
}

function GitCicdBox() {
  const items = [
    { Icon: Github },
    { Icon: AzureDevops },
    { Icon: Gitlab },
    { Icon: Flux },
    { Icon: Argo },
  ];
  return (
    <div id="gitCicd">
      <BoxNode bodyClassName="bg-slate-50" border="dashed" className="bg-slate-300">
        <IconGrid items={items} cols={5} />
      </BoxNode>
    </div>
  );
}

function CloudK8sBox() {
  const items = [
    { Icon: Aws },
    { Icon: Azure },
    { Icon: GoogleCloud },
    { Icon: K8S },
    { Icon: Terraform },
  ];
  return (
    <div id="cloudK8s">
      <BoxNode bodyClassName="bg-slate-50" border="dashed" className="bg-slate-300">
        <IconGrid items={items} cols={5} />
      </BoxNode>
    </div>
  );
}

function DatabasesBox() {
  const items = [
    { Icon: Postgres },
    { Icon: Clickhouse },
    { Icon: SqlServer },
    { Icon: AzureAd },
    { Icon: AwsCloudtrail }
  ];
  return (
    <div id="databases">
      <BoxNode bodyClassName="bg-slate-50" border="dashed" className="bg-slate-300">
        <IconGrid items={items} cols={5} />
      </BoxNode>
    </div>
  );
}

function InsightsBox() {
  const items = [
    { Icon: Prometheus },
    { Icon: Datadog },
    { Icon: Dynatrace },
    { Icon: AwsCloudwatch },
    { Icon: Opensearch },
  ];
  return (
    <div id="insights">
      <BoxNode bodyClassName="bg-slate-50" border="dashed" className="bg-slate-300">
        <IconGrid items={items} cols={5} />
      </BoxNode>
    </div>
  );
}

function UnifiedCatalogBox() {
  return (
    <div
      id="catalog"
      className="flex items-center gap-2 rounded-lg px-4 py-2 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
      }}
    >
      <ConfigDbWhite className="w-8 h-8 text-white" />
      <span className="text-white font-semibold text-sm">Unified Catalog</span>
    </div>
  );
}

interface CatalogDiagramProps {
  className?: string;
}

function CatalogDiagramInner({ className }: CatalogDiagramProps) {
  return (
    <div className={`${className || ''} relative flex flex-col items-center gap-8 py-4`}>
      {/* Top row: Git/CI-CD and Cloud/K8s */}
      <div className="flex items-center gap-8">
        <GitCicdBox />
        <CloudK8sBox />
      </div>

      {/* Center: Unified Catalog */}
      <UnifiedCatalogBox />

      {/* Bottom row: Databases and Insights */}
      <div className="flex items-center gap-8">
        <DatabasesBox />
        <InsightsBox />
      </div>

      {/* Arrows from sources to catalog */}
      <Xarrow
        start="gitCicd"
        end="catalog"
        color="#93c5fd"
        strokeWidth={3}
        startAnchor="bottom"
        endAnchor={{ position: 'top', offset: { x: -40 } }}
        dashness={{ strokeLen: 8, nonStrokeLen: 4, animation: 1 }}
        headSize={4}
      />
      <Xarrow
        start="cloudK8s"
        end="catalog"
        color="#93c5fd"
        strokeWidth={3}
        startAnchor="bottom"
        endAnchor={{ position: 'top', offset: { x: 40 } }}
        dashness={{ strokeLen: 8, nonStrokeLen: 4, animation: 1 }}
        headSize={4}
      />
      <Xarrow
        start="databases"
        end="catalog"
        color="#93c5fd"
        strokeWidth={3}
        startAnchor="top"
        endAnchor={{ position: 'bottom', offset: { x: -40 } }}
        dashness={{ strokeLen: 8, nonStrokeLen: 4, animation: 1 }}
        headSize={4}
      />
      <Xarrow
        start="insights"
        end="catalog"
        color="#93c5fd"
        strokeWidth={3}
        startAnchor="top"
        endAnchor={{ position: 'bottom', offset: { x: 40 } }}
        dashness={{ strokeLen: 8, nonStrokeLen: 4, animation: 1 }}
        headSize={4}
      />
    </div>
  );
}

export default function CatalogDiagram(props: CatalogDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <CatalogDiagramInner {...props} />}
    </BrowserOnly>
  );
}
