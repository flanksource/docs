import React from 'react';
import {
  FaChevronRight,
  FaPlay,
  FaQuestionCircle
} from 'react-icons/fa';
import { Feature } from '../Feature';
import CTA from './CTA';
import Navigation from './Navigation';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Internal Developer
              <span className="block text-blue-600 ml-2">Portal for Operations</span>
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

          <Feature
            image="flanksource/self-hosted.svg"
            title="Self-Hosted First"
            subtitle="SECURITY & CONTROL"
            url="/docs/installation"
            left={true}
          >
            Mission Control is self-hosted first, and easy to install using a Helm Chart. Self-Hosted, SaaS or Hybrid Deployment Models with no network or proxy access required and no secrets stored in the SaaS.
          </Feature>

          <Feature
            image="flanksource/gitops.png"
            title="GitOps Preferred*"
            subtitle="KUBERNETES-NATIVE"
            url="/docs/guide/playbooks/actions/gitops"
            left={false}
          >
            Mission Control is a suite of Kubernetes Operators, that work together using GitOps principles to enable the configuration of an internal developer platform in a decentralized way. Seamless integration with Helm, Argo and Kustomize with secure secret management out of the box.
            <br /><br />
            <em className="text-sm text-gray-500">* A UI for CRUD operations is also available if you prefer ClickOps.</em>
          </Feature>

          <Feature
            image="flanksource/catalog.svg"
            title="Unified Catalog"
            url="/docs/guide/config-db"
            subtitle="COMPREHENSIVE VISIBILITY"
            left={true}
          >
            Catalog all your infrastructure, applications, pipelines and configuration into a schema-less JSON database. Track changes on everything with a JSON diff, link events from AWS CloudTrail and Kubernetes, and consolidate cost, security and resilience insights.
          </Feature>

          <Feature
            image="flanksource/status_pages.png"
            title="Internal Status Pages"
            subtitle="HEALTH MONITORING"
            url="/docs/guide/canary-checker"
            left={false}
          >
            Understand the health of complex services at a glance with red, amber, green statuses which leverage active/passive health checks and consolidated alerts from Prometheus, AWS, Dynatrace, and more.
          </Feature>

          <Feature
            image="flanksource/playbooks.svg"
            title="Playbooks"
            subtitle="DEVELOPER ENABLEMENT"
            url="/docs/guide/playbooks"
            left={true}
          >
            Empower developers to be more self-sufficient without the need to become experts in the Cloud and Kubernetes. Run playbooks automatically on failing health checks/alerts, implement security best practices of least privilege and just in time (JIT) access, and use the built-in library of actions.
          </Feature>

          <Feature
            image="flanksource/cli.png"
            title="Local Development"
            subtitle="DEVELOPER EXPERIENCE"
            url="/docs/guide/canary-checker/troubleshooting"
            left={false}
          >
            Mission Control provides open-source CLI's for all the major components, this provides a setup-free, rapid feedback loop when building health checks and rules. Integration tests can be created to run inside CI/CD pipelines.
          </Feature>

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
      <CTA
        title="Want to learn more?"
        primaryButton={{ text: "See Docs", href: "/docs" }}
        secondaryButton={{ text: "Contact Sales", href: "/contact" }}
        backgroundClass="bg-blue-600"
      />

    </div>
  );
};

export default Home;
