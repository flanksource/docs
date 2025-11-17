import React from 'react';
import Navigation from './Navigation';
import { Hero } from './Hero';
import CTA from './CTA';
import { FaSearch, FaHeart, FaChartLine, FaShieldAlt, FaClock, FaCode } from 'react-icons/fa';

const CanaryCheckerPage = () => {
  const features = [
    {
      icon: <FaHeart className="w-8 h-8 text-red-600" />,
      title: "Health Checks",
      description: "Comprehensive health monitoring for HTTP, DNS, TCP, and database endpoints."
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-blue-600" />,
      title: "Synthetic Monitoring",
      description: "Proactive monitoring that simulates user interactions and catches issues early."
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-green-600" />,
      title: "Security Scanning",
      description: "Built-in security checks for SSL certificates, vulnerabilities, and compliance."
    },
    {
      icon: <FaClock className="w-8 h-8 text-purple-600" />,
      title: "Performance Monitoring",
      description: "Real-time performance metrics and SLA monitoring with alerting."
    },
    {
      icon: <FaCode className="w-8 h-8 text-orange-600" />,
      title: "Kubernetes Native",
      description: "CRD-based configuration that integrates seamlessly with your GitOps workflow."
    },
    {
      icon: <FaSearch className="w-8 h-8 text-indigo-600" />,
      title: "Multi-Protocol Support",
      description: "Test HTTP/HTTPS, DNS, TCP, UDP, ICMP, and database connections."
    }
  ];

  const checkTypes = [
    {
      name: "HTTP/HTTPS",
      description: "REST API endpoints, web pages, and authentication flows",
      icon: "🌐"
    },
    {
      name: "DNS",
      description: "Domain resolution, record validation, and DNS propagation",
      icon: "🔍"
    },
    {
      name: "TCP/UDP",
      description: "Port connectivity, socket connections, and network services",
      icon: "🔌"
    },
    {
      name: "Database",
      description: "PostgreSQL, MySQL, MongoDB, Redis, and other database connections",
      icon: "🗄️"
    },
    {
      name: "SSL/TLS",
      description: "Certificate validation, expiration monitoring, and security checks",
      icon: "🔒"
    },
    {
      name: "ICMP",
      description: "Ping tests, network latency, and packet loss monitoring",
      icon: "📡"
    }
  ];

  const benefits = [
    "Reduce downtime with proactive monitoring",
    "Catch issues before they impact users",
    "Integrate with existing observability stack",
    "Scale monitoring across multiple environments",
    "Automate compliance and security checks",
    "Get detailed performance insights"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        title="Canary Checker"
        subtitle="Kubernetes-native Health Checks"
        description="Comprehensive synthetic monitoring and health checking for cloud-native applications. Catch issues before they impact your users."
        primaryCTA={{
          text: "Get Started",
          href: "/docs/canary-checker"
        }}
        secondaryCTA={{
          text: "View on GitHub",
          href: "https://github.com/flanksource/canary-checker"
        }}
        backgroundImage="/img/canary-checker-hero-bg.jpg"
      />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Monitoring Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor every aspect of your application stack with built-in health checks,
              synthetic monitoring, and security scanning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Monitor Everything
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Canary Checker supports a wide range of protocols and services for comprehensive monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkTypes.map((check, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="text-4xl mb-4">{check.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{check.name}</h3>
                <p className="text-gray-600">{check.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Canary Checker?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Built by SREs for SREs, Canary Checker provides the reliability and
                performance monitoring you need for production environments.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <FaSearch className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start</h3>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <code className="text-green-400 text-sm">
                  {`# Install with Helm
helm repo add flanksource https://flanksource.github.io/charts
helm install canary-checker flanksource/canary-checker

# Or with kubectl
kubectl apply -f https://raw.githubusercontent.com/flanksource/canary-checker/main/config/deploy/manifests.yaml`}
                </code>
              </div>
              <p className="text-gray-600 text-sm">
                Get started in minutes with our simple installation and configuration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Works with your existing observability and alerting tools.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Prometheus', 'Grafana', 'AlertManager', 'Datadog', 'New Relic', 'PagerDuty'].map((tool, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔧</span>
                </div>
                <p className="text-sm text-gray-600">{tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Start Monitoring Today"
        description="Join thousands of engineers using Canary Checker to ensure their applications are healthy and performant."
        primaryButton={{
          text: "Get Started",
          href: "/docs/canary-checker"
        }}
        secondaryButton={{
          text: "View Examples",
          href: "/docs/canary-checker/examples"
        }}
      />
    </div>
  );
};

export default CanaryCheckerPage;
