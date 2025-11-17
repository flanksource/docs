import React from 'react';
import Layout from '@theme/Layout';
import Navigation from '@site/src/components/flanksource/Navigation';

export default function SREApplicationPage() {
  // Redirect to Airtable form
  React.useEffect(() => {
    window.location.href = 'https://airtable.com/app5T1ql2R5m2BbmR/pagxjlHMmn7ogkBr4/form';
  }, []);

  return (
    <Layout
      noHeader
      title="Apply - Site Reliability Engineer"
      description="Apply for the Site Reliability Engineer position at Flanksource"
    >
      <Navigation />
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <h1>Redirecting to Application Form...</h1>
            <p style={{ marginTop: '2rem', color: 'var(--gray-600)' }}>
              If you are not redirected automatically,{' '}
              <a href="https://airtable.com/app5T1ql2R5m2BbmR/pagxjlHMmn7ogkBr4/form">
                click here to apply
              </a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
