import React, { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaSlack,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaSpinner
} from 'react-icons/fa';
import Navigation from './Navigation';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData object for multipart form submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('message', formData.message);
      formDataToSubmit.append('timestamp', new Date().toISOString());
      formDataToSubmit.append('source', window.location);

      const response = await fetch('https://webhook.site/flanksource-email-contact', {
        method: 'POST',
        body: formDataToSubmit
      });

      console.log(response)

      if (response.status == 302) {
        setSubmitStatus('success');
        setFormData({
          email: '',
          name: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
      <Navigation />
      <div className='py-10'>        {/* Main Contact Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-2xl max-w-5xl mx-auto">


          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-900/20"></div>

          <div className="relative text-white items-center flex-col text-lg justify-center py-10 flex w-full">
            <h2 className="text-white text-[2.50rem] leading-none font-bold mb-10">Get in Touch</h2>
            <div className="w-full mt-0 mx-0 mb-3.5 px-8 md:px-10 sm:px-6">
              <form onSubmit={handleSubmit} className="flex flex-row lg:flex-row gap-6">
                <div className="w-full lg:w-1/2 text-white flex flex-col">
                  <div className="w-full mb-5">
                    <label className="font-medium mb-2 block text-lg text-white">
                      Email
                    </label>
                    <input
                      className="bg-white/10 border border-white/20 text-white placeholder-blue-200 cursor-text text-lg py-3 px-4 w-full rounded-xl focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 shadow-sm backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@company.com"
                      type="email"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="w-full mb-5">
                    <label className="font-medium mb-2 block text-lg text-white">
                      Name
                    </label>
                    <input
                      className="bg-white/10 border border-white/20 text-white placeholder-blue-200 cursor-text text-lg py-3 px-4 w-full rounded-xl focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 shadow-sm backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      type="text"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="w-full mb-5">
                    <label className="font-medium mb-2 block text-lg text-white">
                      Phone Number
                    </label>
                    <input
                      className="bg-white/10 border border-white/20 text-white placeholder-blue-200 cursor-text text-lg py-3 px-4 w-full rounded-xl focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 shadow-sm backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      type="tel"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 text-white flex flex-col">
                  <div className="w-full mb-5 flex-1">
                    <label className="font-medium mb-2 block text-lg text-white">
                      Your message
                    </label>
                    <textarea
                      className="bg-white/10 border border-white/20 text-white placeholder-blue-200 cursor-text text-lg py-3 h-full mb-5 px-4 resize-none w-full min-h-[180px] rounded-xl focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 shadow-sm backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, questions, or how we can help..."
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="mt-10 mb-10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-white  text-blue-600 hover:text-blue-900 cursor-pointer font-bold text-lg py-3 px-6 text-center hover:bg-gray-100  w-full rounded-xl transition-all duration-200 shadow-sm ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send message'
                      )}
                    </button>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <p className="text-green-100 text-center font-medium">
                          ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                        </p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
                        <p className="text-red-100 text-center font-medium">
                          ✗ Sorry, there was an error sending your message. Please try again or contact us directly.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
              <div className="justify-center flex lg:flex-row md:flex-col sm:flex-col">
                <div className="flex-col flex w-full lg:mt-10 md:mt-0 sm:mt-0">
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9d0770945250d4a93c_Ellipse%201.svg" alt="US Flag" />
                    <a className="text-white hover:text-blue-200 transition-colors duration-200" href="tel:+15592063928">
                      +1 559 206 3928
                    </a>
                  </div>
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9d126d120ed693c25b_Ellipse%202.svg" alt="South Africa Flag" />
                    <a className="text-white hover:text-blue-200 transition-colors duration-200" href="tel:+27872500990">
                      +27 87 250 0990
                    </a>
                  </div>
                </div>
                <div className="flex-col flex w-full lg:mt-10 md:mt-0 sm:mt-0">
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9d077094bf87d4a93b_Ellipse%203.svg" alt="Israel Flag" />
                    <a className="text-white hover:text-blue-200 transition-colors duration-200" href="tel:+9720507093971">
                      +972 050 709 3971
                    </a>
                  </div>
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9ec453647f46c29a92_eu.svg" alt="EU Flag" />
                    <a className="text-white hover:text-blue-200 transition-colors duration-200" href="tel:+443300580206">
                      +44 33 0058 0206
                    </a>
                  </div>
                </div>
                <div className="flex-col flex w-full lg:mt-10 md:mt-0 sm:mt-0">
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9de48379637a5c721b_eva_email-outline.svg" alt="Email Icon" />
                    <a className="text-white hover:text-blue-200 transition-colors duration-200" href="mailto:hi@flanksource.com">
                      hi@flanksource.com
                    </a>
                  </div>
                  <div className="items-start justify-start flex mb-4">
                    <img className="object-contain align-middle inline-block w-7 h-full max-w-full max-h-full mt-1 mr-3.5" src="https://cdn.prod.website-files.com/62c72370a0f3f0f10d12b623/62dfec9dae912445222b0b17_akar-icons_slack-fill.svg" alt="Slack Icon" />
                    <a className="text-white hover:text-blue-200 transition-colors duration-200" href="https://flanksource.slack.com">
                      flanksource.slack.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="justify-center pt-5 flex text-[1.38rem] leading-7 text-white">
                <div className="text-center w-[43.75rem] max-w-full">
                  Looking for careers?{" "}
                  <a className="text-blue-200 hover:text-white font-semibold underline transition-colors duration-200" href="/careers">
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
