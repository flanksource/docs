import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import Link from '@docusaurus/Link';
import Navigation from './Navigation';
const About = () => {
  const teamMembers = [
    {
      name: "Moshe Immerman",
      role: "Founder & CEO",
      location: "Tel Aviv",
      linkedin: "https://www.linkedin.com/in/moshe-immerman/",
      image: "/img/flanksource/team/moshe-immerman.jpg"
    },
    {
      name: "Aditya Thebe",
      role: "Backend Engineer",
      location: "Nepal",
      linkedin: "#",
      image: "/img/flanksource/team/aditya-thebe.png"
    },
    {
      name: "Brendan Galloway",
      role: "Senior Site Reliability Engineer",
      location: "South Africa",
      linkedin: "https://www.linkedin.com/",
      image: "/img/flanksource/team/brendan-galloway.jpg"
    },
    {
      name: "Frumie Immerman",
      role: "People & Ops",
      location: "Tel Aviv",
      linkedin: "https://www.linkedin.com/",
      image: "/img/flanksource/team/frumie-immerman.jpg"
    },
    {
      name: "Junaid Ebrahim",
      role: "Senior Site Reliability Engineer",
      location: "South Africa",
      linkedin: "http://linkedin.com/",
      image: "/img/flanksource/team/junaid-ebrahim.jpg"
    },
    {
      name: "Moshe Immerman",
      role: "Founder",
      linkedin: "https://www.linkedin.com/in/moshe-immerman/",
      image: "/img/flanksource/team/moshe-immerman.jpg"
    },
    {
      name: "Yash Mehrotra",
      role: "Senior Backend Engineer",
      linkedin: "https://www.linkedin.com/in/yashmehrotra/",
      image: "/img/flanksource/team/yash-mehrotra.png"
    }
  ];

  const philosophy = [
    {
      icon: (
        <svg className="w-16 h-16 text-zinc-500" viewBox="0 0 24 24" fill="none">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
            <path d="M6 3v12" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </g>
        </svg>
      ),
      title: "Trunk-Based, GitOps-First",
      description: "One branch, one truth. We commit to main, gate merges with E2E tests, and deploy declaratively. No long-lived branches, no merge conflicts, no surprises."
    },
    {
      icon: (
        <svg className="w-16 h-16 text-zinc-500" viewBox="0 0 24 24" fill="none">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
      ),
      title: "Fast Feedback, Clear Ownership",
      description: "Minutes from commit to production. Every service has an owner, every alert has context, and every deploy is traceable. We optimize for iteration speed."
    },
    {
      icon: (
        <svg className="w-16 h-16 text-zinc-500" viewBox="0 0 24 24" fill="none">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12l2 2l4-4" />
          </g>
        </svg>
      ),
      title: "Simple and Operable",
      description: "Complexity is debt. We choose boring technology, write code that's easy to debug at 3am, and build systems that explain themselves. If it's hard to operate, it's wrong."
    }
  ];

  const culture = [
    {
      icon: (
        <svg className="w-12 h-12 text-zinc-500" viewBox="0 0 24 24" fill="none">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20" />
          </g>
        </svg>
      ),
      title: "Remote-First, Not Remote-Friendly",
      description: "Our team spans Tel Aviv, South Africa, India, and Nepal. We default to async communication, document decisions in writing, and trust each other to manage time across timezones."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-zinc-500" viewBox="0 0 24 24" fill="none">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </g>
        </svg>
      ),
      title: "Own the Problem, Not Just the Task",
      description: "We hire engineers who can take a problem from discovery to production. No ticket queues, no handoffs—you debug it, you ship it, you own it."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-zinc-500" viewBox="0 0 24 24" fill="none">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16" />
        </svg>
      ),
      title: "Build in Public",
      description: "Canary Checker, Karina, and our core libraries are open source. We believe transparency isn't just a value—it's how great software gets built."
    }
  ];

  const PersonCard = ({ person }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex items-center justify-center w-20 h-20 mb-4 mx-auto">
        {person.image && (
          <img
            src={person.image}
            alt={person.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
        )}
      </div>
      <p className="text-xl font-semibold text-gray-900 mb-2 text-center justify-center">{person.name}</p>
      <p className="text-blue-600 font-medium mb-1 text-center">{person.role}</p>
      {person.location && (
        <p className="text-gray-500 text-sm italic mb-3 text-center">{person.location}</p>
      )}
      {person.linkedin && person.linkedin !== '#' && (
        <div className="flex justify-center">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Turning Operational Noise into Engineering Signals
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Flanksource is on a mission to <strong>reduce the cognitive overload</strong> of modern infrastructure.
            We build the tools Platform Engineers wish they had on <span className="font-mono">"Day 2."</span>
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Born in the Terminal</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Flanksource didn't start in a boardroom. It started in <span className="font-mono">kubectl</span>.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Founded in <strong>2020</strong> in <strong>Tel Aviv</strong>, we began as a specialized consulting firm for high-end Kubernetes operations. We were the "fixers" called in when enterprise complexity spiraled out of control.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                We saw the same pattern at every client: teams were drowning in data but starving for context. They had dashboards for metrics, tools for logs, and Git for config—but no single place that tied them together.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                To survive these engagements, we built internal tools to aggregate this chaos. Over time, these tools evolved into <strong>Mission Control</strong>. We realized we weren't just solving a client problem; we were solving a fundamental industry gap.
              </p>
            </div>
            <div className="h-full min-h-[400px] rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src="/img/born-in-terminal.png"
                alt="Born in the Terminal - Developer working late with terminal code"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How We Build</h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Engineering principles that let us ship fast without breaking things.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <div className="flex justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex justify-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Built for Builders</h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
            We operate like a well-architected distributed system—autonomous nodes, clear interfaces, shared state.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {culture.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex justify-center">{item.title}</h3>
                <p className="text-gray-600 ">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Global Roots</h2>
            <p className="text-xl text-gray-600">
              Headquartered in <strong>Tel Aviv</strong>, with engineering hubs in <strong>South Africa, India, and Nepal</strong>
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <PersonCard key={index} person={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-20 bg-blue-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Ready to regain control?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Explore Mission Control
            </Link>
            <Link
              to="/careers"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
