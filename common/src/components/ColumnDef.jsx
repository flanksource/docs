import React from 'react'
import Fields from './Fields'

const commonsRows = [
  {
    field: 'name',
    required: true,
    description: 'Column name _(must be a valid SQL identifier)_',
    scheme: 'string'
  },
  {
    field: 'type',
    required: true,
    description:
      'Data type that controls formatting and visualization',
    scheme:
      '`string` | `number` | `boolean` | `datetime` | `duration` | `health` | `status` | `gauge` | `bytes` | `decimal` | `millicore` | `config_item` | `labels` | `badge`'
  },
  {
    field: 'primaryKey',
    description:
      'Whether this column is part of the primary key _(default: false)_. At least one column must be marked as primary key.',
    scheme: 'bool'
  },
  {
    field: 'width',
    description: "Display width, e.g. `150px` or a flex weight like `2`",
    scheme: 'string'
  },
  {
    field: 'description',
    description: 'Human-readable help text for the column',
    scheme: 'string'
  },
  {
    field: 'hidden',
    description: 'Hide the column from the table view _(default: false)_',
    scheme: 'bool'
  },
  {
    field: 'filter',
    description:
      'Enable server-side filtering for this column. Set `filter.type: multiselect` to let users include or exclude values without re-running the query.',
    scheme: 'object'
  },
  {
    field: 'icon',
    description: 'CEL expression that resolves to an icon name per row (e.g. `row.type`)',
    scheme: 'string'
  },
  {
    field: 'url',
    description:
      'Link to a config, another view, or a custom URL using CEL / Go templates',
    scheme: '[ColumnURL](/docs/guide/views#column-urls)'
  },
  {
    field: 'unit',
    description: "Unit label appended to the displayed value (e.g. `%`, `MB`, `pods`)",
    scheme: 'string'
  },
  {
    field: 'badge',
    description:
      'Badge styling configuration. Use `color.auto` for heuristic coloring or `color.map` for explicit value-to-color mappings.',
    scheme: '[BadgeConfig](/docs/guide/views#badge-configuration)'
  },
  {
    field: 'card.position',
    description:
      'Where this column appears in the card layout: `title`, `subtitle`, `deck`, `body`, `footer`, or `headerRight`',
    scheme: 'string'
  },
  {
    field: 'card.useForAccent',
    description:
      'Set to `true` to use this column\'s value as the accent color for the card (typically used on `health` or `status` columns)',
    scheme: 'bool'
  }
]

export default function ColumnDef({ rows = [], ...props }) {
  return <Fields rows={rows} common={commonsRows} {...props} />
}
