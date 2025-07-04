import React from 'react';
import {
  FaChevronRight,
  FaGithub,
  FaLinkedin,
  FaShieldAlt,
  FaCloud,
  FaCode,
  FaChartBar,
  FaPlay,
  FaCheckCircle,
  FaUsers,
  FaGitAlt,
  FaDatabase,
  FaHeartbeat,
  FaTools,
  FaRocket,
  FaQuestionCircle
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">Flanksource</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/docs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Docs
              </a>
              <a href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Blog
              </a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="https://app.flanksource.com/" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Login
              </a>
              <a href="https://accounts.flanksource.com/sign-up" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Internal Developer
              <span className="block text-blue-600">Portal for Operations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Flanksource Mission Control is a source-open Kubernetes-native internal developer portal
              that helps teams of all maturity levels improve developer productivity and operational resilience.
            </p>

            {/* Video Section */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="relative group cursor-pointer">
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
                {/* Play Button Overlay - Optional, since iframe has its own controls */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none">
                  <div className="bg-white bg-opacity-90 rounded-full p-4">
                    <FaPlay className="text-blue-600 text-2xl ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <a href="/docs" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
                See Docs
                <FaChevronRight className="ml-2 text-sm" />
              </a>
              <a href="https://youtu.be/TK5sqwfUyps" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center">
                <FaPlay className="mr-2 text-sm" />
                Watch on YouTube
              </a>
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

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Self-Hosted First */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-1">
              <div className="flex items-center mb-4">
                <FaShieldAlt className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-3xl font-bold text-gray-900">Self-Hosted First</h3>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Mission Control is self-hosted first, and easy to install using a Helm Chart
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Self-Hosted, SaaS or Hybrid Deployment Models
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  No network or proxy access required
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  No secrets stored in the SaaS
                </li>
              </ul>
              <a href="/docs/installation/deployment-models" className="inline-flex items-center mt-6 text-blue-600 hover:text-blue-800 font-semibold">
                See Deployment Options
                <FaChevronRight className="ml-2 text-sm" />
              </a>
            </div>
            <div className="order-2">
              <img
                src="/img/flanksource/self-hosted.svg"
                alt="Self-Hosted First"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* GitOps Preferred */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <img
                src="/img/flanksource/gitops.png"
                alt="GitOps Workflow"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <FaGitAlt className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-3xl font-bold text-gray-900">GitOps Preferred*</h3>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Mission Control is a suite of Kubernetes Operators, that work together using GitOps principles to enable the configuration of an internal developer platform in a decentralized way.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Seamless integration with Helm, Argo and Kustomize
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Secure secret management out of the box
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                * A UI for CRUD operations is also available if you prefer ClickOps.
              </p>
            </div>
          </div>

          {/* Unified Catalog */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-1">
              <div className="flex items-center mb-4">
                <h3 className="text-3xl font-bold text-gray-900">Unified Catalog</h3>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Catalog all your infrastructure, applications, pipelines and configuration into a schema-less JSON database.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Track changes on everything with a JSON diff
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Link events from AWS CloudTrail and Kubernetes
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Consolidate cost, security and resilience insights
                </li>
              </ul>
            </div>
            <div className="order-2">
              <img
                src="/img/flanksource/catalog.svg"
                alt="Unified Catalog Dashboard"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Internal Status Pages */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <img
                src="/img/flanksource/status_pages.png"
                alt="Internal Status Pages"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <FaHeartbeat className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-3xl font-bold text-gray-900">Internal Status Pages</h3>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Understand the health of complex services at a glance with red, amber, green statuses which leverage active/passive health checks and consolidated alerts from Prometheus, AWS, Dynatrace, etc.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Active/passive health checks
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Consolidated alerts from multiple sources
                </li>
              </ul>
              <div className="flex space-x-4 mt-6">
                <a href="https://canarychecker.io/" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Learn more about canary checker
                </a>
                <a href="/docs" className="text-blue-600 hover:text-blue-800 font-semibold">
                  See Docs
                </a>
              </div>
            </div>
          </div>

          {/* Playbooks */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-1">
              <div className="flex items-center mb-4">
                <FaTools className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-3xl font-bold text-gray-900">Playbooks</h3>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Empower developers to be more self-sufficient without the need to become experts in the Cloud and Kubernetes.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Run playbooks automatically on failing health checks/alerts
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Implement security best practices of least privilege and just in time (JIT) access
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Use the built-in library of actions including HTTP, SQL, kubectl, AWS CLI or run any custom code from Git
                </li>
              </ul>
            </div>
            <div className="order-2">
              <img
                src="/img/flanksource/playbooks.svg"
                alt="Playbooks Self-Service"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Local Development */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <img
                src="/img/flanksource/cli.png"
                alt="Local Development CLI"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-4">
                <FaCode className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-3xl font-bold text-gray-900">Local Development</h3>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Mission Control provides open-source CLI's for all the major components, this provides a setup-free, rapid feedback loop when building health checks and rules.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Setup-free development environment
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Integration tests can be created to run inside CI/CD pipelines
                </li>
              </ul>
              <p className="text-gray-600 mt-4">
                Using the CLI's integration tests can also be created to run inside CI/CD pipelines.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Common Questions */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quickly answer questions like:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Did anything break that would prevent us from deploying new workloads?",
              "What changed recently at either the infra, app, code or configuration level?",
              "What is the compliance level of my application against organisational policies?",
              "Where can I find all the configuration and log files for an app?",
              "What is the health of my application?",
              "Did any applications break after we upgraded the platform?"
            ].map((question, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <FaQuestionCircle className="text-blue-600 text-xl mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams already using Mission Control to improve their developer experience
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/docs" className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </a>
            <a href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
