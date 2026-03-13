import React, { useId } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Xarrow from 'react-xarrows';

const COLORS = {
  primary: '#2d7de4',
  background: '#f7fbfe',
  accent: '#1069dc',
  muted: '#62758a',
  fk: '#10b981',
  pk: '#f59e0b',
};

const arrowProps = {
  color: COLORS.muted,
  strokeWidth: 1.5,
  headSize: 4,
} as const;

interface FieldDef {
  name: string;
  type: string;
  pk?: boolean;
  fk?: boolean;
}

interface EntityBoxProps {
  id: string;
  title: string;
  fields: FieldDef[];
  accent?: string;
}

function EntityBox({ id, title, fields, accent = COLORS.primary }: EntityBoxProps) {
  return (
    <div
      id={id}
      className="rounded-xl overflow-hidden shadow-lg border-2"
      style={{ borderColor: accent, minWidth: '170px', backgroundColor: COLORS.background }}
    >
      <div className="px-3 py-1.5 text-center" style={{ backgroundColor: accent }}>
        <span className="text-white text-xs font-bold">{title}</span>
      </div>
      <div className="px-2 py-1.5">
        {fields.map((f) => (
          <div key={f.name} className="flex items-center gap-1.5 py-0.5">
            {f.pk && (
              <span className="text-[8px] font-bold px-1 rounded" style={{ backgroundColor: COLORS.pk, color: '#fff' }}>PK</span>
            )}
            {f.fk && (
              <span className="text-[8px] font-bold px-1 rounded" style={{ backgroundColor: COLORS.fk, color: '#fff' }}>FK</span>
            )}
            {!f.pk && !f.fk && <span className="w-[18px]" />}
            <span className="text-[10px] font-semibold" style={{ color: COLORS.accent }}>{f.name}</span>
            <span className="text-[9px] ml-auto" style={{ color: COLORS.muted }}>{f.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelLabel({ text }: { text: string }) {
  return (
    <div className="text-[8px] font-semibold px-1 rounded whitespace-nowrap"
      style={{ backgroundColor: COLORS.background, color: COLORS.muted, border: `1px solid ${COLORS.muted}` }}>
      {text}
    </div>
  );
}

const entities = {
  application: {
    title: 'Application',
    fields: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'string' },
      { name: 'namespace', type: 'string' },
      { name: 'spec', type: 'json' },
    ],
  },
  configItem: {
    title: 'ConfigItem',
    fields: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'string' },
      { name: 'type', type: 'string' },
      { name: 'config_class', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'health', type: 'string' },
    ],
  },
  externalUser: {
    title: 'User',
    fields: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'string' },
      { name: 'account_id', type: 'string' },
      { name: 'user_type', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'aliases', type: '[]string' },
      { name: 'scraper_id', type: 'uuid', fk: true },
    ],
  },
  externalGroup: {
    title: 'Group',
    fields: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'string' },
      { name: 'account_id', type: 'string' },
      { name: 'group_type', type: 'string' },
      { name: 'aliases', type: '[]string' },
      { name: 'scraper_id', type: 'uuid', fk: true },
    ],
  },
  externalRole: {
    title: 'Role',
    fields: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'string' },
      { name: 'account_id', type: 'string' },
      { name: 'role_type', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'aliases', type: '[]string' },
      { name: 'application_id', type: 'uuid', fk: true },
      { name: 'scraper_id', type: 'uuid', fk: true },
    ],
  },
  externalUserGroup: {
    title: 'UserGroup',
    fields: [
      { name: 'external_user_id', type: 'uuid', pk: true, fk: true },
      { name: 'external_group_id', type: 'uuid', pk: true, fk: true },
    ],
  },
  configAccess: {
    title: 'ConfigAccess',
    fields: [
      { name: 'id', type: 'string', pk: true },
      { name: 'config_id', type: 'uuid', fk: true },
      { name: 'external_user_id', type: 'uuid', fk: true },
      { name: 'external_group_id', type: 'uuid', fk: true },
      { name: 'external_role_id', type: 'uuid', fk: true },
      { name: 'application_id', type: 'uuid', fk: true },
      { name: 'scraper_id', type: 'uuid', fk: true },
      { name: 'source', type: 'string' },
      { name: 'last_reviewed_at', type: 'timestamp' },
      { name: 'last_reviewed_by', type: 'uuid' },
    ],
  },
  configAccessLog: {
    title: 'ConfigAccessLog',
    fields: [
      { name: 'config_id', type: 'uuid', pk: true, fk: true },
      { name: 'external_user_id', type: 'uuid', pk: true, fk: true },
      { name: 'scraper_id', type: 'uuid', pk: true, fk: true },
      { name: 'created_at', type: 'timestamp' },
      { name: 'mfa', type: 'bool' },
      { name: 'count', type: 'int' },
      { name: 'properties', type: 'jsonb' },
    ],
  },
};

interface EntityModelDiagramProps {
  className?: string;
}

function EntityModelDiagramInner({ className }: EntityModelDiagramProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <div className={`${className || ''} relative py-6`} style={{ minWidth: '1000px' }}>
      {/* Row 1: Application + ConfigItem */}
      <div className="flex justify-center gap-24 mb-12">
        <EntityBox id={id('application-box')} accent={COLORS.accent} {...entities.application} />
        <EntityBox id={id('configItem-box')} accent={COLORS.accent} {...entities.configItem} />
      </div>

      {/* Row 2: User — ConfigAccess (center) — Role */}
      <div className="flex justify-center items-start gap-12 mb-12">
        <EntityBox id={id('externalUser-box')} {...entities.externalUser} />
        <EntityBox id={id('configAccess-box')} accent={COLORS.fk} {...entities.configAccess} />
        <EntityBox id={id('externalRole-box')} {...entities.externalRole} />
      </div>

      {/* Row 3: UserGroup — Group — ConfigAccessLog */}
      <div className="flex justify-center items-start gap-12">
        <EntityBox id={id('externalUserGroup-box')} accent={COLORS.muted} {...entities.externalUserGroup} />
        <EntityBox id={id('externalGroup-box')} {...entities.externalGroup} />
        <EntityBox id={id('configAccessLog-box')} accent={COLORS.fk} {...entities.configAccessLog} />
      </div>

      {/* --- Relationship arrows --- */}

      {/* ConfigAccess → ConfigItem */}
      <Xarrow start={id('configAccess-box')} end={id('configItem-box')}
        {...arrowProps} color={COLORS.fk}
        startAnchor={{ position: 'top', offset: { x: 20 } }}
        endAnchor="bottom"
        labels={{ middle: <RelLabel text="N:1" /> }}
      />
      {/* ConfigAccess → Application */}
      <Xarrow start={id('configAccess-box')} end={id('application-box')}
        {...arrowProps}
        startAnchor={{ position: 'top', offset: { x: -20 } }}
        endAnchor="bottom"
      />
      {/* ConfigAccess → User */}
      <Xarrow start={id('configAccess-box')} end={id('externalUser-box')}
        {...arrowProps}
        path="straight"
        startAnchor="left" endAnchor="right"
        labels={{ middle: <RelLabel text="N:1" /> }}
      />
      {/* ConfigAccess → Role */}
      <Xarrow start={id('configAccess-box')} end={id('externalRole-box')}
        {...arrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
      />
      {/* ConfigAccess → Group */}
      <Xarrow start={id('configAccess-box')} end={id('externalGroup-box')}
        {...arrowProps}
        path="straight"
        startAnchor="bottom" endAnchor="top"
      />

      {/* ConfigAccessLog → ConfigItem */}
      <Xarrow start={id('configAccessLog-box')} end={id('configItem-box')}
        {...arrowProps} color={COLORS.fk}
        startAnchor="right"
        endAnchor={{ position: 'right', offset: { y: 10 } }}
      />
      {/* ConfigAccessLog → User */}
      <Xarrow start={id('configAccessLog-box')} end={id('externalUser-box')}
        {...arrowProps}
        startAnchor={{ position: 'left', offset: { y: -10 } }}
        endAnchor={{ position: 'bottom', offset: { x: 20 } }}
      />

      {/* Role → Application */}
      <Xarrow start={id('externalRole-box')} end={id('application-box')}
        {...arrowProps}
        startAnchor="top" endAnchor="bottom"
        labels={{ middle: <RelLabel text="N:1" /> }}
      />

      {/* UserGroup → User */}
      <Xarrow start={id('externalUserGroup-box')} end={id('externalUser-box')}
        {...arrowProps}
        path="straight"
        startAnchor="top" endAnchor="bottom"
        labels={{ middle: <RelLabel text="N:1" /> }}
      />
      {/* UserGroup → Group */}
      <Xarrow start={id('externalUserGroup-box')} end={id('externalGroup-box')}
        {...arrowProps}
        path="straight"
        startAnchor="right" endAnchor="left"
        labels={{ middle: <RelLabel text="N:1" /> }}
      />
    </div>
  );
}

export default function EntityModelDiagram(props: EntityModelDiagramProps) {
  return (
    <BrowserOnly fallback={<div className="w-full" />}>
      {() => <EntityModelDiagramInner {...props} />}
    </BrowserOnly>
  );
}
