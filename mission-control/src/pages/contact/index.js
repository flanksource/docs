import Layout from '@theme/Layout';
import React from 'react';

import Contact from '../../../../common/src/components/flanksource/Contact';

function ContactPage() {
  return (
    <Layout
      noHeader
      title="Contact Us"
      description="Contact Us"
    >
      <Contact />
    </Layout>
  );
}

export default ContactPage;
