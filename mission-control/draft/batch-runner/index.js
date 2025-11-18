import React from 'react';
import Layout from '@theme/Layout';
import GitHubProjectPage from '@site/src/components/flanksource/GitHubProjectPage';

export default function BatchRunner() {
  const projectData = {
    name: "Batch Runner",
    description: "Kubernetes job orchestration",
    longDescription: "Batch Runner is a powerful Kubernetes job orchestration platform that simplifies the management of batch workloads, scheduled tasks, and complex job dependencies. Built for enterprise-scale operations.",
    githubUrl: "https://github.com/flanksource/batch-runner",
    features: [
      "Advanced job scheduling and orchestration",
      "Dependency management and workflow automation",
      "Resource optimization and auto-scaling",
      "Real-time monitoring and logging",
      "Failure recovery and retry mechanisms",
      "Integration with CI/CD pipelines"
    ],
    useCases: [
      "ETL and data processing pipelines",
      "Machine learning training jobs",
      "Scheduled maintenance tasks",
      "Report generation and analytics",
      "Backup and archival operations"
    ],
    icon: "🚀",
    category: "Job Orchestration"
  };

  return (
    <Layout
      noHeader
      title="Batch Runner"
      description="Kubernetes job orchestration - Enterprise-scale batch workload management"
    >
      <GitHubProjectPage project={projectData} />
    </Layout>
  );
}
