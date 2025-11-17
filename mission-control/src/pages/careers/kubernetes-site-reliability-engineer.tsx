import React from 'react';
import Layout from '@theme/Layout';
import Navigation from '@site/src/components/flanksource/Navigation';
import Link from '@docusaurus/Link';

export default function SREJobPage() {
  const [activeSection, setActiveSection] = React.useState('responsibilities');

  return (
    <Layout
      noHeader
      title="Site Reliability Engineer - Flanksource"
      description="Join Flanksource as a Site Reliability Engineer and work with cutting-edge Kubernetes and cloud-native technologies"
    >
      <Navigation />



      {/* Two-column Layout */}
      <div style={{
        display: 'flex',
        gap: '60px',
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 40px'
      }}>
        {/* Sidebar Navigation */}
        <div style={{
          width: '200px',
          flexShrink: 0,
          position: 'sticky',
          top: '220px',
          height: 'fit-content'
        }}>
          <nav style={{ borderLeft: '2px solid #e5e7eb' }}>
            {[
              { id: 'responsibilities', label: 'Responsibilities' },
              { id: 'requirements', label: 'Requirements' },
              { id: 'nice-to-haves', label: 'Nice-to-haves' },
              { id: 'benefits', label: 'Benefits' }
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'block',
                  padding: '8px 0 8px 20px',
                  color: activeSection === section.id ? '#2563EB' : '#6b7280',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  borderLeft: `2px solid ${activeSection === section.id ? '#2563EB' : 'transparent'}`,
                  marginLeft: '-2px',
                  transition: 'all 0.2s'
                }}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }} className='prose'>

          <div style={{
            color: '#2563EB',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            REMOTE
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: 0
          }}>
            Site Reliability Engineer
          </h1>

          <section id="responsibilities" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '1rem' }}>Responsibilities</h2>
            <ul style={{ lineHeight: 1.8 }}>
              <li>Design and maintain Kubernetes clusters across multiple environments (development, staging, production)</li>
              <li>Build automation for cluster deployment, configuration, and management</li>
              <li>Monitor and troubleshoot clusters to ensure high availability and optimal performance</li>
              <li>Implement security best practices for Kubernetes and underlying infrastructure</li>
              <li>Participate in incident response and work to reduce Mean Time To Recovery (MTTR)</li>
              <li>Enhance the reliability and scalability of our Kubernetes infrastructure</li>
              <li>Manage CI/CD pipelines and DevOps tooling</li>
              <li>Collaborate with development teams on deployment strategies and best practices</li>
            </ul>
          </section>

          <section id="requirements" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '1rem' }}>Requirements</h2>
            <ul style={{ lineHeight: 1.8 }}>
              <li><strong>Deep Kubernetes expertise</strong> - CKA certification preferred</li>
              <li><strong>Infrastructure as Code</strong> - Experience with 2+ IaC tools (Terraform, Pulumi, etc.)</li>
              <li><strong>Monitoring & Observability</strong> - Proficiency with Prometheus, Grafana, and related tools</li>
              <li><strong>Cloud Platforms</strong> - Hands-on experience with AWS, Azure, or GCP</li>
              <li><strong>CI/CD</strong> - Knowledge of GitHub Actions, GitLab CI, or Azure DevOps</li>
              <li><strong>Networking & Security</strong> - Understanding of network fundamentals and security best practices</li>
              <li><strong>Problem-solving</strong> - Strong analytical and troubleshooting abilities</li>
              <li><strong>Communication</strong> - Fluent English for remote asynchronous work</li>
              <li><strong>Self-motivated</strong> - Ability to work independently with an agile approach</li>
            </ul>
          </section>

          <section id="nice-to-haves" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '1rem' }}>Nice-to-haves</h2>
            <ul style={{ lineHeight: 1.8 }}>
              <li>Experience with GitOps tools (Flux, ArgoCD)</li>
              <li>Go programming knowledge or willingness to learn</li>
              <li>Active open-source contributions</li>
              <li>Experience developing Kubernetes operators or controllers</li>
            </ul>
          </section>

          <section id="benefits" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '1rem' }}>Benefits</h2>
            <ul style={{ lineHeight: 1.8 }}>
              <li>100% remote work with flexible hours</li>
              <li>Work with cutting-edge cloud-native technologies</li>
              <li>Contribute to open-source projects</li>
              <li>Collaborative, distributed team environment</li>
              <li>Opportunity to shape the future of Kubernetes tooling</li>
            </ul>
          </section>

          {/* Apply Button */}
          <div style={{ marginTop: '3rem' }}>
            <Link
              to="/careers/kubernetes-site-reliability-engineer/apply"
              style={{
                background: '#2563EB',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-block',
                textDecoration: 'none',
                transition: 'background 0.2s'
              }}
              className="apply-button"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .apply-button:hover {
          background: #1d4ed8 !important;
        }

        @media (max-width: 968px) {
          .job-layout {
            flex-direction: column;
          }
          .job-sidebar {
            position: static !important;
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
}
