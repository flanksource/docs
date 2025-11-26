import React from 'react';

const styleMap = {
  primary: {
    box: 'fill-blue-500 text-white',
    label: 'fill-white font-bold font-size-[15px]',
    subtitle: 'text-white font-size-[14px]',
  },
  secondary: {
    box: 'fill-gray-200 text-gray-800',
    label: 'fill-gray-800 font-bold font-size-[15px]',
    subtitle: 'fill-gray-800 font-size-[14px]',
  },
  gray: {
    box: 'fill-gray-200 text-gray-800',
    label: 'fill-gray-800 font-bold font-size-[15px]',
    subtitle: 'fill-gray-800 font-size-[14px]',
  },
  container: {
    box: 'fill-zinc-200 stroke-zinc-400',
    label: 'fill-red-800 font-bold font-size-[15px]',
    subtitle: 'fill-blue-800 font-size-[14px]',
  },
  outline: {
    box: 'fill-white',
    label: 'fill-gray-800 font-bold font-size-[15px]',
    subtitle: 'fill-gray-600 font-size-[14px]',
  },
  unstyled: {
    box: 'fill-white',
    label: '',
    subtitle: '',
  },
};

/**
 * Box Component - SVG box with optional icon and label
 *
 * Primary boxes: Blue (#326ce5) background, white text
 * Secondary boxes: Gray (#cbd5e1) background, dark text
 * Border radius: 3.2px (matches architecture.svg)
 * Font: Helvetica, 15px bold
 */
export function Box({
  x = 0,
  y = 0,
  width: propWidth,
  height: propHeight,
  label,
  icon,
  subtitle,
  items,
  iconSize = 25,
  variant = 'primary',
  borderVariant = 'solid',
  children,
  flexDirection = 'row',
  flexWrap = 'nowrap',
  gap = 10,
  padding = 10,
  alignItems = 'start',
  justifyContent = 'start',
  fill,
  stroke,
  strokeWidth = 2,
  strokeDasharray,
  borderRadius,
  className = 'primary',
  asSVG,
  hoverable = false,
}) {
  let currentX = x + padding;
  let currentY = y + padding;
  let currentRowHeight = 0;
  let maxX = 0;
  let maxY = 0;

  const positionedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;

    const childProps = child.props;
    const childWidth = childProps.width || 0;
    const childHeight = childProps.height || 0;

    if (flexWrap === 'wrap' && propWidth) {
      if (currentX + childWidth + padding > x + propWidth) {
        currentX = x + padding;
        currentY += currentRowHeight + gap;
        currentRowHeight = 0;
      }
    }

    const finalX = currentX;
    const finalY = currentY;

    currentX += childWidth + gap;
    currentRowHeight = Math.max(currentRowHeight, childHeight);

    maxX = Math.max(maxX, finalX + childWidth);
    maxY = Math.max(maxY, finalY + childHeight);

    return React.cloneElement(child, { x: finalX, y: finalY });
  });

  const width = propWidth ?? (children ? maxX - x + padding : 120);
  const height = propHeight ?? (children ? maxY - y + padding : 40);

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const iconPadding = (height - iconSize) / 2;

  const labelWidth = label ? label.length * 9 : 0;
  const contentWidth = icon ? iconSize + iconPadding + labelWidth : labelWidth;

  const startX = centerX - contentWidth / 2;

  const g = (
    <g
      className={hoverable ? 'group hover-scale-group' : ''}
      style={{
        transformOrigin: `${centerX}px ${centerY}px`,
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={borderRadius ?? (height <= 50 ? '3.2' : '8')}
        ry={borderRadius ?? (height <= 50 ? '3.2' : '8')}
        className={`${className} box-${variant} ${styleMap[variant].box} ${hoverable ? 'hoverable-box' : ''}`}
        style={{
          pointerEvents: 'all',
          cursor: hoverable ? 'pointer' : 'default',
          fill: fill ?? (borderVariant === 'dashed' ? 'white' : undefined),
          stroke: stroke ?? (borderVariant === 'dashed' ? '#cbd5e1' : undefined),
          strokeWidth: (stroke || borderVariant === 'dashed') ? strokeWidth : undefined,
          strokeDasharray: strokeDasharray ?? (borderVariant === 'dashed' ? '6 6' : undefined),
        }}
      />

      {icon ? (
        <g transform={`translate(${startX}, ${centerY - iconSize / 2})`}>
          {React.cloneElement(icon, {
            size: iconSize,
            style: { fill: 'white', color: 'white', stroke: 'white' },
          })}
          <text
            x={iconSize + iconPadding}
            y={iconSize / 2 + 1}
            className={styleMap[variant].label}
            style={{
              fontFamily: 'Helvetica, sans-serif',
              fontWeight: 'bold',
              fontSize: '15px',
              dominantBaseline: 'middle',
            }}
          >
            {label}
          </text>
        </g>
      ) : (
        label && (
          <text
            x={centerX}
            y={centerY + 5}
            textAnchor="middle"
            className={styleMap[variant].label}
          >
            {label}
          </text>
        )
      )}

      {subtitle && (
        <text
          x={centerX}
          y={y + 33}
          textAnchor="middle"
          className={styleMap[variant].subtitle}
        >
          {subtitle}
        </text>
      )}

      {items &&
        items.map((item, idx) => (
          <text
            key={idx}
            x={centerX}
            y={y + 40 + idx * 15}
            textAnchor="middle"
            className={styleMap[variant].subtitle}
          >
            {item}
          </text>
        ))}

      {positionedChildren}
    </g>
  );

  if (asSVG) {
    return (
      <svg width={width} height={height}>
        {g}
      </svg>
    );
  }
  return g;
}

/**
 * Arrow Component - SVG arrow with line and arrowhead
 *
 * Color: #e2ebfe (light blue)
 * Stroke width: 8px
 * Arrowhead: 11x11px triangle
 * Dark mode support via light-dark() CSS
 */
export function Arrow({
  startX,
  startY,
  endX,
  endY,
  width,
  strokeWidth,
  color = 'light-dark(rgb(226, 235, 254), rgb(28, 36, 52))',
  endSize = 18,
  angleOffset = 0,
}) {
  const lineWidth = width ?? strokeWidth ?? 8;

  const baseAngle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  const angle = baseAngle + angleOffset;

  const lineEndX = endX - endSize * Math.cos((angle * Math.PI) / 180);
  const lineEndY = endY - endSize * Math.sin((angle * Math.PI) / 180);

  return (
    <g>
      <path
        d={`M ${startX} ${startY} L ${lineEndX} ${lineEndY}`}
        fill="none"
        stroke={color}
        strokeWidth={lineWidth}
        strokeMiterlimit="10"
        style={{ stroke: color, pointerEvents: 'stroke' }}
      />
      <polygon
        points={`${endX},${endY} ${endX - endSize},${endY - endSize / 2} ${endX - endSize},${endY + endSize / 2}`}
        fill={color}
        style={{ fill: color }}
        transform={`rotate(${angle}, ${endX}, ${endY})`}
      />
    </g>
  );
}
