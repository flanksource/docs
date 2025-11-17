import { CanaryChecker, Console, GcpBatch, Go, MissionControl, PackageInstall, Postgres } from '@flanksource/icons/mi';
import React, { useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp, FaBars, FaTimes, FaBullseye, FaSearch, FaDatabase, FaExclamationTriangle, FaRocket, FaTools, FaLifeRing, FaSync, FaLightbulb, FaEye, FaRobot } from 'react-icons/fa';
import { SiPostgresql } from 'react-icons/si';

const Navigation = ({
  logo = <img src="/img/mission-control-logo.svg" />,
  loginButton = { href: "https://app.flanksource.com/", text: "Login" },
  signUpButton = { href: "https://accounts.flanksource.com/sign-up", text: "Sign Up" }
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hideTimeoutRef = useRef(null);

  // Get current path for highlighting active page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const isActivePage = (href) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  const getNavLinkClass = (href) => {
    const baseClass = "px-3 py-2 rounded-md text-lg font-medium transition-colors";
    const activeClass = "text-blue-600 bg-blue-50";
    const inactiveClass = "text-gray-700 hover:text-blue-600";

    return `${baseClass} ${isActivePage(href) ? activeClass : inactiveClass}`;
  };

  const getMobileNavLinkClass = (href) => {
    const baseClass = "block px-3 py-2 rounded-md text-lg font-medium transition-colors";
    const activeClass = "text-blue-600 bg-blue-50";
    const inactiveClass = "text-gray-700 hover:text-blue-600";

    return `${baseClass} ${isActivePage(href) ? activeClass : inactiveClass}`;
  };

  const commercialProducts = [
    {
      name: "Mission Control",
      description: "Internal Developer Portal for Operations",
      href: "/mission-control",
      icon: <MissionControl className="w-5 h-5 text-gray-500" />
    },
    // {
    //   name: "Config DB",
    //   description: "Configuration management database",
    //   href: "/config-db",
    //   icon: <FaDatabase className="w-5 h-5 text-gray-500" />
    // }
  ];

  const openSourceProducts = [
    {
      name: "Canary Checker",
      description: "Kubernetes-native health checks",
      href: "/canary-checker",
      icon: <CanaryChecker className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Batch Runner",
      description: "Kubernetes job orchestration",
      href: "https://github.com/flanksource/batch-runner",
      // href: "/batch-runner",
      icon: <GcpBatch className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Postgres",
      description: "Auto-Upgrade Container / Helm Chart",
      href: "https://github.com/flanksource/postgres",
      // href: "/batch-runner",
      icon: <Postgres className="w-5 h-5" />
    },
    {
      name: "Gomplate",
      description: "CEL / Go Text template function library",
      href: "https://github.com/flanksource/gomplate",
      // href: "/batch-runner",
      icon: <Go className="w-5 h-5 text-gray-500" />
    },

    {
      name: "Deps",
      description: "Binary package manager",
      href: "https://github.com/flanksource/deps",
      // href: "/batch-runner",
      icon: <Console className="w-5 h-5 text-gray-500" />
    },
    // {
    //   name: "DNS Sync",
    //   description: "DNS synchronization for Kubernetes",
    //   href: "/dns-sync",
    //   // href: "https://github.com/flanksource/dns-sync",
    //   icon: <FaSync className="w-5 h-5 text-gray-500" />
    // }
  ];

  const services = [
    {
      name: "Kubernetes Quickstart",
      description: "Be production ready in 60 days with GitOps managed clusters",
      href: "/services#kubernetes-quickstart",
      icon: <FaRocket className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Internal Platform Development",
      description: "Free developers from CI/CD and infrastructure complexity",
      href: "/services#platform-development",
      icon: <FaTools className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Managed Services",
      description: "24/7 operations based on SRE mindset and principles",
      href: "/services#managed-services",
      icon: <FaLifeRing className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Kubernetes Migrations",
      description: "Seamless migrations from on-premise or cloud-to-cloud",
      href: "/services#kubernetes-migrations",
      icon: <FaSync className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Cloud & DevOps Strategy",
      description: "Vendor-agnostic recommendations for optimization",
      href: "/services#devops-strategy",
      icon: <FaLightbulb className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Resilience & Operational Assessments",
      description: "Customized operational readiness reviews",
      href: "/services#resilience-assessments",
      icon: <FaEye className="w-5 h-5 text-gray-500" />
    }
  ];

  const solutions = [
    {
      name: "Internal Developer Portal",
      description: "Unified service catalog with self-service provisioning",
      href: "/solutions/idp",
      icon: <FaTools className="w-5 h-5 text-gray-500" />
    },
    {
      name: "Model Context Protocol",
      description: "AI-powered infrastructure operations and troubleshooting",
      href: "/solutions/mcp",
      icon: <FaRobot className="w-5 h-5 text-gray-500" />
    }
  ];

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown) => {
    // Clear any existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    // Set a 3-second delay before hiding the dropdown
    hideTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 1000);
  };
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="/">
                <span className="text-2xl font-bold text-blue-600">{logo}</span>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex  space-x-4">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors ${currentPath.includes('/mission-control') ||
                  currentPath.includes('/canary-checker') ||
                  currentPath.includes('/config-db') ||
                  currentPath.includes('/batch-runner') ||
                  currentPath.includes('/dns-sync')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
                onClick={() => handleDropdownToggle('products')}
              >
                Products
                {activeDropdown === 'products' ? (
                  <FaChevronUp className="ml-1 text-sm" />
                ) : (
                  <FaChevronDown className="ml-1 text-sm" />
                )}
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-1 w-[600px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Commercial Products */}
                      <div>
                        <div className="space-y-4">
                          {commercialProducts.map((product, index) => (
                            <a
                              key={index}
                              href={product.href}
                              className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="mr-3 mt-1">{product.icon}</div>
                              <div>
                                <h4 className="text-base font-medium text-gray-900">{product.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Open Source Products */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Open Source</h3>
                        <div className="space-y-2">
                          {openSourceProducts.map((product, index) => (
                            <a
                              key={index}
                              href={product.href}
                              className="flex items-start p-1 rounded-lg hover:bg-gray-50 transition-colors"
                              target={product.href.includes('github.com') ? '_blank' : '_self'}
                              rel={product.href.includes('github.com') ? 'noopener noreferrer' : ''}
                            >
                              <div className="mr-2 mt-1">{product.icon}</div>
                              <div>
                                <h4 className="text-base font-medium text-gray-900">{product.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors ${currentPath.includes('/solutions')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
                onClick={() => handleDropdownToggle('solutions')}
              >
                Solutions
                {activeDropdown === 'solutions' ? (
                  <FaChevronUp className="ml-1 text-sm" />
                ) : (
                  <FaChevronDown className="ml-1 text-sm" />
                )}
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 mt-1 w-[480px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Solutions</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {solutions.map((solution, index) => (
                        <a
                          key={index}
                          href={solution.href}
                          className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="mr-3 mt-1">{solution.icon}</div>
                          <div>
                            <h4 className="text-base font-medium text-gray-900">{solution.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{solution.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <a
                        href="/solutions"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View All Solutions
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div> */}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors ${currentPath.includes('/services')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
                onClick={() => handleDropdownToggle('services')}
              >
                Services
                {activeDropdown === 'services' ? (
                  <FaChevronUp className="ml-1 text-sm" />
                ) : (
                  <FaChevronDown className="ml-1 text-sm" />
                )}
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-1 w-[480px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3">
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service, index) => (
                        <a
                          key={index}
                          href={service.href}
                          className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="mr-2 mt-1">{service.icon}</div>
                          <div>
                            <h4 className="text-base font-medium text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Regular Links */}
            <a href="/pricing" className={getNavLinkClass('/pricing')}>
              Pricing
            </a>
            <a href="/docs" className={getNavLinkClass('/docs')}>
              Docs
            </a>
            <a href="/blog" className={getNavLinkClass('/blog')}>
              Blog
            </a>
            <a href="/about" className={getNavLinkClass('/about')}>
              About
            </a>

            {/* Action Buttons */}
            <a
              href={loginButton.href}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-700 "
            >
              {loginButton.text}
            </a>
            <a
              href={signUpButton.href}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
            >
              {signUpButton.text}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Products */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('products')}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-lg font-medium transition-colors ${currentPath.includes('/mission-control') ||
                    currentPath.includes('/canary-checker') ||
                    currentPath.includes('/config-db') ||
                    currentPath.includes('/batch-runner') ||
                    currentPath.includes('/dns-sync')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  Products
                  {activeDropdown === 'products' ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </button>
                {activeDropdown === 'products' && (
                  <div className="pl-4 space-y-2">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Commercial Products</h4>
                      {commercialProducts.map((product, index) => (
                        <a
                          key={index}
                          href={product.href}
                          className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="mr-3 mt-1">{product.icon}</div>
                          <div>
                            <h4 className="text-base font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Open Source</h4>
                      {openSourceProducts.map((product, index) => (
                        <a
                          key={index}
                          href={product.href}
                          className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          target={product.href.includes('github.com') ? '_blank' : '_self'}
                          rel={product.href.includes('github.com') ? 'noopener noreferrer' : ''}
                        >
                          <div className="mr-3 mt-1">{product.icon}</div>
                          <div>
                            <h4 className="text-base font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Solutions */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('solutions')}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-lg font-medium transition-colors ${currentPath.includes('/solutions')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  Solutions
                  {activeDropdown === 'solutions' ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="pl-4 space-y-2">
                    {solutions.map((solution, index) => (
                      <a
                        key={index}
                        href={solution.href}
                        className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-3 mt-1">{solution.icon}</div>
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{solution.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{solution.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('services')}
                  className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-lg font-medium transition-colors ${currentPath.includes('/services')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  Services
                  {activeDropdown === 'services' ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </button>
                {activeDropdown === 'services' && (
                  <div className="pl-4 space-y-2">
                    {services.map((service, index) => (
                      <a
                        key={index}
                        href={service.href}
                        className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-3 mt-1">{service.icon}</div>
                        <div>
                          <h4 className="text-base font-medium text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Regular Links */}
              <a href="/pricing" className={getMobileNavLinkClass('/pricing')}>
                Pricing
              </a>
              <a href="/" className={getMobileNavLinkClass('/docs')}>
                Docs
              </a>
              <a href="/blog" className={getMobileNavLinkClass('/blog')}>
                Blog
              </a>
              <a href="/about" className={getMobileNavLinkClass('/about')}>
                About
              </a>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={loginButton.href}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors mb-2"
                >
                  {loginButton.text}
                </a>
                <a
                  href={signUpButton.href}
                  className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {signUpButton.text}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
