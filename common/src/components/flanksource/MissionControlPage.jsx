import React from 'react';
import Navigation from './Navigation';
import { Hero } from './Hero';
import CTA from './CTA';
import { FaBullseye, FaChartLine, FaShieldAlt, FaCogs, FaUsers, FaRocket } from 'react-icons/fa';

const MissionControlPage = () => {
  const features = [
    {
      icon: <FaChartLine className="w-8 h-8 text-blue-600" />,
      title: "Unified Observability",
      description: "Single pane of glass for monitoring, logging, and tracing across your entire infrastructure."
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-green-600" />,
      title: "Incident Management",
      description: "Automated incident detection, response workflows, and post-mortem analysis."
    },
    {
      icon: <FaCogs className="w-8 h-8 text-purple-600" />,
      title: "Platform Engineering",
      description: "Self-service infrastructure provisioning and developer productivity tools."
    },
    {
      icon: <FaUsers className="w-8 h-8 text-orange-600" />,
      title: "Team Collaboration",
      description: "Integrated chat, documentation, and knowledge sharing for DevOps teams."
    },
    {
      icon: <FaRocket className="w-8 h-8 text-red-600" />,
      title: "Deployment Automation",
      description: "GitOps-driven deployments with automated rollbacks and canary releases."
    },
    {
      icon: <FaBullseye className="w-8 h-8 text-indigo-600" />,
      title: "SRE Best Practices",
      description: "Built-in SLI/SLO monitoring, error budgets, and reliability engineering workflows."
    }
  ];

  const benefits = [
    {
      title: "Reduce MTTR by 75%",
      description: "Automated incident detection and response workflows significantly reduce mean time to recovery."
    },
    {
      title: "Increase Developer Velocity",
      description: "Self-service infrastructure and streamlined workflows accelerate development cycles."
    },
    {
      title: "Improve System Reliability",
      description: "Proactive monitoring and SRE practices prevent outages before they impact users."
    },
    {
      title: "Scale Operations Efficiently",
      description: "Platform engineering approach enables teams to scale without proportional ops overhead."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        title="Mission Control"
        subtitle="Internal Developer Portal for Operations"
        description="Unify observability, incident management, and platform engineering in a single, powerful platform designed for modern DevOps teams."
        primaryCTA={{
          text: "Start Free Trial",
          href: "https://app.flanksource.com/signup"
        }}
        secondaryCTA={{
          text: "View Documentation",
          href: "/docs/mission-control"
        }}
        backgroundImage="/img/mission-control-hero-bg.jpg"
      />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mission Control brings together the best practices of Site Reliability Engineering,
              Platform Engineering, and DevOps into a unified experience.
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Results for Enterprise Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organizations using Mission Control see immediate improvements in reliability,
              velocity, and operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cloud-Native Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on Kubernetes with a microservices architecture that scales with your organization.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Enterprise-Ready</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <FaShieldAlt className="w-5 h-5 text-green-600 mr-3" />
                    SOC 2 Type II compliant
                  </li>
                  <li className="flex items-center">
                    <FaShieldAlt className="w-5 h-5 text-green-600 mr-3" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <FaShieldAlt className="w-5 h-5 text-green-600 mr-3" />
                    Role-based access control
                  </li>
                  <li className="flex items-center">
                    <FaShieldAlt className="w-5 h-5 text-green-600 mr-3" />
                    Audit logging and compliance
                  </li>
                  <li className="flex items-center">
                    <FaShieldAlt className="w-5 h-5 text-green-600 mr-3" />
                    High availability (99.9% SLA)
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏗️</div>
                  <p className="text-gray-600">
                    Interactive architecture diagram coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to Transform Your Operations?"
        description="Join hundreds of teams already using Mission Control to improve reliability and accelerate delivery."
        primaryButton={{
          text: "Start Free Trial",
          href: "https://app.flanksource.com/signup"
        }}
        secondaryButton={{
          text: "Schedule Demo",
          href: "/contact"
        }}
      />
    </div>
  );
};

export default MissionControlPage;
