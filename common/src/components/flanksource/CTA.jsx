import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const CTA = ({
  title,
  subtitle,
  description,
  primaryButton = { text: "Get Started", href: "/contact" },
  secondaryButton = { text: "Learn More", href: "/docs" },
  backgroundClass = "bg-blue-700"
}) => {
  return (
    <section className="relative py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${backgroundClass} text-white rounded-3xl p-12 shadow-2xl transform -mb-10 relative z-10`}>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-100">
              {title}
              {subtitle && (
                <span className="block text-blue-300">
                  {subtitle}
                </span>
              )}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={primaryButton.href}
                className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {primaryButton.text}
                <FaArrowRight className="ml-2 w-5 h-5" />
              </a>
              {secondaryButton && (
                <a
                  href={secondaryButton.href}
                  className="inline-flex items-center bg-white bg-opacity-10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-opacity-20 transition-all duration-200 border border-white border-opacity-20"
                >
                  {secondaryButton.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
