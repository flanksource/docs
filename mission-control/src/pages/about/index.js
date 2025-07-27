import Layout from '@theme/Layout';
import React from 'react';

import About from '@site/src/components/flanksource/About';

function AboutPage() {
  return (
    <Layout
      noHeader
      title="About Us"

    >
      <About />
    </Layout>
  );
}

export default AboutPage;
