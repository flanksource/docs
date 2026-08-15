import React from 'react';

export const COLORS = {
  primary: '#2d7de4',
  outputBorder: '#10b981',
  background: '#f7fbfe',
  accent: '#1069dc',
  muted: '#62758a',
  sqliteBg: '#dae8fc',
};

export const primaryArrowProps = {
  color: COLORS.primary,
  strokeWidth: 3,
  headSize: 4,
  dashness: { strokeLen: 10, nonStrokeLen: 5, animation: 1 },
} as const;

export const secondaryArrowProps = {
  color: COLORS.muted,
  strokeWidth: 2,
  headSize: 3,
  dashness: { strokeLen: 6, nonStrokeLen: 4, animation: 1 },
} as const;

export const outputArrowProps = {
  color: COLORS.outputBorder,
  strokeWidth: 2,
  headSize: 4,
  dashness: { strokeLen: 8, nonStrokeLen: 4, animation: 1 },
} as const;

const pillStyle: React.CSSProperties = {
  color: COLORS.muted,
  backgroundColor: COLORS.background,
  border: `1px solid ${COLORS.primary}`,
};

export function NodePill({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] rounded px-2 py-1 text-center" style={pillStyle}>
      {children}
    </div>
  );
}
