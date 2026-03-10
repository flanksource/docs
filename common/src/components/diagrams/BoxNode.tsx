import React from 'react';

interface BoxNodeProps {
  id?: string;
  title?: string | React.ReactNode;
  className?: string;
  bodyClassName?: string;
  border?: 'solid' | 'dashed';
  minWidth?: string;
  compact?: boolean;
  borderColor?: string;
  headerColor?: string;
  bodyColor?: string;
  children?: React.ReactNode;
}

export default function BoxNode({
  id,
  title,
  className = '',
  bodyClassName = '',
  border = 'solid',
  minWidth = '120px',
  compact = false,
  borderColor,
  headerColor,
  bodyColor,
  children,
}: BoxNodeProps) {
  const bgMatch = className.match(/bg-(\w+)-(\d+)/);
  const derivedBorderClass = bgMatch ? `border-${bgMatch[1]}-${bgMatch[2]}` : 'border-slate-300';
  const borderStyle = border === 'dashed' ? 'border-dashed' : 'border-solid';
  const hasHeader = title !== undefined;

  const containerStyle: React.CSSProperties = { minWidth };
  if (borderColor) {
    containerStyle.borderColor = borderColor;
  }

  const headerStyle: React.CSSProperties = {};
  if (headerColor) {
    headerStyle.backgroundColor = headerColor;
  }

  const bodyStyle: React.CSSProperties = {};
  if (bodyColor) {
    bodyStyle.backgroundColor = bodyColor;
  }

  return (
    <div
      id={id}
      className={`rounded-xl overflow-hidden shadow-lg border-2 ${borderStyle} ${borderColor ? '' : derivedBorderClass}`}
      style={containerStyle}
    >
      {hasHeader && (
        <div className={`px-3 py-2 text-center ${headerColor ? '' : className}`} style={headerStyle}>
          <span className="text-white text-xs font-bold">{title}</span>
        </div>
      )}
      {children && (
        <div
          className={`${bodyColor ? '' : bodyClassName} ${compact ? 'p-2' : 'p-3'}`}
          style={bodyStyle}
        >
          {children}
        </div>
      )}
    </div>
  );
}
