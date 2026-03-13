import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';
import BoxNode from './diagrams/BoxNode';
import {
  AzureAd,
  Aws,
  K8S,
  Postgres,
} from '@flanksource/icons/mi';

const COLORS = {
  primary: '#2d7de4',
  background: '#f7fbfe',
  accent: '#1069dc',
  muted: '#62758a',
  green: '#10b981',
};

const arrowProps = {
  color: COLORS.muted,
  strokeWidth: 2,
  headSize: 4,
  path: 'straight' as const,
};

function ConceptBox({ id, title, items, accent = COLORS.primary }: {
  id: string;
  title: string;
  items: string[];
  accent?: string;
}) {
  return (
    <div id={id}>
      <BoxNode
        title={title}
        headerColor={accent}
        bodyColor={COLORS.background}
        borderColor={accent}
        compact
        minWidth="140px"
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <div key={item} className="text-[10px] px-2 py-0.5" style={{ color: COLORS.muted }}>
              {item}
            </div>
          ))}
        </div>
      </BoxNode>
    </div>
  );
}

function SourcesBox({ id }: { id: string }) {
  return (
    <div id={id}>
      <BoxNode
        title="Identity Providers"
        headerColor={COLORS.muted}
        bodyColor={COLORS.background}
        borderColor={COLORS.muted}
        border="solid"
        minWidth="120px"
      >
        <div className="grid grid-cols-4 gap-2">
          {[
            { Icon: AzureAd, label: 'Entra ID' },
            { Icon: Aws, label: 'AWS IAM' },
            { Icon: K8S, label: 'K8s RBAC' },
            { Icon: Postgres, label: 'Databases' },
          ].map(({ Icon, label }) => (
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

function RelLabel({ text }: { text: string }) {
  return (
    <div className="text-[9px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap"
      style={{ backgroundColor: '#fff', color: COLORS.muted, border: `1px solid ${COLORS.muted}` }}>
      {text}
    </div>
  );
}

interface AuditConceptDiagramProps {
  className?: string;
}

function AuditConceptDiagramInner({ className }: AuditConceptDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative py-6`} style={{ minWidth: '650px' }}>
      {/* Row 1: Identity Providers (centered) */}
      <div className="flex justify-center mb-12">
        <SourcesBox id={id('sources')} />
      </div>

      {/* Row 2: Users / Groups / Roles */}
      <div className="flex justify-center items-start gap-12 mb-12">
        <ConceptBox id={id('users')} title="Users" items={['Name, email, account', 'Linked to identity provider']} />
        <ConceptBox id={id('groups')} title="Groups" items={['Teams, departments', 'Contain users']} />
        <ConceptBox id={id('roles')} title="Roles" items={['Permission sets', 'e.g. Admin, Reader']} />
      </div>

      {/* Row 3: Permissions / Resources / Access Events */}
      <div className="flex justify-center items-start gap-12 mb-12">
        <ConceptBox id={id('permissions')} title="Permissions" accent={COLORS.green}
          items={['Links user/group/role', 'to a resource']} />
        <ConceptBox id={id('resources')} title="Resources" accent={COLORS.accent}
          items={['Config items in catalog', 'AWS, Azure, K8s, DB...']} />
        <ConceptBox id={id('events')} title="Access Events" accent={COLORS.green}
          items={['Who accessed what', 'Timestamp, MFA status']} />
      </div>

      {/* Row 4: Application (centered) */}
      <div className="flex justify-center">
        <ConceptBox id={id('app')} title="Application" accent={COLORS.accent}
          items={['Groups everything into', 'a single auditable unit']} />
      </div>

      {/* Sources → Users/Groups/Roles (fan down) */}
      <Xarrow start={id('sources')} end={id('users')} {...arrowProps}
        startAnchor={{ position: 'bottom', offset: { x: -40 } }}
        endAnchor="top"
        labels={{ middle: <RelLabel text="scraped into" /> }}
      />
      <Xarrow start={id('sources')} end={id('groups')} {...arrowProps}
        startAnchor="bottom" endAnchor="top"
      />
      <Xarrow start={id('sources')} end={id('roles')} {...arrowProps}
        startAnchor={{ position: 'bottom', offset: { x: 40 } }}
        endAnchor="top"
      />

      {/* Users → Groups (belongs to) */}
      <Xarrow start={id('users')} end={id('groups')} {...arrowProps}
        startAnchor="right" endAnchor="left"
        labels={{ middle: <RelLabel text="belongs to" /> }}
      />

      {/* Permissions → Users (vertical, aligned columns) */}
      <Xarrow start={id('permissions')} end={id('users')} {...arrowProps} color={COLORS.green}
        startAnchor="top" endAnchor="bottom"
        labels={{ middle: <RelLabel text="grants access to" /> }}
      />
      {/* Permissions → Resources (same row, right→left) */}
      <Xarrow start={id('permissions')} end={id('resources')} {...arrowProps} color={COLORS.green}
        startAnchor="right" endAnchor="left"
        labels={{ middle: <RelLabel text="on resource" /> }}
      />

      {/* Access Events → Resources (same row, left→right) */}
      <Xarrow start={id('events')} end={id('resources')} {...arrowProps} color={COLORS.green}
        startAnchor="left" endAnchor="right"
        labels={{ middle: <RelLabel text="accessed" /> }}
      />

      {/* Application → row 3 (fan up) */}
      <Xarrow start={id('app')} end={id('permissions')} {...arrowProps} color={COLORS.accent}
        startAnchor={{ position: 'top', offset: { x: -40 } }}
        endAnchor="bottom"
        labels={{ middle: <RelLabel text="ties together" /> }}
      />
      <Xarrow start={id('app')} end={id('resources')} {...arrowProps} color={COLORS.accent}
        startAnchor="top" endAnchor="bottom"
      />
      <Xarrow start={id('app')} end={id('events')} {...arrowProps} color={COLORS.accent}
        startAnchor={{ position: 'top', offset: { x: 40 } }}
        endAnchor="bottom"
      />
    </div>
  );
}

export default function AuditConceptDiagram(props: AuditConceptDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <AuditConceptDiagramInner {...props} />}
    </BrowserOnly>
  );
}
