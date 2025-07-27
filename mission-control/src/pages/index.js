import Layout from '@theme/Layout';
import React from 'react';

import Home from '../components/flanksource/Home';

function HomePage() {
  return (
    <Layout
      noHeader
      title="Kubernetes Native Health Check Platform"
      description="Kubernetes Native Health Check Platform"
    >
      <Home />
    </Layout>
  );
}

export default HomePage;
