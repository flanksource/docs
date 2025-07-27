import React from 'react';
import Layout from '@theme/Layout';
import MissionControlPage from '@site/src/components/flanksource/MissionControlPage';

export default function MissionControl() {
  return (
    <Layout
      noHeader
      title="Mission Control"
      description="Internal Developer Portal for Operations - Unified observability, incident management, and platform engineering"
    >
      <MissionControlPage />
    </Layout>
  );
}
