import React from 'react';
import { ConfigDb, Health, Playbook, Bell, Webhook } from '@flanksource/icons/mi';

const capabilities = {
  scraper: {
    icon: ConfigDb,
    label: 'Scraper',
    color: '#2563eb',
    bg: '#dbeafe',
    border: '#93c5fd'
  },
  healthcheck: {
    icon: Health,
    label: 'Health Check',
    color: '#d97706',
    bg: '#fef3c7',
    border: '#fcd34d'
  },
  playbook: {
    icon: Playbook,
    label: 'Playbook',
    color: '#7c3aed',
    bg: '#ede9fe',
    border: '#c4b5fd'
  },
  notifications: {
    icon: Bell,
    label: 'Notifications',
    color: '#16a34a',
    bg: '#dcfce7',
    border: '#86efac'
  },
  actions: {
    icon: Webhook,
    label: 'Actions',
    color: '#4f46e5',
    bg: '#e0e7ff',
    border: '#a5b4fc'
  },
  'relationship': {
    icon: ConfigDb,
    label: 'Relationship',
    color: '#d97706',
    bg: '#fef3c7',
    border: '#fcd34d'
  }
};

export function CapabilityBadge({ type, label }) {
  const cap = capabilities[type];
  if (!cap) return null;

  const Icon = cap.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
      style={{
        backgroundColor: cap.bg,
        color: cap.color,
        border: `1px solid ${cap.border}`
      }}
    >
      <Icon className="w-4 h-4" />
      {label || cap.label}
    </span>
  );
}

export function CapabilityBadges({ children }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 not-prose">
      {children}
    </div>
  );
}

export function CapabilityHeading({ type }) {
  const cap = capabilities[type];
  if (!cap) return null;

  const Icon = cap.icon;
  return (
    <h2 className="flex items-center gap-2 mt-8 mb-4 not-prose">
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-base font-medium"
        style={{
          backgroundColor: cap.bg,
          color: cap.color,
          border: `1px solid ${cap.border}`
        }}
      >
        <Icon className="w-5 h-5" />
        {cap.label}
      </span>
    </h2>
  );
}
