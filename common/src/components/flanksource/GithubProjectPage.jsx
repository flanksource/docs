import React from 'react';
import Navigation from './Navigation';
import { Hero } from './Hero';
import CTA from './CTA';
import { FaGithub, FaDownload, FaBook, FaStar, FaCode, FaUsers } from 'react-icons/fa';

const GitHubProjectPage = ({ project }) => {
  const {
    name,
    description,
    longDescription,
    githubUrl,
    features,
    useCases,
    icon,
    category
  } = project;

  const stats = [
    { label: "GitHub Stars", value: "2.5k+", icon: <FaStar className="w-5 h-5 text-yellow-500" /> },
    { label: "Downloads", value: "50k+", icon: <FaDownload className="w-5 h-5 text-green-500" /> },
    { label: "Contributors", value: "25+", icon: <FaUsers className="w-5 h-5 text-blue-500" /> },
    { label: "Releases", value: "100+", icon: <FaCode className="w-5 h-5 text-purple-500" /> }
  ];

  const installation = `# Install with Helm
helm repo add flanksource https://flanksource.github.io/charts
helm install ${name.toLowerCase().replace(/\s+/g, '-')} flanksource/${name.toLowerCase().replace(/\s+/g, '-')}

# Or with kubectl
kubectl apply -f ${githubUrl}/releases/latest/download/manifests.yaml`;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero
        title={name}
        subtitle={description}
        description={longDescription}
        primaryCTA={{
          text: "View on GitHub",
          href: githubUrl
        }}
        secondaryCTA={{
          text: "Get Started",
          href: `${githubUrl}#quick-start`
        }}
        backgroundImage="/img/open-source-hero-bg.jpg"
      />

      {/* Project Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-8">
                <div className="text-6xl mr-4">{icon}</div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">{name}</h2>
                  <p className="text-xl text-gray-600">{category}</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {longDescription}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* GitHub Link */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Repository</h3>
                <a
                  href={githubUrl}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Stats</h3>
                <div className="space-y-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {stat.icon}
                        <span className="ml-3 text-gray-700">{stat.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes {name} powerful and easy to use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Use Cases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common scenarios where {name} provides value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Installation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with {name} in minutes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Installation</h3>
                <button className="text-gray-400 hover:text-white">
                  <FaCode className="w-5 h-5" />
                </button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{installation}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaDownload className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Install</h4>
                <p className="text-gray-600">Deploy using Helm or kubectl</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCode className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Configure</h4>
                <p className="text-gray-600">Set up your configuration files</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBook className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Deploy</h4>
                <p className="text-gray-600">Start using {name} in production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join the Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {name} is open source and community-driven. We welcome contributions, feedback, and discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGithub className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Contribute</h4>
              <p className="text-gray-600 mb-4">Help improve {name} by contributing code, documentation, or bug reports.</p>
              <a
                href={`${githubUrl}/issues`}
                className="text-blue-600 hover:text-blue-700 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Issues →
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBook className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h4>
              <p className="text-gray-600 mb-4">Read the comprehensive documentation to get the most out of {name}.</p>
              <a
                href={`${githubUrl}#documentation`}
                className="text-blue-600 hover:text-blue-700 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Docs →
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600 mb-4">Join our community for discussions, support, and feature requests.</p>
              <a
                href={`${githubUrl}/discussions`}
                className="text-blue-600 hover:text-blue-700 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discussion →
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title={`Start Using ${name} Today`}
        description="Join the community of developers and operations teams using our open-source tools."
        primaryButton={{
          text: "Get Started",
          href: `${githubUrl}#quick-start`
        }}
        secondaryButton={{
          text: "View on GitHub",
          href: githubUrl
        }}
      />
    </div>
  );
};

export default GitHubProjectPage;
