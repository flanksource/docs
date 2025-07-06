import React from 'react';

export function Hero({
  logo,
  logoAlt,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  image,
  imageAlt,
  className = ""
}) {
  return (
    <div className={`relative isolate overflow-hidden bg-white hero-pattern ${className}`}>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          {logo && (
            <img
              className="h-11"
              src={logo}
              alt={logoAlt}
            />
          )}
          {title && (
            <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {description}
            </p>
          )}
          {ctaText && ctaLink && (
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href={ctaLink}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
        {image && (
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-[60rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
