# Feature: Entra Integration Data Flow Diagram Update

## Overview

Update the `EntraDataFlowDiagram.tsx` component to clearly communicate the left-to-right data flow of the Entra ID integration with Mission Control. The diagram should emphasize:

1. **Left**: Entra ID as the data source (with sign-in logs as a sub-item)
2. **Middle**: Mission Control showing both scraper ingestion mechanisms and the stored catalog data
3. **Right**: Application CRD as the mapping layer producing visual audit reports

## Current State

**File**: `common/src/components/EntraDataFlowDiagram.tsx`
**Used in**: `mission-control/docs/integrations/azure-ad/index.mdx`

Current layout has 3 columns but scrapers (HTTP, Logs, Event Hub) and User Logins are shown as separate nodes floating on the left alongside Entra ID, making the flow unclear. The Mission Control box only shows stored data types. The outputs show Application CRD and Audit Views as peers.

## Functional Requirements

### FR-1: Left Column — Entra ID Source

**Description**: Entra ID box should be the single source on the left, containing all the data types that Mission Control scrapes.

**Contents of Entra ID box**:
- Users
- Groups
- App Registrations
- Enterprise Apps
- Role Assignments
- Auth Policies
- Sign-in Logs (moved from the separate "User Logins" node)

**Acceptance Criteria**:
- [ ] Single Entra ID box on the left
- [ ] Sign-in Logs included inside the Entra box (remove separate User Logins node)
- [ ] All 7 data types displayed in the box

### FR-2: Middle Column — Mission Control (Scrapers + Catalog)

**Description**: The Mission Control box should show two logical layers: the scraper mechanisms that ingest data, and the config items that are stored in the catalog.

**Structure**:
- **Ingestion layer** (top or left side of MC box): HTTP Scraper, Logs Scraper, Event Hub — these are the mechanisms that pull data from Entra
- **Catalog layer** (main body of MC box): Users & Groups, Access Records, Secrets & Certs, Auth Policies — these are the config items stored in the catalog

**Acceptance Criteria**:
- [ ] Mission Control box shows scrapers as an ingestion boundary
- [ ] Catalog data types shown as stored items inside MC
- [ ] Visual distinction between scraper mechanisms and stored data
- [ ] Arrows from Entra connect to the scraper mechanisms

### FR-3: Right Column — Application CRD + Audit Views

**Description**: The right side shows how Applications map catalog data into visual audit reports.

**Application CRD sub-items**:
- Access Control
- Backups
- Cost
- Environments

**Audit Views** (rendered outputs):
- Who Accessed, When
- Expired Secrets
- (or similar concrete report names)

**Acceptance Criteria**:
- [ ] Application CRD shown as the mapping layer with sub-items
- [ ] Audit Views shown as the rendered output
- [ ] Clear visual flow: MC catalog → Application CRD → Audit Views (or MC → both)

### FR-4: Left-to-Right Flow

**Description**: The entire diagram must read clearly left to right: Source → Ingestion → Storage → Mapping → Reports.

**Acceptance Criteria**:
- [ ] Data flows strictly left to right
- [ ] Arrows use Xarrow with existing animation style
- [ ] No vertical-only flow sections that break the L→R reading pattern

## Technical Considerations

- Reuse existing `BoxNode` component from `./diagrams/BoxNode`
- Reuse existing color scheme (`COLORS` object)
- Keep `BrowserOnly` wrapper for SSR compatibility
- Use `react-xarrows` for connectors
- Icons from `@flanksource/icons/mi` and `react-icons`
- Component must remain a default export for the existing import in `azure-ad/index.mdx`

## Visual Layout (ASCII)

```
┌─────────────┐     ┌──────────────────────────────────┐     ┌─────────────────┐
│  Entra ID   │     │        Mission Control            │     │ Application CRD │
│             │     │  ┌────────────┐  ┌─────────────┐  │     │                 │
│ Users       │────▶│  │HTTP Scraper│  │Users & Groups│  │────▶│ Access Control  │
│ Groups      │     │  │Logs Scraper│  │Access Records│  │     │ Backups         │
│ App Regs    │     │  │Event Hub   │  │Secrets/Certs │  │     │ Cost            │
│ Ent. Apps   │     │  └────────────┘  │Auth Policies │  │     │ Environments    │
│ Role Assign │     │   (ingestion)    └─────────────┘  │     └─────────────────┘
│ Auth Policy │     │                   (catalog)       │              │
│ Sign-in Logs│     └──────────────────────────────────┘              ▼
└─────────────┘                                            ┌─────────────────┐
                                                           │  Audit Views    │
                                                           │ Who Accessed    │
                                                           │ Expired Secrets │
                                                           └─────────────────┘
```

## Review Feedback

### Gemini (UX/Information Architecture)

**Positives**:
- Moving scrapers into MC box correctly shows MC as the active agent
- Folding User Logins into Entra reduces visual noise
- Left-to-right data lifecycle layout is a strong improvement

**Recommendations**:
1. **Group Entra items** into Identity Objects (Users, Groups, Apps, etc.) and Activity Logs (Sign-in Logs) for cleaner arrow routing
2. **Use subtle background color difference** between Ingestion and Catalog sub-sections in MC box
3. **Differentiate CRD vs Views** visually — CRD is control/config (dashed border?), Views are output (brighter border?)
4. **Avoid spaghetti arrows** — use one thick main pipe from Entra to MC, or fan out only at scrapers
5. **Set `min-width`** on container (e.g. `min-w-[1000px]`) for mobile — allow horizontal scroll
6. **Consider internal MC flow** — visual indication that Ingestion feeds Catalog (subtle internal arrow or left-to-right placement)

### Codex (Code Quality)

**High priority**:
- Static DOM ids (`entra-*`) cause collisions if diagram renders twice — use `useId`-prefixed ids or refs

**Medium priority**:
- Hard-coded Xarrow offsets (lines 169-183) will break after layout change — use anchor elements inside MC box sections instead
- Repeated pill markup in 4 places — extract `NodePill` / `NodeSection` components driven by arrays

**Recommended refactor pattern**:
```tsx
const MC_SECTIONS = [
  { id: 'ingestion', title: 'Ingestion', items: ['HTTP Scraper', 'Logs Scraper', 'Event Hub'] },
  { id: 'catalog', title: 'Catalog', items: ['Users & Groups', 'Access Records', 'Secrets & Certs', 'Auth Policies'] },
];
```

- Extract shared `primaryArrowProps` and `secondaryArrowProps` to reduce Xarrow duplication
- Move repeated inline styles into a `pillStyle` object

## Implementation Checklist

### Phase 1: Refactor Component Structure
- [ ] Extract `NodePill` component for repeated pill markup
- [ ] Extract `NodeSection` component for section groupings
- [ ] Use `useId`-prefixed ids instead of static ids
- [ ] Create shared arrow prop objects (`primaryArrowProps`, `secondaryArrowProps`)

### Phase 2: Update Layout
- [ ] Group Entra items into Identity Objects + Activity Logs sections
- [ ] Move Sign-in Logs into Entra box, remove separate User Logins node
- [ ] Restructure MC box with Ingestion (left) + Catalog (right) sub-sections
- [ ] Add anchor elements inside MC sections for Xarrow targeting
- [ ] Update Application CRD sub-items (Access Control, Backups, Cost, Environments)
- [ ] Differentiate CRD (control) vs Views (output) styling

### Phase 3: Arrows & Wiring
- [ ] Single main arrow from Entra to MC ingestion section
- [ ] Internal arrows from Ingestion anchors to Catalog (or implicit left-to-right placement)
- [ ] MC Catalog to Application CRD arrow
- [ ] Application CRD to Audit Views arrow (or MC to both)
- [ ] Set `min-width` on container for mobile

### Phase 4: Verify & Commit
- [ ] Verify in browser with `npm run dev`
- [ ] Stage and commit changes
