import React from 'react';
import Navigation from './Navigation';
import ArchitectureDiagram from '@site/src/components/ArchitectureDiagram';
import CatalogDiagram from '@site/src/components/CatalogDiagram';
import HowItWorksDiagram from '@site/src/components/HowItWorksDiagram';
import Helm from '@site/src/components/Helm';
import { FaQuestionCircle } from 'react-icons/fa';
import TerminalOutput from '@site/src/components/TerminalOutput';
import QueryResponseChat from '@flanksource/facet/QueryResponseChat';
import { Hero } from './Hero';
import CTA from './CTA';
import { Feature } from '../Feature';
import {
  FaCopy,
  FaCheckCircle,
  FaCog,
  FaRocket,
  FaBolt
} from 'react-icons/fa';
import {
  IoServerOutline,
  IoCodeSlashOutline,
  IoShieldCheckmarkOutline
} from 'react-icons/io5';
import {
  FiLayers,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import { K8S, Aws, Azure, Prometheus, Github, Slack, Datadog, Servicenow, Cloudwatch, Flux, Argo, Terraform, Helm as HelmIcon } from '@flanksource/icons/mi';
import Link from '@docusaurus/Link';

// Helper component to render icons with consistent styling and accessibility
const ProblemIcon = ({ iconName, ariaLabel }) => {
  let IconComponent;
  switch (iconName) {
    case 'FiLayers':
      IconComponent = FiLayers;
      break;
    case 'FiClock':
      IconComponent = FiClock;
      break;
    case 'FiAlertCircle':
      IconComponent = FiAlertCircle;
      break;
    default:
      IconComponent = FiAlertCircle;
  }

  return (
    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 transition-all duration-300 ease-in-out group-hover:bg-gray-200">
      <IconComponent
        className="w-8 h-8 text-gray-500 transition-all duration-300 ease-in-out group-hover:text-gray-600"
        aria-hidden="true"
        strokeWidth={1.5}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

const MissionControlPage = () => {
  const problems = [
    {
      iconName: "FiLayers",
      iconAriaLabel: "Icon representing multiple systems",
      title: "Fragmented Tooling",
      description: "Grafana for metrics, AWS Console for infrastructure, GitHub for config. Switching between tools makes it hard to see the full picture.",
      metric: "Teams use 40+ different tools"
    },
    {
      iconName: "FiClock",
      iconAriaLabel: "Icon representing change tracking",
      title: "Change Tracking",
      description: "Understanding who changed what requires correlating data across git, deployments, and infrastructure changes.",
      metric: "70% of alerts lack change context"
    },
    {
      iconName: "FiAlertCircle",
      iconAriaLabel: "Icon representing missing context",
      title: "Missing Context",
      description: "Alerts show symptoms but not root causes. Finding why something broke requires manual investigation across multiple systems.",
      metric: "Average MTTR: 4+ hours"
    }
  ];

  const advantages = [
    {
      title: "Minutes Setup",
      comparison: "vs Weeks",
      description: "Helm install and you're running. No TypeScript coding required."
    },
    {
      title: "Dynamic Data Model",
      comparison: "vs Static YAML",
      description: "Auto-discovery of resources. No manual catalog maintenance."
    },
    {
      title: "Deep Health Checks",
      comparison: "vs Basic HTTP",
      description: "Synthetic checks for real user scenarios, not just ping tests."
    },
    {
      title: "Active Day 2 Ops",
      comparison: "vs Read-Only Portals",
      description: "Execute Playbooks. Fix issues with GitOps actions, not just observe."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                The Internal Developer Portal for Day 2 Operations
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Stop debugging blind. Teams reduce MTTR by <strong>85%</strong> with Mission Control's unified, real-time view of <strong>Health</strong>, <strong>Configuration</strong>, and <strong>Changes</strong> across your entire Kubernetes and cloud estate.
              </p>

              {/* Key Metrics */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">85%</div>
                    <div className="text-sm text-gray-600 mt-1">Reduction in MTTR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">70%</div>
                    <div className="text-sm text-gray-600 mt-1">Less Alert Noise</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">&lt;1 Hour</div>
                    <div className="text-sm text-gray-600 mt-1">Time to Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">3x</div>
                    <div className="text-sm text-gray-600 mt-1">Faster Deployments</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/docs"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/contact"
                  className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-center"
                >
                  Book a Demo
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
                  Kubernetes Native
                </span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
                  Setup-Free <span className="font-mono">GitOps</span>
                </span>
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
                  AI-Ready (<span className="font-mono">MCP</span>)
                </span>
              </div>
            </div>
            <div >
              <div >
                <ArchitectureDiagram variant="portrait" className="rounded-lg overflow-hidden border-1 border-gray-200 shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Showcase */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Trusted by teams worldwide
            </h2>
            <p className="text-gray-600">
              Join companies already using Mission Control to improve their developer experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center h-16 w-32">
              <img
                src="/img/flanksource/customers/ada.png"
                alt="Ada"
                className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center h-16 w-32">
              <img
                src="/img/flanksource/customers/bcb.png"
                alt="BCB"
                className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center h-16 w-32">
              <img
                src="/img/flanksource/customers/discovery.svg"
                alt="Discovery"
                className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-center h-16 w-32">
              <img
                src="/img/flanksource/customers/elerian.webp"
                alt="Elerian"
                className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See Mission Control in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how Mission Control unifies health, configuration, and changes across your entire infrastructure
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/TK5sqwfUyps"
                title="Flanksource Mission Control Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common Challenges Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Operations Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern infrastructure teams face challenges when debugging issues across distributed systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 text-center"
                role="article"
                aria-labelledby={`problem-title-${index}`}
                aria-describedby={`problem-description-${index}`}
              >
                <div className="flex justify-center mb-6">
                  <ProblemIcon
                    iconName={problem.iconName}
                    ariaLabel={problem.iconAriaLabel}
                  />
                </div>
                <h3 id={`problem-title-${index}`} className="text-xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                <p id={`problem-description-${index}`} className="text-gray-600 leading-relaxed mb-4">{problem.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-600">{problem.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution: Holy Trinity Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The "Holy Trinity" of Context
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Health, Configuration, and Changes — unified in one place, exactly when you need them.
            </p>
          </div>
        </div>

        <Feature
          image={<CatalogDiagram className="mx-auto" />}
          title="One Catalog. Every Resource."
          subtitle="Track 45,000+ config items"
          left={true}
        >
          <div className="mb-6">
            Don't just catalog "services." Catalog <em>everything</em>. Mission Control discovers and maps your Database, S3 buckets, Kubernetes Deployments, and Helm releases into a single, queryable inventory.
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-blue-50 px-3 py-1 rounded-md text-sm font-medium text-blue-700 border border-blue-200">
              Prometheus-style Scrapers
            </span>
            <span className="inline-block bg-blue-50 px-3 py-1 rounded-md text-sm font-medium text-blue-700 border border-blue-200">
              CRD Discovery
            </span>
            <span className="inline-block bg-blue-50 px-3 py-1 rounded-md text-sm font-medium text-blue-700 border border-blue-200">
              Multi-Cloud
            </span>
          </div>
        </Feature>

        <Feature
          image="config-changes.png"
          title="The Single Pane of Glass that Actually Works."
          subtitle="Reduce MTTR by 85%"
          left={false}
        >
          <div className="mb-6">
            See the commit that caused the crash. Correlate a spike in latency with a Terraform apply. We aggregate real-time health checks, config snapshots, and audit logs into one view.
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-green-50 px-3 py-1 rounded-md text-sm font-medium text-green-700 border border-green-200">
              Deep Health Checks
            </span>
            <span className="inline-block bg-green-50 px-3 py-1 rounded-md text-sm font-medium text-green-700 border border-green-200">
              Change Events
            </span>
            <span className="inline-block bg-green-50 px-3 py-1 rounded-md text-sm font-medium text-green-700 border border-green-200">
              Drift Detection
            </span>
          </div>
        </Feature>

        <Feature
          image="playbook-overview.png"
          title="Fix it with a Commit."
          subtitle="96.3% playbook success rate"
          left={true}
        >
          <div className="mb-6">
            Turn manual runbooks into executable actions. Trigger <span className="font-mono">GitOps</span> workflows directly from the UI to restart pods, scale deployments, or rollback versions—all auditing back to Git.
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-purple-50 px-3 py-1 rounded-md text-sm font-medium text-purple-700 border border-purple-200">
              Flux/Argo Integration
            </span>
            <span className="inline-block bg-purple-50 px-3 py-1 rounded-md text-sm font-medium text-purple-700 border border-purple-200">
              Self-Service Actions
            </span>
            <span className="inline-block bg-purple-50 px-3 py-1 rounded-md text-sm font-medium text-purple-700 border border-purple-200">
              RBAC Enforced
            </span>
          </div>
        </Feature>
      </section>

      {/* Additional Features Section */}
      <Feature
        image="flanksource/self-hosted.svg"
        title="Self-Hosted First"
        subtitle="SECURITY & CONTROL"
        url="/docs/installation"
        left={false}
      >
        Mission Control is self-hosted first, and easy to install using a Helm Chart. Self-Hosted, SaaS or Hybrid Deployment Models with no network or proxy access required and no secrets stored in the SaaS.
      </Feature>

      <Feature
        image="flanksource/playbooks.svg"
        title="Playbooks & Automation"
        subtitle="DEVELOPER ENABLEMENT"
        url="/docs/guide/playbooks"
        left={true}
      >
        Empower developers to be more self-sufficient without the need to become experts in the Cloud and Kubernetes. Run playbooks automatically on failing health checks/alerts, implement security best practices of least privilege and just in time (JIT) access, and use the built-in library of actions.
      </Feature>

      <Feature
        image="flanksource/status_pages.png"
        title="Deep Health Monitoring"
        subtitle="PROACTIVE OPERATIONS"
        url="/docs/guide/canary-checker"
        left={false}
      >
        Understand the health of complex services at a glance with red, amber, green statuses which leverage active/passive health checks and consolidated alerts from Prometheus, AWS, Dynatrace, and more.
      </Feature>

      {/* Integration Ecosystem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Works With Your Entire Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrate with 40+ tools across monitoring, cloud providers, CI/CD, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className="flex items-center justify-center">
                <K8S className="w-16 h-16" title="Kubernetes" />
              </div>
              <div className="flex items-center justify-center">
                <Aws className="w-16 h-16" title="AWS" />
              </div>
              <div className="flex items-center justify-center">
                <Azure className="w-16 h-16" title="Azure" />
              </div>
              <div className="flex items-center justify-center">
                <Prometheus className="w-16 h-16" title="Prometheus" />
              </div>
              <div className="flex items-center justify-center">
                <Datadog className="w-16 h-16" title="Datadog" />
              </div>
              <div className="flex items-center justify-center">
                <Servicenow className="w-16 h-16" title="ServiceNow" />
              </div>
              <div className="flex items-center justify-center">
                <Cloudwatch className="w-16 h-16" title="CloudWatch" />
              </div>
              <div className="flex items-center justify-center">
                <Flux className="w-16 h-16" title="Flux" />
              </div>
              <div className="flex items-center justify-center">
                <Argo className="w-16 h-16" title="ArgoCD" />
              </div>
              <div className="flex items-center justify-center">
                <Github className="w-16 h-16" title="GitHub" />
              </div>
              <div className="flex items-center justify-center">
                <Terraform className="w-16 h-16" title="Terraform" />
              </div>
              <div className="flex items-center justify-center">
                <HelmIcon className="w-16 h-16" title="Helm" />
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                to="/docs/integrations"
                className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
              >
                View all 40+ integrations →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Advantage Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex flex-row gap-x-2">
              <div className="inline-block bg-green-900/30 text-green-400 text-sm font-bold px-4 py-2 rounded-full mb-4 border border-green-500/30 place-items-center pr-2">
                80-90% faster incident triage
              </div>
              <h2 className="text-4xl font-bold mb-4 text-white">Built for the AI Era (Model Context Protocol)</h2>
            </div>
            <p className="text-xl text-gray-300 mb-4">
              AI agents are only as good as their context. Mission Control includes a built-in <span className="font-mono text-green-400">MCP Server</span> that feeds summarized, real-time system state to your AI tools.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Read-only by default</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Scope limiting</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Rate limiting</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Complete audit trails</span>
              </div>
            </div>
          </div>

          <QueryResponseChat
            userQuery="Why is the payments-service failing3?"
            mcpTools={[
              {
                tool: 'search_catalog',
                description: 'type=Kubernetes::Pod name=payment* health=unhealthy',
                result: 'Found 3 replicas, 2 in CrashLoopBackOff',
              },
              {
                tool: 'get_config',
                description: 'config_id=payment-service',
                result: 'Config change detected 10m ago (commit a1b2c3)',
              },
            ]}
            aiResponse="payments-service is degraded. Cause: Config change detected 10m ago (commit a1b2c3). "
          />
        </div>
      </section>

      {/* Architecture Flow Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kubernetes-native architecture designed for scale and reliability.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <HowItWorksDiagram />
          </div>

          <div className="flex flex-col gap-4 mt-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Discover</h3>
                <p className="text-gray-600 text-xs">Continuously scrape and discover resources from AWS, Kubernetes, Git, and monitoring systems</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
              <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Analyze</h3>
                <p className="text-gray-600 text-xs">Correlate changes, health status, diffs, and alerts to understand the full context</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Playbooks</h3>
                <p className="text-gray-600 text-xs">Automate responses with AI-assisted playbooks via MCP Server with built-in guardrails</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">GitOps</h3>
                <p className="text-gray-600 text-xs">Deploy changes via Git commits and Kubernetes apply, completing the feedback loop</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mission Control Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Mission Control?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by SREs, for SREs. We solve the problems that generic portals ignore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{advantage.title}</h3>
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {advantage.comparison}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Quickly answer questions like:
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 relative">
            {[
              { q: "Did anything break?", persona: "DevOps", size: "lg", rotate: "-2" },
              { q: "What changed recently?", persona: "Developer", size: "md", rotate: "1" },
              { q: "Is my app compliant?", persona: "Security", size: "sm", rotate: "-1" },
              { q: "Where are the logs?", persona: "Developer", size: "md", rotate: "2" },
              { q: "What's the health status?", persona: "DevOps", size: "lg", rotate: "-1" },
              { q: "Who approved this change?", persona: "Security", size: "sm", rotate: "1" },
              { q: "Why is prod down?", persona: "DevOps", size: "xl", rotate: "-2" },
              { q: "What secrets are exposed?", persona: "Security", size: "md", rotate: "2" },
              { q: "Can I deploy safely?", persona: "Developer", size: "lg", rotate: "-1" },
              { q: "What broke after the upgrade?", persona: "DevOps", size: "md", rotate: "1" },
              { q: "Which pods are failing?", persona: "Developer", size: "sm", rotate: "-2" },
              { q: "Are we SOC2 compliant?", persona: "Security", size: "lg", rotate: "1" },
              { q: "What's using all the CPU?", persona: "DevOps", size: "md", rotate: "-1" },
              { q: "Who has access?", persona: "Security", size: "sm", rotate: "2" },
              { q: "What config changed?", persona: "Developer", size: "md", rotate: "-2" }
            ].map((item, index) => {
              const personaStyles = {
                DevOps: "bg-blue-100 text-blue-700 border-blue-200",
                Developer: "bg-purple-100 text-purple-700 border-purple-200",
                Security: "bg-amber-100 text-amber-700 border-amber-200"
              };
              const sizeStyles = {
                sm: "text-sm px-3 py-2",
                md: "text-base px-4 py-2",
                lg: "text-lg px-5 py-3 font-medium",
                xl: "text-xl px-6 py-3 font-semibold"
              };
              const rotations = {
                "-2": "-rotate-2",
                "-1": "-rotate-1",
                "1": "rotate-1",
                "2": "rotate-2"
              };
              return (
                <div
                  key={index}
                  className={`${personaStyles[item.persona]} ${sizeStyles[item.size]} ${rotations[item.rotate]} rounded-full border hover:scale-105 transition-transform cursor-default whitespace-nowrap`}
                >
                  {item.q}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-8 mt-10 text-sm">
            <div className="flex items-center gap-2">
              <IoServerOutline className="text-blue-500 text-lg" />
              <span className="text-gray-600">DevOps</span>
            </div>
            <div className="flex items-center gap-2">
              <IoCodeSlashOutline className="text-purple-500 text-lg" />
              <span className="text-gray-600">Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <IoShieldCheckmarkOutline className="text-amber-500 text-lg" />
              <span className="text-gray-600">Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-blue-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Regain control of your clusters.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started in under 5 minutes with a single Helm command.
          </p>

          <div className=" rounded-lg p-6 mb-8 text-left">

            <div className="space-y-2">

              <TerminalOutput command={
                ["helm repo add flanksource https://flanksource.github.io/charts && \\",
                  "helm repo update && \\",
                  "helm install mission-control flanksource/mission-control \\",
                  "--namespace mission-control \\",
                  "--create-namespace"
                ]
              } />
            </div>
          </div>



          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/docs"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Read the Docs
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section >
    </div >
  );
};

export default MissionControlPage;
