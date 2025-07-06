import React from 'react';
import {
  FaUsers,
  FaHandshake,
  FaRocket,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa';
import CTA from './CTA';

const About = () => {
  const teamMembers = [
    {
      name: "Aditya Thebe",
      role: "Backend Engineer",
      linkedin: "#",
      image: "/img/flanksource/team/aditya-thebe.png"
    },
    {
      name: "Brendan Galloway",
      role: "Senior Site Reliability Engineer",
      linkedin: "https://www.linkedin.com/",
      image: "/img/flanksource/team/brendan-galloway.jpg"
    },
    {
      name: "Frumie Immerman",
      role: "People & Ops",
      linkedin: "https://www.linkedin.com/",
      image: "/img/flanksource/team/frumie-immerman.jpg"
    },
    {
      name: "Junaid Ebrahim",
      role: "Senior Site Reliability Engineer",
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
      role: "Senior Backend Engineer (Go)",
      linkedin: "#",
      image: "/img/flanksource/team/yash-mehrotra.jpg"
    }
  ];

  const advisors = [
    {
      name: "Pierre Meyer",
      role: "Advisor",
      linkedin: "https://www.linkedin.com/",
      image: "/img/flanksource/team/pierre-meyer.jpg"
    },
    {
      name: "Josef Langerman",
      role: "Advisor",
      linkedin: "https://www.linkedin.com/",
      image: "/img/flanksource/team/josef-langerman.jpg"
    }
  ];

  const values = [
    {
      icon: <FaUsers className="w-8 h-8 text-blue-600" />,
      image: "/img/flanksource/expertise.jpg",
      title: "Expertise",
      description: "We're a proactive group of experienced CKA-certified principal and senior site reliability engineers (SREs) with a combined 35 years of DevOps under our belts. We're not afraid of complexity; in fact, we embrace it."
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-blue-600" />,
      image: "/img/flanksource/collaboration.jpg",
      title: "Collaboration",
      description: "We go above and beyond to customize solutions for both small teams and large enterprises. We act as an extension of your team to get the work done."
    },
    {
      icon: <FaRocket className="w-8 h-8 text-blue-600" />,
      image: "/img/flanksource/GyShiDo.png",
      title: "A GyShiDo work ethic",
      description: "We're powered by relentless focus and an aversion to agenda-less meetings. We zero in on a single task, embrace boring consistency, and see projects through to completion."
    }
  ];

  const PersonCard = ({ person, isAdvisor = false }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex items-center justify-center w-20 h-20 mb-4 mx-auto">
        {person.image ? (
          <img
            src={person.image}
            alt={person.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full" style={{ display: person.image ? 'none' : 'flex' }}>
          <FaUsers className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{person.name}</h3>
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


      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Helping engineering teams improve operational maturity and resilience
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 w-full">
                  {value.image ? (
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-100" style={{ display: value.image ? 'none' : 'flex' }}>
                    {value.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Meet the people behind Flanksource</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <PersonCard key={index} person={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advisors</h2>
            <p className="text-xl text-gray-600">Experienced leaders guiding our journey</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {advisors.map((advisor, index) => (
              <PersonCard key={index} person={advisor} isAdvisor={true} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="We're Hiring!"
        description="Want to join the Flanksource team? We're always looking for talented individuals to help us build the future of operational resilience."
        primaryButton={{ text: "Explore Open Positions", href: "/careers" }}
        secondaryButton={{ text: "Learn More", href: "/about" }}
      />
    </div>
  );
};

export default About;
