import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import {
  Aws,
  Azure,
  K8S,
  GoogleCloud,
  Postgres,
  AzureAd,
  AwsCloudtrail,
  MissionControlWhite,
  SqlServer,
} from '@flanksource/icons/mi';
import { HiUserGroup, HiShieldCheck, HiKey } from 'react-icons/hi2';
import { FaHistory } from 'react-icons/fa';
import BoxNode from './diagrams/BoxNode';

const COLORS = {
  primary: '#2d7de4',
  background: '#f7fbfe',
  accent: '#1069dc',
  muted: '#62758a',
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

interface IconGridProps {
  items: Array<{ Icon: React.ComponentType<{ className?: string }>; label?: string }>;
  cols?: number;
  iconSize?: string;
}

function IconGrid({ items, cols = 3, iconSize = 'w-6 h-6' }: IconGridProps) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {items.map(({ Icon, label }, idx) => (
        <div key={label || idx} className="flex flex-col items-center">
          <Icon className={iconSize} />
          {label && <span className="text-[9px] mt-0.5" style={{ color: COLORS.muted }}>{label}</span>}
        </div>
      ))}
    </div>
  );
}

function IdentityProvidersBox({ id }: { id: string }) {
  return (
    <div id={id}>
      <BoxNode
        title="Identity Providers"
        headerColor={COLORS.primary}
        bodyColor={COLORS.background}
        borderColor={COLORS.primary}
        border="solid"
      >
        <IconGrid
          items={[
            { Icon: AzureAd, label: 'Entra ID' },
            { Icon: Aws, label: 'AWS IAM' },
            { Icon: K8S, label: 'K8s RBAC' },
          ]}
          cols={3}
          iconSize="w-7 h-7"
        />
      </BoxNode>
    </div>
  );
}

function UserLoginsBox({ id }: { id: string }) {
  return (
    <div id={id}>
      <BoxNode
        title="User Logins"
        headerColor={COLORS.primary}
        bodyColor={COLORS.background}
        borderColor={COLORS.primary}
        border="solid"
        compact
      >
        <IconGrid
          items={[
            { Icon: AzureAd, label: 'Entra ID' },
            { Icon: AwsCloudtrail, label: 'CloudTrail' },
            { Icon: Postgres, label: 'DB Logs' },
          ]}
          cols={3}
          iconSize="w-6 h-6"
        />
      </BoxNode>
    </div>
  );
}

function InfrastructureBox({ id }: { id: string }) {
  return (
    <div id={id}>
      <BoxNode
        title="Infrastructure"
        headerColor={COLORS.muted}
        bodyColor={COLORS.background}
        borderColor={COLORS.muted}
        border="solid"
      >
        <IconGrid
          items={[
            { Icon: Aws, label: 'AWS' },
            { Icon: Azure, label: 'Azure' },
            { Icon: GoogleCloud, label: 'GCP' },
            { Icon: K8S, label: 'K8s' },
          ]}
          cols={4}
          iconSize="w-6 h-6"
        />
      </BoxNode>
    </div>
  );
}

function DataSourcesBox({ id }: { id: string }) {
  return (
    <div id={id}>
      <BoxNode
        title="Data Sources"
        headerColor={COLORS.primary}
        bodyColor={COLORS.background}
        borderColor={COLORS.primary}
        border="solid"
      >
        <IconGrid
          items={[
            { Icon: Postgres, label: 'Postgres' },
            { Icon: SqlServer, label: 'SQL Server' },
            { Icon: AwsCloudtrail, label: 'CloudTrail' },
          ]}
          cols={3}
          iconSize="w-6 h-6"
        />
      </BoxNode>
    </div>
  );
}

function MissionControlCatalogBox({ id }: { id: string }) {
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
      <div className="p-4 grid grid-cols-2 gap-3">
        {[
          { Icon: HiUserGroup, label: 'Users & Groups' },
          { Icon: HiShieldCheck, label: 'Roles & Policies' },
          { Icon: FaHistory, label: 'Changes & Events' },
          { Icon: HiKey, label: 'Access Records' },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-2 border"
            style={{ backgroundColor: COLORS.background, borderColor: COLORS.primary }}>
            <Icon className="w-4 h-4" style={{ color: COLORS.accent }} />
            <span className="text-xs font-medium" style={{ color: COLORS.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditOutputsBox({ idApp, idViews, idAlerts }: { idApp: string; idViews: string; idAlerts: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div id={idApp}>
        <BoxNode
          title="Application CRD"
          headerColor={COLORS.primary}
          bodyColor={COLORS.background}
          borderColor={COLORS.primary}
          compact
        >
          <div className="flex flex-col gap-1">
            {['Access Control', 'Backups', 'Environments'].map((item) => (
              <div key={item} className="text-[10px] rounded px-2 py-1 text-center border"
                style={{ color: COLORS.muted, backgroundColor: COLORS.background, borderColor: COLORS.primary }}>
                {item}
              </div>
            ))}
          </div>
        </BoxNode>
      </div>
      <div id={idViews}>
        <BoxNode
          title="Audit Views"
          headerColor={COLORS.primary}
          bodyColor={COLORS.background}
          borderColor={COLORS.primary}
          compact
        >
          <div className="flex flex-col gap-1">
            {['Inventory', 'Change Trail', 'Access Summary'].map((item) => (
              <div key={item} className="text-[10px] rounded px-2 py-1 text-center border"
                style={{ color: COLORS.muted, backgroundColor: COLORS.background, borderColor: COLORS.primary }}>
                {item}
              </div>
            ))}
          </div>
        </BoxNode>
      </div>
      <div id={idAlerts}>
        <BoxNode
          title="Notifications"
          headerColor={COLORS.primary}
          bodyColor={COLORS.background}
          borderColor={COLORS.primary}
          compact
        >
          <div className="flex flex-col gap-1">
            {['Config Changes', 'Access Anomalies', 'Backup Failures'].map((item) => (
              <div key={item} className="text-[10px] rounded px-2 py-1 text-center border"
                style={{ color: COLORS.muted, backgroundColor: COLORS.background, borderColor: COLORS.primary }}>
                {item}
              </div>
            ))}
          </div>
        </BoxNode>
      </div>
    </div>
  );
}

interface AuditDiagramProps {
  className?: string;
}

function AuditDiagramInner({ className }: AuditDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative flex items-start justify-center gap-16 py-8`}>
      {/* Left: Sources stacked */}
      <div className="flex flex-col items-center gap-6">
        <IdentityProvidersBox id={id('identity')} />
        <UserLoginsBox id={id('logins')} />
        <InfrastructureBox id={id('infra')} />
        <DataSourcesBox id={id('data')} />
      </div>

      {/* Center: Mission Control */}
      <div className="flex items-center" style={{ minHeight: '420px' }}>
        <MissionControlCatalogBox id={id('catalog')} />
      </div>

      {/* Right: Outputs stacked */}
      <div className="flex items-center" style={{ minHeight: '420px' }}>
        <AuditOutputsBox idApp={id('app')} idViews={id('views')} idAlerts={id('alerts')} />
      </div>

      {/* Arrows: Sources → MC */}
      <Xarrow start={id('identity')} end={id('catalog')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right"
        endAnchor={{ position: 'left', offset: { y: -40 } }}
      />
      <Xarrow start={id('logins')} end={id('catalog')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right"
        endAnchor={{ position: 'left', offset: { y: -15 } }}
      />
      <Xarrow start={id('infra')} end={id('catalog')}
        {...secondaryArrowProps}
        path="straight"
        startAnchor="right"
        endAnchor={{ position: 'left', offset: { y: 15 } }}
      />
      <Xarrow start={id('data')} end={id('catalog')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right"
        endAnchor={{ position: 'left', offset: { y: 40 } }}
      />

      {/* Arrows: MC → Outputs */}
      <Xarrow start={id('catalog')} end={id('app')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
      />
      <Xarrow start={id('catalog')} end={id('views')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
      />
      <Xarrow start={id('catalog')} end={id('alerts')}
        {...primaryArrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
      />
    </div>
  );
}

export default function AuditDiagram(props: AuditDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <AuditDiagramInner {...props} />}
    </BrowserOnly>
  );
}
