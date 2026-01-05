import { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaDatabase,
  FaChartLine,
  FaBell,
  FaServer,
  FaLock,
  FaRocket,
  FaQuestionCircle,
  FaInfoCircle
} from 'react-icons/fa';
import Navigation from './Navigation';
import { Hero } from './Hero';
import CTA from './CTA';

// Tooltip component
const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 text-base text-white bg-gray-900 rounded-lg shadow-lg max-w-lg whitespace-normal">
          <div className="text-center">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 249, annual: 2490 },
      description: 'Perfect for small teams getting started with monitoring',
      features: {
        users: '10',
        passiveChecks: '500/hour',
        activeChecks: '5,000 minutes/month',
        resources: '500',
        dataRetention: '7 days',
        support: 'Email',
        onboarding: '30 Minute Walkthrough'
      },
      cta: 'Get Started',
      ctaLink: 'https://accounts.flanksource.com/sign-up',
      popular: false
    },
    {
      name: 'Standard',
      price: { monthly: 799, annual: 7990 },
      description: 'Ideal for growing teams with advanced monitoring needs',
      features: {
        users: '40',
        passiveChecks: '1,500/hour',
        activeChecks: '15,000 minutes/month',
        resources: '1,500',
        dataRetention: '30 days',
        support: 'Email',
        onboarding: '2 Hours Guided Setup'
      },
      cta: 'Get Started',
      ctaLink: 'https://accounts.flanksource.com/sign-up',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'Tailored solutions for large organizations',
      features: {
        users: 'Unlimited',
        passiveChecks: 'Unlimited',
        activeChecks: 'Unlimited',
        resources: '15,000+',
        dataRetention: '1 year',
        support: '24x7 Email or Slack',
        onboarding: 'Done for you'
      },
      cta: 'Contact Us',
      ctaLink: '/contact',
      popular: false
    }
  ];

  const featureCategories = [
    {
      name: 'Passive Checks',
      icon: <FaChartLine className="w-5 h-5" />,
      tooltip: 'Passive checks perform observations only and are not computationally expensive. They monitor external services, databases, and infrastructure without executing complex operations.',
      features: [
        { name: 'HTTP(s), DNS, ICMP, TCP', starter: true, standard: true, enterprise: true, tooltip: 'Monitor web services, domain resolution, network connectivity, and TCP port availability' },
        { name: 'Prometheus', starter: true, standard: true, enterprise: true, tooltip: 'Query Prometheus metrics and monitor your existing Prometheus-based monitoring infrastructure' },
        { name: 'SQL / Mongo / Redis / Elasticsearch', starter: true, standard: true, enterprise: true, tooltip: 'Monitor database health, query performance, and data integrity across various database systems' },
        { name: 'Kubernetes', starter: true, standard: true, enterprise: true, tooltip: 'Monitor Kubernetes cluster health, pod status, resource usage, and API server availability' },
        { name: 'Github / Azure DevOps', starter: true, standard: true, enterprise: true, tooltip: 'Monitor repository health, CI/CD pipeline status, and development workflow metrics' }
      ]
    },
    {
      name: 'Alert Consolidation',
      icon: <FaBell className="w-5 h-5" />,
      tooltip: 'Consolidate alerts from multiple monitoring systems into a single dashboard. Reduce alert fatigue and improve incident response times.',
      features: [
        { name: 'AWS CloudWatch Alarms', starter: true, standard: true, enterprise: true, tooltip: 'Aggregate and manage CloudWatch alarms from across your AWS infrastructure' },
        { name: 'Prometheus Alerts', starter: true, standard: true, enterprise: true, tooltip: 'Consolidate alerts from Prometheus AlertManager instances into a unified view' },
        { name: 'Dynatrace Problems', starter: true, standard: true, enterprise: true, tooltip: 'Import and correlate problems detected by Dynatrace APM platform' }
      ]
    },
    {
      name: 'Active Checks',
      icon: <FaRocket className="w-5 h-5" />,
      tooltip: 'Active checks actually perform work like running integration tests, file operations, or complex validations. They are computationally expensive and billed per execution time.',
      features: [
        { name: 'File / S3 / GCS / SFTP / SMB / CIFS', starter: true, standard: true, enterprise: true, tooltip: 'Verify file presence, integrity, and accessibility across various storage systems and protocols' },
        { name: 'Exec', starter: true, standard: true, enterprise: true, tooltip: 'Execute custom scripts and commands to perform complex health checks and validations' },
        { name: 'JUnit', starter: true, standard: true, enterprise: true, tooltip: 'Run JUnit test suites as health checks to validate application functionality' },
        { name: 'JMeter', starter: true, standard: true, enterprise: true, tooltip: 'Execute JMeter performance tests to validate system performance under load' },
        { name: 'AWS EC2', starter: true, standard: true, enterprise: true, tooltip: 'Monitor EC2 instance health, perform system checks, and validate AWS infrastructure' },
        { name: 'Kubernetes Pod/Ingress', starter: true, standard: true, enterprise: true, tooltip: 'Test pod functionality, ingress routing, and Kubernetes application health' }
      ]
    },
    {
      name: 'Resource Catalog',
      icon: <FaDatabase className="w-5 h-5" />,
      tooltip: 'Automatically discover and catalog all your infrastructure resources across cloud providers, Kubernetes clusters, and CI/CD systems for complete visibility.',
      features: [
        { name: 'AWS', starter: true, standard: true, enterprise: true, tooltip: 'Discover and catalog AWS resources including EC2, RDS, Lambda, S3, and more' },
        { name: 'Azure', starter: true, standard: true, enterprise: true, tooltip: 'Automatically inventory Azure resources and services across your subscriptions' },
        { name: 'GCP (coming soon)', starter: true, standard: true, enterprise: true, tooltip: 'Google Cloud Platform resource discovery and cataloging (coming soon)' },
        { name: 'Kubernetes', starter: true, standard: true, enterprise: true, tooltip: 'Catalog Kubernetes resources including pods, services, deployments, and custom resources' },
        { name: 'Custom (SQL / HTTP)', starter: true, standard: true, enterprise: true, tooltip: 'Create custom resource catalogs using SQL queries or HTTP API endpoints' },
        { name: 'CI/CD (Azure DevOps / Github)', starter: true, standard: true, enterprise: true, tooltip: 'Track CI/CD pipelines, repositories, and deployment artifacts' },
        { name: 'Cost & Usage Reporting', starter: true, standard: true, enterprise: true, tooltip: 'Monitor cloud costs and resource usage patterns across your infrastructure' }
      ]
    },
    {
      name: 'Recommendations / Insights',
      icon: <FaQuestionCircle className="w-5 h-5" />,
      tooltip: 'Get automated recommendations and insights from various security and monitoring tools to improve your infrastructure security and performance.',
      features: [
        { name: 'Trivy', starter: true, standard: true, enterprise: true, tooltip: 'Security vulnerability scanning for containers, filesystems, and git repositories' },
        { name: 'AWS Trusted Advisor', starter: true, standard: true, enterprise: true, tooltip: 'AWS recommendations for cost optimization, security, performance, and fault tolerance' },
        { name: 'AWS Config Rules', starter: true, standard: true, enterprise: true, tooltip: 'Compliance and configuration recommendations based on AWS Config rule evaluations' },
        { name: 'Azure Monitor', starter: true, standard: true, enterprise: true, tooltip: 'Performance and health insights from Azure Monitor and Azure Advisor' }
      ]
    },
    {
      name: 'Notifications',
      icon: <FaBell className="w-5 h-5" />,
      tooltip: 'Send notifications to your preferred channels and integrate with incident management systems for seamless workflow integration.',
      features: [
        { name: 'Email', starter: true, standard: true, enterprise: true, tooltip: 'Send notifications via email with customizable templates and recipients' },
        { name: 'Webhooks', starter: true, standard: true, enterprise: true, tooltip: 'HTTP webhooks for integrating with custom systems and workflows' },
        { name: 'Slack, Teams, etc', starter: true, standard: true, enterprise: true, tooltip: 'Real-time notifications to Slack channels, Microsoft Teams, and other chat platforms' },
        { name: 'PagerDuty / OpsGenie', starter: true, standard: true, enterprise: true, tooltip: 'Integration with incident management platforms for alert escalation and on-call management' },
        { name: 'Jira', starter: true, standard: true, enterprise: true, tooltip: 'Automatically create and update Jira tickets based on monitoring events' },
        { name: 'ServiceNow', starter: true, standard: true, enterprise: true, tooltip: 'Integration with ServiceNow for ITSM workflows and incident management' }
      ]
    },
    {
      name: 'Hosting',
      icon: <FaServer className="w-5 h-5" />,
      tooltip: 'Choose how you want to deploy Mission Control - in our cloud, your own infrastructure, or bring your own cloud for maximum control.',
      features: [
        { name: 'Cloud', starter: true, standard: true, enterprise: true, tooltip: 'Fully managed SaaS deployment hosted and maintained by Flanksource' },
        { name: 'Self-Hosted', starter: false, standard: true, enterprise: true, tooltip: 'Deploy Mission Control in your own infrastructure with full control and customization' },
        { name: 'Bring Your Own Cloud', starter: false, standard: true, enterprise: true, tooltip: 'Deploy in your cloud account with Flanksource managing the platform for you' }
      ]
    },
    {
      name: 'Security',
      icon: <FaLock className="w-5 h-5" />,
      tooltip: 'Enterprise-grade security features including SSO integration and custom authentication providers for secure access control.',
      features: [
        { name: 'Social Login (Gmail / Microsoft / Github)', starter: true, standard: true, enterprise: true, tooltip: 'Single sign-on using popular social identity providers' },
        { name: 'Custom OIDC / SAML', starter: false, standard: true, enterprise: true, tooltip: 'Enterprise SSO integration with custom OIDC and SAML identity providers' }
      ]
    }
  ];

  const faqs = [
    {
      category: 'Billing',
      questions: [
        {
          question: 'What is a Mission Control Unit (MCU)?',
          answer: 'MCUs are utilized to accurately gauge and bill for usage of the Mission Control Platform. Each unit incorporates the following additional entitlements: • 10 Users • 500 resources • 500 passive checks per hour • 5000 hosted active check minutes per month • 1 self-hosted runner'
        },
        {
          question: 'What other payment methods do you have?',
          answer: 'We offer payment via Credit Card or Invoice (For annual subscriptions). You may also pay via AWS Marketplace.'
        },
        {
          question: 'Do you offer Startup discounts?',
          answer: 'Yes, If you are less than 2 years old and have raised < $1m, you might qualify for our startup package which is 3 months free of standard edition, followed by a 30% discount. Contact us at startups@flanksource.com to see if you qualify.'
        }
      ]
    },
    {
      category: 'Active / Passive Checks',
      questions: [
        {
          question: 'What is the difference between an active and passive check?',
          answer: 'Passive checks perform observations only and are not computationally expensive. Active checks actually do work (like running an integration test) and are computationally expensive.'
        },
        {
          question: 'How are passive checks billed?',
          answer: 'Passive checks are billed per execution, on the standard edition with 3 MCUs you can run 1500 passive checks per hour, this could be broken down into: 125 checks running every 5 minutes OR 375 checks running every 15 minutes OR 12 checks running every 30 seconds.'
        },
        {
          question: 'How are active checks billed?',
          answer: 'Because active checks are computationally expensive they are billed per second, on the standard edition with 3 MCUs you can run 15,000 minutes of active checks, this could be broken down into: 20 checks taking 1 minute, running every hour OR 20 checks taking 15 seconds, running every 15 minutes OR 80 checks taking 15 seconds, running every hour.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>       <Navigation />
      <div className="min-h-screen bg-gray-50">
        <Hero
          title="Simple, transparent pricing that grows with you"
          subtitle="Compare our plans and find yours"
          description="Choose the perfect plan for your monitoring and observability needs"
          ctaText="Get Started"
          ctaLink="#pricing"
          showCTA={false}
        />

        {/* Billing Toggle */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${billingPeriod === 'monthly'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('annual')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${billingPeriod === 'annual'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Annual
                  <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Save 10%</span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16" id="pricing">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 relative' : ''
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-base font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-4xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-lg text-gray-600 mb-6">{plan.description}</p>
                      <div className="mb-6">
                        {typeof plan.price[billingPeriod] === 'number' ? (
                          <>
                            <span className="text-6xl font-bold text-gray-900">
                              ${plan.price[billingPeriod].toLocaleString()}
                            </span>
                            <span className="text-lg text-gray-600 ml-2">
                              /{billingPeriod === 'monthly' ? 'month' : 'year'}
                            </span>
                          </>
                        ) : (
                          <span className="text-6xl font-bold text-gray-900">
                            {plan.price[billingPeriod]}
                          </span>
                        )}
                      </div>
                      <a
                        href={plan.ctaLink}
                        className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                      >
                        {plan.cta}
                        <FaArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-600">Users</span>
                        <span className="font-medium text-base">{plan.features.users}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-600 flex items-center">
                          Passive Checks
                          <Tooltip content="Passive checks perform observations only (HTTP, DNS, database queries) and are not computationally expensive">
                            <FaInfoCircle className="w-3 h-3 text-gray-400 ml-1 hover:text-blue-500" />
                          </Tooltip>
                        </span>
                        <span className="font-medium text-base">{plan.features.passiveChecks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-600 flex items-center">
                          Active Checks
                          <Tooltip content="Active checks perform work like running tests or file operations. Billed per execution time due to computational cost">
                            <FaInfoCircle className="w-3 h-3 text-gray-400 ml-1 hover:text-blue-500" />
                          </Tooltip>
                        </span>
                        <span className="font-medium text-base">{plan.features.activeChecks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-600 flex items-center">
                          Resources
                          <Tooltip content="Number of infrastructure resources (VMs, containers, databases, etc.) that can be monitored and cataloged">
                            <FaInfoCircle className="w-3 h-3 text-gray-400 ml-1 hover:text-blue-500" />
                          </Tooltip>
                        </span>
                        <span className="font-medium text-base">{plan.features.resources}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-600">Data Retention</span>
                        <span className="font-medium text-base">{plan.features.dataRetention}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-600">Support</span>
                        <span className="font-medium text-base">{plan.features.support}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-600">Onboarding</span>
                        <span className="font-medium text-base">{plan.features.onboarding}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-gray-900 mb-4">
                Feature Comparison
              </h2>
              <p className="text-2xl text-gray-600">
                Compare all features across our plans
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-6 grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
                <div className="text-left text-base font-medium text-gray-500 uppercase tracking-wider">

                </div>
                <div className="text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                  Starter
                </div>
                <div className="text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                  Standard
                </div>
                <div className="text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                  Enterprise
                </div>
              </div>

              {/* Feature Categories and Items */}
              <div className="bg-white divide-y divide-gray-100">
                {featureCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    {/* Category Header */}
                    <div className="bg-gray-50 px-6 py-5 grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
                      <div className="font-semibold text-gray-900 flex items-center">
                        {category.icon}
                        <span className="ml-2 text-lg">{category.name}</span>
                        <Tooltip content={category.tooltip}>
                          <FaInfoCircle className="w-4 h-4 text-gray-400 ml-2 hover:text-blue-500 transition-colors duration-200" />
                        </Tooltip>
                      </div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>

                    {/* Feature Items */}
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="px-6 py-4 grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 hover:bg-gray-50 transition-colors duration-200">
                        <div className="text-base text-gray-700 pl-8">
                          <div className="flex items-center">
                            <span>{feature.name}</span>
                            {feature.tooltip && (
                              <Tooltip content={feature.tooltip}>
                                <FaInfoCircle className="w-3 h-3 text-gray-400 ml-2 hover:text-blue-500 transition-colors duration-200" />
                              </Tooltip>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          {feature.starter ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : (
                            <FaTimes className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <div className="flex justify-center">
                          {feature.standard ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : (
                            <FaTimes className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <div className="flex justify-center">
                          {feature.enterprise ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : (
                            <FaTimes className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-2xl text-gray-600">
                Get answers to common questions about our pricing and features
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-4xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <div
                          key={faqIndex}
                          className="bg-gray-50 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                          >
                            <span className="font-medium text-lg text-gray-900">{faq.question}</span>
                            {openFaq === globalIndex ? (
                              <FaChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <FaChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {openFaq === globalIndex && (
                            <div className="px-6 pb-4">
                              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA
          title="Ready to Get Started?"
          description="Choose your plan and start monitoring your infrastructure today."
          primaryButton={{ text: "Start Free Trial", href: "https://accounts.flanksource.com/sign-up" }}
          secondaryButton={{ text: "Contact Sales", href: "/contact" }}
        />
      </div>
    </>
  );
};

export default Pricing;
