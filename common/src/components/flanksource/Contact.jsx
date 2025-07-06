import React, { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaSlack,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaPaperPlane
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      type: 'phone',
      icon: <FaPhone className="w-5 h-5" />,
      items: [
        {
          label: 'United States',
          value: '+1 559 206 3928',
          href: 'tel:+15592063928',
          flag: '🇺🇸',
          timezone: 'PST/PDT'
        },
        {
          label: 'South Africa',
          value: '+27 87 250 0990',
          href: 'tel:+27872500990',
          flag: '🇿🇦',
          timezone: 'SAST'
        },
        {
          label: 'Israel',
          value: '+972 050 709 3971',
          href: 'tel:+9720507093971',
          flag: '🇮🇱',
          timezone: 'IST'
        },
        {
          label: 'United Kingdom',
          value: '+44 33 0058 0206',
          href: 'tel:+443300580206',
          flag: '🇬🇧',
          timezone: 'GMT/BST'
        }
      ]
    },
    {
      type: 'email',
      icon: <FaEnvelope className="w-5 h-5" />,
      items: [
        { label: 'General Inquiries', value: 'hi@flanksource.com', href: 'mailto:hi@flanksource.com' }
      ]
    },
    {
      type: 'slack',
      icon: <FaSlack className="w-5 h-5" />,
      items: [
        { label: 'Join our Community', value: 'flanksource.slack.com', href: 'https://flanksource.slack.com/' }
      ]
    }
  ];

  return (
    <div className='bg-gray-50'>
      <div className='py-10'>
        {/* Main Contact Section */}
        <div className="relative isolate overflow-hidden bg-white rounded-xl shadow-2xl max-w-5xl mx-auto">
          {/* Background Pattern */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="contact-pattern"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect fill="url(#contact-pattern)" width="100%" height="100%" strokeWidth={0} />
          </svg>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 opacity-60"></div>

          <div className="relative text-gray-700 items-center flex-col text-lg justify-center py-10 flex w-full">
            <h2 className="text-indigo-900 text-[2.50rem] leading-none font-bold mb-10">Get in Touch</h2>
            <div className="w-full mt-0 mx-0 mb-3.5 px-8 md:px-10 sm:px-6">
              <form onSubmit={handleSubmit} className="flex flex-row lg:flex-row gap-6">
                <div className="w-full lg:w-1/2 text-gray-700 flex flex-col">
                  <div className="w-full mb-5">
                    <label className="font-medium mb-2 block text-base text-gray-900">
                      Email
                    </label>
                    <input
                      className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 cursor-text text-base py-3 px-4 w-full rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@company.com"
                      type="email"
                      required
                    />
                  </div>
                  <div className="w-full mb-5">
                    <label className="font-medium mb-2 block text-base text-gray-900">
                      Name
                    </label>
                    <input
                      className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 cursor-text text-base py-3 px-4 w-full rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      type="text"
                      required
                    />
                  </div>
                  <div className="w-full mb-5">
                    <label className="font-medium mb-2 block text-base text-gray-900">
                      Phone Number
                    </label>
                    <input
                      className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 cursor-text text-base py-3 px-4 w-full rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 text-gray-700 flex flex-col">
                  <div className="w-full mb-5 flex-1">
                    <label className="font-medium mb-2 block text-base text-gray-900">
                      Your message
                    </label>
                    <textarea
                      className="bg-white border border-gray-300 text-gray-900 placeholder-gray-500 cursor-text text-base py-3 h-full mb-5 px-4 resize-none w-full min-h-[180px] rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, questions, or how we can help..."
                      required
                    />
                  </div>
                  <div className="mt-10 mb-10">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white cursor-pointer font-bold text-base py-3 px-6 text-center w-full rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-sm"
                    >
                      Send message
                    </button>
                  </div>
                </div>
              </form>
              <div className="justify-center flex lg:flex-row md:flex-col sm:flex-col">
                <div className="flex-col flex w-full lg:mt-10 md:mt-0 sm:mt-0">
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9d0770945250d4a93c_Ellipse%201.svg" alt="US Flag" />
                    <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-200" href="tel:+15592063928">
                      +1 559 206 3928
                    </a>
                  </div>
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9d126d120ed693c25b_Ellipse%202.svg" alt="South Africa Flag" />
                    <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-200" href="tel:+27872500990">
                      +27 87 250 0990
                    </a>
                  </div>
                </div>
                <div className="flex-col flex w-full lg:mt-10 md:mt-0 sm:mt-0">
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9d077094bf87d4a93b_Ellipse%203.svg" alt="Israel Flag" />
                    <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-200" href="tel:+9720507093971">
                      +972 050 709 3971
                    </a>
                  </div>
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9ec453647f46c29a92_eu.svg" alt="EU Flag" />
                    <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-200" href="tel:+443300580206">
                      +44 33 0058 0206
                    </a>
                  </div>
                </div>
                <div className="flex-col flex w-full lg:mt-10 md:mt-0 sm:mt-0">
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9de48379637a5c721b_eva_email-outline.svg" alt="Email Icon" />
                    <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-200" href="mailto:hi@flanksource.com">
                      hi@flanksource.com
                    </a>
                  </div>
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9dae912445222b0b17_akar-icons_slack-fill.svg" alt="Slack Icon" />
                    <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-200" href="https://flanksource.slack.com">
                      flanksource.slack.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="justify-center pt-5 flex text-[1.38rem] leading-7 text-gray-700">
                <div className="text-center w-[43.75rem] max-w-full">
                  Looking for careers?{" "}
                  <a className="text-indigo-600 hover:text-indigo-700 font-semibold underline transition-colors duration-200" href="/careers">
                    View all job openings
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Contact;
