import Layout from '@theme/Layout';
import React from 'react';

import Home from '../components/Home';

function HomePage() {
  return (
    <Layout
      noFooter={true}
      title="Kubernetes Native Health Check Platform"
      description="Kubernetes Native Health Check Platform"
    >
      <Home />
    </Layout>
  );
}

export default HomePage;
