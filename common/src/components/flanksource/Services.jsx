import React from 'react';
import {
  FaKubernetesIcon,
  FaCloud,
  FaShieldAlt,
  FaCogs,
  FaUsers,
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaSlack,
  FaGithub,
  FaDocker,
  FaAws,
  FaCloudsmith,
  FaTools,
  FaChartLine,
  FaLifeRing,
  FaExchangeAlt,
  FaSearch,
  FaLightbulb,
  FaClock,
  FaHeadset
} from 'react-icons/fa';
import { SiKubernetes, SiPrometheus, SiGrafana, SiTerraform, SiHelm, SiArgo, SiGitlab, SiGithub, SiDocker, SiAmazonaws, SiMicrosoftazure, SiGooglecloud } from 'react-icons/si';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Feature } from '../Feature';
import CTA from './CTA';
import Navigation from './Navigation';
import { Hero } from './Hero';

const Services = () => {
  const services = [
    {
      id: "kubernetes-quickstart",
      image: "/img/flanksource/quickstart.svg",
      title: "Kubernetes Quickstart",
      subtitle: "RAPID DEPLOYMENT",
      description: "Be production ready in 60 days. GitOps managed clusters on-premise or in the cloud.",
      features: [
        "Production-grade with built-in security and monitoring",
        "Operational playbooks for day-to-day operations and disaster recovery",
        "Accelerated, guardrail-driven onboarding of new applications and teams"
      ]
    },
    {
      id: "platform-development",
      image: "/img/flanksource/internal_platform_dev.svg",
      title: "Internal Platform Development",
      subtitle: "DEVELOPER EXPERIENCE",
      description: "Raise the watermark, freeing developers from CI/CD and infrastructure complexity.",
      features: [
        "Self-service platform capabilities",
        "Template-driven application onboarding",
        "Focus on business value delivery"
      ]
    },
    {
      id: "managed-services",
      image: "/img/flanksource/managed_services.svg",
      title: "Managed Services",
      subtitle: "24/7 OPERATIONS",
      description: "End-to-end service based on SRE mindset and principles for teams without operational capacity.",
      features: [
        "24/7/365 availability",
        "Two-Tier Oncall support",
        "Dedicated email with rapid response"
      ]
    },
    {
      id: "kubernetes-migrations",
      image: "/img/flanksource/kubernetes_migrations.svg",
      title: "Kubernetes Migrations",
      subtitle: "SEAMLESS TRANSITION",
      description: "Seamless migrations from on-premise, cloud-to-cloud, or legacy environments.",
      features: [
        "Zero-downtime migration strategies",
        "Risk assessment and mitigation",
        "Post-migration optimization"
      ]
    },
    {
      id: "devops-strategy",
      image: "/img/flanksource/devops_strategy.svg",
      title: "Cloud & DevOps Strategy",
      subtitle: "STRATEGIC CONSULTING",
      description: "Actionable, vendor-agnostic recommendations for short, medium and long-term optimization.",
      features: [
        "Cloud cost optimization",
        "Architecture best practices",
        "Technology roadmap planning"
      ]
    },
    {
      id: "resilience-assessments",
      image: "/img/flanksource/resilience_cycle.svg",
      title: "Resilience & Operational Assessments",
      subtitle: "RELIABILITY ENGINEERING",
      description: "Address resilience from multiple angles with customized operational readiness reviews.",
      features: [
        "Fully customized operational readiness checklist",
        "Resilience reviews and safety assessments",
        "Built-in monitoring and alerting setup"
      ]
    }
  ];

  const technologies = [
    { name: "Kubernetes", icon: <SiKubernetes className="w-8 h-8" /> },
    { name: "Prometheus", icon: <SiPrometheus className="w-8 h-8" /> },
    { name: "Grafana", icon: <SiGrafana className="w-8 h-8" /> },
    { name: "Terraform", icon: <SiTerraform className="w-8 h-8" /> },
    { name: "Helm", icon: <SiHelm className="w-8 h-8" /> },
    { name: "ArgoCD", icon: <SiArgo className="w-8 h-8" /> },
    { name: "GitLab", icon: <SiGitlab className="w-8 h-8" /> },
    { name: "GitHub", icon: <SiGithub className="w-8 h-8" /> },
    { name: "Docker", icon: <SiDocker className="w-8 h-8" /> },
    { name: "AWS", icon: <SiAmazonaws className="w-8 h-8" /> },
    { name: "Azure", icon: <SiMicrosoftazure className="w-8 h-8" /> },
    { name: "Google Cloud", icon: <SiGooglecloud className="w-8 h-8" /> }
  ];

  const benefits = [
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Happy Teams",
      description: "Reduce cognitive load and let developers focus on business value"
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Reduced TCO",
      description: "Optimize your Kubernetes total cost of ownership"
    },
    {
      icon: <FaTools className="w-6 h-6" />,
      title: "Improved Skills",
      description: "Enhance your team's knowledge and capabilities"
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Production Resilience",
      description: "Increase resilience against production failures"
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Accelerated Delivery",
      description: "Speed up your deployment and delivery cycles"
    },
    {
      icon: <FaCheckCircle className="w-6 h-6" />,
      title: "Best Practices",
      description: "Access baked-in tools and known good configurations"
    }
  ];

  const collaborationFeatures = [
    {
      icon: <FaSlack className="w-6 h-6" />,
      title: "Chat Integration",
      description: "We're available in your chat-rooms (Slack or MS Teams)"
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Joint Standups",
      description: "We join your standups to keep up-to-date about your environment"
    },
    {
      icon: <FaTools className="w-6 h-6" />,
      title: "Issue Tracking",
      description: "Assign tasks directly to your extended team in Jira, ClickUp, etc."
    }
  ];

  return (
    <><Navigation />
      <div className="min-h-screen bg-gray-50">


        <Hero
          //  logo="/img/canary-checker.svg"
          // logoAlt="Canary Checker"
          title="Platform Engineering Consulting"
          ctaText="Get started"
          ctaLink="/getting-started"
          image="/img/canary-ui.png"
          imageAlt="canary checker"
        />

        {/* Hero Section */}
        <section className="bg-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">

              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
                Flanksource makes it easy to build, manage, and operate a secure, open-source Kubernetes-based platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <FaArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="/case-studies"
                  className="inline-flex items-center bg-white bg-opacity-10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-opacity-20 transition-all duration-200 border border-white border-opacity-20"
                >
                  Read Case Studies
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Resilient Kubernetes Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Resilient Kubernetes.
                <span className="block text-blue-600">On your terms</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We use SRE and GitOps principles to optimise pipelines and deliver safe and tested clusters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
                    <div className="text-white flex items-center justify-center">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Seamless Collaboration
                  <span className="block text-blue-600">and Delivery</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Flanksource extends your team with CKA-certified principal and senior site reliability engineers (SREs).
                  A proactive, development-focused approach to operations means we integrate into your environment.
                  Not the other way around.
                </p>

                <div className="space-y-6">
                  {collaborationFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mr-4 flex-shrink-0">
                        <div className="text-white flex items-center justify-center">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="/img/flanksource/seamless_delivery.jpg"
                    alt="Seamless Collaboration and Delivery"
                    className="rounded-2xl shadow-2xl w-full max-w-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden bg-blue-100 rounded-2xl p-12 w-full max-w-md">
                    <div className="text-center">
                      <FaUsers className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900">Team Collaboration</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-white">
          <div className="text-center py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Kubernetes,
                <span className="block text-blue-600">Simplified</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Streamlined, cost-effective platform solutions – customised for your business.
              </p>
            </div>
          </div>

          {services.map((service, index) => (
            <Feature
              key={index}
              id={service.id}
              image={`flanksource/${service.image.split('/').pop()}`}
              title={service.title}
              subtitle={service.subtitle}
              url="/contact"
              left={index % 2 === 0}
            >
              <div className="mb-6">
                {service.description}
              </div>
              <div className="space-y-4">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <IoIosCheckmarkCircleOutline className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Feature>
          ))}
        </section>

        {/* Case Study Section */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-8">
                <span className="text-blue-600 font-semibold text-lg">CUSTOMER STORY</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                  From slowed deployment to a secure on-premise platform
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  See how Flanksource streamlined and improved the Kubernetes infrastructure for a leading insurance and financial services company.
                </p>
              </div>
              <div className="text-center">
                <a
                  href="/case-studies"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Read the Case Study
                  <FaArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Technologies we
                <span className="block text-blue-600">Love</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We work with the best open-source and cloud-native technologies to deliver robust, scalable solutions.
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {technologies.map((tech, index) => (
                <div key={index} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA
          title="Ready to Transform Your"
          subtitle="Kubernetes Journey?"
          description="Let's discuss how we can help you build, manage, and operate a resilient Kubernetes platform that scales with your business."
          primaryButton={{ text: "Get Started Today", href: "/contact" }}
          secondaryButton={{ text: "Explore Documentation", href: "/docs" }}
        />

      </div>
    </>
  );
};

export default Services;
