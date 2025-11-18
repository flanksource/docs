import React from 'react';
import Layout from '@theme/Layout';
import GitHubProjectPage from '@site/src/components/flanksource/GitHubProjectPage';

export default function DNSSync() {
  const projectData = {
    name: "DNS Sync",
    description: "DNS synchronization for Kubernetes",
    longDescription: "DNS Sync is a Kubernetes operator that automatically synchronizes DNS records between your cluster and external DNS providers. It enables seamless service discovery and load balancing across hybrid cloud environments.",
    githubUrl: "https://github.com/flanksource/dns-sync",
    features: [
      "Automatic DNS record synchronization",
      "Multi-provider support (AWS Route53, Google Cloud DNS, Azure DNS)",
      "Kubernetes-native CRD-based configuration",
      "Real-time monitoring and alerting",
      "High availability and fault tolerance",
      "Integration with popular service meshes"
    ],
    useCases: [
      "Hybrid cloud service discovery",
      "Multi-cluster networking",
      "Blue-green deployments",
      "Disaster recovery scenarios",
      "Load balancing across regions"
    ],
    icon: "🔄",
    category: "Networking"
  };

  return (
    <Layout
      noHeader
      title="DNS Sync"
      description="DNS synchronization for Kubernetes - Seamless service discovery across hybrid cloud environments"
    >
      <GitHubProjectPage project={projectData} />
    </Layout>
  );
}
