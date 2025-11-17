import React from 'react';
import Layout from '@theme/Layout';
import Navigation from '@site/src/components/flanksource/Navigation';
import Link from '@docusaurus/Link';

export default function CareersPage() {
  return (
    <Layout
      noHeader
      title="Careers at Flanksource"
      description="Join our team and help build the future of cloud-native infrastructure"
    >
      <Navigation />

      {/* Hero Section */}
      <div style={{
        background: '#f8f9fa',
        padding: '80px 0 60px',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            color: '#2563EB',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            CAREERS
          </div>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#1a1a1a',
            marginBottom: 0,
            lineHeight: 1.2
          }}>
            Join Our Team
          </h1>
        </div>
      </div>

      {/* Jobs Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 40px'
      }}>
        <div style={{
          color: '#2563EB',
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          JOBS
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: '2rem'
        }}>
          Current openings
        </h2>

        {/* Job Card */}
        <Link
          to="/careers/kubernetes-site-reliability-engineer"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '32px',
            marginBottom: '20px',
            textDecoration: 'none',
            transition: 'box-shadow 0.2s',
            color: 'inherit'
          }}
          className="job-card"
        >
          <h4 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: 0,
            color: '#1a1a1a'
          }}>
            Site Reliability Engineer
          </h4>
          <span style={{
            color: '#6b7280',
            fontSize: '1.5rem'
          }}>
            →
          </span>
        </Link>
      </div>

      <style>{`
        .job-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px !important;
          }
        }
      `}</style>
    </Layout>
  );
}
