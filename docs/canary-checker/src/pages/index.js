import Layout from '@theme/Layout';
import React from 'react';

import Home from '../components/Home';

function HomePage() {
  return (
    <Layout
      noFooter={true}
      title="Canary Checker"
      description="Kubernetes Native Synthetic Monitoring Platform"
    >
      <Home />
    </Layout>
  );
}

export default HomePage;
