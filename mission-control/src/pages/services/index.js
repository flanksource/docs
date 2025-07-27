import Layout from '@theme/Layout';
import React from 'react';

import Services from '../../../../common/src/components/flanksource/Services';

function ServicesPage() {
  return (
    <Layout
      noHeader
      title="Services - Kubernetes Platform Engineering"
      description="Flanksource offers comprehensive Kubernetes platform engineering services including consulting, managed services, migrations, and resilience assessments."
    >
      <Services />
    </Layout>
  );
}

export default ServicesPage;
