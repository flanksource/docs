import React from 'react';
import Layout from '@theme/Layout';
import CanaryCheckerPage from '@site/src/components/flanksource/CanaryCheckerPage';
import Home from '../../components/Home';
import Navigation from '../../components/flanksource/Navigation';

export default function CanaryChecker() {
  return (
    <Layout
      noHeader
      title="Canary Checker"
      description="Kubernetes-native health checks and synthetic monitoring for cloud-native applications"
    >
      <Navigation />
      <Home />
    </Layout>
  );
}
