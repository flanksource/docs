import React from 'react';
import Layout from '@theme/Layout';
import Navigation from '@site/src/components/flanksource/Navigation';
import Link from '@docusaurus/Link';
import { K8S, Argo, Flux, Go, Prometheus, Grafana, Terraform, Aws, Azure, Gcp, Github, Jaeger, Clickhouse, Helm, Karpenter, Postgres, Crossplane, Vcluster, Powershell, Gitlab } from '@flanksource/icons/mi';
import { FaHeart } from 'react-icons/fa';

export default function SREJobPage() {
  const [activeSection, setActiveSection] = React.useState('tech-stack');

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
              { id: 'tech-stack', label: 'Tech Stack' },
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
            marginBottom: '1rem'
          }}>
            Kubernetes  Site Reliability Engineer
          </h1>


          <p>
            Are you an SRE who loves solving complex infrastructure problems but hates the repetitive toil? At Flanksource, we are redefining Managed Services. We are looking for a Kubernetes SRE to manage and optimize diverse Kubernetes environments for our clients—but you won’t be doing it the old way.
          </p>
          <p>You will leverage Mission Control, our internal platform, to gain a consolidated view of configuration, changes, and health across client clusters. Instead of manual firefighting, you will build GitOps-driven Playbooks and teach developers on how to use the Mission Control MCP server—feeding real-time data to AI agents—to troubleshoot and fix issues faster.
          </p>



          <section id="responsibilities" >
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

          <section id="requirements" >
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '1rem' }}>Requirements</h2>
            <ul style={{ lineHeight: 1.8 }}>
              <li><strong>Deep Kubernetes expertise</strong> - CKA certification preferred</li>
              <li><strong>Strong</strong> Experience with GitOps tools - (Flux, ArgoCD)</li>
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

          <section id="nice-to-haves" >
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '1rem' }}>Nice-to-haves</h2>
            <ul style={{ lineHeight: 1.8 }}>

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


          <section id="tech-stack" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Tech Stack</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 mb-4">
              {[
                { Icon: K8S, name: 'Kubernetes' },
                { Icon: Argo, name: 'ArgoCD' },
                { Icon: Flux, name: 'Flux', favorite: true },
                { Icon: Helm, name: 'Helm' },
                { Icon: Crossplane, name: 'Crossplane' },
                { Icon: Karpenter, name: 'Karpenter' },
                { Icon: Vcluster, name: 'vCluster' },
                { Icon: Go, name: 'Go' },
                { Icon: Powershell, name: 'PowerShell' },
                { Icon: Prometheus, name: 'Prometheus' },
                { Icon: Grafana, name: 'Grafana' },
                { Icon: Jaeger, name: 'Jaeger' },
                { Icon: Terraform, name: 'Terraform' },
                { Icon: Postgres, name: 'PostgreSQL' },
                { Icon: Clickhouse, name: 'ClickHouse' },
                { Icon: Aws, name: 'AWS' },
                { Icon: Azure, name: 'Azure' },
                { Icon: Gcp, name: 'GCP' },
                { Icon: Github, name: 'GitHub' },
                { Icon: Gitlab, name: 'GitLab' }
              ].map(({ Icon, name, favorite }) => (
                <div
                  key={name}
                  className="tech-card flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200 transition-all duration-200 relative"
                >
                  {favorite && (
                    <FaHeart className="absolute top-1.5 right-1.5 w-3 h-3 text-red-500" />
                  )}
                  <Icon className="w-8 h-8" />
                  <span className="text-xs font-medium text-gray-600 text-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>
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

        .tech-card:hover {
          background-color: #ffffff !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
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
