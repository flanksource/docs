import Layout from '@theme/Layout';
import React from 'react';

import Pricing from '../../../../common/src/components/flanksource/Pricing';

function PricingPage() {
  return (
    <Layout
      noHeader
      title="Pricing"
      description="Pricing for Flanksource Mission Control, offering flexible plans to suit your Kubernetes platform engineering needs."
    >
      <Pricing />
    </Layout>
  );
}

export default PricingPage;
