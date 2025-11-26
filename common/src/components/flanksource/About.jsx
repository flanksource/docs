import React from 'react';
import {
  FaEye,
  FaBolt,
  FaBrain,
  FaLinkedin
} from 'react-icons/fa';
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
      icon: <FaEye className="w-12 h-12 text-blue-600" />,
      title: "Unified Context",
      description: "You cannot fix what you cannot see. We believe every incident requires a consolidated view of Health, Configuration, and Changes."
    },
    {
      icon: <FaBolt className="w-12 h-12 text-blue-600" />,
      title: "Action, Not Just Observation",
      description: (
        <>
          Data without action is noise. We build <span className="font-mono">Playbooks</span> that integrate into <span className="font-mono">GitOps</span> workflows, allowing teams to fix issues as fast as they find them.
        </>
      )
    },
    {
      icon: <FaBrain className="w-12 h-12 text-blue-600" />,
      title: "AI-Native Architecture",
      description: (
        <>
          We build for the future. Our <span className="font-mono">MCP</span> (Model Context Protocol) server feeds real-time, summarized data to AI agents, making troubleshooting automated and conversational.
        </>
      )
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
      <p className="text-xl font-semibold text-gray-900 mb-2 text-center">{person.name}</p>
      <p className="text-blue-600 font-medium mb-3 text-center">{person.role}</p>
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
                src="/img/flanksource/generated_image_1763641910004_1.png"
                alt="From Consulting Chaos to Product Clarity"
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
            We believe the true cost of software isn't writing it—it's running it.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <div className="flex justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Engineered for Autonomy</h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto leading-relaxed">
            We operate with the precision of a distributed system. We are a <strong>Remote-First</strong> company with a culture built on intellectual honesty and "Source-Open" values.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Asynchronous by Design</h3>
              <p className="text-gray-600">We document everything. We value deep work over endless meetings.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Open Source First</h3>
              <p className="text-gray-600">We contribute back. Tools like <em>Canary Checker</em> and <em>Karina</em> are our gift to the community.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Output Over Hours</h3>
              <p className="text-gray-600">We don't care when you work; we care about the quality of the code you ship and the problems you solve.</p>
            </div>
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
